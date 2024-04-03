import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllItemsData} from "../../../utils/http";
import ListLoader from "../ListLoader/ListLoader";

export default function ItemsList() {
  const [productsData, setProductsData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getAllItemsData();
      setProductsData(data);
    };
    fetchData();
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 230 },
    { field: 'group_name', headerName: 'Item Group', width: 130 },
    { field: 'measure', headerName: 'Measure', width: 130 },
    { field: 'measure_unit', headerName: 'UoM', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'price', headerName: 'Price', type: 'number', width: 90 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'storage', headerName: 'Storage', width: 130 },
    { field: 'contacts', headerName: 'Contacts', width: 130 },
    // { field: 'photo', headerName: 'Photo', width: 130, sortable: false, description: 'This column has a photo and is not sortable.', },
    {
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      width: 280,
      getActions: (params) => [
        <>
          <NavLink to={params.id + '/edit'}>
            <Button variant="contained" size="small">Edit</Button>
          </NavLink>
          <NavLink to={params.id + '/delete'}>
            <Button variant="contained" size="small">Delete</Button>
          </NavLink>
        </>
      ],
    },
  ];

  return <Box sx={{ backgroundColor: 'white', height: '83dvh', padding: '5px' }}>
    <NavLink to='new' style={{marginLeft: '10px'}}>
      <Button variant="contained" size="small">Add new item</Button>
    </NavLink>
    {productsData ? <DataGrid
      rows={productsData}
      columns={columns}
      disableRowSelectionOnClick
    /> : <ListLoader />}
  </Box>
}
