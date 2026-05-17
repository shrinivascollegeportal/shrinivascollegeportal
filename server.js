const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();

// ===== Middleware =====
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

// ===== Static Files =====
app.use(express.static(__dirname));

// ===== PDF Folder =====
const pdfPath =
path.join(__dirname, "pdf");

app.use(
  "/pdf",
  express.static(pdfPath)
);

// ===== PHOTO Folder =====
const photoPath =
path.join(__dirname, "photos");

app.use(
  "/photos",
  express.static(photoPath)
);

// ===== CREATE FOLDERS =====
if(!fs.existsSync(pdfPath)){

  fs.mkdirSync(pdfPath);

}

if(!fs.existsSync(photoPath)){

  fs.mkdirSync(photoPath);

}

// ===== PHOTO STORAGE =====
const photoStorage =
multer.diskStorage({

  destination:function(
    req,
    file,
    cb
  ){

    cb(
      null,
      "photos/"
    );

  },

  filename:function(
    req,
    file,
    cb
  ){

    const enrollment =
    req.body.enrollment;

    // 🔥 ALWAYS JPG
    cb(

      null,

      enrollment + ".jpg"

    );

  }

});

// ===== PDF STORAGE =====
const pdfStorage =
multer.diskStorage({

  destination:function(
    req,
    file,
    cb
  ){

    cb(
      null,
      "pdf/"
    );

  },

  filename:function(
    req,
    file,
    cb
  ){

    const enrollment =
    req.body.enrollment;

    const type =
    req.body.type;

    const semester =
    req.body.semester;

    let fileName = "";

    // RESULT PDF
    if(type === "result"){

      fileName =

      enrollment +

      "_sem" +

      semester +

      ".pdf";

    }

    // CERTIFICATE PDF
    else if(
      type === "certificate"
    ){

      fileName =

      enrollment +

      "_certificate.pdf";

    }

    cb(
      null,
      fileName
    );

  }

});

// ===== MULTER =====
const uploadPhoto =
multer({
  storage: photoStorage
});

const uploadPdf =
multer({
  storage: pdfStorage
});

// ===== HOME =====
app.get("/", (req, res) => {

  res.sendFile(

    path.join(
      __dirname,
      "index.html"
    )

  );

});

// ===== PHOTO UPLOAD =====
app.post(

  "/upload-photo",

  uploadPhoto.single("photo"),

  (req, res) => {

    res.send(
      "✅ Photo Uploaded Successfully"
    );

  }

);

// ===== PDF UPLOAD =====
app.post(

  "/upload-pdf",

  uploadPdf.single("pdf"),

  (req, res) => {

    res.send(
      "✅ PDF Uploaded Successfully"
    );

  }

);

// ===== TEST PDF =====
app.get("/testpdf", (req, res) => {

  const file =

  path.join(

    pdfPath,

    "2024EE450_sem1.pdf"

  );

  if(fs.existsSync(file)){

    res.sendFile(file);

  }

  else{

    res.send(
      "❌ File NOT found"
    );

  }

});

// ===== START SERVER =====
app.listen(3000, () => {

  console.log(

    "🚀 Server started at http://localhost:3000"

  );

});