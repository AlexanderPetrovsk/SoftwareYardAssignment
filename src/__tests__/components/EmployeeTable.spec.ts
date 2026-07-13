import { createVuetify } from 'vuetify';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import EmployeeTable from '@/components/employee/EmployeeTable.vue';
import EmployeeStatus from '@/components/employee/EmployeeStatus.vue';
import EmployeeActions from '@/components/employee/EmployeeActions.vue';

const employees = [
  {
    code: 'EMP001',
    fullName: 'John Doe',
    occupation: 'Sales Executive',
    department: 'Sales',
    dateOfEmployment: '2022-01-01',
    terminationDate: null,
  },
  {
    code: 'EMP002',
    fullName: 'Jane Smith',
    occupation: 'IT Support',
    department: 'Logistics',
    dateOfEmployment: '2023-01-01',
    terminationDate: null,
  },
];

const vuetify = createVuetify({
  components,
  directives,
});

const mountTable = (props = {}) =>
  mount(EmployeeTable, {
    props: {
      employees,
      search: '',
      department: null,
      occupation: null,
      ...props,
    },

    global: {
      plugins: [vuetify],
      stubs: {
        VCard: {
          template: '<div><slot /></div>',
        },

        VDataTable: {
          props: ['items', 'headers'],
          template: `
            <div>
              <slot
                v-for="item in items"
                :name="'item.dateOfEmployment'"
                :item="item"
              />

              <slot
                v-for="item in items"
                :name="'item.terminationDate'"
                :item="item"
              />

              <slot
                v-for="item in items"
                :name="'item.actions'"
                :item="item"
              />
            </div>
          `,
        },
      },
    },
  });

describe('EmployeeTable', () => {
  describe('Filtering', () => {
    it('shows all employees when no filters are applied', () => {
      const wrapper = mountTable();

      const actions = wrapper.findAllComponents(EmployeeActions);

      expect(actions).toHaveLength(2);
    });

    it('filters by department', () => {
      const wrapper = mountTable({
        department: 'Sales',
      });

      const actions = wrapper.findAllComponents(EmployeeActions);

      expect(actions).toHaveLength(1);
    });

    it('filters by occupation', () => {
      const wrapper = mountTable({
        occupation: 'Sales Executive',
      });

      const actions = wrapper.findAllComponents(EmployeeActions);

      expect(actions).toHaveLength(1);
    });

    it('returns employees when filters match', () => {
      const wrapper = mountTable({
        search: 'john',
      });

      const actions = wrapper.findAllComponents(EmployeeActions);

      expect(actions).toHaveLength(1);
    });

    it('returns no employees when filters do not match', () => {
      const wrapper = mountTable({
        search: 'Michael',
      });

      const actions = wrapper.findAllComponents(EmployeeActions);

      expect(actions).toHaveLength(0);
    });
  });

  describe('EmployeeStatus', () => {
    it('renders employment status component for every employee', () => {
      const wrapper = mountTable();

      const statuses = wrapper.findAllComponents(EmployeeStatus);

      expect(statuses).toHaveLength(4);
    });
  });

  describe('Events', () => {
    it('emits view event', async () => {
      const wrapper = mountTable();

      const actions = wrapper.findComponent(EmployeeActions);

      await actions.vm.$emit('view');

      expect(wrapper.emitted('view')).toHaveLength(1);
      expect(wrapper.emitted('view')?.[0]).toEqual([employees[0]]);
    });

    it('emits edit event', async () => {
      const wrapper = mountTable();

      const actions = wrapper.findComponent(EmployeeActions);

      await actions.vm.$emit('edit');

      expect(wrapper.emitted('edit')).toHaveLength(1);
      expect(wrapper.emitted('edit')?.[0]).toEqual([employees[0]]);
    });

    it('emits delete event', async () => {
      const wrapper = mountTable();

      const actions = wrapper.findComponent(EmployeeActions);

      await actions.vm.$emit('delete');

      expect(wrapper.emitted('delete')).toHaveLength(1);
      expect(wrapper.emitted('delete')?.[0]).toEqual([employees[0]]);
    });
  });
});
