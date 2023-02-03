var express = require('express');
var router = express.Router();
var pool = require("./pool")
var upload = require("./multer")



/* GET home page. */
router.get('/publication', function (req, res, next) {
    res.render('publication/addpublication', { msg: "" });
  });

  router.post('/submit', upload.single("picture"), function (req, res, next) {
    console.log( req.file),
    pool.query("insert into publication(publicationname,picture) values(?,?)", [req.body.publicationname, req.file.filename],
      function (err, result) {
        if (err) {
            console.log(err)
            res.render("publication/addpublication", { msg: 'Record Not Submitted' })
        }
        else {
          res.render("publication/addpublication", { msg: 'Record  Submitted' })
        }
      })
  });
  router.get('/display',  function (req, res, next) {
    pool.query("select * from publication",function (err, result) {
        if (err) {
            console.log(err)
          res.render("publication/display", { data:[] })
        }
        else {
          res.render("publication/display", { data:result })
        
        }
      })
  });
  router.get('/displaybyid',  function (req, res, next) {
    pool.query("select * from publication where publicationid=?",[req.query.publicationid],function (err, result) {
        if (err) {
          res.render("publication/edit", { data:[] })
        }
        else {
          res.render("publication/edit", { data:result[0] })
        
        }
      })
  });
  router.post('/edit',  function (req, res, next) {
    pool.query("update publication set publicationname=? where publicationid=?",[req.body.publicationname,req.body.publicationid],function (err, result) {
      console.log(req.body)
       res.redirect("/publication/display")
      
       
      })
  });
  router.post('/updatepicture', upload.single("picture"), function (req, res, next) {
    pool.query("update publication set picture=? where publicationid=?",[req.file.filename,req.body.publicationid],function (err, result)
     {
      console.log(req.query)
       res.redirect("/publication/display")
      
       
      })
  });
  router.get('/displaypicture',  function (req, res, next) {
    pool.query("select * from publication where publicationid=?",[req.query.publicationid],function (err, result) {
        if (err) {
          res.render("publication/editpicture", { data:{} })
        }
        else {
          res.render("publication/editpicture", { data:result[0] })
        
        }
      })
  });
  router.get('/delete',  function (req, res, next) {
    pool.query("delete from publication where publicationid=?",[req.query.publicationid],function (err, result) {
      console.log(req.query)
      res.redirect("/publication/display")
     
      
      })
  });
  router.get('/displayJSON',  function (req, res, next) {
    pool.query("select * from publication",function (err, result) {
        if (err) {
          res.status(500).json({status:false})
        }
        else {
          res.status(200).json({status:true,data:result})
        
        }
      })
  });
  module.exports = router;
  
  
  
