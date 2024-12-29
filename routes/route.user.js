import express from "express";
import { getUserById ,updateProfileImage } from "../controllers/controller.user.js";

const router = express.Router();

router.get('/get-user/:_id', getUserById );
router.get('/update-profile', updateProfileImage );



export default router;



