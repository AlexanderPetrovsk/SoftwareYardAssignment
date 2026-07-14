import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useEmployeeStore } from '@/stores/employeeStore';
import { useValidation } from '@/composables/useValidation';

import type { Employee } from '@/types/employee';

describe('useValidation', () => {
  let store: ReturnType<typeof useEmployeeStore>;

  beforeEach(() => {
    setActivePinia(createPinia());

    store = useEmployeeStore();

    store.employees = [];
  });

  const validEmployee = {
    code: 'EMP001',
    fullName: 'John Doe',
    occupation: 'Sales Executive',
    department: 'Sales',
    dateOfEmployment: '2023-01-01',
    terminationDate: null,
  };

  describe('employeeSchema', () => {
    it('passes validation for a valid employee', async () => {
      const { employeeSchema } = useValidation();

      await expect(employeeSchema().validate(validEmployee)).resolves.toBeTruthy();
    });

    it('requires employee code', async () => {
      const { employeeSchema } = useValidation();

      await expect(
        employeeSchema().validate({
          ...validEmployee,
          code: '',
        }),
      ).rejects.toThrow('Code is required');
    });

    it('requires minimum code length', async () => {
      const { employeeSchema } = useValidation();

      await expect(
        employeeSchema().validate({
          ...validEmployee,
          code: '123',
        }),
      ).rejects.toThrow('Minimum 6 characters');
    });

    it('requires full name', async () => {
      const { employeeSchema } = useValidation();

      await expect(
        employeeSchema().validate({
          ...validEmployee,
          fullName: '',
        }),
      ).rejects.toThrow('Full Name is required');
    });

    it('requires occupation', async () => {
      const { employeeSchema } = useValidation();

      await expect(
        employeeSchema().validate({
          ...validEmployee,
          occupation: '',
        }),
      ).rejects.toThrow('Occupation is required');
    });

    it('requires department', async () => {
      const { employeeSchema } = useValidation();

      await expect(
        employeeSchema().validate({
          ...validEmployee,
          department: '',
        }),
      ).rejects.toThrow('Department is required');
    });

    it('requires employment date', async () => {
      const { employeeSchema } = useValidation();

      await expect(
        employeeSchema().validate({
          ...validEmployee,
          dateOfEmployment: '',
        }),
      ).rejects.toThrow('Date of employment is required');
    });

    it('does not allow termination before employment date', async () => {
      const { employeeSchema } = useValidation();

      await expect(
        employeeSchema().validate({
          ...validEmployee,
          dateOfEmployment: '2024-01-01',
          terminationDate: '2023-01-01',
        }),
      ).rejects.toThrow('Termination date cannot be earlier than the employment date.');
    });

    it('allows null termination date', async () => {
      const { employeeSchema } = useValidation();

      await expect(
        employeeSchema().validate({
          ...validEmployee,
          terminationDate: null,
        }),
      ).resolves.toBeTruthy();
    });

    it('allows editing employee without changing their code', async () => {
      store.employees = [
        {
          ...validEmployee,
        } as Employee,
      ];

      const { employeeSchema } = useValidation();

      await expect(employeeSchema('EMP001').validate(validEmployee)).resolves.toBeTruthy();
    });

    it('rejects duplicate employee codes', async () => {
      store.employees = [
        {
          ...validEmployee,
        } as Employee,
      ];

      const { employeeSchema } = useValidation();

      await expect(
        employeeSchema().validate({
          ...validEmployee,
          code: 'EMP001',
        }),
      ).rejects.toThrow('An employee with this code already exists');
    });
  });

  describe('validateJSONImport', () => {
    it('returns true for unique imported employees', () => {
      store.employees = [];

      const { validateJSONImport } = useValidation();

      const result = validateJSONImport([
        {
          ...validEmployee,
          code: 'EMP999',
        } as Employee,
      ]);

      expect(result).toBe(true);
    });

    it('throws error when imported employee is invalid', () => {
      const { validateJSONImport } = useValidation();

      expect(() =>
        validateJSONImport([
          {
            ...validEmployee,
            code: 123,
          } as Employee,
        ]),
      ).toThrow('code must be a `string` type, but the final value was: `123`.');
    });

    it('throws error when imported employee already exists', () => {
      store.employees = [
        {
          ...validEmployee,
          code: 'EMP001',
        } as Employee,
      ];

      const { validateJSONImport } = useValidation();

      expect(() =>
        validateJSONImport([
          {
            ...validEmployee,
            code: 'EMP001',
          } as Employee,
        ]),
      ).toThrow('An employee with this code already exists');
    });

    it('throws error when imported employees have duplicate code values', () => {
      const { validateJSONImport } = useValidation();

      expect(() =>
        validateJSONImport([
          {
            ...validEmployee,
            code: 'EMP003',
          } as Employee,
          {
            ...validEmployee,
            code: 'EMP003',
          } as Employee,
        ]),
      ).toThrow('Imported Employees have duplicate code values');
    });

    it('allows importing multiple unique employees', () => {
      store.employees = [
        {
          ...validEmployee,
          code: 'EMP001',
        } as Employee,
      ];

      const { validateJSONImport } = useValidation();

      expect(
        validateJSONImport([
          {
            ...validEmployee,
            code: 'EMP002',
          } as Employee,
          {
            ...validEmployee,
            code: 'EMP003',
          } as Employee,
        ]),
      ).toBe(true);
    });
  });
});
