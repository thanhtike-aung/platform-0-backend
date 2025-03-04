import { Request, Response } from "express";
import {
  create,
  destroy,
  get,
  getById,
  update,
  getFriendRequests as getFriendRequestsService,
  sendFriendRequest as sendFriendRequestService,
  acceptFriendRequest as acceptFriendRequestService,
  declineFriendRequest as declineFriendRequestService,
  getFriendsByUser as getFriendsByUserService,
  blockFriend as blockFriendService,
  unfriend as unfriendService,
} from "../services/userService";

/**
 * @param _req
 * @param res
 */
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await get();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users!" });
  }
};

/**
 * @param req
 * @param res
 */
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

/**
 * @param req
 * @param res
 */
export const detailUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await getById(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get user detail!" });
  }
};

/**
 * @param req
 * @param res
 */
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email } = req.body;
    const user = await update(Number(req.params.id), name, email);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user!" });
  }
};

/**
 * @param req
 * @param res
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const isDeleted = await destroy(Number(req.params.id));
    if (!isDeleted) {
      res.status(404).json({ message: "User not found!" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user!" });
  }
};

/**
 *
 * @param req
 * @param res
 */
export const getFriendRequests = async (req: Request, res: Response) => {
  try {
    const requests = await getFriendRequestsService(Number(req.params.userId));
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

/**
 *
 * @param req
 * @param res
 */
export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const { requester, receiver } = req.body;
    const response = await sendFriendRequestService(requester, receiver);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

/**
 *
 * @param req
 * @param res
 */
export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const { requester, receiver } = req.body;
    await acceptFriendRequestService(requester, receiver);
    res.status(200).json({ message: "Friend accepted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

/**
 *
 * @param req
 * @param res
 */
export const declineFriendRequest = async (req: Request, res: Response) => {
  try {
    const { requester, receiver } = req.body;
    await declineFriendRequestService(receiver, requester);
    res.status(200).json({ message: "Friend decline successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

/**
 *
 * @param req
 * @param res
 */
export const getFriendsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const friends = await getFriendsByUserService(Number(userId));
    res.status(200).json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

/**
 *
 * @param req
 * @param res
 */
export const blockFriend = async (req: Request, res: Response) => {
  try {
    const { requester, receiver } = req.body;
    const response = await blockFriendService(requester, receiver);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

/**
 *
 * @param req
 * @param res
 */
export const unfriend = async (req: Request, res: Response) => {
  try {
    const { userId, friendId } = req.body;
    const response = await unfriendService(userId, friendId);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};
