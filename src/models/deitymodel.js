const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const deitySchema = mongoose.Schema(
  {
        en_name: {
          type: String,
        },
        en_description: {
          type: String,
        },
        coverImage: {
          type: String,
        },
        iconImage: {
          type: String,
        },
        en_categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
        },
        en_subCategoryId: {
          type: String,
        },
        en_introduction: {
          type: String,
        },
        en_mythologicalStory: {
          type: String,
        },
        en_symbols: {
          type: String,
        },
        en_roleSignificance: {
          type: String,
        },
        en_festivalsRituals: {
          type: String,
        },
        en_templesSites: {
          type: String,
        },
        en_significance: {
          type: String,
        },
        en_conclusion: {
          type: String,
        },
        hd_name: {
          type: String,
        },
        hd_description: {
          type: String,
        },
        hd_categoryId: {
          type: String,
        },
        hd_subCategoryId: {
          type: String,
        },

        hd_introduction: {
          type: String,
        },
        hd_mythologicalStory: {
          type: String,
        },
        hd_symbols: {
          type: String,
        },
        hd_roleSignificance: {
          type: String,
        },
        hd_festivalsRituals: {
          type: String,
        },
        hd_templesSites: {
          type: String,
        },
        hd_significance: {
          type: String,
        },
        hd_conclusion: {
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