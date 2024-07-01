const mongoose = require("mongoose");

/* -------------------------------------------------------------------------- */
/*                       Member Schema                                        */
/* -------------------------------------------------------------------------- */

const MemberSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  center: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Center",
    },
  ],
  group: [
    {
      type: String,
      // ref: "Group",
    },
  ],
  phone:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    enum:['Male','Female','Other']
  },
  city:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  pincode:{
    type:String,
    required:true
  },
  occupation:{
    type:String
  },
  status:{
    type:String,
    enum:['Active','Inactive','Pending']
  }
});
const Member=new mongoose.model('Member',MemberSchema);
module.exports={Member}