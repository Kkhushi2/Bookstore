var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/dashboard', function (req, res, next) {
  res.render('admin/dashboard', { msg: "" });
});
module.exports=router;