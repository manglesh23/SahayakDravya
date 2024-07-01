/* -------------------------------------------------------------------------- */
/*                        Uploading file to AWS S3                            */
/* -------------------------------------------------------------------------- */


const uploadmiddlewaremulters3=async(req,res)=>{
    try{
    console.log("Request:-",req.files);
    res.status(200).json({message:"file uploaded multer s3",file:req.files});
    }catch(e){
        console.log(e);
        return{
            error:true,
            details:e
        }
    }
}
module.exports={uploadmiddlewaremulters3}