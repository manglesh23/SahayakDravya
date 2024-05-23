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

router.route("/").get(home);
// router.route("/login").get(login);
router.route("/createuser").post(verifyToken(),getUser.createUser);
router.route("/signin").post(getUser.signin);
router.route("/createCenter").post(createCenter); 
router.route("/findCenter").get(findCenter);
router.route("/addmember").post(addMember);
router.route("/upload").post(uploadfileUsingMulter().single('file'),uploadDataFile);
router.route("/convert").post(uploadfileUsingMulter().single('file'),convertFileCSVToJSON);
module.exports={router}