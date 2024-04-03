import express from "express";
import cors from 'cors';
import itemRoutes from "./routes/item.js";
import itemsRoutes from "./routes/items.js";
import groupsRoutes from "./routes/groups.js";
import requestsRoutes from './routes/requests.js'
import userOrdersRoutes from "./routes/userOrders.js";
import unitsRoutes from './routes/units.js'

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/item', itemRoutes);
app.use('/requests', requestsRoutes);
app.use('/items', itemsRoutes);
app.use('/groups', groupsRoutes);
app.use('/units', unitsRoutes);
app.use('/user_orders', userOrdersRoutes);

app.listen(port, () => {
  console.log(`Server has been started on port ${port}...`)
});
