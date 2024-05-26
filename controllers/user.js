const { Userdatabase } = require("../models/usermodel");
const respnseString = require("../constant/responseString");
const { sendEmail } = require("../emailService/sendEmailNotification");
const{sendsms}=require("../sendSMS/sendsms");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const createUser = async (req, res) => {
  try {
    console.log("Req:-",req)
    // console.log("information from user through Token:-",req.user);
    const {
      name,
      mobilenumber,
      role,
      city,
      email,
      password,
      authorizedCenter,
    } = req.body;
    let findIfExits = await Userdatabase.findOne({
      mobilenumber: mobilenumber,
    });
    if (!name || !mobilenumber || !role || !city) {
      res.status(404).json({ message: respnseString.PROVIDE_REQ_DETAILS });
    } else {
      if (findIfExits) {
        res.status(200).json({ message: respnseString.ALREADY_EXIST });
      } else {
      
          let createUser = await Userdatabase.create({
            name,
            mobilenumber,
            role,
            city,
            password,
            authorizedCenter,
          });

          res.status(200).json({
            message: `${respnseString.REGISTRATIN_SUCCESSFUL}:-${createUser}`,
          });
          // const sendNotification = await sendEmail(
          //   email,
          //   "Registration",
          //   "Registration Has been done"
          // );
          // console.log("Email Notification:-",sendNotification);

          const sendSMS=await sendsms(mobilenumber,"Registration Done");
          console.log("Send SMS:-",sendSMS);
          console.log("added to check");
         // } else {
        //   res.status(200).json({ message: "Center Can't be Empty" });
        //   // for (let i = 0; i < 5; i++) {
        //   //   setTimeout(function(index) {
        //   //     console.log(index);
        //   //     // Your code here
        //   //   }, 3000, i); // Multiply the delay by the index
        //   // }
        // }
          
      }
    }

    // console.log(req.body);
    // res.status(200).json({ message: "Creating User" });
  } catch (e) {
    console.log("user Error", e);
    res.status(404).json({ message: e._message, error: e.errors.role });
    return {
      error: true,
      details: e,
    };
  }
};

const signin = async (req, res) => {
  try {
    const { mobilenumber, password } = req.body;
    const findUser = await Userdatabase.findOne({ mobilenumber: mobilenumber });
     console.log("finduser:-",findUser);

    if (!findUser || !findUser.comparePassword(password)) {
      return res.status(404).json({ message: respnseString.USER_NOT_FOUND });
    }
    console.log("token");
    const token = jwt.sign(findUser.toJSON(), process.env.SECRET_KEY_TOKEN, {
      expiresIn: "1h",
    });
    // console.log("token generated:-",token)
    res
      .status(200)
      .json({
        success: true,
        token: token,
        message: respnseString.LOGIN_SUCCESS,
      });

    //   if(findUser){
    //     let comparePassword=findUser.comparePassword(password);
    //     // let comparePassword = await bcrypt.compare(password, findUser.password);   ///can be used like this
    //     if(comparePassword){
    //         res.status(200).json({message:"User Login Successfull"});

    //     }else{
    //         res.status(200).json({message:"Invalid password"});
    //     }
    //   }else{
    //     res.status(200).json({message:respnseString.USER_NOT_FOUND});
    //   }
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

module.exports = { createUser, signin };
