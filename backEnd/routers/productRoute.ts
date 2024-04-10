/** @format */

import { Router } from "express";
import {
  product,
  productDelete,
  productUpdate,
  productEdit,
} from "../controllers/productConroller";
import {
  GucciBag,
  HermesBag,
  LVBag,
  accessoryBag,
  backPack,
  bag,
  bagCreate,
  handBag,
  travelBag,
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

router.route("/productUpdate/:id").put(productUpdate);

// Getting bags to user frontEnd =================
router.route("/gucciBag").get(GucciBag);
router.route("/hermesBag").get(HermesBag);
router.route("/lvbag").get(LVBag);

// Getting bag type to user frontend ============
router.route("handBag").get(handBag);
router.route("accessoryBag").get(accessoryBag);
router.route("travelBag").get(travelBag);
router.route("backPack").get(backPack);

// Admin Users =================================
router.route("/createAdminUser").post(createAdminUser);
router.route("/loginAdmin").post(loginAdmin);
router.route("/adminUser/:id").get(adminUser);
