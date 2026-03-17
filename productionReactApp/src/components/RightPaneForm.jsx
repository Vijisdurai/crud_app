// FILE: src/components/RightPaneForm.jsx
import React from 'react';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Divider,
  Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PANE_WIDTH = 360;

/**
 * Persistent right-pane that slides in/out.
 * Props: open, title, onClose, children
 */
export default function RightPaneForm({ open, title = 'Form', onClose, children }) {
  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <Paper
        elevation={4}
        sx={{
          width: PANE_WIDTH,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '3px solid #009ADD',
          borderRadius: 0,
          flexShrink: 0,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 1.5,
            background: 'linear-gradient(90deg, #005486 0%, #009ADD 100%)',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: '#fff', fontWeight: 700, fontSize: 14 }}
          >
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            aria-label="Close form panel"
            sx={{ color: '#fff' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider />

        {/* Scrollable body */}
        <Box sx={{ p: 2.5, overflowY: 'auto', flexGrow: 1 }}>
          {children}
        </Box>
      </Paper>
    </Slide>
  );
}
