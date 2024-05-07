const {Center}= require("../models/center");
const respnseString = require("../constant/responseString");
console.log("Center Database Imported:-",Center)

const createCenter = async (req, res) => {
  try {
    const { centerName, city, phone, pincode,state, manager, assistentManager } =
      req.body;
    if (
      !centerName ||
      !city ||
      !phone ||
      !pincode 
    
    ) {
      res.status(200).json({ message: respnseString.INSUFFICIENT_DATA });
      return;
    }
    const checkIfExist = await Center.findOne({ phone: phone });
    console.log("check if exist",checkIfExist);
    if (checkIfExist) {
      return res.status(409).json({
        success: false,
        message: respnseString.ALREADY_EXIST,
        Center:checkIfExist
      });
    }
    console.log("create center:-");
   let createCenter= await Center.create({
      centerName,
      city,
      phone,
      pincode,
      state,
      manager,
      assistentManager,
    });
    res.status(200).json({message:"Center Created Successfully",Center:createCenter});
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

const findCenter=async(req,res)=>{
  try{
    let {phone}=req.body;
    let findCenter=await Center.findOne({phone:"8908908903"}).populate('manager');
    console.log("Center wwith manager:-",findCenter);
    if(findCenter){
    res.status(200).json({message:findCenter})
    }else{
      res.status(400).json({message:"No Center For Given Id"})
    }
  }catch(e){
    return{
      error:true,
      details:e
    }
  }
}

module.exports={createCenter,findCenter};
