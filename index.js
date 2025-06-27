import express from 'express';
import routes from './routes/routes.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sequelize } from './config/database.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/v1/', routes);

const PORT = process.env.PORT || 5000;

// Start the server
sequelize.sync({force: false})
  .then(() => {
    console.log("DB synced");
    app.listen(PORT, () => console.log("Server running"));
  })
  .catch((err) => console.log("Error creating the table", err));