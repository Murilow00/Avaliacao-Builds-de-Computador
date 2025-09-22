import express from "express";
import { getAllBuilds, getBuildById, criarBuild, deletarBuild, atualizarBuild } from "../controllers/pcsControllers.js";

const router = express.Router();

router.get("/", getAllBuilds);
router.get("/:id", getBuildById);
router.post("/", criarBuild);
router.delete("/:id", deletarBuild);
router.put("/:id", atualizarBuild);

export default router;