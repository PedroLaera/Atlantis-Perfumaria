import express from "express";
import {
  createCategory,
  destroyCategoryById,
  getAll,
  updateCategory,
  getCategoryById,
} from "../controllers/CategoryController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/Category", authMiddleware, getAll);
router.get("/Category/:id", authMiddleware, getCategoryById);
router.post("/Category", authMiddleware, createCategory);
router.put("/Category/:id", authMiddleware, updateCategory);
router.delete("/Category/:id",authMiddleware, destroyCategoryById);

export default router;
