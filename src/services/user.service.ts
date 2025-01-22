import { User } from "../database/entities/users.entity";
import { UserRole } from "../types/users.type";
import { CreateUserInput, LoginUserInput } from "../schemas/user.schema";
import AppDataSource from "../database";
import { comparePasswords } from "../utils/passwordHash.util";
import { generateAuthTokens } from "./token.service";

const userRepository = AppDataSource.getRepository(User); // get user repository from database

export const createUserService = async (userData: CreateUserInput) => {
  // Check if user already exists
  const existingUser = await userRepository.findOne({
    where: { userName: userData.userName },
  });

  if (existingUser) {
    return null;
  }

  // Create and save the user
  const newUser = userRepository.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: userData.userName,
    password: userData.password,
    role: userData.role as UserRole,
  });

  const savedUser = await userRepository.save(newUser);
  return savedUser;
};

export const loginUserService = async (userData: LoginUserInput) => {
  const user = await userRepository.findOne({
    where: { userName: userData.userName },
  });

  if (!user) {
    return null;
  }

  // check if password is correct
  const isPasswordCorrect = await comparePasswords(
    userData.password,
    user.password
  );

  if (!isPasswordCorrect) {
    return null;
  }

  const { accessToken, refreshToken } = await generateAuthTokens(user);
 

  return { accessToken, refreshToken };
};


export const getAllUsersService = async () => {
  const users = await userRepository.find();

  if (!users) {
    return null;
  } else {
    // remove password from users
    const usersWithoutPassword = users.map((user) => {
      const {
        password,
        createdAt,
        updatedAt,
        ...userWithoutPassword
      } = user;
      return userWithoutPassword;
    });

    return usersWithoutPassword;
  }
};

export const deleteUserByIdService = async (id: string) => {
  const user = await userRepository.findOne({ where: { id } });
  if (!user) {
    return null;
  }
  await userRepository.delete({ id });
  return user;
};
