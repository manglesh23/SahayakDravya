const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

AWS.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey:process.env.AWS_S3_SECRET_KEY,
    region:process.env.S3_SOUTH_REGION
  });
  
const s3 = new AWS.S3();

// Multer S3 configuration function
const uploadMulterS3 =() =>{
  let storage=  multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "testFile");
    },
  }),
});
return multer({storage:storage});
}
//   return multer({ storage: storage });

const uploadTOAWSviaMulters3 = async (req, res) => {
  // console.log(req.file);
  try {
    console.log(process.env.S3_BUCKET_NAME,process.env.AWS_S3_ACCESS_KEY)
    let upload = uploadMulterS3().single("file");

    upload(req, res, (err) => {
      if (err) {
        console.log("got error:-",err)
        return res.status(200).json({ message: "failed to upload" });
      }
      res.status(200).json({ message: `file has been uploaded ${req.file}` });
    });
  } catch (e) {
    console.log("Error:-", e);
  }
};
module.exports = { uploadTOAWSviaMulters3 };
