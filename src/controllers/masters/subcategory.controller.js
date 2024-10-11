const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const { subcategoryService } = require('../../services');

const createSubCategory = catchAsync(async (req, res) => {
  const category = await subcategoryService.createSubCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const querySubCategorys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await subcategoryService.querySubCategorys(filter, options);
  res.send(result);
});

const getSubCategoryById = catchAsync(async (req, res) => {
  const category = await subcategoryService.getSubCategoryById(req.params.subCategoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sub Caegory not found');
  }
  res.send(category);
});

const updateSubCategoryById = catchAsync(async (req, res) => {
  const category = await subcategoryService.updateSubCategoryById(req.params.subCategoryId, req.body);
  res.send(category);
});

const deleteSubCategoryById = catchAsync(async (req, res) => {
  await subcategoryService.deleteSubCategoryById(req.params.subCategoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSubCategory,
  querySubCategorys,
  getSubCategoryById,
  updateSubCategoryById,
  deleteSubCategoryById,
};
