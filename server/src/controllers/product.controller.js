import { uploadFiles } from "../services/storage.service.js";
import productModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    // Validate images
    if (!req.files || req.files.length < 1 || req.files.length > 5) {
      return res.status(400).json({
        message: "Product must have between 1 and 5 images",
      });
    }

    const filesUrls = [];

    // Upload images
    for (const file of req.files) {
      const response = await uploadFiles({
        buffer: file.buffer,
        fileName: file.originalname,
      });

      filesUrls.push(response.url);
    }

    const { title, description, price, sizes } = req.body;

    // Create product
    const product = await productModel.create({
      title,
      description,
      price: {
        amount: price.amount,
        currency: price.currency,
      },
      images: filesUrls,
      sizes,
    });

    return res.status(201).json({
      message: "Product created successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    console.error("Error in createProduct controller:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    return res.status(200).json({
      message: "Products fetched successfully",
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(`Error in getProducts controller: ${error}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      message: "Product fetched successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(`Error in getProduct controller: ${error}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    //get id
    const { id } = req.params;

    //find product by id
    const product = await productModel.findById(id);

    //if not
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const { title, description, price, sizes } = req.body;

    //update the fields that are provided
    if (title !== undefined) {
      product.title = title;
    }
    if (description !== undefined) {
      product.description = description;
    }
    if (price !== undefined) {
      product.price = {
        amount: price.amount,
        currency: price.currency,
      };
    }
    if (sizes !== undefined) {
      product.sizes = sizes;
    }

    //update image if new image were uploaded
    if (req.files && req.files.length > 0) {
      if (req.files.length > 5) {
        return res.status(400).json({
          message: "Maximum of 5 images allowed",
        });
      }

      const filesUrls = [];
      for (const file of req.files) {
        const response = await uploadFiles({
          buffer: file.buffer,
          fileName: file.originalname,
        });
        filesUrls.push(response.url);
      }
      product.images = filesUrls;
    }
    //save updated product
    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(`Error in updateProduct controller: ${error}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    //get id from req.params
    const { id } = req.params;

    //find product by id
    const product = await productModel.findById(id);
    //if not
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await productModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(`Error in deleteProduct controller: ${error}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
