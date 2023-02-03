var express = require("express");
const pool = require("./pool");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  pool.query("select * from publication", (err, result) => {
    if (err) {
      res.render("user/homepage", { data: [] });
    } else {
      res.render("user/homepage", { data: result });
    }
  });
});

module.exports = router;
