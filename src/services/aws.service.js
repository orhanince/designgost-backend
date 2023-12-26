const { dataToImage, s3Upload } = require('./../utils/aws');
const { v4: uuid4 } = require('uuid');
const path = require('path');
const fs = require('fs');

/**
 * Upload image to folder and S3 bucket.
 * @param {*} img 
 * @returns 
 */
async function uploadToBucket(img) {
  const imageNameUUID = uuid4();
  dataToImage(img,imageNameUUID);
  const getFile = path.join(__dirname, `../../public/images/${imageNameUUID}.jpg`);
    const fileStream = fs.createReadStream(getFile);
    // Set the parameters for S3 upload
    const uploadParams = {
      Key: `${imageNameUUID}.jpg`,
      Body: fileStream
    };
    const s3Uploading = await s3Upload(uploadParams);
    return {
      status: true,
      data: s3Uploading
    }
}

module.exports = {
  uploadToBucket
};
