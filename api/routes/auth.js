import Express from "express";
import { login,register,logout,modifyBio, getColors, updateColors} from "../controllers/auth.js";

const router = Express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/modifybio", modifyBio)
router.get("/getcolors", getColors)
router.post("/updateColors", updateColors)


export default router
