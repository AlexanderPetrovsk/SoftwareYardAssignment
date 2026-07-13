import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Employee } from '@/types/employee';
import employeeService from '@/services/employeeService';

export const useEmployeeStore = defineStore('employees', () => {
  const employees = ref<Employee[]>([]);
  const error = ref<string | null>(null);

  const clearErrors = () => {
    error.value = null;
  };

  const setError = (message: string) => {
    error.value = message;
  };

  const getEmployees = async () => {
    try {
      employees.value = await employeeService.getEmployees();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load employees';
    }
  };

  const getEmployeeByCode = (code: string) => {
    error.value = null;

    const index = employees.value.findIndex((employee) => employee.code === code);

    if (index === -1) {
      error.value = 'Employee not found!';
      return;
    }

    return employees.value[index];
  };

  const createEmployee = (newEmployee: Employee) => {
    error.value = null;
    employees.value.unshift(newEmployee);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    error.value = null;

    const index = employees.value.findIndex((employee) => employee.code === updatedEmployee.code);

    if (index === -1) {
      error.value = 'Employee not found!';
      return;
    }

    employees.value[index] = Object.assign({}, updatedEmployee);
  };

  const deleteEmployee = (code: string) => {
    error.value = null;

    const index = employees.value.findIndex((employee) => employee.code === code);

    if (index === -1) {
      error.value = 'Employee not found!';
      return;
    }

    employees.value.splice(index, 1);
  };

  const importEmployees = (importedEmployees: Employee[], replace: boolean) => {
    if (replace) {
      employees.value = importedEmployees;
      return;
    }

    employees.value.unshift(...importedEmployees);
  };

  return {
    employees,
    error,
    clearErrors,
    setError,
    getEmployees,
    getEmployeeByCode,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    importEmployees,
  };
});
