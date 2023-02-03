var express = require('express');
const pool = require('./pool');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

/* GET home page. */
router.get('/checklogin', function (req, res, next) {
    res.render('admin/adminlogin', { msg: "" });
});
router.post('/adminlogin', function (req, res, next) {
    pool.query("select * from login where user=? and password=?", [req.body.user, req.body.password], function (err, result) {
        if (err) {
            res.render("admin/adminlogin", { msg: "server error" })
        }

        else if (result.length > 0) {
            localStorage.setItem("ADMIN", JSON.stringify(result))
            res.render("admin/dasboard");
        }
        else {
            res.render("admin/adminlogin", { msg: "Invalid Username/Password" })
        }

    })

});


module.exports = router;
