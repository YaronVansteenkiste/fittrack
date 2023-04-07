import Express from "express";
import { createCalories, getCurrentCalories, getRequiredCalories, updateCurrentCalories, updateRequiredCalories } from "../controllers/calories.js";


const router = Express.Router();

router.post("/", createCalories);
router.put("/:userId", updateCurrentCalories)
router.put("/:userId", updateRequiredCalories)
router.get('/:userId', getCurrentCalories)
router.get('/req/:userId/', getRequiredCalories)

export default router;