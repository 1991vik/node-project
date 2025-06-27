import express from 'express';
import routes from './routes/routes.js';
import bodyParser from 'body-parser';

const app = express();
import { sequelize } from './config/database.js';
// Middleware
app.use(express.json());
app.use(bodyParser.json());
// Routes
app.use('/api/v1/', routes);

// Start the server
sequelize.sync({force: false}).then(() => {
  console.log("DB synced");
  app.listen(process.env.PORT, () => console.log("Server running"));
}).catch((err) => console.log("Error creating the table", err));