import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
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

  //[Bearer, 12903j18923n10398n12]
  const [, token] = authorization.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "d534ed912b0a2ac8235c7ca067befe46"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    request.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
