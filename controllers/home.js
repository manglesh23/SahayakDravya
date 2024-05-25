const home=async(req,res)=>{
    try{
      console.log("Home Page");
     res.status(200).json({message:"Home Page visible"});
    }catch(e){
        return{
            error:true,
            details:e
        }
    }
}

module.exports={home};