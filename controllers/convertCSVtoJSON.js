console.log("Convert CSV to JSON");
const fs=require('fs');
const csv=require('csv-parser');

const convertCSVtoJSON = async(filePath) => {
    const jsonArray = [];
     return new Promise((resolve, reject) => {
         fs.createReadStream(filePath)
             .pipe(csv())
             .on('data', (row) => {
                 jsonArray.push(row);
             })
             .on('end', () => {
                 resolve(jsonArray);
             })
             .on('error', (error) => {
                 reject(error);
             });
     });
 };
 
 const convertFileCSVToJSON=async(req,res)=>{
     try{
        console.log("Converting file")
         console.log("Request:-",req.file)
         console.log("File Path:-",req.file.path);
    //    res.status(200).json({message:"File Testing"})
         let convertedFile = await convertCSVtoJSON(req.file.path);
         console.log("Converted File:-", convertedFile);
         console.log("Length:-",convertedFile.length);
         console.log("pass this file into git")
        
         res.status(200).json({ message: `File Upload with data length:- ${convertedFile.length}` });
    
        
     }catch(e){
         console.error(e);
         return{
             error:true,
             details:e
         }
     }
 }

 module.exports={convertFileCSVToJSON};
 