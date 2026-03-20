import { Response } from "express";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "../../generated/prisma/runtime/client";
import { prismaErrors } from "./prismaErrors";
import { ZodError } from "zod";
import { zodError } from "./zodErrors";
import { handleMailError } from "./mailErrors";

export const send_response = (
  res: Response,
  msg_status: string,
  status_code: number,
  msg: string,
  data_details: {},
  response_data: {},
) => {
  return res.status(status_code).json({
    status: msg_status,
    code: status_code,
    message: msg,
    details: data_details,
    data: response_data,
  });
};

export const send_response_error = (res: Response, error: any) => {
  if (
    error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientInitializationError ||
    error instanceof PrismaClientValidationError ||
    error instanceof PrismaClientUnknownRequestError
  ) {
    const err = prismaErrors(error);
    send_response(
      res,
      "error",
      Number(err.server_error),
      err.message,
      err.details,
      {},
    );
    return;
  }
  if (error) {
    if (error instanceof Error) {
      if (
        error.message.includes("ETIMEDOUT") ||
        error.message.includes("ENOTFOUND") ||
        (error.message.includes("ECONNECTION") &&
          error.message.includes("smtp"))
      ) {
        if (error.message.includes("smtp")) {
          const err = handleMailError(error.message);
          send_response(res, "error", err.code, err.message, {}, {});
          return;
        } else if (error.message.includes("ENOTFOUND api.cloudinary.com")) {
          send_response(
            res,
            "error",
            400,
            "Não foi possível fazer o envio da imagem. Tente novamente.",
            {},
            {},
          );
          return;
        }
      }
    }
  } else {
    send_response(
      res,
      "error",
      500,
      "Ocorreu um erro no lado do servidor.",
      {},
      {},
    );
    return;
  }
};

type ZodErr = {
  path: string;
  message: string;
};

export const zodResponseError = (res: Response, error: ZodErr) => {
  /*
  send_response(
    res,
    "error",
    400,
    "Preencha todos os dados corretamente.",
    {
      campo: error.path,
      mensagem: error.message,
    },
    {}
  );
  */
  send_400_response(res, "Preencha todos os campos corretamente.", {
    campo: error.path,
    mensagem: error.message,
  });
};

export const send_zod_response_error = (res: Response, error: ZodError) => {
  const z_error = zodError(error);
  zodResponseError(res, z_error);
};

//23/07/2025 - NEWS HTTP RESPONSE | Fiquei aborrecido de escrever com o metódo antigo

/*
Example :

send_response(
      res,
      "success",
      200,
      "Todos os autores cadastrados.",
      {},
      { autores: authors }
    );
*/
export const send_200_response = (res: Response, msg: string, data: {}) => {
  send_response(res, "success", 200, msg, {}, data);
};
export const send_201_response = (res: Response, msg: string, data: {}) => {
  send_response(res, "success", 201, msg, {}, data);
};
export const send_204_response = (res: Response) => {
  send_response(res, "", 204, "", {}, {});
};
export const send_400_response = (res: Response, msg: string, details: {}) => {
  send_response(res, "error", 400, msg, details, {});
};
export const send_401_response = (res: Response, msg: string) => {
  send_response(res, "error", 401, msg, {}, {});
};
export const send_403_response = (res: Response, msg: string) => {
  send_response(res, "error", 403, msg, {}, {});
};
export const send_404_response = (res: Response, msg: string) => {
  send_response(res, "error", 404, msg, {}, {});
};
export const send_409_response = (res: Response, msg: string) => {
  send_response(res, "error", 409, msg, {}, {});
};
export const send_500_response = (res: Response, msg: string) => {
  send_response(res, "error", 500, msg, {}, {});
};
