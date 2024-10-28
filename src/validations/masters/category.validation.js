const Joi = require('joi');
const { objectId } = require('../custom.validation');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    hi_name: Joi.string(),
    hi_description: Joi.string(),
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
    categoryId: Joi.string().custom(objectId),
  }),
};

const updateCategoryById = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      description: Joi.string(),
      name: Joi.string(),
      hi_name: Joi.string(),
      hi_description: Joi.string(),
    })
    .min(1),
};

const deleteCategoryById = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
