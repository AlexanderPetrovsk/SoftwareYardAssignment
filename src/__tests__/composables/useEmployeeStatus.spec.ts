import { describe, expect, it } from 'vitest';
import { useEmployeeStatus } from '@/composables/useEmployeeStatus';
import { EmployeeEmploymentStatus, EmployeeTerminationStatus } from '@/types/employee';

describe('useEmployeeStatus', () => {
  const { getEmploymentStatus, getTerminationStatus, showEmploymentStatus } = useEmployeeStatus();

  const futureDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 10);
    return date.toISOString();
  };

  const pastDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 10);
    return date.toISOString();
  };

  describe('getEmploymentStatus', () => {
    it('returns TO_BE_EMPLOYED for a future employment date', () => {
      const result = getEmploymentStatus(futureDate());

      expect(result).toEqual({
        status: EmployeeEmploymentStatus.TO_BE_EMPLOYED,
        text: 'Employed soon',
        color: 'orange',
      });
    });

    it('returns EMPLOYED for a past employment date', () => {
      const result = getEmploymentStatus(pastDate());

      expect(result).toEqual({
        status: EmployeeEmploymentStatus.EMPLOYED,
        text: 'Currently employed',
        color: 'green',
      });
    });
  });

  describe('getTerminationStatus', () => {
    it('returns TO_BE_TERMINATED for a future termination date', () => {
      const result = getTerminationStatus(futureDate());

      expect(result).toEqual({
        status: EmployeeTerminationStatus.TO_BE_TERMINATED,
        text: 'To be terminated',
        color: 'orange',
      });
    });

    it('returns TERMINATED for a past termination date', () => {
      const result = getTerminationStatus(pastDate());

      expect(result).toEqual({
        status: EmployeeTerminationStatus.TERMINATED,
        text: 'Terminated',
        color: 'red',
      });
    });
  });

  describe('showEmploymentStatus', () => {
    it('returns true when termination date is null', () => {
      expect(showEmploymentStatus(null)).toBe(true);
    });

    it('returns true when termination date is undefined', () => {
      expect(showEmploymentStatus(undefined)).toBe(true);
    });

    it('returns true when termination date is in the future', () => {
      expect(showEmploymentStatus(futureDate())).toBe(true);
    });

    it('returns false when termination date is in the past', () => {
      expect(showEmploymentStatus(pastDate())).toBe(false);
    });
  });
});
