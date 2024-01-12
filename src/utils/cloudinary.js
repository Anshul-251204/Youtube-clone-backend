import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
// config environment variables
dotenv.config({
  path: ".../../.env",
});

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret:`${process.env.CLOUDINARY_API_SECRET}`,
});

// console.log(
//     process.env.PORT,
//   process.env.CLOUDINARY_CLOUD_NAME,
//   process.env.CLOUDINARY_API_KEY,
//   process.env.CLOUDINARY_API_SECRET
// );


// cloudinary.config({
//   cloud_name: "dzclxbbwk",
//   api_key: "342355561256642",
//   api_secret: "jwBjAlMOl04sRp9M42zd-wCH1NQ",
// });

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
