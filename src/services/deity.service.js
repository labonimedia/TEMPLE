const httpStatus = require('http-status');
const { Deity } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Deity
 * @param {Object} deityBody
 * @returns {Promise<Deity>}
 */
const createDeity = async (deityBody) => {
  return Deity.create(deityBody);
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
const queryDeitys = async (filter, options) => {
  const deitys = await Deity.paginate(filter, options);
  return deitys;
};

/**
 * Get Deity by id
 * @param {ObjectId} id
 * @returns {Promise<Deity>}
 */
const getDeityById = async (id) => {
  return Deity.findById(id);
};

/**
 * Update Deity by id
 * @param {ObjectId} deityId
 * @param {Object} updateBody
 * @returns {Promise<Deity>}
 */
const updateDeityById = async (deityId, updateBody) => {
  const deity = await getDeityById(deityId);
  if (!deity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deity not found');
  }
  Object.assign(deity, updateBody);
  await deity.save();
  return deity;
};

/**
 * Delete Deity by id
 * @param {ObjectId} deityId
 * @returns {Promise<Deity>}
 */
const deleteDeityById = async (deityId) => {
  const deity = await getDeityById(deityId);
  if (!deity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deity not found');
  }
  await deity.remove();
  return deity;
};

module.exports = {
  createDeity,
  queryDeitys,
  getDeityById,
  updateDeityById,
  deleteDeityById,
};
