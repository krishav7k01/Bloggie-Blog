import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name: 'krishav', 
  api_key: '358844552478125', 
  api_secret: 'erJz3l4cM2JkylDtsP7Fil0A5LQ' 
});

const uploadOnCloudinary = async(localFilePath) =>{
try {
    
        if(!localFilePath) return null

        console.log("ok")
    
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })

    
        fs.unlinkSync(localFilePath);
        return response


} catch (error) {

    console.log(error)
    fs.unlinkSync(localFilePath)
    return null
    
    
}


}

export {uploadOnCloudinary}