import Express from "express";
import { createActivity, deleteActivity, getAllActivities, updateActivity } from "../controllers/activity.js";

const router = Express.Router();

router.post("/", createActivity);
router.get("/:userId", getAllActivities);
router.put("/:activity_id", updateActivity);
router.delete("/:activity_id", deleteActivity);


export default router;