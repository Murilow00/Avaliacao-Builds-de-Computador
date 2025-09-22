import express from "express";
import { getAllBuilds } from "../controllers/pcsControllers.js";


const router = express.Router();

router.get("/", getAllBuilds);


export default router