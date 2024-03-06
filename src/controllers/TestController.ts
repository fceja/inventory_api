import { Request, Response } from "express";

export const TestJwtAuthController = (_req: Request, res: Response) => {
  return res.send({
    message: `Jwt is valid`,
  });
};
