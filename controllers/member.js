const {Member}=require('../models/member');
const addMember=async(req,res)=>{
  console.log("Member add");
  try{ 
    // res.status(200).json({message:"Member add Here"});
    const{fullname,center,group,phone,gender,city,state,pincode}=req.body;
    if(!fullname || !center || !group || !pincode || !city){
        res.status(2000).json({message:"Required Field Missing"});
        return;
    }
  let createMember=  await Member.create({
        fullname,
        center,
        group,
        phone,
        gender,
        city,
        state,
        pincode
    });
    res.status(200).json({message:"Member Added",Member:createMember});
  }catch(e){
    return{
        error:true,
        details:e
    }
  }
}

module.exports={addMember};
