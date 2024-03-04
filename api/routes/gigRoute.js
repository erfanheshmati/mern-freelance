import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from "../controllers/gigController.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.post("/create", verifyToken, createGig);
router.delete("/delete/:id", verifyToken, deleteGig);
router.get("/get/:id", verifyToken, getGig);
router.get("/all", verifyToken, getGigs);

export default router;
