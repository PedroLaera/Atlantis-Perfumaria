import express from "express";
import {
  getAll,
  getCommentsById,
  createComments,
  updateComments,
  destroyCommentsById,
} from "../controllers/CommentController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/comment", authMiddleware, getAll);
router.get("/comment/:id", authMiddleware, getCommentsById);
router.post("/comment", authMiddleware, createComments);
router.put("/comment/:id", authMiddleware, updateComments);
router.delete("/comment/:id", authMiddleware, destroyCommentsById);

export default router;
