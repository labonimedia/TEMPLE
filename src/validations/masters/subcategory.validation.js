const Joi = require('joi');
const { objectId } = require('../custom.validation');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    language: Joi.string(),
    categoryId: Joi.string().required().custom(objectId),
    description: Joi.string(),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCategoryById = {
  params: Joi.object().keys({
    subCategoryId: Joi.string().custom(objectId),
  }),
};

const getByCategoryId = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

const updateCategoryById = {
  params: Joi.object().keys({
    subCategoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      description: Joi.string(),
      language: Joi.string(),
      categoryId: Joi.string().required().custom(objectId),
      name: Joi.string(),
    })
    .min(1),
};

const deleteCategoryById = {
  params: Joi.object().keys({
    subCategoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  getByCategoryId,
  updateCategoryById,
  deleteCategoryById,
};
