// FILE: src/test/formatDate.test.js
import { describe, it, expect } from 'vitest';
import { formatDate } from '../utils/formatDate';

describe('formatDate', () => {
  it('returns empty string for null', () => {
    expect(formatDate(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('returns empty string for invalid date string', () => {
    expect(formatDate('not-a-date')).toBe('');
  });

  it('formats a UTC ISO string to YYYY-MM-DD HH:mm in local time', () => {
    // Use a fixed UTC timestamp
    const utcString = '2024-06-15T10:30:00.000Z';
    const result = formatDate(utcString);
    // Should match YYYY-MM-DD HH:mm
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
  });

  it('pads single-digit months and days with zeros', () => {
    const utcString = '2024-01-05T09:05:00.000Z';
    const result = formatDate(utcString);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
  });

  it('returns empty string for empty string input', () => {
    expect(formatDate('')).toBe('');
  });
});
