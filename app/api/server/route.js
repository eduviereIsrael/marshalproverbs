const express = require('express');
const cors = require("cors");
const serverless = require("serverless-http");
const app = express();
// const router = express.Router();

// const initializePayment = require("./controllers/controllers")

const router = require("./routes/routes")

app.use(cors());
app.use(express.json());


app.use('/.netlify/api/server', router);
module.exports.handler = serverless(app);
