import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import { User } from "../types/userType";

/**
 * @returns {Promise<Array<User>>}
 */
export const get = async (): Promise<Array<User>> => {
  return await prisma.user.findMany({
    include: { profile: true },
  });
};

/**
 * @param userData
 * @returns {Promise<User>}
 */
export const create = async (
  userData: Prisma.UserCreateInput
): Promise<User> => {
  const user = await prisma.user.create({
    data: { ...userData },
  });
  return user;
};

/**
 * @param id
 * @returns {Promise<User | null>}
 */
export const getById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

/**
 * @param id
 * @param name
 * @param email
 * @returns {Promise<User>}
 */
export const update = async (
  id: number,
  name: string,
  email: string
): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
    },
  });
};

/**
 * @param id
 * @returns {Promise<User>}
 */
export const destroy = async (id: number): Promise<User> => {
  return await prisma.user.delete({
    where: { id },
  });
};

/**
 *
 * @param userId
 * @returns
 */
export const getFriendRequests = async (userId: number) => {
  const requests = await prisma.friendship.findMany({
    where: {
      receiver_id: userId,
      status: "PENDING",
    },
    include: {
      requester: {
        include: { profile: true },
      },
    },
  });
  return requests;
};

/**
 *
 * @param requesterId
 * @param receiverId
 * @returns
 */
export const sendFriendRequest = async (
  requesterId: number,
  receiverId: number
) => {
  return await prisma.friendship.create({
    data: {
      requester_id: requesterId,
      receiver_id: receiverId,
      status: "PENDING",
    },
  });
};

/**
 *
 * @param requesterId
 * @param receiverId
 * @returns
 */
export const acceptFriendRequest = async (
  requesterId: number,
  receiverId: number
) => {
  return await prisma.friendship.updateMany({
    where: {
      requester_id: requesterId,
      receiver_id: receiverId,
      status: "PENDING",
    },
    data: { status: "ACCEPTED" },
  });
};

/**
 *
 * @param userId
 * @param friendId
 * @returns
 */
export const declineFriendRequest = async (
  userId: number,
  friendId: number
) => {
  return await prisma.friendship.deleteMany({
    where: { requester_id: friendId, receiver_id: userId, status: "PENDING" },
  });
};

/**
 *
 * @param userId
 * @returns
 */
export const getFriendsByUser = async (userId: number) => {
  const friends = await prisma.friendship.findMany({
    where: {
      OR: [
        { requester_id: userId, status: "ACCEPTED" },
        { receiver_id: userId, status: "ACCEPTED" },
        { requester_id: userId, status: "PENDING" },
        { receiver_id: userId, status: "PENDING" },
      ],
    },
    include: {
      requester: {
        include: {
          profile: true,
        },
      },
      receiver: {
        include: {
          profile: true,
        },
      },
    },
  });
  return friends.map((friend) =>
    friend.requester_id === userId
      ? { status: friend.status, data: friend.receiver }
      : { status: friend.status, data: friend.requester }
  );
};

/**
 *
 * @param requester
 * @param receiver
 * @returns
 */
export const blockFriend = async (requester: number, receiver: number) => {
  return await prisma.friendship.updateMany({
    where: { requester_id: requester, receiver_id: receiver },
    data: { status: "BLOCKED" },
  });
};

/**
 *
 * @param userId
 * @param friendId
 * @returns
 */
export const unfriend = async (userId: number, friendId: number) => {
  return await prisma.friendship.deleteMany({
    where: {
      OR: [
        { requester_id: userId, receiver_id: friendId, status: "ACCEPTED" },
        { requester_id: friendId, receiver_id: userId, status: "ACCEPTED" },
      ],
    },
  });
};
