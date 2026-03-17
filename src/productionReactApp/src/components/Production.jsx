import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAllProductionLine } from '../api/Production';

export default function Production() {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        getAllProductionLine().then((data) => {
            setRows(data);
        });
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'lineName', headerName: 'LineName', width: 130 },
        { field: 'isActive', headerName: 'IsActive', width: 130 },
        { field: 'createdTime', headerName: 'CreatedTime', width: 200 },
    ];

    return (
        <>
        <div style={{ height: "100%", width: "100%" }}>
            <h1>Production Line</h1>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
        </>
      
    );
};
