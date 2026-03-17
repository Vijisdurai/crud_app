// FILE: src/hooks/useGridSelection.js
import { useState, useCallback } from 'react';

/**
 * Manages the selected row ID in the DataGrid.
 */
export function useGridSelection() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const onRowClick = useCallback((params) => {
    setSelectedId(params.id);
    setSelectedRow(params.row);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedId(null);
    setSelectedRow(null);
  }, []);

  return { selectedId, selectedRow, onRowClick, clearSelection };
}
