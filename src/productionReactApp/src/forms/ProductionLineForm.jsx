// FILE: src/forms/ProductionLineForm.jsx
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
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { buildProductionLineSchema } from '../utils/validationSchemas';
import { productionLineToForm } from '../utils/mappers';

/**
 * Props:
 *   mode          - 'add' | 'edit'
 *   record        - existing record (for edit)
 *   existingLines - all lines from API (for uniqueness check)
 *   onSubmit      - async fn(formData) → called on valid submit
 *   onCancel      - fn
 *   serverError   - string | null (409 or other API error)
 */
export default function ProductionLineForm({
  mode = 'add',
  record = null,
  existingLines = [],
  onSubmit,
  onCancel,
  serverError,
}) {
  const editingId = mode === 'edit' ? record?.id : null;
  const schema = buildProductionLineSchema(existingLines, editingId);
  const defaults = productionLineToForm(record);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaults,
  });

  // Reset form when record or mode changes
  useEffect(() => {
    reset(productionLineToForm(mode === 'edit' ? record : null));
  }, [record, mode, reset]);

  async function handleFormSubmit(values) {
    await onSubmit({ lineName: values.lineName.trim(), isActive: values.isActive });
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
        name="lineName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Line Name"
            required
            fullWidth
            size="small"
            error={!!errors.lineName}
            helperText={errors.lineName?.message}
            autoFocus={mode === 'add'}
            inputProps={{ 'aria-label': 'Line Name' }}
          />
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
