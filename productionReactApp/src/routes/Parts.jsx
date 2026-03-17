// FILE: src/routes/Parts.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import TopBar from '../components/TopBar';
import RightPaneForm from '../components/RightPaneForm';
import ConfirmDialog from '../components/ConfirmDialog';
import PartGrid from '../grids/PartGrid';
import PartForm from '../forms/PartForm';
import { partService } from '../api/partService';
import { equipmentService } from '../api/equipmentService';
import { useRightPane } from '../hooks/useRightPane';
import { useGridSelection } from '../hooks/useGridSelection';

export default function Parts({ onMenuClick }) {
  const [parts, setParts] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [serverError, setServerError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, loading: false });

  const { paneOpen, formMode, openAdd, openEdit, closePane } = useRightPane();
  const { selectedId, selectedRow, onRowClick, clearSelection } = useGridSelection();

  const showSnack = useCallback((message, severity = 'success') => {
    setSnack({ open: true, message, severity });
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [partsRes, eqRes] = await Promise.all([
        partService.getAll(),
        equipmentService.getAll(),
      ]);
      setParts(partsRes.data);
      setEquipment(eqRes.data);
    } catch {
      showSnack('Failed to load data. Is the backend running?', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnack]);

  useEffect(() => { fetchData(); }, [fetchData]);

  function handleAdd() { setServerError(null); openAdd(); }
  function handleEdit() { if (!selectedRow) return; setServerError(null); openEdit(); }
  function handleDeleteClick() { if (!selectedId) return; setDeleteDialog({ open: true, loading: false }); }

  async function handleDeleteConfirm() {
    setDeleteDialog((d) => ({ ...d, loading: true }));
    try {
      await partService.remove(selectedId);
      showSnack('Part deleted successfully.');
      clearSelection();
      closePane();
      await fetchData();
    } catch (err) {
      showSnack(err?.message || 'Delete failed.', 'error');
    } finally {
      setDeleteDialog({ open: false, loading: false });
    }
  }

  async function handleFormSubmit(formData) {
    setServerError(null);
    try {
      if (formMode === 'add') {
        await partService.create(formData);
        showSnack('Part created successfully.');
      } else {
        await partService.update(selectedRow.id, formData);
        showSnack('Part updated successfully.');
      }
      closePane();
      clearSelection();
      await fetchData();
    } catch (err) {
      const msg = err?.message || (formMode === 'add' ? 'Create failed.' : 'Update failed.');
      setServerError(msg);
      throw err;
    }
  }

  const deleteMessage = `Delete Part "${selectedRow?.partName}"? This action cannot be undone.`;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar
        title="Parts"
        onMenuClick={onMenuClick}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        editMode={paneOpen && formMode === 'edit'}
        hasSelection={!!selectedId}
      />

      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <Box sx={{ flex: 1, minWidth: 0, p: 1.5, overflow: 'auto' }}>
          <PartGrid
            rows={parts}
            equipment={equipment}
            loading={loading}
            onRowClick={onRowClick}
            selectedId={selectedId}
          />
        </Box>

        <RightPaneForm
          open={paneOpen}
          title={formMode === 'add' ? 'New Part' : 'Edit Part'}
          onClose={closePane}
        >
          <PartForm
            mode={formMode}
            record={formMode === 'edit' ? selectedRow : null}
            existingParts={parts}
            equipment={equipment}
            onSubmit={handleFormSubmit}
            onCancel={closePane}
            serverError={serverError}
          />
        </RightPaneForm>
      </Box>

      <ConfirmDialog
        open={deleteDialog.open}
        title="Confirm Delete"
        message={deleteMessage}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ open: false, loading: false })}
        loading={deleteDialog.loading}
      />

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          variant="filled"
          sx={{ minWidth: 280 }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
