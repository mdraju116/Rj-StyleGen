import app from "./app.js";
import connectDatabase from "./config/database.js";
import checkoutRoutes from './routes/checkoutRoutes.js';

const port = process.env.PORT || 4000;

// DATABASE CONNECT
connectDatabase();

// ROUTES
app.use('/api/checkout', checkoutRoutes);

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('StyleGen Backend Running...');
});

// SERVER
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});