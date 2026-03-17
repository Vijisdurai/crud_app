// FILE: src/forms/EquipmentForm.jsx
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { buildEquipmentSchema } from '../utils/validationSchemas';
import { equipmentToForm } from '../utils/mappers';

/**
 * Props:
 *   mode             - 'add' | 'edit'
 *   record           - existing equipment record (for edit)
 *   existingEquipment - all equipment from API (for uniqueness)
 *   productionLines  - [{id, lineName}]
 *   onSubmit         - async fn(data)
 *   onCancel         - fn
 *   serverError      - string | null
 */
export default function EquipmentForm({
  mode = 'add',
  record = null,
  existingEquipment = [],
  productionLines = [],
  onSubmit,
  onCancel,
  serverError,
}) {
  const editingId = mode === 'edit' ? record?.id : null;
  const schema = buildEquipmentSchema(existingEquipment, editingId);
  const defaults = equipmentToForm(record);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaults,
  });

  useEffect(() => {
    reset(equipmentToForm(mode === 'edit' ? record : null));
  }, [record, mode, reset]);

  async function handleFormSubmit(values) {
    await onSubmit({
      equipmentName: values.equipmentName.trim(),
      lineId: Number(values.lineId),
      isActive: values.isActive,
    });
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      spacing={2.5}
      noValidate
    >
      {serverError && (
        <Alert severity="error" sx={{ fontSize: 13 }}>
          {serverError}
        </Alert>
      )}

      <Controller
        name="equipmentName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Equipment Name"
            required
            fullWidth
            size="small"
            error={!!errors.equipmentName}
            helperText={errors.equipmentName?.message}
            autoFocus={mode === 'add'}
          />
        )}
      />

      <Controller
        name="lineId"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Production Line"
            required
            fullWidth
            size="small"
            error={!!errors.lineId}
            helperText={errors.lineId?.message}
            value={field.value ?? ''}
          >
            <MenuItem value="">
              <em>Select a Line…</em>
            </MenuItem>
            {productionLines.map((l) => (
              <MenuItem key={l.id} value={l.id}>
                {l.lineName}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="isActive"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                color="primary"
              />
            }
            label="Is Active"
          />
        )}
      />

      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <Button variant="outlined" onClick={onCancel} disabled={isSubmitting} size="small">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="small"
          startIcon={isSubmitting ? <CircularProgress size={14} color="inherit" /> : <SaveIcon />}
          disabled={isSubmitting}
        >
          {mode === 'add' ? 'Create' : 'Save'}
        </Button>
      </Stack>
    </Stack>
  );
}
