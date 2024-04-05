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
  bag,
  bagCreate,
} from "../controllers/bagController";

export const router = Router();
// Creating bag ===================
router.route("/bagCreate").post(bagCreate);
// Getting created bags ==========
router.route("/bag").get(product);
// Deleting bags =================================
router.route("/productDelete/:id").delete(productDelete);
// Getting data to edit route =====================================
router.route("/products/:id").get(productEdit);

router.route("/bag/:id").get(bag);

router.route("/productUpdate/:id").put(productUpdate);

router.route("/gucciBag").get(GucciBag);
router.route("/hermesBag").get(HermesBag);

router.route("/lvbag").get(LVBag);
