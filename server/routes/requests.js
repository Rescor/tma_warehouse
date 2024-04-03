import express from 'express';
import connection from "../db.js";
import {createOrderReq, getAllRequestsReq, getItemReq, getOrderReq} from "../utils/sql.js";

const router = express.Router();
router.use(express.json());

router.get('/statuses', (req, res) => {
  connection.query(`SELECT * FROM statuses;`, (error, results) => {
    if (error) {
      res.status(500).send(error.sqlMessage);
    } else {
      res.json(results);
    }
  });
});

router.get('/all', (req, res) => {
  connection.query(getAllRequestsReq, (error, results) => {
    if (error) {
      res.status(500).send(err.sqlMessage);
    } else {
      res.json(results);
    }
  });
});

router.get('/:id', (req, res) => {
  if (!req?.params?.id) return;
  const requestId = req.params.id;

  connection.query(getOrderReq, [requestId], (error, results) => {
    if (error) {
      res.status(500).send(error.sqlMessage);
    } else {
      res.json(results[0]);
    }
  });
});

router.put('/:id/change_status', (req, res) => {
  const requestId = req.params.id;
  const newStatus = req.body.new_status;

  const sql = `UPDATE requests SET status_id = ? WHERE id = ?`;
  connection.query(sql, [Number(newStatus), Number(requestId)], (error) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.status(200).json({ success: true });
  });
});

router.post('/new', (req, res) => {
  const order = req.body;
  let itemData;

  connection.query(getItemReq, [order.item_id], (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else itemData = results[0];

    const measure = Number(itemData.measure) * Number(order.item_quantity);
    const measureId = itemData.measure_unit_id;
    const price = Number(itemData.price) * Number(order.item_quantity);

    const values = [order.item_id, order.user_id, order.employee, measure, measureId, order.item_quantity, price, order.comment];

    connection.query(createOrderReq, values, (error, result) => {
      if (error) res.status(500).send(error.sqlMessage);
      else res.status(201).json({ status: 'success', id: result.insertId });
    });
  });
});

export default router;
