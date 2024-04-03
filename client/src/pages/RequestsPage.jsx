import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {getAllRequestsData} from "../utils/http";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import ListLoader from "../components/Lists/ListLoader/ListLoader";

export default function RequestsPage() {
  const [ordersData, setOrdersData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const data = await getAllRequestsData();
      setOrdersData(data);
    }
    fetchData();
  }, [])

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'employee_name', headerName: 'Employee', width: 130 },
    { field: 'item_name', headerName: 'Item', width: 130, editable: true, },
    { field: 'measure', headerName: 'Measure', width: 130 },
    { field: 'measure_unit', headerName: 'UoM', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'price', headerName: 'Price Without VAT (UAH)', type: 'number', width: 90 },
    { field: 'comment', headerName: 'Comment', width: 130 },
    { field: 'order_status', headerName: 'Status', width: 130 },
    {
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      width: 280,
      getActions: (params) => [
        <NavLink to={params.id + '/change'}>
          <Button variant="contained" size="small">Change</Button>
        </NavLink>
      ],
    },
  ];

  return <Box sx={{ backgroundColor: 'white', height: '84dvh' }}>
    {ordersData ? <DataGrid
      rows={ordersData}
      columns={columns}
      disableRowSelectionOnClick
    /> : <ListLoader />}
  </Box>
}
