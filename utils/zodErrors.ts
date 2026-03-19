import { ZodError } from "zod";

type zodErroResponse = {
  message: string;
  path: string;
};

export const zodError = (zodErr: ZodError): zodErroResponse => {
  let message = zodErr.issues[0].message;
  const path = zodErr.issues[0].path[0];
  if (message === "Required") {
    message = "Campo obrigatório";
  }
  return { message, path } as zodErroResponse;
};
