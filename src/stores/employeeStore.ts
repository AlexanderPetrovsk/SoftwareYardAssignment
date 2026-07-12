import employeeService from '@/services/employeeService';
import type { Employee } from '@/types/employee';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEmployeeStore = defineStore('employees', () => {
  const employees = ref<Employee[]>([]);
  const error = ref<string | null>(null);

  const clearErrors = () => {
    error.value = null;
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

  return {
    employees,
    error,
    clearErrors,
    getEmployees,
    getEmployeeByCode,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
});
