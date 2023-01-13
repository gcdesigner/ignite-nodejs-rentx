import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError("No authorization!", 401);
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.refresh_token_secret_key
    ) as IPayload;

    const usersTokenRepository = new UsersTokenRepository();

    const user = await usersTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    console.log(user);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    request.user = {
      id: user_id,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
