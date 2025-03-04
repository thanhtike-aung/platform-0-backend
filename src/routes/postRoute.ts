import { Router } from "express";
import {
  createPost,
  deletePost,
  detailPost,
  getPosts,
  updatePost,
} from "../controllers/postController";

export const setPostRoutes = (app: Router) => {
  app.get("/posts", getPosts);
  app.post("/posts", createPost);
  app.get("/posts/:id", detailPost);
  app.patch("/posts/:id", updatePost);
  app.delete("/posts/:id", deletePost);
};
