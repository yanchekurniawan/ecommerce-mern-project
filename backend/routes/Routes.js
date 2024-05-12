import express from "express";
import multer from "multer";
import { storage } from "../config/ImageEngine.js";
import { helloWorld } from "../controllers/HelloWorld.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getNewCollectionProducts,
  getPopularSearchProducts,
  getProductById,
  productsImageUpload,
  updateProductById,
} from "../controllers/Products/Product.js";
import {
  userSignIn,
  userSignOut,
  userSignUp,
} from "../controllers/Users/User.js";
import {
  signInValidation,
  signUpValidation,
} from "../middleware/Validation.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  addToCart,
  getCartItem,
  removeFromCart,
} from "../controllers/Carts/Cart.js";
import { refreshToken } from "../controllers/RefreshToken/RefreshToken.js";

const router = express.Router();
/* multer */
const upload = multer({ storage });

router.get("/", helloWorld);
router.get("/token", refreshToken);

router.post("/upload", upload.single("product"), productsImageUpload);
router.post("/product", addProduct);
router.delete("/product", deleteProduct);
router.get("/product", getAllProducts);
router.get("/product/:id", getProductById);
router.put("/product", updateProductById);
router.get("/new-collections", getNewCollectionProducts);
router.get("/popular-search", getPopularSearchProducts);

router.post("/sign-up", signUpValidation(), userSignUp);
router.post("/sign-in", signInValidation(), userSignIn);
router.delete("/sign-out", userSignOut);

router.post("/cart", verifyToken, addToCart);
router.delete("/cart/:productId/:type", verifyToken, removeFromCart);
router.get("/cart", verifyToken, getCartItem);

export default router;
