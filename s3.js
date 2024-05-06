const aws = require('aws-sdk');
const dotenv = require('dotenv');
const { randomBytes } = require('crypto'); // Import randomBytes function from crypto module
dotenv.config();

const region = "eu-west-2";
const bucketName = process.env.bucketName;
const accessKeyId = process.env.accessKeyId; // Corrected typo in variable name
const secretAccessKey = process.env.secretAccessKey;

const s3 = new aws.S3({
  region: region,
  accessKeyId: accessKeyId, // Corrected variable name
  secretAccessKey: secretAccessKey,
  signatureVersion: 'v4' // Corrected typo in signatureVersion value
});

const generateUploadURL = async function () {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
};

module.exports = generateUploadURL; // Export the function using CommonJS syntax
