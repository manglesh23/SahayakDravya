const mongoose= require('mongoose');
// const Schema=mongoose.Schema;
/* -------------------------------------------------------------------------- */
/*                        Center Schema                                       */
/* -------------------------------------------------------------------------- */

const CenterSchema= mongoose.Schema({
    centerName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    manager:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'userdatabase' 
    },
    assistentManager:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:'userdatabase'
    }
});
let Center=new mongoose.model("Center",CenterSchema);
module.exports={Center};