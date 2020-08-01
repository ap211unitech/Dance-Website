let express = require('express');

let router = express.Router();

let things = require("../controller/items.js")

router.get("/", things.callback);

module.exports = router;


