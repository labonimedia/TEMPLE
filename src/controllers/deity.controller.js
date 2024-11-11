const httpStatus = require('http-status');
const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deityService } = require('../services');

const bulkUploadFile = catchAsync(async (req, res) => {
  if (req.file) {
    // Construct and log the file path to check if it's correct
    const csvFilePath = path.join(__dirname, '../uploads', req.file.filename);

    // Verify if file exists at this path before reading it
    if (!fs.existsSync(csvFilePath)) {
      throw new ApiError(httpStatus.NOT_FOUND, 'File does not exist. Check the file path.');
    }

    // Convert CSV to JSON and perform bulk upload
    const csvJsonArray = await csv().fromFile(csvFilePath);
    const { en_categoryId, hd_categoryId } = req.body;

    const uploadResult = await deityService.bulkUpload(csvJsonArray, en_categoryId, hd_categoryId);

    res.status(httpStatus.CREATED).send({
      success: true,
      uploadedRecords: uploadResult.successResults,
      failedRecords: uploadResult.errorResults,
    });
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'File not provided');
  }
});

const createDeity = catchAsync(async (req, res) => {
  if (req.body.iconImage) {
    const iconImageUrl = req.body.iconImage[0];
    const iconImagePath = new URL(iconImageUrl).pathname;
    req.body.iconImage = iconImagePath;
  }
  if (req.body.coverImage) {
    const coverImageUrl = req.body.coverImage[0];
    const coverImagePath = new URL(coverImageUrl).pathname;
    req.body.coverImage = coverImagePath;
  }
  if (req.body.iconImage1) {
    const iconImageUrl = req.body.iconImage1[0];
    const iconImagePath = new URL(iconImageUrl).pathname;
    req.body.iconImage1 = iconImagePath;
  }
  if (req.body.coverImage1) {
    const coverImageUrl = req.body.coverImage1[0];
    const coverImagePath = new URL(coverImageUrl).pathname;
    req.body.coverImage1 = coverImagePath;
  }

  const deity = await deityService.createDeity(req.body);
  res.status(httpStatus.CREATED).send(deity);
});

const queryDeitys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await deityService.queryDeitys(filter, options);
  res.send(result);
});

const getDeityById = catchAsync(async (req, res) => {
  const deity = await deityService.getDeityById(req.params.deityId);
  if (!deity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sub Caegory not found');
  }
  res.send(deity);
});

const updateDeityById = catchAsync(async (req, res) => {
  if (req.body.iconImage) {
    const iconImageUrl = req.body.iconImage[0];
    const iconImagePath = new URL(iconImageUrl).pathname;
    req.body.iconImage = iconImagePath;
  }
  if (req.body.coverImage) {
    const coverImageUrl = req.body.coverImage[0];
    const coverImagePath = new URL(coverImageUrl).pathname;
    req.body.coverImage = coverImagePath;
  }
  const deity = await deityService.updateDeityById(req.params.deityId, req.body);
  res.send(deity);
});

const deleteDeityById = catchAsync(async (req, res) => {
  await deityService.deleteDeityById(req.params.deityId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  bulkUploadFile,
  createDeity,
  queryDeitys,
  getDeityById,
  updateDeityById,
  deleteDeityById,
};
