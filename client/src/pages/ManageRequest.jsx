import React, {useEffect, useState} from "react";
import {changeReqStatus, getRequestData, getStatusesData} from "../utils/http";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField} from "@mui/material";
import styles from '../components/MakeOrderForm/MakeOrderForm.module.css';
import ListLoader from "../components/Lists/ListLoader/ListLoader";

export default function ManageRequest() {
  const params = useParams()
  const navigate = useNavigate();

  const [requestData, setRequestData] = useState(null)
  const [statusesData, setStatusesData] = useState(null)
  const [reqStatus, setReqStatus] = useState(undefined)

  useEffect(() => {
    async function fetchData() {
      const reqData = await getRequestData(params.id);
      const statData = await getStatusesData();
      setRequestData(reqData);
      setStatusesData(statData);
    }
    fetchData();
  }, [params.id])

  async function submitHandler(event) {
    event.preventDefault()
    const resp = await changeReqStatus(params.id, reqStatus || requestData.status_id)
    console.log(resp)
    if (resp?.success) return navigate("/lists/requests/success")
    else return navigate('/error')
  }

  return <>
    <h2>Manage request</h2>
    {requestData ? <>
      <form onSubmit={submitHandler} className={styles.form}>
        <p>Order ID: {requestData.id}</p>
        <p>Item name: {requestData.item_name}</p>
        <p>Employee: {requestData.employee_name}</p>
        <p>Username: {requestData.username}</p>
        <p>Measure: {requestData.measure} {requestData.measure_unit}</p>
        <p>Price: {requestData.price} UAH (Without VAT)</p>
        <p>Quantity: {requestData.quantity}</p>
        <p>Comment: {requestData.comment}</p>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="request_status-label">Request status</InputLabel>
          <Select
            labelId="request_status-label"
            id="request_status"
            name="request_status"
            value={ reqStatus ? reqStatus : requestData.status_id}
            onChange={(e) => setReqStatus(e.target.value)}
            label="Request status"
          >
            {statusesData.map(status => <MenuItem value={status.id.toString()} key={status.id}>{status.status}</MenuItem>)}
          </Select>
        </FormControl>
        <TextareaAutosize
          id="comment"
          name="comment"
          aria-label="Comment"
          placeholder="Comment"
          minRows={3}
          value={requestData.comment}
          style={{width: '100%', marginTop: '16px', resize: 'vertical'}}
        />
        <Button type="submit" variant="contained" color="primary" style={{marginTop: '16px'}}>
          Submit
        </Button>
        <NavLink to='/lists/requests'>
          <Button variant="contained" color="primary" style={{marginTop: '16px', marginLeft: '16px'}}>
            Cancel
          </Button>
        </NavLink>
      </form>
    </> : <ListLoader />}
  </>
}
