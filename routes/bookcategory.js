var express = require('express');
var router = express.Router();
var pool = require("./pool")
var upload = require("./multer")



/* GET home page. */
router.get('/bookcategory', function (req, res, next) {
  try {
    let data = localStorage.getItem("ADMIN")
    data = JSON.parse(data)
    if (data.length > 0) {
        res.render("bookcategory/bookcategory");
    }
    else {
        res.redirect("/admin/checklogin")
    }
}
catch (error) {
    res.redirect("/admin/checklogin")
}
})

router.post('/submit', upload.single("picture"), function (req, res, next) {
  console.log(req.file),
    pool.query("insert into bookcategory(bookcategoryname,publicationid,description,picture) values(?,?,?,?)", [req.body.bookcategoryname, req.body.publicationid, req.body.description, req.file.filename],
      function (err, result) {
        if (err) {
          console.log(err)
          res.render("bookcategory/bookcategory", { msg: 'Record Not Submitted' })
        }
        else {
          res.render("bookcategory/bookcategory", { msg: 'Record  Submitted' })
        }
      })
});
router.get('/display', function (req, res, next) {
  pool.query("select * from bookcategory", function (err, result) {
    if (err) {
      res.render("bookcategory/dispaly", { data: [] })
    }
    else {
      res.render("bookcategory/display", { data: result })

    }
  })
});
router.get('/displaybyid', function (req, res, next) {
  pool.query("select * from bookcategory where bookcategoryid=?", [req.query.bookcategoryid], function (err, result) {
    if (err) {
      res.render("bookcategory/edit", { data: [] })
    }
    else {
      res.render("bookcategory/edit", { data: result[0] })

    }
  })
});
router.post('/edit', function (req, res, next) {
  console.log("xxxxxxxxxxxxxxxxxxxxx",req.body)
     
  pool.query("update bookcategory set bookcategoryname=?, publicationid=?, description=? where bookcategoryid=?",
    [req.body.bookcategoryname, req.body.publicationid, req.body.description, req.body.bookcategoryid], function (err, result) {
     if(err)
     {console.log(err)}
      console.log(result)
      res.redirect("/bookcategory/display")


    })
});
router.post('/updatepicture', upload.single("picture"), function (req, res, next) {
  pool.query("update bookcategory set picture=? where bookcategoryid=?", [req.file.filename, req.body.bookcategoryid], function (err, result) {
    console.log(req.query)
    res.redirect("/bookcategory/display")


  })
});
router.get('/displaypicture', function (req, res, next) {
  pool.query("select * from bookcategory where bookcategoryid=?", [req.query.bookcategoryid], function (err, result) {
    if (err) {
      res.render("bookcategory/editpicture", { data: {} })
    }
    else {
      res.render("bookcategory/editpicture", { data: result[0] })

    }
  })
});
router.get('/delete', function (req, res, next) {
  pool.query("delete from bookcategory where bookcategoryid=?", [req.query.bookcategoryid], function (err, result) {
    console.log(req.query)
    res.redirect("/bookcategory/display")


  })
});
router.get('/displayJSON', function (req, res, next) {
  pool.query("select * from bookcategory where publicationid=?", [req.query.publicationid], function (err, result) {
    console.log(err)
    if (err) {
      res.status(500).json({ status: false })
    }
    else {
      console.log(result)
      res.status(200).json({ status: true, data: result })

    }
  })
});

router.get("/displayJSONbybookcategoryid", function (req, res) {
  pool.query("select * from bookcategory where publicationid in(select bookid from books where bookid=?)",[req.query,bookid],function (err, result)
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

