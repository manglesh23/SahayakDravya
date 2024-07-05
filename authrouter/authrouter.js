/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */ 
const express=require('express');
const router=express.Router();

const {home}=require('../controllers/home');
// const{login}=require('../controllers/login');
const getUser=require('../controllers/user');

const {createCenter, findCenter}=require('../controllers/center');

const {verifyToken}=require('../middleware/verify-token');

const { addMember } = require('../controllers/member');

const { uploadDataFile } = require('../controllers/uploadDataFile');

const { uploadfileUsingMulter } = require('../middleware/multer');

const { convertFileCSVToJSON } = require('../controllers/convertCSVtoJSON');

const { uploadToAWS } = require('../controllers/uploadToAWS');

// const { uploadmulterS3 } = require('../middleware/multer_s3');

const {uploadTOAWSviaMulters3}=require('../controllers/uploadAWSmulterS3');

const { uploadMulterS3 } = require('../middleware/multer_s3');

const { uploadmiddlewaremulters3 } = require('../controllers/multerS3middleware');

const validate=require('../middleware/zodvalidator');
const {userSchema}=require('../zodSchema/zodSchema');

/* -------------------------------------------------------------------------- */
/*                                Routers                                     */
/* -------------------------------------------------------------------------- */              

router.route("/").get(home);
// router.route("/login").get(login);

/* -------------------------------------------------------------------------- */
/*   Verifiying the token here and create user with data input validation     */
/* -------------------------------------------------------------------------- */
router.route("/createuser").post(verifyToken(),validate(userSchema),getUser.createUser);

/* -------------------------------------------------------------------------- */
/*              Generate a Token every time user sign in                      */
/* -------------------------------------------------------------------------- */
router.route("/signin").post(getUser.signin);                        

router.route("/createCenter").post(createCenter); 

router.route("/findCenter").get(findCenter);

router.route("/addmember").post(addMember);

/*----------------------------------------------------------------------*/
/*                  Uploading data file on server                       */
/*----------------------------------------------------------------------*/
router.route("/upload").post(uploadfileUsingMulter().single('file'),uploadDataFile); 


/*----------------------------------------------------------------------*/
/* Uploading data file on server and converting the CSV file into JSON  */
/*----------------------------------------------------------------------*/
router.route("/convert").post(uploadfileUsingMulter().single('file'),convertFileCSVToJSON); 

router.route('/uploadAWS').get(uploadfileUsingMulter().single('file'),uploadToAWS);

router.route('/uploadAWSmulters3').get(uploadTOAWSviaMulters3);

/*------------------------------------------------------------------------------------*/
/*    Multiple files can be uploaded to AWS S3 Bucket, max limit is defined here 5    */
/*                             token Verification                                     */
/*------------------------------------------------------------------------------------*/
router.route('/uploadmulters3').get(verifyToken(),uploadMulterS3().array('files',5),uploadmiddlewaremulters3);

//single('file) for single file ..field name in the post must be file
//array('files',maxnumberoffile)  for multiple files ...field name must be files..must be same as defined in the function single or array
module.exports={router}