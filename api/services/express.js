const express = require("express");
const router = require("../routes");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileNotFound = require("../middleware/fileNotFound");
const errorHandler = require("../middleware/errorHandler");
const { logs } = require("./vars");

const app = express();

app.use(morgan(logs));

app.use(cors());

app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(router);

app.use(fileNotFound);

app.use(errorHandler);

module.exports = app;
