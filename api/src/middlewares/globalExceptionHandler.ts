import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

// se quisermos criar um handler de exceptions podemos usar este middleware
// com estes 4 parametros. Podemos usalo depois do app.use(routes) no index.ts
export default (error: Error, req: Request, res: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  console.error(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
}
