// FILE: src/hooks/useRightPane.js
import { useState, useCallback } from 'react';

/**
 * Manages right-pane open/close state and current form mode.
 * mode: 'add' | 'edit' | null
 */
export function useRightPane() {
  const [paneOpen, setPaneOpen] = useState(false);
  const [formMode, setFormMode] = useState(null); // 'add' | 'edit'

  const openAdd = useCallback(() => {
    setFormMode('add');
    setPaneOpen(true);
  }, []);

  const openEdit = useCallback(() => {
    setFormMode('edit');
    setPaneOpen(true);
  }, []);

  const closePane = useCallback(() => {
    setPaneOpen(false);
    setFormMode(null);
  }, []);

  return { paneOpen, formMode, openAdd, openEdit, closePane };
}
