const httpStatus = require('http-status');
const { SubCategory } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a SubCategory
 * @param {Object} reqBody
 * @returns {Promise<SubCategory>}
 */
const createSubCategory = async (reqBody) => {
  return SubCategory.create(reqBody);
};

/**
 * Query for Categorys
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySubCategorys = async (filter, options) => {
  const subCategorys = await SubCategory.paginate(filter, options);
  return subCategorys;
};

/**
 * Get SubCategory by id
 * @param {ObjectId} id
 * @returns {Promise<SubCategory>}
 */
const getSubCategoryById = async (id) => {
  return SubCategory.findById(id);
};

/**
 * Update SubCategory by id
 * @param {ObjectId} CategoryId
 * @param {Object} updateBody
 * @returns {Promise<SubCategory>}
 */
const updateSubCategoryById = async (CategoryId, updateBody) => {
  const category = await getCategoryById(CategoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SubCategory not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete SubCategory by id
 * @param {ObjectId} CategoryId
 * @returns {Promise<SubCategory>}
 */
const deleteSubCategoryById = async (CategoryId) => {
  const category = await getSubCategoryById(CategoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SubCategory not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createSubCategory,
  querySubCategorys,
  getSubCategoryById,
  updateSubCategoryById,
  deleteSubCategoryById,
};
