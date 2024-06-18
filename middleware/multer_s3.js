// const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// Configure AWS S3
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  region: process.env.AWS_S3_REGION  // Ensure the environment variable is consistent
});

// Multer S3 configuration function
const uploadMulterS3 = () => {
 return multer({
   storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname));
      }
    })
});

//   return multer({ storage: storage });
};

module.exports = { uploadMulterS3 };
