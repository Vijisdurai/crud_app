// FILE: src/components/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import SettingsIcon from '@mui/icons-material/Settings';
import ExtensionIcon from '@mui/icons-material/Extension';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const DRAWER_WIDTH = 220;

const NAV_ITEMS = [
  { label: 'Production Lines', path: '/lines', icon: <LinearScaleIcon /> },
  { label: 'Equipment', path: '/equipment', icon: <SettingsIcon /> },
  { label: 'Parts', path: '/parts', icon: <ExtensionIcon /> },
];

export default function Sidebar({ open, onClose, variant = 'permanent' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Brand header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 2.5,
          background: 'rgba(0,0,0,0.15)',
        }}
      >
        <PrecisionManufacturingIcon sx={{ fontSize: 28, color: '#009ADD' }} />
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: '#fff', lineHeight: 1.2, fontSize: 14 }}
          >
            Production
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}
          >
            Management System
          </Typography>
        </Box>
      </Box>





      <List sx={{ px: 1, flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => {
          const selected = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              selected={selected}
              onClick={() => {
                navigate(item.path);
                if (variant === 'temporary') onClose?.();
              }}
              sx={{ my: 0.25 }}
            >
              <ListItemIcon
                sx={{ color: selected ? '#009ADD' : 'rgba(255,255,255,0.75)', minWidth: 36 }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: selected ? 700 : 400,
                  color: selected ? '#ffffff' : 'rgba(255,255,255,0.85)',
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={variant === 'temporary' ? open : true}
      onClose={onClose}
      sx={{
        width: variant === 'temporary' || open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        transition: 'width 0.2s ease',
        '& .MuiDrawer-paper': {
          width: variant === 'temporary' || open ? DRAWER_WIDTH : 0,
          boxSizing: 'border-box',
          transition: 'width 0.2s ease',
          overflowX: 'hidden',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
