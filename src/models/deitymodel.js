const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const deitySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    iconImage: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory',
    },
    language: {
      type: String,
    },
    discription1: {
      type: String,
    },
    discription2: {
      type: String,
    },
    discription3: {
      type: String,
    },
    discription4: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

deitySchema.plugin(paginate);
deitySchema.plugin(toJSON);

const Deity = mongoose.model('Deity', deitySchema);

module.exports = Deity;
