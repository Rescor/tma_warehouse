import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListLoader from "../ListLoader/ListLoader";
import { getAllItemsData } from '../../../utils/http';

export default function ItemsForOrder() {
  const [productsData, setProductsData] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllItemsData();
      setProductsData(data);
    }
    fetchData();
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Item', width: 550 },
    { field: 'measure', headerName: 'Measure', width: 70 },
    { field: 'measure_unit', headerName: 'UoM', width: 70 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'price', headerName: 'Price', type: 'number', width: 110 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'storage', headerName: 'Storage', width: 150 },
    { field: 'contacts', headerName: 'Contacts', width: 170 },
    // { field: 'photo', headerName: 'Photo', width: 130, sortable: false },
    {
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <NavLink to={'/lists/order/' + params.id}>
          <Button variant="contained" size="small">
            Order
          </Button>
        </NavLink>
      ],
    },
  ];

  return <Box sx={{ backgroundColor: 'white', height: '84dvh' }}>
    {productsData ? <DataGrid
      rows={productsData}
      columns={columns}
      disableRowSelectionOnClick
    /> : <ListLoader />}
  </Box>
}
