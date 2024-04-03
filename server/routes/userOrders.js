import express from 'express';
import connection from "../db.js";
import { userOrdersReq } from "../utils/sql.js";

const router = express.Router();

router.get('/:id', (req, res) => {
  const userId = req.params.id;

  connection.query(userOrdersReq, [userId], (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      const orders = results.map(order => (
        {
          id: order.id,
          item_name: order.item_name,
          measure: order.measure,
          measure_unit: order.measure_unit,
          quantity: order.quantity,
          price: order.price,
          comment: order.comment,
          order_status: order.order_status
        }
      ));

      res.json(orders);
    }
  });
});

export default router;
