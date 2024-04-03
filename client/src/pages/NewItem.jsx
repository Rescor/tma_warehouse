import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material';
import {createNewItem, getGroupsData, getUnitsData} from "../utils/http";
import styles from '../components/MakeOrderForm/MakeOrderForm.module.css';

export default function NewItem() {
  const [groupsData, setGroupsData] = useState(undefined)
  const [unitsData, setUnitsData] = useState(undefined)

  const navigate = useNavigate();

  const [isError, setIsError] = useState(false)
  const [formData, setFormData] = useState({
    itemName: '',
    group: '',
    measure: '',
    measureUnit: '',
    quantity: '',
    defaultQuantity: '',
    price: '',
    status: '',
    storage: '',
    contacts: ''
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const requiredFields = ['itemName', 'group', 'measure', 'measureUnit', 'quantity', 'defaultQuantity', 'price', 'storage'];
    const isFormValid = requiredFields.every(field => formData[field].trim() !== '');

    if (isFormValid) {
      const resp = await createNewItem(formData);
      if (resp.success) return navigate("/lists/items/success")
    }
    else {
      setIsError(true)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const grpData = await getGroupsData();
      const uniData = await getUnitsData()
      setGroupsData(grpData);
      setUnitsData(uniData);
    }
    fetchData();
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsError(false), 2000);
    return () => clearTimeout(timer)
  }, [isError])

  return <>
    {(groupsData && unitsData) && <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        id="itemName"
        name="itemName"
        label="Item Name"
        variant="outlined"
        value={formData.itemName}
        onChange={handleChange}
        margin="normal"
      />
      <FormControl sx={{width: '200px'}} variant="outlined" margin="normal">
        <InputLabel id="group-label">Group</InputLabel>
        <Select
          labelId="group-label"
          id="group"
          name="group"
          value={formData.group}
          onChange={handleChange}
          label="Group"
        >
          {groupsData.map(group => <MenuItem value={group.id.toString()} key={group.id}>{group.name}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField
        id="measure"
        name="measure"
        label="Measure"
        variant="outlined"
        type="number"
        inputProps={{min: 0}}
        value={formData.measure}
        onChange={handleChange}
        margin="normal"
      />
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="measureUnit-label">Measure Unit</InputLabel>
        <Select
          labelId="measureUnit-label"
          id="measureUnit"
          name="measureUnit"
          value={formData.measureUnit}
          onChange={handleChange}
          label="Measure Unit"
        >
          {unitsData.map(unit => <MenuItem value={unit.id.toString()} key={unit.id}>{unit.unit}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField
        id="quantity"
        name="quantity"
        label="Quantity"
        variant="outlined"
        type="number"
        inputProps={{min: 0}}
        value={formData.quantity}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        id="defaultQuantity"
        name="defaultQuantity"
        label="Default Quantity"
        variant="outlined"
        type="number"
        inputProps={{min: 1}}
        value={formData.defaultQuantity}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        id="price"
        name="price"
        label="Price"
        variant="outlined"
        type="number"
        inputProps={{min: 0}}
        value={formData.price}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        id="storage"
        name="storage"
        label="Storage"
        variant="outlined"
        value={formData.storage}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        id="status"
        name="status"
        label="Status"
        variant="outlined"
        value={formData.status}
        onChange={handleChange}
        margin="normal"
      />
      <TextareaAutosize
        id="contacts"
        name="contacts"
        aria-label="Contacts"
        placeholder="Contacts"
        minRows={3}
        value={formData.contacts}
        onChange={handleChange}
        style={{width: '100%', marginTop: '16px', resize: 'vertical'}}
      />

      {isError ? <p>Вы не заполнили необходимые поля</p> :
        <Button type="submit" variant="contained" color="primary" style={{marginTop: '16px'}}>
          Submit
        </Button>}
    </form>}
  </>
};
