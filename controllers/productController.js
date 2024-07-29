import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

// ROUTE: 1 - create product <---------------------------------------------------->
// <----------------------------------------------------><------------------------>
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res
          .status(500)
          .json({ succes: false, message: "Name is Required" });
      case !description:
        return res
          .status(500)
          .json({ succes: false, message: "Description is Required" });
      case !price:
        return res
          .status(500)
          .json({ succes: false, message: "Price is Required" });
      case !category:
        return res
          .status(500)
          .json({ succes: false, message: "Category is Required" });
      case !quantity:
        return res
          .status(500)
          .json({ succes: false, message: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).json({
          success: false,
          message: "photo is Required and should be less then 1mb",
        });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
      message: "Error in crearing product",
    });
  }
};

//ROUTE: 2 - Get all the products <--------------------------------------->
export const getAllProduct = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    const totalProducts = await productModel.countDocuments();
    res.status(200).json({
      products: products,
      success: true,
      message: "Here are all the products",
      totalProducts: totalProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      success: false,
      message: "Something went wrong while gettin gthe product",
    });
  }
};

//ROUTE: 3 - Get single product <--------------------------------------->
// <---------------------------------------><-------------------------------->
export const getSIngleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.proSlug })
      .select("-photo")
      .populate("category");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "No such product exists",
      });
    }
    res.status(200).json({
      success: true,
      message: "Single Product Fetched",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Eror while getitng single product",
      error: error,
    });
  }
};

//ROUTE: 4 - Get single product <--------------------------------------->
// <---------------------------------------><-------------------------------->
export const productPhoto = async (req, res) => {
  const proId = req.params.proId;
  if (!proId) {
    return res.status(404).json({
      message: "product id not found",
      success: false,
    });
  }
  try {
    const product = await productModel.findById(proId).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      // return res.status(200).json({
      //   success: true,
      //   photo: product.photo.data,
      // });
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while getting photo",
      error: error,
    });
  }
};

// ROUTE: 5 - Delete product <--------------------------------------->
// <---------------------------------------><-------------------------------->

export const deleteProduct = async (req, res) => {
  const proId = req.params.proId;
  if (!proId) {
    return res.status(404).json({
      message: "no product id found",
      success: false,
    });
  }
  try {
    const product = await productModel
      .findByIdAndDelete(proId)
      .select("-photo");
    res.status(200).json({
      message: "Product deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something wrong happened while deleting the product",
      error: error,
    });
  }
};

// ROUTE: 6 - Update product <--------------------------------------->
// <---------------------------------------><-------------------------------->
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).json({
          success: false,
          error: "Name is Required",
        });
      case !description:
        return res
          .status(500)
          .json({ success: false, error: "Description is Required" });
      case !price:
        return res
          .status(500)
          .json({ success: false, error: "Price is Required" });
      case !category:
        return res
          .status(500)
          .json({ success: false, error: "Category is Required" });
      case !quantity:
        return res
          .status(500)
          .json({ success: false, error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).json({
          success: false,
          error: "photo is Required and should be less then 1mb",
        });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.proId,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).json({
      success: true,
      message: "Product Updated Successfully",
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
      message: "Error in Update product",
    });
  }
};

//filter product:

export const filterProduct = async (req, res) => {
  try {
    let args = {};
    const { cat, price } = req.body;
    if (cat.length > 0) {
      args.category = cat;
    }
    if (price.length) {
      args.price = { $gte: price[0], $lte: price[1] };
    }
    const products = await productModel.find(args);

    res.status(200).json({
      success: true,
      message: "products filtered succesfully",
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while filtering products",
    });
  }
};

// product by pages:
export const showProductByPages = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const products = await productModel
      .find()
      .select("-photo")
      .skip((page - 1) * limit)
      .limit(limit);
    const totalProducts = await productModel.countDocuments();

    res.status(200).json({
      success: true,
      products: products,
      currentPage: page,
      totalProducts: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      message: "successfully fetched products",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      succes: false,
      message: "somethin wrong happened",
    });
  }
};

export const searchProduct = async (req, res) => {
  try {
    let totalProducts = 0;
    const { price } = req.body;
    const { keyword } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const allProducts = await productModel.find({
      $and: [
        {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        },
        {
          price: { $gte: price[0], $lte: price[1] },
        },
      ],
    });
    totalProducts = allProducts.length;
    const result = await productModel
      .find({
        $and: [
          {
            $or: [
              { name: { $regex: keyword, $options: "i" } },
              { description: { $regex: keyword, $options: "i" } },
            ],
          },
          {
            price: { $gte: price[0], $lte: price[1] },
          },
        ],
      })
      .select("-photo")
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(201).json({
      success: true,
      message: "Successfully found the products",
      currentPage: page,
      totalProducts: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      products: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something wrong happened while searching",
    });
  }
};

export const similarProducts = async (req, res) => {
  try {
    const { cId, pId } = req.params;

    console.log(cId, pId)
    const products = await productModel
      .find({
        category: cId,
        _id: { $ne: pId },
      })
      .select("-photo")
      .limit(4)
      .populate("category");
    res.status(200).json({
      success: true,
      message: "similar products found",
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succes: false,
      message: "Something went wrong while getting similar products",
    });
  }
};

export const findProductsByCat = async (req, res) => {
  try {
    const {page, limit} = req.body;
    const {slug} = req.params

    const products = await productModel.find({category: slug}).select("-photo").skip((page - 1)*limit).limit(limit);

    res.status(200).json({
      success: true,
      message: "succesfully fetched the products by category",
      products: products
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Somethin wrong happened while filtering"
    })
  }
}

export const addComment = async (req, res) => {
  const { id } = req.params;
  const { comment, user } = req.body;
  if(!user){
    return res.status(404).json({
      message: "user Id notound",
      success: false,
    })
  }
  if(!comment){
    return res.status(404).json({
      message: "comment not found",
      success: false,
    })
  }

  try {
    const product = await productModel.findById(id).select("-photo");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    product.comments.push({ user, comment });
    await product.save();

    res
      .status(200)
      .json({
        success: true,
        product: product,
        message: "succesfully added the comment",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

