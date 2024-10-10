const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    language: {
      type: String,
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
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
subCategorySchema.plugin(paginate);
subCategorySchema.plugin(toJSON);

/**
 * @typedef SubCategory
 */
const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
