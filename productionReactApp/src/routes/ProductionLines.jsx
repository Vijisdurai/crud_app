// FILE: src/routes/ProductionLines.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import TopBar from '../components/TopBar';
import RightPaneForm from '../components/RightPaneForm';
import ConfirmDialog from '../components/ConfirmDialog';
import ProductionLineGrid from '../grids/ProductionLineGrid';
import ProductionLineForm from '../forms/ProductionLineForm';
import { productionLineService } from '../api/productionLineService';
import { equipmentService } from '../api/equipmentService';
import { useRightPane } from '../hooks/useRightPane';
import { useGridSelection } from '../hooks/useGridSelection';

export default function ProductionLines({ onMenuClick }) {
  const [lines, setLines] = useState([]);
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
      const [linesRes, equipRes] = await Promise.all([
        productionLineService.getAll(),
        equipmentService.getAll(),
      ]);
      setLines(linesRes.data);
      setEquipment(equipRes.data);
    } catch {
      showSnack('Failed to load data. Is the backend running?', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnack]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Add ─────────────────────────────────────────────────────────────────────
  function handleAdd() {
    setServerError(null);
    openAdd();
  }

  // ── Edit ────────────────────────────────────────────────────────────────────
  function handleEdit() {
    if (!selectedRow) return;
    setServerError(null);
    openEdit();
  }

  // ── Delete ──────────────────────────────────────────────────────────────────
  function handleDeleteClick() {
    if (!selectedId) return;
    setDeleteDialog({ open: true, loading: false });
  }

  async function handleDeleteConfirm() {
    setDeleteDialog((d) => ({ ...d, loading: true }));
    try {
      await productionLineService.remove(selectedId);
      showSnack('Production Line deleted successfully.');
      clearSelection();
      closePane();
      await fetchData();
    } catch (err) {
      showSnack(err?.message || 'Delete failed.', 'error');
    } finally {
      setDeleteDialog({ open: false, loading: false });
    }
  }

  // ── Submit (Add / Edit) ──────────────────────────────────────────────────────
  async function handleFormSubmit(formData) {
    setServerError(null);
    try {
      if (formMode === 'add') {
        await productionLineService.create(formData);
        showSnack('Production Line created successfully.');
      } else {
        await productionLineService.update(selectedRow.id, formData);
        showSnack('Production Line updated successfully.');
      }
      closePane();
      clearSelection();
      await fetchData();
    } catch (err) {
      const msg = err?.message || (formMode === 'add' ? 'Create failed.' : 'Update failed.');
      setServerError(msg);
      throw err; // keep form isSubmitting false
    }
  }

  const childEquipment = selectedRow
    ? equipment.filter((e) => (e.lineId || e.lineID) === (selectedRow.id || selectedRow.ID || selectedRow.iD))
    : [];
  const hasChildren = childEquipment.length > 0;

  const deleteMessage = hasChildren ? (
    <Box>
      <Box sx={{ mb: 2 }}>
        Are you sure you want to delete Production Line <strong>"{selectedRow?.lineName}"</strong>?
      </Box>
      <Box sx={{ mb: 1, color: 'error.main', fontWeight: 'bold' }}>
        Warning: The following {childEquipment.length} equipment will also be permanently deleted. This action cannot be undone!
      </Box>
      <Box sx={{ maxHeight: 150, overflow: 'auto', bgcolor: 'rgba(211,47,47,0.08)', p: 1, borderRadius: 1, color: 'error.main' }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {childEquipment.map((eq) => (
            <li key={eq.id}>{eq.equipmentName}</li>
          ))}
        </ul>
      </Box>
    </Box>
  ) : (
    `Delete Production Line "${selectedRow?.lineName}"? This action cannot be undone.`
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar
        title="Production Lines"
        onMenuClick={onMenuClick}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        editMode={paneOpen && formMode === 'edit'}
        hasSelection={!!selectedId}
      />

      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {/* Grid area */}
        <Box sx={{ flex: 1, minWidth: 0, p: 1.5, overflow: 'auto' }}>
          <ProductionLineGrid
            rows={lines}
            loading={loading}
            onRowClick={(params) => {
              onRowClick(params);
              if (formMode === 'edit') {
                // keep pane open and update record
              }
            }}
            selectedId={selectedId}
          />
        </Box>

        {/* Right pane */}
        <RightPaneForm
          open={paneOpen}
          title={formMode === 'add' ? 'New Production Line' : 'Edit Production Line'}
          onClose={closePane}
        >
          <ProductionLineForm
            mode={formMode}
            record={formMode === 'edit' ? selectedRow : null}
            existingLines={lines}
            onSubmit={handleFormSubmit}
            onCancel={closePane}
            serverError={serverError}
          />
        </RightPaneForm>
      </Box>

      {/* Delete confirm */}
      <ConfirmDialog
        open={deleteDialog.open}
        title={hasChildren ? 'Warning: Cascade Delete' : 'Confirm Delete'}
        message={deleteMessage}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ open: false, loading: false })}
        loading={deleteDialog.loading}
      />

      {/* Snackbar */}
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
