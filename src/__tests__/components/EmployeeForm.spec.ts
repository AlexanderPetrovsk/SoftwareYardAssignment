import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import EmployeeForm from '@/components/forms/EmployeeForm.vue';

const back = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    back,
  }),
}));

const handleSubmit = vi.fn(
  (callback) => () =>
    callback({
      code: 'EMP001',
      fullName: 'John Doe',
      occupation: 'Sales Executive',
      department: 'Sales',
      dateOfEmployment: '2023-01-01',
      terminationDate: null,
    }),
);

const resetForm = vi.fn();

vi.mock('vee-validate', () => ({
  useForm: () => ({
    handleSubmit,
    resetForm,
  }),

  useField: (name: string) => ({
    value: {
      value: '',
    },

    errorMessage: {
      value: '',
    },
  }),
}));

vi.mock('@/composables/useValidation', () => ({
  useValidation: () => ({
    employeeSchema: () => ({}),
  }),
}));

const employee = {
  code: 'EMP001',
  fullName: 'John Doe',
  occupation: 'Developer',
  department: 'IT',
  dateOfEmployment: '2023-01-01',
  terminationDate: null,
};

const vuetify = createVuetify({
  components,
  directives,
});

const mountForm = () =>
  mount(EmployeeForm, {
    props: {
      employee,
    },
    global: {
      plugins: [vuetify],
    },
  });

describe('EmployeeForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes the form with employee values', () => {
    mountForm();

    expect(resetForm).toHaveBeenCalledWith({
      values: employee,
    });
  });

  it('emits save event on successful submit', async () => {
    const wrapper = mountForm();

    const save = wrapper.find('[data-test="save"]');

    await save.trigger('click');

    expect(wrapper.emitted('save')).toHaveLength(1);

    expect(wrapper.emitted('save')?.[0]).toEqual([
      {
        code: 'EMP001',
        fullName: 'John Doe',
        occupation: 'Sales Executive',
        department: 'Sales',
        dateOfEmployment: '2023-01-01',
        terminationDate: null,
      },
    ]);
  });

  it('calls router.back when cancel is clicked', async () => {
    const wrapper = mountForm();

    await wrapper.find('[data-test="cancel"]').trigger('click');

    expect(back).toHaveBeenCalledOnce();
  });

  it('resets the form when employee prop changes', async () => {
    const wrapper = mountForm();

    const updated = {
      ...employee,
      fullName: 'Jane Doe',
    };

    await wrapper.setProps({
      employee: updated,
    });

    expect(resetForm).toHaveBeenLastCalledWith({
      values: updated,
    });
  });
});
