import express from "express";
import { deleteUser,getUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);

export default router;
