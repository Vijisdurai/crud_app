// FILE: src/utils/validationSchemas.js
import * as yup from 'yup';

/**
 * ProductionLine schema.
 * @param {Array} existingLines - [{id, lineName}]
 * @param {number|null} editingId - id of the record being edited (null for add)
 */
export function buildProductionLineSchema(existingLines = [], editingId = null) {
  return yup.object({
    lineName: yup
      .string()
      .trim()
      .required('Line Name is required')
      .test('unique-lineName', 'This Line Name already exists', (value) => {
        if (!value) return true;
        return !existingLines.some(
          (l) =>
            l.lineName.trim().toLowerCase() === value.trim().toLowerCase() &&
            l.id !== editingId
        );
      }),
    isActive: yup.boolean().default(true),
  });
}

/**
 * Equipment schema.
 * @param {Array} existingEquipment - [{id, lineId, equipmentName}]
 * @param {number|null} editingId
 */
export function buildEquipmentSchema(existingEquipment = [], editingId = null) {
  return yup.object({
    equipmentName: yup
      .string()
      .trim()
      .required('Equipment Name is required')
      .test(
        'unique-equipmentName',
        'This Equipment Name already exists in the selected line',
        function (value) {
          const { lineId } = this.parent;
          if (!value || !lineId) return true;
          return !existingEquipment.some(
            (e) =>
              e.equipmentName.trim().toLowerCase() ===
                value.trim().toLowerCase() &&
              Number(e.lineId) === Number(lineId) &&
              e.id !== editingId
          );
        }
      ),
    lineId: yup
      .number()
      .typeError('Line is required')
      .required('Line is required')
      .positive('Line is required'),
    isActive: yup.boolean().default(true),
  });
}

/**
 * Part schema.
 * @param {Array} existingParts - [{id, equipmentId, partName}]
 * @param {number|null} editingId
 */
export function buildPartSchema(existingParts = [], editingId = null) {
  return yup.object({
    partName: yup
      .string()
      .trim()
      .required('Part Name is required')
      .test(
        'unique-partName',
        'This Part Name already exists in the selected equipment',
        function (value) {
          const { equipmentId } = this.parent;
          if (!value || !equipmentId) return true;
          return !existingParts.some(
            (p) =>
              p.partName.trim().toLowerCase() ===
                value.trim().toLowerCase() &&
              Number(p.equipmentId) === Number(equipmentId) &&
              p.id !== editingId
          );
        }
      ),
    equipmentId: yup
      .number()
      .typeError('Equipment is required')
      .required('Equipment is required')
      .positive('Equipment is required'),
    isActive: yup.boolean().default(true),
  });
}
