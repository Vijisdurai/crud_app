// FILE: src/test/validationSchemas.test.js
import { describe, it, expect } from 'vitest';
import {
  buildProductionLineSchema,
  buildEquipmentSchema,
  buildPartSchema,
} from '../utils/validationSchemas';

// ── ProductionLine ──────────────────────────────────────────────────────────
describe('buildProductionLineSchema', () => {
  const existingLines = [
    { id: 1, lineName: 'Line Alpha' },
    { id: 2, lineName: 'Line Beta' },
  ];

  it('passes when lineName is unique', async () => {
    const schema = buildProductionLineSchema(existingLines, null);
    await expect(schema.validate({ lineName: 'Line Gamma', isActive: true })).resolves.toBeTruthy();
  });

  it('fails when lineName is empty', async () => {
    const schema = buildProductionLineSchema(existingLines, null);
    await expect(schema.validate({ lineName: '', isActive: true })).rejects.toThrow('Line Name is required');
  });

  it('fails when lineName is a duplicate', async () => {
    const schema = buildProductionLineSchema(existingLines, null);
    await expect(schema.validate({ lineName: 'Line Alpha', isActive: true })).rejects.toThrow('already exists');
  });

  it('allows same name when editing own record', async () => {
    const schema = buildProductionLineSchema(existingLines, 1); // editing id=1
    await expect(schema.validate({ lineName: 'Line Alpha', isActive: true })).resolves.toBeTruthy();
  });

  it('fails duplicate even with different casing', async () => {
    const schema = buildProductionLineSchema(existingLines, null);
    await expect(schema.validate({ lineName: 'line alpha', isActive: true })).rejects.toThrow('already exists');
  });
});

// ── Equipment ───────────────────────────────────────────────────────────────
describe('buildEquipmentSchema', () => {
  const existingEquipment = [
    { id: 1, lineId: 10, equipmentName: 'Press A' },
    { id: 2, lineId: 10, equipmentName: 'Press B' },
    { id: 3, lineId: 20, equipmentName: 'Press A' }, // same name, different line
  ];

  it('passes when equipmentName is unique within lineId', async () => {
    const schema = buildEquipmentSchema(existingEquipment, null);
    await expect(schema.validate({ equipmentName: 'Press C', lineId: 10, isActive: true })).resolves.toBeTruthy();
  });

  it('fails when equipmentName is duplicate within same line', async () => {
    const schema = buildEquipmentSchema(existingEquipment, null);
    await expect(
      schema.validate({ equipmentName: 'Press A', lineId: 10, isActive: true })
    ).rejects.toThrow('already exists in the selected line');
  });

  it('passes same name in a different line (not a duplicate)', async () => {
    const schema = buildEquipmentSchema(existingEquipment, null);
    await expect(
      schema.validate({ equipmentName: 'Press A', lineId: 30, isActive: true })
    ).resolves.toBeTruthy();
  });

  it('fails when lineId is missing', async () => {
    const schema = buildEquipmentSchema(existingEquipment, null);
    await expect(
      schema.validate({ equipmentName: 'Press D', lineId: null, isActive: true })
    ).rejects.toThrow('required');
  });

  it('fails when equipmentName is empty', async () => {
    const schema = buildEquipmentSchema(existingEquipment, null);
    await expect(
      schema.validate({ equipmentName: '', lineId: 10, isActive: true })
    ).rejects.toThrow('Equipment Name is required');
  });
});

// ── Part ────────────────────────────────────────────────────────────────────
describe('buildPartSchema', () => {
  const existingParts = [
    { id: 1, equipmentId: 100, partName: 'Bolt M6' },
    { id: 2, equipmentId: 100, partName: 'Nut M6' },
    { id: 3, equipmentId: 200, partName: 'Bolt M6' },
  ];

  it('passes when partName is unique within equipmentId', async () => {
    const schema = buildPartSchema(existingParts, null);
    await expect(
      schema.validate({ partName: 'Washer M6', equipmentId: 100, isActive: true })
    ).resolves.toBeTruthy();
  });

  it('fails on duplicate partName within same equipment', async () => {
    const schema = buildPartSchema(existingParts, null);
    await expect(
      schema.validate({ partName: 'Bolt M6', equipmentId: 100, isActive: true })
    ).rejects.toThrow('already exists in the selected equipment');
  });

  it('passes same name in different equipment', async () => {
    const schema = buildPartSchema(existingParts, null);
    await expect(
      schema.validate({ partName: 'Bolt M6', equipmentId: 300, isActive: true })
    ).resolves.toBeTruthy();
  });

  it('fails when partName is empty', async () => {
    const schema = buildPartSchema(existingParts, null);
    await expect(
      schema.validate({ partName: '', equipmentId: 100, isActive: true })
    ).rejects.toThrow('Part Name is required');
  });

  it('fails when equipmentId is missing', async () => {
    const schema = buildPartSchema(existingParts, null);
    await expect(
      schema.validate({ partName: 'Washer', equipmentId: null, isActive: true })
    ).rejects.toThrow('required');
  });
});
