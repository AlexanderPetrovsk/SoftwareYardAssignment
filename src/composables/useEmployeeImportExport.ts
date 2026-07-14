import { useEmployeeStore } from '@/stores/employeeStore';
import type { Employee } from '@/types/employee';
import { useValidation } from './useValidation';

export const useEmployeeImportExport = () => {
  const employeeStore = useEmployeeStore();
  const { validateJSONImport } = useValidation();

  const exportEmployees = () => {
    const json = JSON.stringify(employeeStore.employees, null, 2);

    const blob = new Blob([json], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = 'employees.json';

    link.click();

    link.remove();
    URL.revokeObjectURL(url);
  };

  const importEmployees = (files: Blob, replace: boolean) => {
    const fileToUpload = Array.isArray(files) ? files[0] : (files as Blob);

    if (!fileToUpload) {
      employeeStore.setError('No JSON file provided.');
      return;
    }

    const reader = new FileReader();

    let parsedData: Employee[] | null = null;
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        if (event.target && typeof event.target.result === 'string') {
          parsedData = JSON.parse(event.target.result);

          if (parsedData) {
            validateJSONImport(parsedData, replace);
            employeeStore.importEmployees(parsedData, replace);
          }
        }
      } catch (error) {
        employeeStore.setError(error instanceof Error ? error.message : 'Invalid JSON Format');
      }
    };

    reader.readAsText(fileToUpload);
  };

  return {
    exportEmployees,
    importEmployees,
  };
};
