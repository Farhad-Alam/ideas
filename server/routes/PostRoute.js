import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getPostsQuery,
  getSinglePost,
  postComment,
  postCommentDelete,
  postLikeOrUnlike,
  updatePost,
} from "../controllers/PostController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/post/create").post(isAuthenticated, createPost);
router.route("/posts").get(getPosts);
router.route("/post/search").get(getPostsQuery);
router
  .route("/post/:id")
  .get(getSinglePost)
  .delete(isAuthenticated, deletePost);
router.route("/post/update/:id").put(isAuthenticated, updatePost);
router.route("/post/likeUnlike/:id").get(isAuthenticated, postLikeOrUnlike);
router.route("/post/comment/:id").post(isAuthenticated, postComment);
router
  .route("/post/comment/delete/:id")
  .post(isAuthenticated, postCommentDelete);
export default router;
