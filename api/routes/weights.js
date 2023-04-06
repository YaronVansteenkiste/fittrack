import Express from "express";
import { createWeight, getAllWeights, updateWeight, deleteWeight } from "../controllers/weights.js";

const router = Express.Router();

router.post("/", createWeight);
router.get("/:userId", getAllWeights);
router.put("/:weight_id", updateWeight);
router.delete("/:weight_id", deleteWeight);

export default router;

