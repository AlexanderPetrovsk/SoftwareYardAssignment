import { createPinia, setActivePinia } from 'pinia';
import employeeService from '@/services/employeeService';
import { useEmployeeStore } from '@/stores/employeeStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Employee } from '@/types/employee';

vi.mock('@/services/employeeService', () => ({
  default: {
    getEmployees: vi.fn(),
  },
}));

const mockEmployees: Employee[] = [
  {
    code: 'EMP001',
    fullName: 'John Doe',
    occupation: 'Sales Executive',
    department: 'Sales',
    dateOfEmployment: '2022-01-01',
    terminationDate: null,
  } as Employee,
  {
    code: 'EMP002',
    fullName: 'Jane Doe',
    occupation: 'Sales Executive',
    department: 'Sales',
    dateOfEmployment: '2023-01-01',
    terminationDate: null,
  } as Employee,
];

describe('Employee Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    vi.clearAllMocks();
  });

  describe('getEmployees', () => {
    it('loads employees successfully', async () => {
      vi.mocked(employeeService.getEmployees).mockResolvedValue(mockEmployees);

      const store = useEmployeeStore();

      await store.getEmployees();

      expect(store.employees).toEqual(mockEmployees);
      expect(store.error).toBeNull();
    });

    it('sets error when loading fails', async () => {
      vi.mocked(employeeService.getEmployees).mockRejectedValue(new Error('Loading failed'));

      const store = useEmployeeStore();

      await store.getEmployees();

      expect(store.error).toBe('Loading failed');
      expect(store.employees).toEqual([]);
    });
  });

  describe('getEmployeeByCode', () => {
    it('returns an employee', () => {
      const store = useEmployeeStore();

      store.employees = [...mockEmployees];

      const employee = store.getEmployeeByCode('EMP001');

      expect(employee).toEqual(mockEmployees[0]);
      expect(store.error).toBeNull();
    });

    it('returns undefined for invalid code', () => {
      const store = useEmployeeStore();

      store.employees = [...mockEmployees];

      const employee = store.getEmployeeByCode('INVALID');

      expect(employee).toBeUndefined();
      expect(store.error).toBe('Employee not found!');
    });
  });

  describe('createEmployee', () => {
    it('adds employee to beginning of list', () => {
      const store = useEmployeeStore();

      store.employees = [...mockEmployees];

      const employee = {
        code: 'EMP003',
      } as Employee;

      store.createEmployee(employee);

      expect(store.employees).toHaveLength(3);
      expect(store.employees[0]).toEqual(employee);
    });
  });

  describe('updateEmployee', () => {
    it('updates existing employee', () => {
      const store = useEmployeeStore();

      store.employees = [...mockEmployees];

      const updated = {
        ...mockEmployees[0],
        occupation: 'Lab Technician',
      };

      store.updateEmployee(updated as Employee);

      const newEmployee = store.employees[0] as Employee;

      expect(newEmployee.occupation).toBe('Lab Technician');
    });

    it('sets error when employee does not exist', () => {
      const store = useEmployeeStore();

      store.employees = [...mockEmployees];

      store.updateEmployee({
        code: 'INVALID',
      } as Employee);

      expect(store.error).toBe('Employee not found!');
    });
  });

  describe('deleteEmployee', () => {
    it('deletes employee', () => {
      const store = useEmployeeStore();

      store.employees = [...mockEmployees];

      store.deleteEmployee('EMP001');

      const employee = store.employees[0] as Employee;

      expect(store.employees).toHaveLength(1);
      expect(employee.code).toBe('EMP002');
    });

    it('sets error when deleting invalid employee', () => {
      const store = useEmployeeStore();

      store.employees = [...mockEmployees];

      store.deleteEmployee('INVALID');

      expect(store.error).toBe('Employee not found!');
    });
  });

  describe('importEmployees', () => {
    it('replaces employees', () => {
      const store = useEmployeeStore();

      store.employees = [...mockEmployees];

      const imported = [
        {
          code: 'EMP999',
        } as Employee,
      ];

      store.importEmployees(imported, true);

      expect(store.employees).toEqual(imported);
    });

    it('append employees to beginning of array', () => {
      const store = useEmployeeStore();

      store.employees = [...mockEmployees];

      const imported = [
        {
          code: 'EMP999',
        } as Employee,
      ];

      store.importEmployees(imported, false);

      expect(store.employees).toHaveLength(3);

      const employee = store.employees[0] as Employee;

      expect(employee.code).toBe('EMP999');
    });
  });

  describe('errors', () => {
    it('clears errors', () => {
      const store = useEmployeeStore();

      store.setError('Something failed');

      expect(store.error).toBe('Something failed');

      store.clearErrors();

      expect(store.error).toBeNull();
    });

    it('sets errors', () => {
      const store = useEmployeeStore();

      store.setError('Test');

      expect(store.error).toBe('Test');
    });
  });
});
