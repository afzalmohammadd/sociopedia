import express from "express"
import { getAllUsers,blockUser,deleteUser } from "../controllers/users.js"


const router = express.Router()

router.get("/userlisting", getAllUsers)
router.patch("/blockUnblock",blockUser)
router.post("/deleteuser",deleteUser)

export default router;