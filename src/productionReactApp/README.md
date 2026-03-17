# Production Management System – Frontend

A complete React 18 + Vite + MUI enterprise frontend for the Production Management System backend.

## Tech Stack

| Layer       | Technology                              |
|-------------|----------------------------------------|
| Runtime     | React 18                               |
| Build       | Vite 7                                 |
| UI          | MUI v7 (Material UI)                   |
| DataGrid    | MUI X DataGrid (community)             |
| HTTP        | Axios (with interceptors)              |
| Forms       | react-hook-form + Yup                  |
| Routing     | react-router-dom v6                    |
| Tests       | Vitest + React Testing Library         |

## Prerequisites

- Node.js 18+ and npm
- .NET backend running at `http://localhost:5160`

## Setup

```bash
cd productionReactApp
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The app auto-redirects to `/lines`.

## Scripts

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Start Vite dev server (port 5173)  |
| `npm run build`   | Production build                   |
| `npm run test`    | Run all unit tests (once)          |
| `npm run test:watch` | Run tests in watch mode         |
| `npm run test:ui` | Open Vitest UI in browser          |

## Project Structure

```
src/
├── main.jsx              # App entry point (BrowserRouter, ThemeProvider)
├── App.jsx               # Layout shell + routes
├── theme.js              # MUI brand theme (Flex Blue palette)
├── index.css             # Global reset & scrollbar styles
├── api/
│   ├── axiosClient.js        # Axios instance + interceptors
│   ├── productionLineService.js
│   ├── equipmentService.js
│   └── partService.js
├── utils/
│   ├── formatDate.js         # UTC → local YYYY-MM-DD HH:mm
│   ├── validationSchemas.js  # Yup schemas with uniqueness checks
│   └── mappers.js            # API record → form defaults
├── hooks/
│   ├── useRightPane.js       # Right pane open/close + form mode
│   └── useGridSelection.js   # DataGrid row selection
├── components/
│   ├── Sidebar.jsx           # Collapsible MUI Drawer
│   ├── TopBar.jsx            # AppBar with Add/Edit/Delete
│   ├── RightPaneForm.jsx     # Slide-in form panel
│   └── ConfirmDialog.jsx     # Cascade delete confirmation
├── grids/
│   ├── ProductionLineGrid.jsx
│   ├── EquipmentGrid.jsx
│   └── PartGrid.jsx
├── forms/
│   ├── ProductionLineForm.jsx
│   ├── EquipmentForm.jsx
│   └── PartForm.jsx
├── routes/
│   ├── ProductionLines.jsx
│   ├── Equipment.jsx
│   └── Parts.jsx
└── test/
    ├── setup.js
    ├── formatDate.test.js
    ├── validationSchemas.test.js
    ├── mappers.test.js
    └── ConfirmDialog.test.jsx
```

## Routes

| URL          | Page             |
|--------------|------------------|
| `/`          | → `/lines`       |
| `/lines`     | Production Lines |
| `/equipment` | Equipment        |
| `/parts`     | Parts            |

## Features

- **Collapsible sidebar** with brand styling (Flex Blue + Dark Blue gradient)
- **Split-panel layout**: DataGrid (left) + slide-in form panel (right)
- **Client-side** sorting, filtering, pagination, and CSV export
- **Unique name validation** (lineName globally, equipmentName per line, partName per equipment)
- **Cascade delete warning** dialog when deleting parent records with children
- **409 Conflict** responses from the API are surfaced as inline form errors
- **LinearProgress** loading indicator during API calls
- **Snackbar** success/error notifications after each operation

## API

Base URL: `http://localhost:5160/api`

The Vite dev server proxies `/api` → `http://localhost:5160` to avoid CORS.
