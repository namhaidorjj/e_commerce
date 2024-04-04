"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const productConroller_1 = require("../controllers/productConroller");
const bagController_1 = require("../controllers/bagController");
exports.router = (0, express_1.Router)();
// Creating bag ===================
exports.router.route("/bagCreate").post(bagController_1.bagCreate);
// Getting created bags ==========
exports.router.route("/bag").get(productConroller_1.product);
// Deleting bags =================================
exports.router.route("/productDelete/:id").delete(productConroller_1.productDelete);
// Getting data to edit route =====================================
exports.router.route("/products/:id").get(productConroller_1.productEdit);
exports.router.route("/bag/:id").get(bagController_1.bag);
exports.router.route("/productUpdate/:id").put(productConroller_1.productUpdate);
exports.router.route("/gucciBag").get(bagController_1.GucciBag);
exports.router.route("/hermesBag").get(bagController_1.HermesBag);
exports.router.route("/lvbag").get(bagController_1.LVBag);
