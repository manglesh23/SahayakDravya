const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const roles=require("../constant/roles");
const center = require("./center");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobilenumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum:[
      roles.SUPER_ADMIN,
      roles.CENTER_ADMIN,
      roles.FIELD_AGENT 
    ]
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  authorizedCenter:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Center',
        required:true
    }
  ]
});

//--------------=====Here goes Password Hashing---------------------================================
userSchema.pre("save", async function (next) {
    try {
      if (!this.isModified("password")) {
        return next();
      }
  
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      
      this.password = hash;
      console.log("Hashed password:", hash);
      
      return next();
    } catch (error) {
      return next(error);
    }
  });

  //compare password here--------------------------------------------//
  userSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password);
  }
  
const Userdatabase = new mongoose.model("userdatabase", userSchema);
module.exports = { Userdatabase };
