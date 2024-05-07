require('dotenv').config();
const mongoose=require('mongoose');
let URI=process.env.PRODUCTION_DATABASE_KEY;
// console.log("URI:-",URI);
const connectDatabase=async()=>{
    try{
    await mongoose.connect(URI);
    console.log("From database file database connected")
    }catch(e){
        console.log("not connected",e);
        return{
            error:true,
            details:e
        }
    }
}
module.exports={connectDatabase};