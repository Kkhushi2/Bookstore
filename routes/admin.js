var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/dashboard", function (req, res, next) {
  try {
      let data = localStorage.getItem("ADMIN")
      data = JSON.parse(data)
      if (data.length > 0) {
          res.render("admin/dashboard");
      }
      else {
          res.redirect("/admin/checklogin")
      }
  }
  catch (error) {
      res.redirect("/admin/checklogin")
  }
})


module.exports = router;
