import { Response } from "express";
import { send_400_response } from "./response";
import crypto from "crypto";
import env from "./configs";

export const dataNascimento = (data_nascimento: string) => {
  const dia = Number(data_nascimento.split("-")[0]);
  const mes = Number(data_nascimento.split("-")[1]);
  //const mes = 10;
  const ano = Number(data_nascimento.split("-")[2]);
  let new_dataNascimento = "";
  if (mes < 9) {
    new_dataNascimento = `${ano}-0${mes}-${dia}T00:00:00.000Z`;
  } else {
    new_dataNascimento = `${ano}-${mes}-${dia}T00:00:00.000Z`;
  }

  return new Date(new_dataNascimento);
};

export const verifyEmailOrUsername = (
  email: string | undefined,
  usuario: string | undefined,
) => {
  if (email === undefined && usuario === undefined) {
    return false;
  }
  return true;
};

export const verifyPhoneNumber = (res: Response, phoneNumber: number) => {
  if (
    phoneNumber.toString().length == 9 &&
    phoneNumber.toString().startsWith("9")
  ) {
    return true;
  }
  return false;
};

export function signPayload(data: object) {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");

  const signature = crypto
    .createHmac("sha256", env.paymentSecret)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifyPayload(token: string) {
  const [payload, signature] = token.split(".");

  const expected = crypto
    .createHmac("sha256", env.paymentSecret)
    .update(payload)
    .digest("base64url");

  if (expected !== signature) {
    throw new Error("INVALID_SIGNATURE");
  }

  const data = JSON.parse(Buffer.from(payload, "base64url").toString());

  if (Date.now() > data.exp) {
    throw new Error("EXPIRED_PAYMENT");
  }

  return data;
}

export function hashBody(body: any) {
  return crypto.createHash("sha256").update(JSON.stringify(body)).digest("hex");
}

// Isso serve para sistemas onde os usuários pagam planos.

export function getUserLimit(plan: string) {
  if (plan === "PRO") return Infinity;
  return 10; // FREE
}

export function isPlanActive(plan: string, expires: Date) {
  if (!plan || !expires) return false;
  return expires > new Date();
}

export function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export async function sendWithRetry(fn: any, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
}
