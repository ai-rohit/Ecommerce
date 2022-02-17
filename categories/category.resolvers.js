const Category = require("./category.model");

module.exports = {
  Query: {
    categories: async ()=>{
      return await Category.find();
    },
    category: async (_, args)=>{
      console.log(args);
      return await Category.findById(args.id);
    }
  }
}