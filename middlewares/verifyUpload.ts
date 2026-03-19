/*
//Exemplo de verificação de foto

import { Request, Response, NextFunction } from "express";
import { getOnDriverPend } from "../services/motoristaService";
import { send_response } from "../utils/response";

export const verifyDriverUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const driver = await getOnDriverPend((req as any).userId);
  if (Object.values(driver.foto).length > 0) {
    send_response(
      res,
      "error",
      403,
      "Você já enviou os documentos necessários. Aguarde a resposta dos administradores.",
      {},
      {}
    );
    return;
  }
  next();
};
*/
