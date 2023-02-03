var express = require("express");
var router = express.Router();
const pool = require("./pool");
var upload = require("./multer");
router.get("/categorywriter", function (req, res) {
  res.render("categorywriter/addcategorywriter", { msg: "" });
});
router.post("/submit", upload.single("picture"), function (req, res) {
  pool.query(
    "insert into categorywriter (publicationid, bookcategoryid, categorywritername, description, picture) values(?,?,?,?,?)",
    [
      req.body.publicationid, req.body.bookcategoryid, req.body.categorywritername, req.body.description,req.file.filename],
     function (error, result) {
      if (error) {
        console.log(error);
        res.render("categorywriter/addcategorywriter", { msg: "server error" });
      } else {
        res.render("categorywriter/addcategorywriter", { msg: "record submitted successfully" });
      }
    }
  );
});
router.get("/display", function (req, res) {
  pool.query("select * from categorywriter", function (error, result) {
    if (error) {
      res.render("categorywriter/display", { data: [] });
    } else {
      res.render("categorywriter/display", { data: result });
    }
  });
});

router.get("/displayJSON", function (req, res) {
  pool.query("select * from categorywriter where bookcategoryid=?",[req.query.bookcategoryid], function (error, result) {
    if (error) {
        console.log(err)
      res.status(500).json({ status: false });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  });
});


 
       
     
router.get("/displaybyid", function (req, res) {
  pool.query(
    "select * from categorywriter where categorywriterid=?",
    [req.query.categorywriterid],
    function (error, result) {
      if (error) {
        res.render("categorywriter/editdata", { data: {} });
      } else console.log(result);
      {
        res.render("categorywriter/editdata", { data: result[0] });
      }
    }
  );
});
router.post("/editdata", function (req, res) {
  console.log(req.body);
  pool.query(
    "update categorywriter set bookcategoryid=?, publicationid=?, categorywritername=?, description=?,  where categorywriterid=?",
    [
      req.body.bookcategoryid,req.body.publicationid, req.body.categorywritername,req.body.description,req.body.categorywriterid
      ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.redirect("/categorywriter/display");
      } else {
        res.redirect("/categorywriter/display");
      }
    }
  );
});
router.get("/displaypicture", function (req, res) {
  pool.query(
    "select * from categorywriter where categorywriterid=?",
    [req.query.categorywriterid],
    function (error, result) {
      if (error) {
        res.render("categoryeriter/editpicture", { data: {} });
      } else console.log(result);
      {
        res.render("categorywriter/editpicture", { data: result[0] });
      }
    }
  );
});
router.post("/editpicture", upload.single("picture"), function (req, res) {
  console.log(req.body);
  pool.query(
    "update categorywriter set picture=? where categorywriterid=?",
    [req.file.filename, req.body.categorywriterid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.redirect("/categorywriter/display");
      } else {
        res.redirect("/categorywriter/display");
      }
    }
  );
});
router.get("/delete", function (req, res) {
  pool.query(
    "delete from categorywriter where categorywriterid=?",
    [req.query.categorywriterid],
    function (error, result) {
      if (error) {
        res.redirect("/categorywriter/display");
      } else {
        res.redirect("/categorywriter/display");
      }
    }
  );
});
router.get('/displayJSONbybookcategoryid',  function (req, res, next) {
  pool.query("select * from categorywriter where bookcategoryid in(select bookcategoryid from categorywriter where categorywriterid=?)",[req.query.bookcategoryid],function (err, result)
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

router.get('/displayJSONbycategorywriterid',  function (req, res, next) {
  pool.query("select * from books where categorywriterid=?",[req.query.categorywriterid],function (err, result)
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
