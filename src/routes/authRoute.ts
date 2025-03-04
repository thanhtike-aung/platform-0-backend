import { Router } from "express";
import { login, register } from "../controllers/authController";
import s3Upload from "../utils/s3upload";

export const setAuthRoutes = (app: Router) => {
  app.post("/login", login);
  app.post("/register", s3Upload.single("avatar"), register);
}