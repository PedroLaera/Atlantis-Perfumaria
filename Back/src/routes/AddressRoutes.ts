import express from "express";
import {
  getAll,
  getAddresById,
  createAddres,
  updateAddres,
  destroyAddresById,
} from "../controllers/AddressController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/Address", authMiddleware, getAll);
router.get("/Address/:id", authMiddleware, getAddresById);
router.post("/Address", authMiddleware, createAddres);
router.put("/Address/:id", authMiddleware, updateAddres);
router.delete("/Address/:id", authMiddleware, destroyAddresById);

export default router;
