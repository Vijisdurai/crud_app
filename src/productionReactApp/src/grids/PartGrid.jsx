// FILE: src/grids/PartGrid.jsx
import React, { useMemo } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { formatDate } from '../utils/formatDate';

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ px: 1, py: 0.5, borderBottom: '1px solid #e0e0e0', gap: 0.5 }}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarQuickFilter size="small" sx={{ '& .MuiInputBase-root': { fontSize: 13 } }} />
    </GridToolbarContainer>
  );
}

export default function PartGrid({ rows = [], equipment = [], loading, onRowClick, selectedId }) {
  const equipMap = useMemo(() => {
    const m = {};
    equipment.forEach((e) => { m[e.id || e.ID || e.iD] = e.equipmentName; });
    return m;
  }, [equipment]);

  const enrichedRows = useMemo(() =>
    rows.map((r) => ({ ...r, id: r.id || r.ID || r.iD, equipmentName: equipMap[r.equipmentId || r.equipmentID] ?? `Equip ${r.equipmentId || r.equipmentID}` })),
    [rows, equipMap]
  );

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'partName', headerName: 'Part Name', flex: 1, minWidth: 160 },
    { field: 'equipmentName', headerName: 'Equipment Name', width: 180 },
    { field: 'isActive', headerName: 'Active', width: 90, type: 'boolean' },
    { field: 'createdTime', headerName: 'Created', width: 160, valueFormatter: (value) => formatDate(value) },
  ], []);

  const rowSelectionModel = useMemo(
    () => (selectedId != null ? [selectedId] : []),
    [selectedId]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        {loading && <LinearProgress />}
        <DataGrid
          rows={enrichedRows}
          columns={columns}
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={() => { }}
          onRowClick={onRowClick}
          sx={{ height: '100%' }}
        />
      </Box>
    </Box>
  );
}
