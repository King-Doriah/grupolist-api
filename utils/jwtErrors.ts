import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Response } from "express";
import { send_response } from "./response";

export const jwtErrorResponse = (res: Response, error: JsonWebTokenError) => {
  if (error.message === "jwt malformed") {
    send_response(res, "error", 401, "Token mal formado.", {}, {});
  } else if (error.message === "jwt expired") {
    send_response(
      res,
      "error",
      401,
      "O token informado já está expirado.",
      {},
      {}
    );
  } else if (error.message === "invalid signature") {
    send_response(
      res,
      "error",
      401,
      "O token está com assinatura inválida.",
      {},
      {}
    );
  }
};
