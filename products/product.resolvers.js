const Product = require("./product.model");

module.exports = {
  Query: {
    products: async ()=>{
      return await Product.find();
    },
    product: async(_, args)=>{
      return await Product.findById(args.id);
    }
  }
}