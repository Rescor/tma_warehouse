import express from 'express';
import connection from "../db.js";

const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * FROM item_groups', (error, results) => {
    if (error) res.status(500).send(`${error.sqlMessage}`);
    else res.json(results);
  });
});

export default router;
