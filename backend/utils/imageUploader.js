const cloudinary = require("cloudinary").v2 ;

exports.uploadImageToCloudinary = async (file , folder , height , quality) => {

    const option = {folder} ; 
    if(height){
        option.height = height ; 
    }
    if(quality){
        option.quality = quality ; 
    }

    option.resource_type = "auto" ; 

    return await cloudinary.uploader.upload(file.tempFilePath , option) ; 
}
exports.deleteVideoToCloudinary = async (secure_url , file_type  ) => {
    if (typeof secure_url !== "string") {
        console.error("Invalid secure_url:", secure_url);
        return null;
    }
    const option = {
        resource_type : file_type , 
    } ;  

    let parts = secure_url.split("/upload/"); // Split at "/upload/"
    if (parts.length < 2) return null; // Ensure format is correct
    let publicId = parts[1].split("/").slice(1).join("/").split(".")[0]; 
    // Remove version info

    return await cloudinary.uploader.destroy(publicId , option) ; 
}

