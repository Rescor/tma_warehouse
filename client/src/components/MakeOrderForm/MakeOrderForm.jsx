import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import SuccessOrder from "../SuccessOrder/SuccessOrder";
import ListLoader from "../Lists/ListLoader/ListLoader";
import { getItemData, newOrder } from "../../utils/http";
import styles from './MakeOrderForm.module.css';

export default function MakeOrderForm() {
  const params = useParams();
  const comment = useRef();

  const [itemData, setItemData] = useState(undefined);
  const [itemQuantity, setItemQuantity] = useState(undefined);
  const [orderStatus, setOrderStatus] = useState({
    status: undefined,
    order_id: undefined
  })

  useEffect(() => {
    async function fetchData() {
      const data = await getItemData(params.id);
      setItemData(data);
      setItemQuantity(data.default_quantity);
    }
    fetchData();
  }, [params.id])

  async function submitHandler() {
    setOrderStatus(prev => ({ ...prev, status: 'pending' }))

    const order = {
      item_id: itemData.id,
      user_id: localStorage.getItem('user_id'),
      employee: localStorage.getItem('employee'),
      item_quantity: itemQuantity,
      comment: comment.current?.value
    }

    const resp = await newOrder(order);

    if (resp.status === 'success') {
      setOrderStatus(prev => ({ order_id: resp.id, status: 'success' }))
    }
  }

  if (orderStatus.status === 'pending') return <ListLoader />
  if (orderStatus.status === 'success') return <SuccessOrder orderId={orderStatus.order_id} />

  return <div className={styles.form}>
    <h2>Start order</h2>

    <p>Item id: {params.id}</p>
    {itemData && itemQuantity && <div>
      <div>
        <p>Item Name: {itemData.name}</p>
      </div>
      <div>
        <p>Item measure: {itemData.measure} {itemData.measure_unit}</p>
        <p>All Measure: {itemData.measure * itemQuantity} {itemData.measure_unit}</p>
      </div>
      <div>
        <TextField
          id="quantity"
          name="quantity"
          label="Quantity"
          required
          variant="outlined"
          type="number"
          inputProps={{min: 0}}
          value={itemQuantity}
          onChange={event => setItemQuantity(event.target.value)}
          fullWidth
          margin="normal"
        />
        <p>Max quantity: {itemData.quantity}</p>
      </div>
      <p>Price (without VAT): {itemData.price * itemQuantity} UAH</p>
      <div>
        <p>Comment:</p>
        <textarea ref={comment} />
      </div>
    </div>
    }
    <button onClick={submitHandler}>Confirm</button>
    <NavLink to='/lists/browse'>
      <button>Cancel</button>
    </NavLink>
  </div>
}
