import express from 'express';
import connection from "../db.js";
import {getAllItems} from "../utils/sql.js";

const router = express.Router();

router.get('/', (req, res) => {
  connection.query(getAllItems, (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      const respData = results.map(item => {
        return {
          id: item.id,
          name: item.name,
          measure: item.measure,
          measure_unit: item.measure_unit,
          group_name: item.group_name,
          quantity: item.quantity,
          price: item.price,
          status: item.status,
          storage: item.storage_location,
          contacts: item.contacts,
          photo: ''
        }
      })
      res.json(respData);
    }
  });
});

export default router;
