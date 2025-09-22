import express from "express"
import { getAllBuilds, getBuildById,  } from "../controllers/pcsControllers.js"

const router = express.Router()

router.get("/", getAllBuilds);
router.get("/:id", getBuildById);


export default router;