import { EmployeeEmploymentStatus, EmployeeTerminationStatus } from '@/types/employee';

export const useEmployeeStatus = () => {
  const getEmploymentStatus = (date: string) => {
    const employmentDate = new Date(date);
    const now = new Date();

    if (employmentDate > now) {
      return {
        status: EmployeeEmploymentStatus.TO_BE_EMPLOYED,
        text: 'Employed soon',
        color: 'orange',
      };
    }

    return {
      status: EmployeeEmploymentStatus.EMPLOYED,
      text: 'Currently employed',
      color: 'green',
    };
  };

  const getTerminationStatus = (date: string) => {
    const terminationDate = new Date(date);
    const now = new Date();

    if (terminationDate > now) {
      return {
        status: EmployeeTerminationStatus.TO_BE_TERMINATED,
        text: 'To be terminated',
        color: 'orange',
      };
    }

    return {
      status: EmployeeTerminationStatus.TERMINATED,
      text: 'Terminated',
      color: 'red',
    };
  };

  const showEmploymentStatus = (date?: string | null) => {
    if (!date) {
      return true;
    }

    const terminationDate = new Date(date);
    const now = new Date();

    return terminationDate > now;
  };

  return { getEmploymentStatus, getTerminationStatus, showEmploymentStatus };
};
