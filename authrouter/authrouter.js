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

router.route("/").get(home);
// router.route("/login").get(login);
router.route("/createuser").post(verifyToken(),getUser.createUser); //verifying this token here.
router.route("/signin").post(getUser.signin);                       // generated token here and used this in Create user 
router.route("/createCenter").post(createCenter); 
router.route("/findCenter").get(findCenter);
router.route("/addmember").post(addMember);
router.route("/upload").post(uploadfileUsingMulter().single('file'),uploadDataFile); // uploading data file
router.route("/convert").post(uploadfileUsingMulter().single('file'),convertFileCSVToJSON); //conerting CSV to JSON
router.route('/uploadAWS').get(uploadfileUsingMulter().single('file'),uploadToAWS);
module.exports={router}