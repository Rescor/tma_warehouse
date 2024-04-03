import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material';
import {editItem, getGroupsData, getItemData, getUnitsData} from "../utils/http";
import styles from '../components/MakeOrderForm/MakeOrderForm.module.css'
import ListLoader from "../components/Lists/ListLoader/ListLoader";

function findGroup(groups, name) {
  return groups.filter(group => group.name === name)[0]
}

function findUnitMeasure(units, unitName) {
  console.log(units.filter(unit => unit.unit === unitName)[0])
  return units.filter(unit => unit.unit === unitName)[0]
}


export default function EditItem() {
  const params = useParams()
  const navigate = useNavigate();

  const [groupsData, setGroupsData] = useState(undefined)
  const [unitsData, setUnitsData] = useState(undefined)
  const [itemData, setItemData] = useState(undefined)
  const [isError, setIsError] = useState(false)
  const [formData, setFormData] = useState(undefined);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const requiredFields = ['name', 'group_id', 'measure', 'measure_unit_id', 'quantity', 'default_quantity', 'price', 'storage'];
    const isFormValid = requiredFields.every(field => formData[field].toString().trim() !== '');

    if (isFormValid) {
      const resp = await editItem(formData);
      if (resp.success) return navigate("/lists/items/success")
    } else {
      setIsError(true)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const grpData = await getGroupsData();
      const uniData = await getUnitsData();
      const itmData = await getItemData(params.id)
      const dataForForm = {...itmData, group_id: findGroup(grpData, itmData.group_name).id, measure_unit_id: findUnitMeasure(uniData, itmData.measure_unit).id }
      setItemData(itmData)
      setGroupsData(grpData);
      setUnitsData(uniData);
      setFormData(dataForForm)
    }
    fetchData();
  }, [params.id])

  useEffect(() => {
    const x = setTimeout(() => setIsError(false), 2000);
    return () => clearTimeout(x)
  }, [isError])

  return <>
    <h2>Edit item</h2>
    {(groupsData && unitsData && itemData) ? <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        id="name"
        name="name"
        label="Item Name (*)"
        variant="outlined"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />
      <FormControl sx={{width: '200px'}} variant="outlined" margin="normal">
        <InputLabel id="group-label">Group</InputLabel>
        <Select
          labelId="group-label"
          id="group_id"
          name="group_id"
          value={formData.group_id}
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
      <FormControl sx={{width: '200px'}} variant="outlined" margin="normal">
        <InputLabel id="measureUnit-label">Measure Unit</InputLabel>
        <Select
          labelId="measureUnit-label"
          id="measure_unit_id"
          name="measure_unit_id"
          value={formData.measure_unit_id}
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
        id="default_quantity"
        name="default_quantity"
        label="Default Quantity"
        variant="outlined"
        type="number"
        inputProps={{min: 1}}
        value={formData.default_quantity}
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
    </form> : <ListLoader />}
  </>
};


