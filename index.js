import express from 'express';
import routes from './routes/routes.js';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
// Routes
app.use('/api/v1/', routes);


// Start the server
sequelize.sync().then(() => {
  console.log("DB synced");
  app.listen(PORT, () => console.log("Server running"));
}).catch((err) => console.log("Error creating the table", err));