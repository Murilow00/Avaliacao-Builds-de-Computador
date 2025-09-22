import express from "express"
import { getAllBuilds, getBuildById, criarBuild  } from "../controllers/pcsControllers.js"

const router = express.Router()

router.get("/", getAllBuilds);
router.get("/:id", getBuildById);
router.post("/", criarBuild)

export default router;