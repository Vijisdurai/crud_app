// FILE: src/grids/EquipmentGrid.jsx
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

export default function EquipmentGrid({ rows = [], lines = [], loading, onRowClick, selectedId }) {
  // Build lineId → lineName lookup
  const lineMap = useMemo(() => {
    const m = {};
    lines.forEach((l) => { m[l.id || l.ID || l.iD] = l.lineName; });
    return m;
  }, [lines]);

  const enrichedRows = useMemo(() =>
    rows.map((r) => ({ ...r, id: r.id || r.ID || r.iD, lineName: lineMap[r.lineId || r.lineID] ?? `Line ${r.lineId || r.lineID}` })),
    [rows, lineMap]
  );

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'equipmentName', headerName: 'Equipment Name', flex: 1, minWidth: 160 },
    { field: 'lineName', headerName: 'Line Name', width: 160 },
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
