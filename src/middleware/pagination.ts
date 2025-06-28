import { Request, Response, NextFunction } from "express";

export default function pagination(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const limit: number = 0;
  const take: number = 0;

  req.pagination = {
    skip: req.query.page
      ? (Number(req.query.page) - 1) * Number(req.query.limit || limit)
      : take,
    take: req.query.limit ? Number(req.query.limit) : limit,
  };

  delete req.query.limit;
  delete req.query.page;

  next();
}
