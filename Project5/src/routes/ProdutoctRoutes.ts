import express from "express";
import {
  getAll,
  getProdutcsById,
  createProdutcs,
  updateProduct,
  destroyProdutcsById,
} from "../controllers/ProductController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/Products", authMiddleware, getAll);
router.get("/Products/:id", authMiddleware, getProdutcsById);
router.post("/Products", authMiddleware, createProdutcs);
router.put("/Products/:id", authMiddleware, updateProduct);
router.delete("/Products/:id", authMiddleware, destroyProdutcsById);

export default router;
