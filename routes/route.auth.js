import express from "express";
import { signInAction , logOutAction , logInAction, } from "../controllers/controller.auth.js";

const router = express.Router();

router.post('/sign-up', signInAction );
router.post('/log-in', logInAction );
router.post('/log-out', logOutAction);



export default router;
