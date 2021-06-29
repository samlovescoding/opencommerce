const router = require("express").Router();
const authenticated = require("../middleware/authenticated");
const { success, error } = require("../services/response");

router.use("/seller", require("./seller"));
router.use("/admin", require("./admin"));

module.exports = router;
