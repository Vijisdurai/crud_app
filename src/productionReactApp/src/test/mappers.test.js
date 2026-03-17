// FILE: src/test/mappers.test.js
import { describe, it, expect } from 'vitest';
import { productionLineToForm, equipmentToForm, partToForm } from '../utils/mappers';

describe('productionLineToForm', () => {
  it('returns defaults for null input', () => {
    expect(productionLineToForm(null)).toEqual({ lineName: '', isActive: true });
  });

  it('maps a record correctly', () => {
    const record = { id: 1, lineName: 'Line A', isActive: false };
    expect(productionLineToForm(record)).toEqual({ lineName: 'Line A', isActive: false });
  });
});

describe('equipmentToForm', () => {
  it('returns defaults for null input', () => {
    expect(equipmentToForm(null)).toEqual({ equipmentName: '', lineId: '', isActive: true });
  });

  it('maps a record correctly', () => {
    const record = { id: 2, equipmentName: 'Press A', lineId: 10, isActive: true };
    expect(equipmentToForm(record)).toEqual({ equipmentName: 'Press A', lineId: 10, isActive: true });
  });
});

describe('partToForm', () => {
  it('returns defaults for null input', () => {
    expect(partToForm(null)).toEqual({ partName: '', equipmentId: '', isActive: true });
  });

  it('maps a record correctly', () => {
    const record = { id: 3, partName: 'Bolt M6', equipmentId: 100, isActive: false };
    expect(partToForm(record)).toEqual({ partName: 'Bolt M6', equipmentId: 100, isActive: false });
  });
});
