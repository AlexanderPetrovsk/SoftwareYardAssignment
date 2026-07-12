import type { Employee } from '@/types/employee'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmployeeStore = defineStore('employees', () => {
  const employees = ref<Employee[]>([])

  const getEmployees = () => {
    console.log('loading employees')
  }

  const getEmployeeByCode = (code: string) => {
    console.log('loading single employee')
  }

  return {
    employees,
    getEmployees,
    getEmployeeByCode,
  }
})
