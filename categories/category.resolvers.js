const Category = require("./category.model");

module.exports = {
  Query: {
    categories: async ()=>{
      return await Category.find();
    }
  }
}