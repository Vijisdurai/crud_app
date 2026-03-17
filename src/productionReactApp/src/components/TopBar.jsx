// FILE: src/components/TopBar.jsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Top app bar.
 * Props:
 *   title         - string
 *   onMenuClick   - fn
 *   onAdd         - fn
 *   onEdit        - fn
 *   onDelete      - fn
 *   editMode      - bool (is edit mode active)
 *   hasSelection  - bool (is a row selected)
 */
export default function TopBar({
  title = '',
  onMenuClick,
  onAdd,
  onEdit,
  onDelete,
  editMode = false,
  hasSelection = false,
}) {
  return (
    <AppBar position="static" sx={{ zIndex: 1 }}>
      <Toolbar variant="dense" sx={{ minHeight: 56, gap: 1 }}>
        {/* Menu toggle */}
        <Tooltip title="Toggle sidebar">
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            aria-label="toggle sidebar"
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>

        {/* Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontSize: 16, letterSpacing: 0.5 }}
        >
          {title}
        </Typography>

        {/* Action buttons */}
        <Stack direction="row" spacing={1}>
          <Tooltip title="Add new record">
            <Button
              variant="contained"
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={onAdd}
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.4)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
              }}
            >
              Add
            </Button>
          </Tooltip>

          <Tooltip title={editMode ? 'Exit Edit Mode' : 'Edit selected row'}>
            <span>
              <Button
                variant="contained"
                size="small"
                startIcon={<EditIcon />}
                onClick={onEdit}
                disabled={!hasSelection}
                sx={{
                  bgcolor: editMode ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(4px)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' },
                  '&.Mui-disabled': { opacity: 0.4, color: '#fff' },
                }}
              >
                {editMode ? 'Editing' : 'Edit'}
              </Button>
            </span>
          </Tooltip>

          <Tooltip title="Delete selected row">
            <span>
              <Button
                variant="contained"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={onDelete}
                disabled={!hasSelection}
                sx={{
                  bgcolor: 'rgba(220,50,50,0.7)',
                  border: '1px solid rgba(255,100,100,0.5)',
                  backdropFilter: 'blur(4px)',
                  '&:hover': { bgcolor: 'rgba(220,50,50,0.9)' },
                  '&.Mui-disabled': { opacity: 0.4, color: '#fff' },
                }}
              >
                Delete
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
