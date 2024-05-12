import { Product } from "../../models/ProductsModel.js";

export const productsImageUpload = (req, res) => {
  try {
    // console.log(req.file);
    const { filename } = req.file;
    const port = 4000;
    res.json({
      success: true,
      image_url: `http://localhost:${port}/images/${filename}`,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, image, category, new_price, old_price, description } =
      req.body;
    const products = await Product.find({});
    let id;

    if (products.length > 0) {
      const lastProduct = products.slice(-1);
      id = lastProduct[0].id + 1;
    } else {
      id = 1;
    }

    const product = new Product({
      id,
      name,
      image,
      category,
      new_price,
      old_price,
      description,
    });
    await product.save();
    console.log("Saved");
    res.json({
      success: true,
      name,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id, name } = req.query;
    await Product.findOneAndDelete({ id });
    console.log("Removed");
    res.json({
      success: true,
      name,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getNewCollectionProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    const newCollections = products.slice(1).slice(-8);
    res.json({
      success: true,
      data: newCollections,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPopularSearchProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    const shuffleProducts = products.sort(() => 0.5 - Math.random());
    const popularSearch = shuffleProducts.slice(0, 4);
    res.json({
      success: true,
      data: popularSearch,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.find({ id });
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id, name, image, category, new_price, old_price, description } =
      req.body;

    console.log({
      id,
      name,
      image,
      category,
      new_price,
      old_price,
      description,
    });

    const productUpdate = {
      name,
      image,
      category,
      new_price,
      old_price,
      description,
    };

    await Product.updateOne(
      {
        id,
      },
      {
        $set: productUpdate,
      }
    );
    return res.json({
      success: true,
      name,
    });
  } catch (error) {
    console.log(error.message);
  }
};
