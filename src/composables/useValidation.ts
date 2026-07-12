import * as yup from 'yup';
import { useEmployeeStore } from '@/stores/employeeStore';

export const useValidation = (action: 'edit' | 'create') => {
  const employeeStore = useEmployeeStore();

  const employeeSchema = yup.object({
    code: yup
      .string()
      .required('Code is required')
      .min(6, 'Minimum 6 characters')
      .test('is-unique', 'An employee with this code already exists', (value) => {
        if (!value || action === 'edit') {
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

  return {
    employeeSchema,
  };
};
