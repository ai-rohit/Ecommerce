const mongoose = require("mongoose");
const { model } = require("../config/dbConnection");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

categorySchema.statics.categoryExists = function (categoryId) {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await Category.findById(categoryId);
      if (category) {
        resolve(category);
      } else {
        reject("category doesn't exist");
      }
    } catch (ex) {
      reject(ex.message);
    }
  });
};
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
