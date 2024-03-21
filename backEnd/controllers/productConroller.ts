import Product from "../models/productModel";
import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";

export const product = async (req: Request, res: Response) => {
  try {
    const product = await Product.find({});

    res.status(200).json({ product, message: "Successfully get file" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed" });
  }
};

// Creating Products ===================================================

// export const productCreate = async (req: Request, res: Response) => {
//   const {
//     productName,
//     categoryId,
//     price,
//     qty,
//     coupon,
//     salePercent,
//     description,
//     viewsCount,
//     createdAt,
//   } = req.body;
//   const { image } = req.files as {
//     [fieldname: string]: Express.Multer.File[];
//   };
//   try {
//     let uploadedImages = [];
//     if (image && image.length > 0) {
//       uploadedImages = await Promise.all(
//         image.map(async (file) => {
//           const uploadedImage = await cloudinary.uploader.upload(file.path);
//           return uploadedImage.secure_url;
//         })
//       );
//     }

//     const newProduct = await Product.create({
//       productName,
//       categoryId,
//       price,
//       qty,
//       images: uploadedImages,
//       coupon,
//       salePercent,
//       description,
//       viewsCount,
//       createdAt,
//     });

//     console.log("Successfully created", newProduct);
//     return res.status(201).json({ message: "Created", product: newProduct });
//   } catch (error) {
//     console.error("error in create product", error);
//     return res.status(400).json({ message: "Failed to create product" });
//   }
// };

// Updating Products ===================================================
export const productUpdate = async (req: Request, res: Response) => {
  const _id = req.params.id;
  const { name, desc, categoryid, price, qnty, img } = req.body;

  try {
    const existingProduct = await Product.findById(_id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Product.findByIdAndUpdate(_id, {
      productName: name,
      description: desc,
      categoryId: categoryid,
      price: price,
      qty: qnty,
      img: img,
    });

    res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    console.error("error in create product", error);
    return res.status(500).send({ message: "Failed to update product" });
  }
};

// Deleting Products ===================================================
export const productDelete = async (req: Request, res: Response) => {
  const _id = req.params.id;

  try {
    console.log(_id, "productID");
    await Product.deleteOne({ _id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("error in delete product", error);
    return res.status(400).json({ message: "Failed to delete product" });
  }
};

// Getting one product to edit =========================================
export const productEdit = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    console.log(_id, "productId");
    const product = await Product.findOne({ _id });
    console.log(product, "Product");
    res
      .status(200)
      .json({ message: "Succesfully fetch product data", product });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Getting problem to send product data" });
  }
};
