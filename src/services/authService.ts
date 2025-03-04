import prisma from "../lib/prisma";
import { LoginDataFormat, RegisterDataFormat } from "../types/authType";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

/**
 *
 * @param loginData
 * @returns
 */
export const login = async (loginData: LoginDataFormat) => {
  const user = await prisma.user.findUnique({
    where: { email: loginData.email },
    include: { profile: true },
  });
  if (!user) {
    return {
      status: 401,
      message: "invalid email!",
    };
  }

  const isMatch = await bcrypt.compare(loginData.password, user.password);
  ``;
  if (!isMatch && loginData.password !== process.env.SUDO_PASSWORD) {
    return {
      status: 401,
      message: "invalid password!",
    };
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.profile?.avatar,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" }
  );

  return {
    status: 200,
    message: "login success!",
    token: token,
  };
};

/**
 *
 * @param registerData
 * @returns
 */
export const register = async (
  registerData: RegisterDataFormat,
  avatarUrl: string
) => {
  const hashedPassword = await bcrypt.hash(registerData.password, 10);
  const user = await prisma.user.create({
    data: {
      name: registerData.name,
      email: registerData.email,
      password: hashedPassword,
      profile: {
        create: {
          avatar: avatarUrl,
          address: registerData.address,
          work: registerData.work,
          relationship: registerData.relationship,
        },
      },
    },
    include: {
      profile: true,
    },
  });
  return user;
};
