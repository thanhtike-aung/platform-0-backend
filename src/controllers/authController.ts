import { Request, Response } from "express";
import { login as loginService, register as registerService } from "../services/authService";

export const login = async (req: Request, res: Response) => {
  try {
    const auth = await loginService(req.body);
    if (auth.status !== 200) {
      res.status(auth.status).json({ message: auth.message });
    }
    res.status(auth.status).json(auth.token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error!" });
  }
};

export const register = async (req: any, res: Response) => {
  try {
    const avatar = req.file?.key;
    const register = await registerService(req.body, avatar);
    res.status(201).json(register);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "server error"});
  }
}
