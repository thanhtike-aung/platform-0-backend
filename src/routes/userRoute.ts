import { Router } from "express";
import {
  acceptFriendRequest,
  blockFriend,
  createUser,
  declineFriendRequest,
  deleteUser,
  detailUser,
  getFriendRequests,
  getFriendsByUser,
  getUsers,
  sendFriendRequest,
  unfriend,
  updateUser,
} from "../controllers/userController";

export const setUserRoutes = (app: Router) => {
  // basic routes
  app.get("/users", getUsers);
  app.post("/users", createUser);
  app.get("/users/:id", detailUser);
  app.patch("/users/:id", updateUser);
  app.delete("/users/:id", deleteUser);

  // friend routes
  app.get("/users/friend/request/:userId", getFriendRequests);
  app.post("/users/friend/request", sendFriendRequest);
  app.post("/users/friend/accept", acceptFriendRequest);
  app.post("/users/friend/decline", declineFriendRequest);
  app.get("/users/friend/:userId", getFriendsByUser);
  app.post("/users/friend/block", blockFriend);
  app.post("/users/friend/unfriend", unfriend);
};
