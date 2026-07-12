import employeeData from '@/data/employees.json';
import type { Employee } from '@/types/employee';

class EmployeeService {
  private employees: Employee[] = structuredClone(employeeData);

  async getEmployees(): Promise<Employee[]> {
    return Promise.resolve([...this.employees]);
  }
}

export default new EmployeeService();
