// FILE: src/routes/Equipment.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import TopBar from '../components/TopBar';
import RightPaneForm from '../components/RightPaneForm';
import ConfirmDialog from '../components/ConfirmDialog';
import EquipmentGrid from '../grids/EquipmentGrid';
import EquipmentForm from '../forms/EquipmentForm';
import { equipmentService } from '../api/equipmentService';
import { productionLineService } from '../api/productionLineService';
import { partService } from '../api/partService';
import { useRightPane } from '../hooks/useRightPane';
import { useGridSelection } from '../hooks/useGridSelection';

export default function Equipment({ onMenuClick }) {
  const [equipment, setEquipment] = useState([]);
  const [lines, setLines] = useState([]);
  const [parts, setParts] = useState([]);
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
      const [eqRes, linesRes, partsRes] = await Promise.all([
        equipmentService.getAll(),
        productionLineService.getAll(),
        partService.getAll(),
      ]);
      setEquipment(eqRes.data);
      setLines(linesRes.data);
      setParts(partsRes.data);
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
      await equipmentService.remove(selectedId);
      showSnack('Equipment deleted successfully.');
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
        await equipmentService.create(formData);
        showSnack('Equipment created successfully.');
      } else {
        await equipmentService.update(selectedRow.id, formData);
        showSnack('Equipment updated successfully.');
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

  const childParts = selectedRow
    ? parts.filter((p) => (p.equipmentId || p.equipmentID) === (selectedRow.id || selectedRow.ID || selectedRow.iD))
    : [];
  const hasChildren = childParts.length > 0;

  const deleteMessage = hasChildren ? (
    <Box>
      <Box sx={{ mb: 2 }}>
        Are you sure you want to delete Equipment <strong>"{selectedRow?.equipmentName}"</strong>?
      </Box>
      <Box sx={{ mb: 1, color: 'error.main', fontWeight: 'bold' }}>
        Warning: The following {childParts.length} parts will also be permanently deleted. This action cannot be undone!
      </Box>
      <Box sx={{ maxHeight: 150, overflow: 'auto', bgcolor: 'rgba(211,47,47,0.08)', p: 1, borderRadius: 1, color: 'error.main' }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {childParts.map((pt) => (
            <li key={pt.id}>{pt.partName}</li>
          ))}
        </ul>
      </Box>
    </Box>
  ) : (
    `Delete Equipment "${selectedRow?.equipmentName}"? This action cannot be undone.`
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar
        title="Equipments"
        onMenuClick={onMenuClick}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        editMode={paneOpen && formMode === 'edit'}
        hasSelection={!!selectedId}
      />

      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <Box sx={{ flex: 1, minWidth: 0, p: 1.5, overflow: 'auto' }}>
          <EquipmentGrid
            rows={equipment}
            lines={lines}
            loading={loading}
            onRowClick={onRowClick}
            selectedId={selectedId}
          />
        </Box>

        <RightPaneForm
          open={paneOpen}
          title={formMode === 'add' ? 'New Equipment' : 'Edit Equipment'}
          onClose={closePane}
        >
          <EquipmentForm
            mode={formMode}
            record={formMode === 'edit' ? selectedRow : null}
            existingEquipment={equipment}
            productionLines={lines}
            onSubmit={handleFormSubmit}
            onCancel={closePane}
            serverError={serverError}
          />
        </RightPaneForm>
      </Box>

      <ConfirmDialog
        open={deleteDialog.open}
        title={hasChildren ? 'Warning: Cascade Delete' : 'Confirm Delete'}
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
