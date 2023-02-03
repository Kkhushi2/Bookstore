var express = require("express");
var router = express.Router();
const pool = require("./pool");
var upload = require("./multer");
router.get("/books", function (req, res) {
  res.render("books/addbooks", { msg: "" });
});
router.post("/submit", upload.single("picture"), function (req, res) {
  pool.query(
    "insert into books(publicationid, bookcategoryid,categorywriterid, bookname, description,launchedinyear,noofpages, price ,offerprice,stock, picture, status) values(?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.publicationid,req.body.bookcategoryid,req.body.categorywriterid,req.body.bookname,req.body.description,
      req.body.launchedinyear,req.body.noofpages,req.body.price,req.body.offerprice
      ,req.body.stock,req.file.filename, req.body.status
     
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.render("books/addbooks", { msg: "server error" });
      } else {
        res.render("books/addbooks", { msg: "record submitted successfully" });
      }
    }
  );
});
router.get("/display", function (req, res) {
  pool.query("select * from books", function (error, result) {
    if (error) {
      res.render("books/display", { data: [] });
    } else {
      res.render("books/display", { data: result });
    }
  });
});

router.get("/displayJSON", function (req, res) {
  pool.query("select * from books", function (error, result) {
    if (error) {
      res.status(500).json({ status: false });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  });
});

router.get("/displayJSONbyid", function (req, res) {
  pool.query(
    "select * from books where categorywriterid =?",
    [req.query.categorywriterid],
    function (error, result) {
      if (error) {
        res.status(500).json({ status: false });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    }
  );
});

router.get("/displaybyid", function (req, res) {
  pool.query(
    "select * from books where bookid=?",
    [req.query.bookid],
    function (error, result) {
      if (error) {
        res.render("books/editdata", { data: {} });
      } else console.log(result);
      {
        res.render("books/editdata", { data: result[0] });
      }
    }
  );
});
router.post("/editdata", function (req, res) {
  console.log(req.body);
  pool.query(
    "update products set publicationid=?, bookcategoryid=?,categorywriter=?, bookname=?, description=?,launchedinyear=?,noofpages=?, price=? ,offerprice=?,stock=?,status=? where bookid=?",
    [
        req.body.publicationid,req.body.bookcategoryid,req.body.categorywriterid,req.body.bookname,req.body.description,
        req.body.launchedinyear,req.body.noofpages,req.body.price,req.body.offerprice
        ,req.body.stock,req.body.status,req.body.bookid
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.redirect("/books/display");
      } else {
        res.redirect("/books/display");
      }
    }
  );
});
router.get("/displaypicture", function (req, res) {
  pool.query(
    "select * from books where bookid=?",
    [req.query.bookid],
    function (error, result) {
      if (error) {
        res.render("books/editpicture", { data: {} });
      } else console.log(result);
      {
        res.render("books/editpicture", { data: result[0] });
      }
    }
  );
});
router.post("/editpicture", upload.single("picture"), function (req, res) {
  console.log(req.body);
  pool.query(
    "update books set picture=? where bookid=?",
    [req.file.filename, req.body.bookid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.redirect("/books/display");
      } else {
        res.redirect("/books/display");
      }
    }
  );
});
router.get("/delete", function (req, res) {
  pool.query(
    "delete from books where bookid=?",
    [req.query.bookid],
    function (error, result) {
      if (error) {
        res.redirect("/books/display");
      } else {
        res.redirect("/books/display");
      }
    }
  );
});
router.get('/displayJSONbybookcategoryid',  function (req, res, next) {
  pool.query("select * from books where bookcategoryid=? ",[req.query.bookcategoryid],function (err, result)
   {console.log(err)
      if (err) {
        res.status(500).json({status:false})
      }
      else {
        console.log(result)
        res.status(200).json({status:true,data:result})
      
      }
    })
});



module.exports = router;
