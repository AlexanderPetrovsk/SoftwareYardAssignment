import type { Employee } from '@/types/employee';

export const getEmployeeDetailItems = (employee: Employee) => {
  return [
    {
      title: 'Employee Code',
      subtitle: employee.code,
    },
    {
      title: 'Department',
      subtitle: employee.department,
    },
    {
      title: 'Occupation',
      subtitle: employee.occupation,
    },
    {
      title: 'Employment Date',
      subtitle: employee.dateOfEmployment,
    },
    {
      title: 'Termination Date',
      subtitle: employee.terminationDate || '-',
    },
  ];
};
