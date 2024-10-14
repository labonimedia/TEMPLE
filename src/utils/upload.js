const multer = require('multer');
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const ffmpegPath = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');
const httpStatus = require('http-status');
const ApiError = require('./ApiError');
const s3Client = require('./s3');

ffmpeg.setFfmpegPath(ffmpegPath);

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFile = async (file) => {
  const params = {
    Bucket: 'b2b',
    Key: `${Date.now().toString()}-${file.originalname}`,
    Body: file.buffer,
    ACL: 'public-read',
  };

  const command = new PutObjectCommand(params);
  // eslint-disable-next-line no-useless-catch
  try {
    await s3Client.send(command);
    return `https://lmscontent-cdn.blr1.digitaloceanspaces.com/temple/${params.Key}`;
  } catch (err) {
    throw err; // Rethrow the error after logging it
  }
};

const uploadFiles = async (req, res, next) => {
  const uploadPromises = [];

  Object.keys(req.files).forEach((field) => {
    req.files[field].forEach((file) => {
      uploadPromises.push(
        uploadFile(file).then((url) => {
          req.body[field] = req.body[field] || [];
          req.body[field].push(url);
        })
      );
    });
  });

  try {
    await Promise.all(uploadPromises);
    next();
  } catch (err) {
    res.status(500).send({ error: 'Failed to upload files', details: err.message });
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to upload files');
  }
};

const commonUploadMiddleware = (fields) => [upload.fields(fields), uploadFiles];

/**
 * Delete a file from S3 bucket
 * @param {string} filePath - The path of the file to delete
 * @returns {Promise<void>}
 */
const deleteFile = async (filePath) => {
  const bucketKey = filePath.replace('https://lmscontent-cdn.blr1.digitaloceanspaces.com', '');

  const params = {
    Bucket: 'b2b',
    Key: bucketKey,
  };

  const command = new DeleteObjectCommand(params);
  // eslint-disable-next-line no-useless-catch
  try {
    await s3Client.send(command);
  } catch (err) {
    throw err; // Rethrow the error after logging it
  }
};

module.exports = { commonUploadMiddleware, deleteFile };
