// FILE: src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './components/Sidebar';
import ProductionLines from './routes/ProductionLines';
import Equipment from './routes/Equipment';
import Parts from './routes/Parts';

const DRAWER_WIDTH = 220;
const TOPBAR_HEIGHT = 56;

export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant={isMobile ? 'temporary' : 'permanent'}
      />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minWidth: 0,
          height: '100vh',
          overflow: 'hidden',
          bgcolor: 'background.default',
        }}
      >

        {/* Route content fills remaining height */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/lines" replace />} />
            <Route
              path="/lines"
              element={
                <ProductionLines onMenuClick={() => setSidebarOpen((o) => !o)} />
              }
            />
            <Route
              path="/equipment"
              element={
                <Equipment onMenuClick={() => setSidebarOpen((o) => !o)} />
              }
            />
            <Route
              path="/parts"
              element={
                <Parts onMenuClick={() => setSidebarOpen((o) => !o)} />
              }
            />
            <Route path="*" element={<Navigate to="/lines" replace />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
