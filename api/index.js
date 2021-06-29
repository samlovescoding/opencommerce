const app = require("./services/express");
const logger = require("./services/logger");
const mongoose = require("./services/mongoose");
const { port } = require("./services/vars");

mongoose.connect();

app.listen(port, () => {
  logger.info(`Server started at http://localhost:${port}`);
});
