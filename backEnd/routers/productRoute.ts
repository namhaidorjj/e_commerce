/** @format */

import { Router } from "express";
import {
  product,
  productDelete,
  productUpdate,
  productEdit,
  colorEdit,
} from "../controllers/productConroller";
import {
  GucciBag,
  HermesBag,
  LVBag,
  bag,
  bagCreate,
} from "../controllers/bagController";
import {
  createAdminUser,
  loginAdmin,
  adminUser,
} from "../controllers/adminUserController";

export const router = Router();
// Bags collection ========================================
router.route("/bagCreate").post(bagCreate); // Creating bag
router.route("/bag").get(product); // Getting created bags
router.route("/productDelete/:id").delete(productDelete); // Deleting bags
router.route("/products/:id").get(productEdit); // Getting bags to edit

router.route("/bag/:id").get(bag);
// Updating bags =========================
router.route("/productUpdate/:id").put(productUpdate);
router.route("/updateColors/:id").put(colorEdit);
// Getting bags to user frontEnd =================
router.route("/gucciBag").get(GucciBag);
router.route("/hermesBag").get(HermesBag);
router.route("/lvbag").get(LVBag);

// Admin Users =================================
router.route("/createAdminUser").post(createAdminUser);
router.route("/loginAdmin").post(loginAdmin);
router.route("/adminUser/:id").get(adminUser);
