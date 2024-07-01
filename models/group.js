const mongoose= require('mongoose');

/* -------------------------------------------------------------------------- */
/*                        Group Schema                                        */
/* -------------------------------------------------------------------------- */

const GroupSchema=mongoose.Schema({
    groupname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Member'
        }
    ],
    centerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Center',
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    }
});
module.exports=new mongoose.model('Group',GroupSchema);