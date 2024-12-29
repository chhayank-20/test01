import { Router } from "express";
import { getFeed,addPost,deletePost,getPostById } from "../controllers/controller.post.js";

const router = Router();

router.get('/feed', getFeed);
router.post('/add-post', addPost);
router.post('/delete-post', deletePost);
router.post('/get-post', getPostById);
// add getpostby id 


export default router;