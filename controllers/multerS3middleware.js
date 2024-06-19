const uploadmiddlewaremulters3=async(req,res)=>{
    console.log("Request:-",req.file);
    res.status(200).json({message:"file uploaded multer s3",file:req.file});
}
module.exports={uploadmiddlewaremulters3}