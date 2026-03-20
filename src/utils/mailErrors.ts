export function handleMailError(error: any) {
  if (error.includes("ETIMEDOUT")) {
    return {
      code: 503,
      message:
        "Não foi possível enviar o e-mail agora. Tente novamente em alguns instantes.",
    };
  }

  if (error.includes("ENOTFOUND")) {
    return {
      code: 503,
      message: "Serviço de email temporariamente indisponível.",
    };
  }

  if (error.includes("ECONNECTION")) {
    return {
      code: 503,
      message:
        "Não foi possível enviar o e-mail agora. Tente novamente em alguns instantes.",
    };
  }

  /*
  if (error.code === "EAUTH") {
    return {
      code: 500,
      message: "Erro de autenticação no serviço de e-mail.",
    };
  }
  */

  return {
    code: 500,
    message: "Erro interno ao enviar e-mail.",
  };
}
