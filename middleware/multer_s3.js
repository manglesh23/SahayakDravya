const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const { fromEnv } = require("@aws-sdk/credential-provider-env"); // AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY S3_SOUTH_REGION Standard way to define

// Instantiate the S3 client with credentials from environment variables
const s3 = new S3Client({
  region: process.env.S3_SOUTH_REGION,
  credentials: fromEnv(), // Load credentials from environment variables
});

/* -------------------------------------------------------------------------- */
/* middleware function to upload file on S3 bucket                            */
/* -------------------------------------------------------------------------- */

const uploadMulterS3 = () => {
  try {
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
    });
    return upload;
  } catch (e) {
    console.log(e);
    return {
      error: true,
      details: e,
    };
  }
};
module.exports = { uploadMulterS3 };
