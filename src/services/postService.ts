import prisma from "../lib/prisma";
import { Post } from "../types/postType";

/**
 * @returns {Promise<Array<Post>>}
 */
export const get = async (): Promise<Array<Post>> => {
  return await prisma.post.findMany({
    include: {author: true},
  });
};

/**
 * @param req
 * @param _res
 * @returns {Promise<Post>}
 */
export const create = async (postData: Post): Promise<Post> => {
  const post = await prisma.post.create({
    data: {...postData},
  });
  return post;
};

/**
 * @param id
 * @returns {Promise<?Post>}
 */
export const getById = async (id: number): Promise<Post | null> => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
};

/**
 * @param id
 * @param title
 * @param content
 * @param published
 * @returns {Promise<Post>}
 */
export const update = async (
  id: number,
  title: string,
  content: string,
  published: boolean
): Promise<Post> => {
  return await prisma.post.update({
    where: { id },
    data: {
      content,
      published,
    },
  });
};

/**
 *
 * @param id
 * @returns {Promise<Post>}
 */
export const destroy = async (id: number): Promise<Post> => {
  return await prisma.post.delete({
    where: { id },
  });
};
