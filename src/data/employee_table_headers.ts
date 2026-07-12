import type { DataTableHeader } from 'vuetify';

export const employeeTableHeaders: DataTableHeader[] = [
  {
    title: 'Full Name',
    key: 'fullName',
    sortable: true,
    nowrap: true,
  },
  {
    title: 'Occupation',
    key: 'occupation',
    sortable: true,
  },
  {
    title: 'Department',
    key: 'department',
    sortable: true,
    nowrap: true,
  },
  {
    title: 'Employment',
    key: 'dateOfEmployment',
    sortable: true,
    nowrap: true,
  },
  {
    title: 'Termination',
    key: 'terminationDate',
    sortable: true,
    nowrap: true,
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
    width: '160px',
    fixed: 'end',
  },
];
