// FILE: src/forms/PartForm.jsx
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
import { buildPartSchema } from '../utils/validationSchemas';
import { partToForm } from '../utils/mappers';

/**
 * Props:
 *   mode          - 'add' | 'edit'
 *   record        - existing part record (for edit)
 *   existingParts - all parts from API (for uniqueness)
 *   equipment     - [{id, equipmentName}]
 *   onSubmit      - async fn(data)
 *   onCancel      - fn
 *   serverError   - string | null
 */
export default function PartForm({
  mode = 'add',
  record = null,
  existingParts = [],
  equipment = [],
  onSubmit,
  onCancel,
  serverError,
}) {
  const editingId = mode === 'edit' ? record?.id : null;
  const schema = buildPartSchema(existingParts, editingId);
  const defaults = partToForm(record);

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
    reset(partToForm(mode === 'edit' ? record : null));
  }, [record, mode, reset]);

  async function handleFormSubmit(values) {
    await onSubmit({
      partName: values.partName.trim(),
      equipmentId: Number(values.equipmentId),
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
        name="partName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Part Name"
            required
            fullWidth
            size="small"
            error={!!errors.partName}
            helperText={errors.partName?.message}
            autoFocus={mode === 'add'}
          />
        )}
      />

      <Controller
        name="equipmentId"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Equipment"
            required
            fullWidth
            size="small"
            error={!!errors.equipmentId}
            helperText={errors.equipmentId?.message}
            value={field.value ?? ''}
          >
            <MenuItem value="">
              <em>Select Equipment…</em>
            </MenuItem>
            {equipment.map((e) => (
              <MenuItem key={e.id} value={e.id}>
                {e.equipmentName}
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
