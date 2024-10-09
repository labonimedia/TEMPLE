const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(paginate);
categorySchema.plugin(toJSON);

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
