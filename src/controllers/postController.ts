import { Request, Response } from "express";
import { create, destroy, get, getById, update } from "../services/postService";

/**
 * @param _req
 * @param res
 */
export const getPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await get();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to fetch posts!" });
  }
};

/**
 * @param req
 * @param res
 */
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post = await create(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ error: "failed to create post!" });
  }
};

/**
 * @param req
 * @param res
 */
export const detailPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const post = await getById(Number(req.params.id));
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to get post detail!" });
  }
};

/**
 * @param req
 * @param res
 */
export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, content, published } = req.body;
    const post = await update(Number(req.params.id), title, content, published);
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to update post!" });
  }
};

/**
 * @param req
 * @param res
 */
export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const isDeleted = await destroy(Number(req.params.id));
    if (!isDeleted) {
      res.status(404).json({ message: "post not found!" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to delete post" });
  }
};
