import * as yup from 'yup';
import { useEmployeeStore } from '@/stores/employeeStore';
import type { Employee } from '@/types/employee';

export const useValidation = () => {
  const employeeStore = useEmployeeStore();

  const employeeSchema = (code?: string) =>
    yup.object({
      code: yup
        .string()
        .strict()
        .required('Code is required')
        .min(6, 'Minimum 6 characters')
        .test('is-unique', 'An employee with this code already exists', (value) => {
          if (!value || value === code) {
            return true;
          }

          return employeeStore.employees.findIndex((employee) => employee.code === value) === -1;
        }),
      fullName: yup.string().required('Full Name is required'),
      occupation: yup.string().required('Occupation is required'),
      department: yup.string().required('Department is required'),
      dateOfEmployment: yup
        .date()
        .transform((val, prevVal) => (prevVal === '' ? null : val))
        .required('Date of employment is required'),
      terminationDate: yup
        .date()
        .nullable()
        .transform((val, prevVal) => (prevVal === '' ? null : val))
        .min(yup.ref('dateOfEmployment'), 'Termination date cannot be earlier than the employment date.'),
    });

  const validateJSONImport = (importedEmployees: Employee[], replace: boolean) => {
    const employees = employeeStore.employees;

    if (!Array.isArray(importedEmployees)) {
      throw new Error('Invalid JSON format');
    }

    for (const employee of importedEmployees) {
      employeeSchema(employee.code).validateSync(employee);
    }

    if (replace) {
      return true;
    }

    const hasMatch = employees.some((employee) =>
      importedEmployees.some((imported) => imported.code === employee.code),
    );

    const hasDuplicateCodes = importedEmployees.some(
      (a, index) => importedEmployees.findIndex((b) => a.code === b.code) !== index,
    );

    if (hasMatch) {
      throw Error('An employee with this code already exists');
    }

    if (hasDuplicateCodes) {
      throw Error('Imported Employees have duplicate code values');
    }

    return true;
  };

  return {
    employeeSchema,
    validateJSONImport,
  };
};
