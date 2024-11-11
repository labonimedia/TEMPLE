const httpStatus = require('http-status');
const { Deity } = require('../models');
const ApiError = require('../utils/ApiError');

const bulkUpload = async (csvJsonArray, en_categoryId, hd_categoryId) => {
  try {
    // Validate input data
    if (!csvJsonArray || !csvJsonArray.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'CSV data array is empty or missing');
    }

    // Process each record and create in database
    const uploadResults = await Promise.allSettled(
      csvJsonArray.map(async (deity) => {
        deity.en_categoryId = en_categoryId;
        deity.hd_categoryId = hd_categoryId;
        return await Deity.create(deity);
      })
    );

    // Separate successful and failed uploads
    const successResults = uploadResults.filter((result) => result.status === 'fulfilled').map((result) => result.value);
    const errorResults = uploadResults
      .filter((result) => result.status === 'rejected')
      .map((result) => ({ error: result.reason.message }));

    if (errorResults.length) {
      console.warn('Some records failed to upload:', errorResults);
    }

    return { successResults, errorResults };
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error processing CSV upload');
  }
};

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
  bulkUpload,
  getDeityById,
  updateDeityById,
  deleteDeityById,
};
