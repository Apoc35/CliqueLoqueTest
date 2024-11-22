require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api', routes)

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  })
})

// Port
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});