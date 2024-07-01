const express=require('express');
const router=express.Router();

const {home}=require('../controllers/home');
// const{login}=require('../controllers/login');
const getUser=require('../controllers/user');
const {createCenter, findCenter}=require('../controllers/center')
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

router.route("/").get(home);
// router.route("/login").get(login);
router.route("/createuser").post(verifyToken(),getUser.createUser); //verifying  oken here.

router.route("/signin").post(getUser.signin);                       // generated token here and used this in Create user 

router.route("/createCenter").post(createCenter); 

router.route("/findCenter").get(findCenter);

router.route("/addmember").post(addMember);

router.route("/upload").post(uploadfileUsingMulter().single('file'),uploadDataFile); // uploading data file


/*Uploading data file on server and converting the CSV file into JSON  */
router.route("/convert").post(uploadfileUsingMulter().single('file'),convertFileCSVToJSON); 

router.route('/uploadAWS').get(uploadfileUsingMulter().single('file'),uploadToAWS);

router.route('/uploadAWSmulters3').get(uploadTOAWSviaMulters3);

/*Multiple files can be uploaded, max limit is defined here 5 */
router.route('/uploadmulters3').get(uploadMulterS3().array('files',5),uploadmiddlewaremulters3);

//single('file) for single file ..field name in the post must be file
//array('files',maxnumberoffile)  for multiple files ...field name must be files..must be same as defined in the function single or array
module.exports={router}