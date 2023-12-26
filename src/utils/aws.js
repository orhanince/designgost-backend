const fs = require('fs')
const path = require('path');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    params: { Bucket: process.env.AWS_S3_BUCKET_NAME }
});

async function s3Upload (uploadParams) {
  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
      return;
    }
    console.log('File uploaded successfully. Location:', data.Location);
  })
};

function dataToImage(dataImg,name) {

  // Extract the base64 data
  const base64Data = dataImg.replace(/^data:image\/\w+;base64,/, '');
  
  // Convert base64 string to Buffer
  const bufferData = Buffer.from(base64Data, 'base64');
  const filePath = path.dirname('/');
  // Set your desired file path and name
  //const imageFile = filePath + `${name}.jpg`; // Change this path and file name as needed
  const n = path.join(__dirname, `../../public/images/${name}.jpg`);
  // Write the Buffer data to a file
  fs.writeFile(n, bufferData, (err) => {
    if (err) {
      console.error('Error saving the image:', err);
      return;
    }
    console.log('Image saved successfully:', filePath);
  });
}

module.exports = {
    s3,
    s3Upload,
    dataToImage
};