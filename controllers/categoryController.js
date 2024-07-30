import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

//ROUTE 1: Create category <------------------------------------------------>
// <------------------------------------------------><---------------------->
export const createCategory = async (req, res) => {
  try {
    const { name } = req.fields;
    if (!name) {
      return res.status(404).json({
        message: "Please Set a Category Name",
        success: false,
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(401).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).json({
      category: category,
      success: true,
      message: "New Category Is Created",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "somethin wrong happened",
      success: false,
    });
  }
};

//ROUTE 2: update category <------------------------------------------------>
// <------------------------------------------------><---------------------->
export const updateCategory = async (req, res) => {
  const { catId } = req.params;
  const { name } = req.fields;

  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      catId,
      { name, slug: slugify(name) },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(401)
        .json({ success: false, message: "Category not updated" });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error });
  }
};

//ROUTE 3: Get all category <------------------------------------------------>
// <------------------------------------------------><---------------------->
export const getAllCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).json({
      success: true,
      message: "All Categories List",
      category: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error,
      message: "Error getting all the categories",
    });
  }
};

//ROUTE 4: Get one category <------------------------------------------------>
// <------------------------------------------------><---------------------->
export const singleCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.catSlug });

    if(!category){
        return res.status(401).json({
            success: false,
            message: "category not found",
        })
    }
    res.status(200).json({
      success: true,
      message: "Get Single Category SUccessfully",
      category: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error,
      message: "Error While getting Single Category",
    });
  }
};

//ROUTE 5: Delete category <------------------------------------------------>
// <------------------------------------------------><---------------------->
export const deleteCategory = async (req, res) => {
  const { catId } = req.params;

  if (!catId) {
    return res.status(401).json({
      message: "No category found",
      success: false,
    });
  }
  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(catId);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found to delete" });
    }
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

