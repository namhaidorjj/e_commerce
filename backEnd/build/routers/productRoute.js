"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const productConroller_1 = require("../controllers/productConroller");
const bagController_1 = require("../controllers/bagController");
const adminUserController_1 = require("../controllers/adminUserController");
exports.router = (0, express_1.Router)();
// Bags collection ========================================
exports.router.route("/bagCreate").post(bagController_1.bagCreate); // Creating bag
exports.router.route("/bag").get(productConroller_1.product); // Getting created bags
exports.router.route("/productDelete/:id").delete(productConroller_1.productDelete); // Deleting bags
exports.router.route("/products/:id").get(productConroller_1.productEdit); // Getting bags to edit
exports.router.route("/bag/:id").get(bagController_1.bag);
exports.router.route("/productUpdate/:id").put(productConroller_1.productUpdate);
// Getting bags to user frontEnd =================
exports.router.route("/gucciBag").get(bagController_1.GucciBag);
exports.router.route("/hermesBag").get(bagController_1.HermesBag);
exports.router.route("/lvbag").get(bagController_1.LVBag);
// Admin Users =================================
exports.router.route("/createAdminUser").post(adminUserController_1.createAdminUser);
exports.router.route("/loginAdmin").post(adminUserController_1.loginAdmin);
exports.router.route("/adminUser/:id").get(adminUserController_1.adminUser);
