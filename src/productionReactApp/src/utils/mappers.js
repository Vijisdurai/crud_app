// FILE: src/utils/mappers.js

/**
 * Map a ProductionLine API record to form default values.
 * @param {object|null} record
 */
export function productionLineToForm(record) {
  if (!record) return { lineName: '', isActive: true };
  return {
    lineName: record.lineName ?? '',
    isActive: record.isActive ?? true,
  };
}

/**
 * Map an Equipment API record to form default values.
 * @param {object|null} record
 */
export function equipmentToForm(record) {
  if (!record) return { equipmentName: '', lineId: '', isActive: true };
  return {
    equipmentName: record.equipmentName ?? '',
    lineId: record.lineId ?? '',
    isActive: record.isActive ?? true,
  };
}

/**
 * Map a Part API record to form default values.
 * @param {object|null} record
 */
export function partToForm(record) {
  if (!record) return { partName: '', equipmentId: '', isActive: true };
  return {
    partName: record.partName ?? '',
    equipmentId: record.equipmentId ?? '',
    isActive: record.isActive ?? true,
  };
}
