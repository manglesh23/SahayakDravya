const AWS= require('aws-sdk');
const fs= require('fs');
require('dotenv').config();

// Configure the AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey:process.env.AWS_S3_SECRET_KEY,
  region:process.env.S3_SOUTH_REGION
});

const s3 = new AWS.S3();

// Function to upload a file
const uploadFile =async (fileName, bucketName) => {
  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
      return;
    }
    console.log(`File uploaded successfully at ${data.Location}`);
  });
};

// Usage


const uploadToAWS=async(req,res)=>{
    try{
    console.log("File path to uploaded on AWS:-",req.file.path);
    let uploadDataFile= await uploadFile(req.file.path, process.env.S3_BUCKET_NAME);
    console.log("Upload file:-",uploadDataFile);
    res.status(200).json({message:`Upload file to AWS ${req.file.path}`});
    }catch(e){
        console.log(e);
        return{
            error:true,
            details:e
        }
    }
}
module.exports={uploadToAWS};