import { createPinia, setActivePinia } from 'pinia';
import { useEmployeeStore } from '@/stores/employeeStore';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useEmployeeImportExport } from '@/composables/useEmployeeImportExport';

const validateJSONImport = vi.fn();

vi.mock('@/composables/useValidation', () => ({
  useValidation: () => ({
    validateJSONImport,
  }),
}));

let fileReaderInstance: FileReader;

class MockFileReader {
  onload: ((event: ProgressEvent<FileReader>) => void) | null = null;

  readAsText = vi.fn();

  constructor() {
    fileReaderInstance = this;
  }
}

vi.stubGlobal('FileReader', MockFileReader);

describe('useEmployeeImportExport', () => {
  let store: ReturnType<typeof useEmployeeStore>;

  beforeEach(() => {
    setActivePinia(createPinia());

    store = useEmployeeStore();

    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('exportEmployees', () => {
    it('creates a downloadable json file', () => {
      store.employees = [
        {
          code: 'EMP001',
          fullName: 'John Doe',
        } as any,
      ];

      const click = vi.fn();
      const remove = vi.fn();

      vi.spyOn(document, 'createElement').mockReturnValue({
        href: '',
        download: '',
        click,
        remove,
      } as any);

      const { exportEmployees } = useEmployeeImportExport();

      exportEmployees();

      expect(URL.createObjectURL).toHaveBeenCalled();

      expect(click).toHaveBeenCalled();

      expect(remove).toHaveBeenCalled();

      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');
    });
  });

  describe('importEmployees', () => {
    it('sets an error when no file is provided', () => {
      const errorSpy = vi.spyOn(store, 'setError');

      const { importEmployees } = useEmployeeImportExport();

      importEmployees(undefined as any, false);

      expect(errorSpy).toHaveBeenCalledWith('No JSON file provided.');
    });

    it('imports valid json', () => {
      const importSpy = vi.spyOn(store, 'importEmployees');

      const file = new Blob(['[]'], {
        type: 'application/json',
      });

      const { importEmployees } = useEmployeeImportExport();

      importEmployees(file, true);

      fileReaderInstance.onload({
        target: {
          result: JSON.stringify([
            {
              code: 'EMP002',
            },
          ]),
        },
      });

      expect(importSpy).toHaveBeenCalledWith(
        [
          {
            code: 'EMP002',
          },
        ],
        true,
      );
    });

    it('validates imported json when replace is true', () => {
      validateJSONImport.mockClear();

      const file = new Blob();

      vi.stubGlobal('FileReader', MockFileReader);

      const { importEmployees } = useEmployeeImportExport();

      importEmployees(file, false);

      fileReaderInstance.onload({
        target: {
          result: JSON.stringify([
            {
              code: 'EMP001',
            },
          ]),
        },
      });

      expect(validateJSONImport).toHaveBeenCalled();
    });

    it('sets error on invalid json', () => {
      const errorSpy = vi.spyOn(store, 'setError');

      const file = new Blob();

      const { importEmployees } = useEmployeeImportExport();

      importEmployees(file, false);

      fileReaderInstance.onload({
        target: {
          result: '{invalid json}',
        },
      });

      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
