import express from 'express';
import connection from "../db.js";
import {getItemReq, editItemReq, newItemReq} from "../utils/sql.js";

const router = express.Router();

router.use(express.json());

router.get('/:id', (req, res) => {
  if (!req?.params?.id) return;
  const itemId = req.params.id;

  connection.query(getItemReq, [itemId], (error, results) => {
    if (error) {
      res.status(500).send(error.sqlMessage);
    } else {
      const item = results[0];
      const itemRespData = {
        id: item.id,
        name: item.name,
        measure: item.measure,
        measure_unit: item.measure_unit,
        group_name: item.group_name,
        quantity: item.quantity,
        default_quantity: item.default_quantity,
        price: item.price,
        status: item.status,
        storage: item.storage_location,
        contacts: item.contacts,
        photo: ''
      }
      res.json(itemRespData);
    }
  });
});

router.put('/:id/edit', (req, res) => {
  const itemId = req.params.id;
  const { name, measure, quantity, default_quantity, price, status, storage, contacts, group_id, measure_unit_id } = req.body;

  connection.query(editItemReq, [name, Number(group_id), Number(measure), Number(measure_unit_id), Number(quantity), Number(default_quantity), Number(price), storage, contacts, status, Number(itemId)], (error, results) => {
    if (error) {
      res.status(500).send(error.sqlMessage);
    } else {
      res.status(200).json({ success: true, message: 'Item successfully updated' });
    }
  });
});

router.post('/new', (req, res) => {
  const { itemName, group, measure, measureUnit, quantity, defaultQuantity, price, status, storage, contacts } = req.body;

  connection.query(newItemReq, [itemName, Number(group), Number(measure), Number(measureUnit), Number(quantity), Number(defaultQuantity), Number(price), status, storage, contacts], (error, results) => {
    if (error) {
      res.status(500).send(error.sqlMessage);
    } else {
      res.status(201).json({ success: true, message: 'New item successfully created' });
    }
  });
});

router.delete('/:id/delete', (req, res) => {
  const itemId = req.params.id;

  connection.query('BEGIN', function(error) {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query('DELETE FROM requests WHERE item_id = ?', [itemId], function(error) {
      if (error) {
        connection.query('ROLLBACK', function() {
          res.status(500).json({ error: 'Internal Server Error' });
        });
        return;
      }

      connection.query('DELETE FROM items WHERE id = ?', [itemId], function(err) {
        if (err) {
          connection.query('ROLLBACK', function() {
            res.status(500).json({ error: 'Internal Server Error' });
          });
          return;
        }

        connection.query('COMMIT', function(error) {
          if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }

          res.status(200).json({ message: 'The item and related orders have been successfully deleted' });
        });
      });
    });
  });
});

export default router;
