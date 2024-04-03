import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import ListLoader from "../ListLoader/ListLoader";
import {getOrdersData} from "../../../utils/http";
import styles from './MyOrders.module.css';

export default function MyOrders() {
  const userId = localStorage.getItem('user_id')
  const [ordersData, setOrdersData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      let data = await getOrdersData(userId);
      setOrdersData(data);
    };
    fetchData();
  }, [userId])

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 70 },
    { field: 'item_name', headerName: 'Item', width: 130, editable: true, },
    { field: 'measure', headerName: 'Measure', width: 130 },
    { field: 'measure_unit', headerName: 'UoM', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'price', headerName: 'Price', type: 'number', width: 90 },
    { field: 'comment', headerName: 'Comment', width: 130 },
    { field: 'order_status', headerName: 'Status', width: 130 }
  ];

  return <Box sx={{ backgroundColor: 'white', height: '84dvh' }}>
    {ordersData ? <DataGrid
      rows={ordersData}
      columns={columns}
      disableRowSelectionOnClick
    /> : <ListLoader />}
  </Box>
}
