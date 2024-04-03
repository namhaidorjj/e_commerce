/** @format */

import { Router } from "express";
import upload from "../middleware/multer";
import {
  product,
  // productCreate,
  productDelete,
  productUpdate,
  productEdit,
} from "../controllers/productConroller";
import {
  GucciBag,
  HermesBag,
  LVBag,
  bagCreate,
} from "../controllers/bagController";
import { signUp } from "../controllers/userController";

export const router = Router();
// Creating bag ===================
router.route("/bagCreate").post(bagCreate);
// Getting created bags ==========
router.route("/bag").get(product);
// Deleting bags =================================
router.route("/productDelete/:id").delete(productDelete);
// Getting data to edit route =====================================
router.route("/products/:id").get(productEdit);

router.route("/productUpdate/:id").put(productUpdate);

router.route("/gucciBag").get(GucciBag);
router.route("/hermesBag").get(HermesBag);
router.route("/lvbag").get(LVBag);
router.route("/createUser").post(signUp);
