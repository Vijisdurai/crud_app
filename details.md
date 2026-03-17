# Project Details

## 1. API Base URL
- **Frontend Configured Base URL**: `http://localhost:5160/api`

- **HTTPS Alternative (Backend)**: `https://localhost:7162/api`

## 2. Exact REST Endpoints and Methods

### ProductionLine
- `GET /api/ProductionLine/Ping` – Health check endpoint ("Pong")
- `GET /api/ProductionLine` – Retrieve all production lines
- `POST /api/ProductionLine` – Create a new production line
- `PUT /api/ProductionLine/{id}` – Update an existing production line
- `DELETE /api/ProductionLine/{id}` – Delete a production line

### Equipment
- `GET /api/Equipment/Ping` – Health check endpoint ("Pong")
- `GET /api/Equipment` – Retrieve all equipment
- `POST /api/Equipment` – Create new equipment
- `PUT /api/Equipment/{id}` – Update existing equipment
- `DELETE /api/Equipment/{id}` – Delete equipment

### Part
- `GET /api/Part/Ping` – Health check endpoint ("Pong")
- `GET /api/Part` – Retrieve all parts
- `POST /api/Part` – Create a new part
- `PUT /api/Part/{id}` – Update an existing part
- `DELETE /api/Part/{id}` – Delete a part

## 3. Pagination, Sort, and Search
- **Current State**: The endpoints currently **do not** support server-side pagination, sorting, or searching (they return the entire list via `ToList()`).
- **Conclusion**: The **UI handles it client-side**.

## 4. Deletion Rules & Cascade
- **Requirement**: If there are related children (e.g., trying to delete a Production Line that has associated Equipment or Parts), the UI should **show a warning**. 
- If the user confirms, the system will **force delete** the complete parent record along with all its related children, and this cascade deletion will be reflected across all respective tables.

## 5. Data & Validation Uniqueness Rules
*(Both server-side and UI validation)*
- **LineName**: Unique across all Production Lines.
- **EquipmentName**: Unique within the same Production Line.
- **PartName**: Unique within the same Equipment.

### Timestamps
- **CreatedTime**: Generated and controlled by the server (read‑only). The DB model assigns it via `DateTime.UtcNow`.
- **UI Datetime Format**: Preferred format in the UI is `YYYY-MM-DD HH:mm` adjusted to the appropriate local timezone.

---

## Technical Stack & Choices
1. **Build Tool**: React with Vite
2. **HTTP Client**: Axios only
3. **Form Handling & Validation**: React Hook Form + Yup
4. **Language**: JavaScript only

### Future Enhancements
1. **TypeScript**: Migration to static typing.
2. **React Query**: For sophisticated state management, caching, and data fetching optimization.

---

## UI/UX & Theme Preferences

### Layout
- **Right-pane form**: Implement a persistent split panel for forms that expands/collides when open.

### Typography
- **Font Family**: Century Gothic

### Color Palette

#### Primary Brand Colors
- **Flex Blue**: `#009ADD` | `RGB(0, 154, 221)`
- **Dark Blue**: `#005486` | `RGB(0, 84, 134)`
- **White**: `#FFFFFF` | `RGB(255, 255, 255)`
- **Light Grey**: `#F2F2F2` | `RGB(242, 242, 242)`

#### Primary Text Color
- **Dark Gray**: `#262626` | `RGB(38, 38, 38)`
*(Used mainly for headlines and body copy. Other brand colors may be used occasionally if accessibility/readability requirements are met.)*
