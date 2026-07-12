export interface Employee {
  code: string;
  fullName: string;
  occupation: string;
  department: string;
  dateOfEmployment: string;
  terminationDate?: string | null;
}

export enum EmployeeTerminationStatus {
  TERMINATED,
  TO_BE_TERMINATED,
}

export enum EmployeeEmploymentStatus {
  EMPLOYED,
  TO_BE_EMPLOYED,
}
