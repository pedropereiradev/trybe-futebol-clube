import { ErrorRequestHandler, Request, Response } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, req: Request, res: Response, next) => {
  const { name, details } = err;

  console.log(err);

  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }

  next();
};

export default errorMiddleware;
