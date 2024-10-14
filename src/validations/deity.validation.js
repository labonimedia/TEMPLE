const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getDeitys = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDeityById = {
  params: Joi.object().keys({
    deityId: Joi.string().custom(objectId),
  }),
};

const deleteDeityById = {
  params: Joi.object().keys({
    deityId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getDeitys,
  getDeityById,
  deleteDeityById,
};
