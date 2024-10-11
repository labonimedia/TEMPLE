const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deityService } = require('../services');

const createDeity = catchAsync(async (req, res) => {
    if (req.body.iconImage ) {
        const iconImageUrl = req.body.iconImage[0];
        const iconImagePath = new URL(iconImageUrl).pathname;
        req.body.iconImage = iconImagePath;
      }
      if(req.body.coverImage){
        const coverImageUrl = req.body.coverImage[0];
        const coverImagePath = new URL(coverImageUrl).pathname;
        req.body.coverImage = coverImagePath
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

    if (req.body.iconImage ) {
        const iconImageUrl = req.body.iconImage[0];
        const iconImagePath = new URL(iconImageUrl).pathname;
        req.body.iconImage = iconImagePath;
      }
      if(req.body.coverImage){
        const coverImageUrl = req.body.coverImage[0];
        const coverImagePath = new URL(coverImageUrl).pathname;
        req.body.coverImage = coverImagePath
      }
  const deity = await deityService.updateDeityById(req.params.deityId, req.body);
  res.send(deity);
});

const deleteDeityById = catchAsync(async (req, res) => {
  await deityService.deleteDeityById(req.params.deityId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createDeity,
    queryDeitys,
    getDeityById,
    updateDeityById,
    deleteDeityById,
};
