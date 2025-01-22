import { User } from "../database/entities/users.entity";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.util";

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export const generateAuthTokens = async (user: User): Promise<AuthTokens> => {
  const payload = {
    uid: user.id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);


  return {
    accessToken,
    refreshToken,
  };
};


