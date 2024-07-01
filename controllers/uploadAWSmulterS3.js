// const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const { fromEnv } = require("@aws-sdk/credential-provider-env");

// Instantiate the S3 client with credentials from environment variables

const s3 = new S3Client({
  region: process.env.S3_SOUTH_REGION,
  credentials: fromEnv(),               // Load credentials from environment variables
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
}).single("file");

const uploadTOAWSviaMulters3 = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ message: "File failed to upload" });
    }
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file });
  });
};

module.exports = { uploadTOAWSviaMulters3 };
