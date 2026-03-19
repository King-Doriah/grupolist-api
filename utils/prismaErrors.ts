import { Response } from "express";
import {
  PrismaClientKnownRequestError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from "../../generated/prisma/runtime/client";

export type errorData = {
  server_error: number;
  message: string;
  details: {};
};

export const prismaErrors = (error: any): errorData => {
  let details: {} = {};
  let message: string;
  let server_error = 500;

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P1000") {
      server_error = 500;
      message = "Erro de conexão com o banco de dados.";
      return { server_error, message, details };
    } else if (error.code === "P1001") {
      server_error = 500;
      message = "Não é possível estabelecer uma conexão com o banco de dados.";
      return { server_error, message, details };
    } else if (error.code === "P2016") {
      server_error = 500;
      message = "Erro ao consultar o banco de dados.";
      return { server_error, message, details };
    } else if (error.code === "P1002") {
      server_error = 500;
      message = "Erro de rede (Prisma e Banco de Dados).";
      return { server_error, message, details };
    } else if (error.code === "P1003") {
      server_error = 500;
      message = "Banco de dados não encontrado.";
      return { server_error, message, details };
    } else if (error.code === "P1004") {
      server_error = 500;
      message = "Erro ao tentar fazer login no banco de dados.";
      return { server_error, message, details };
    } else if (error.code === "P1005") {
      server_error = 500;
      message = "Erro de Porta (Falha ao se conectar com o banco de dados).";
      return { server_error, message, details };
    } else if (error.code === "P2000") {
      server_error = 500;
      message = "Erro de migração: Tamanho do campo excedido.";
      return { server_error, message, details };
    } else if (error.code === "P2002") {
      /**
       * "modelName": "Motorista",
		"target": "motoristas_telefone_key"
       */
      if (error.meta) {
        const model = error.meta.modelName;
        if (model) {
          const err = error.message
            .split(" ")[36]
            .replace("(`", "")
            .replace("`)", "");

          let field = "";
          const data: any = error.meta.target;
          if (data == undefined) {
            field = err;
          } else {
            field = data[0];
          }

          server_error = 409;
          //message = `O(a) ${field} que pretende cadastrar já existe em ${model}s.`;
          //details = { model, field }; //Não achei bom entregar o nome do modelo.
          message = `O(a) '${field.toLowerCase()}' que pretende cadastrar já existe.`;
          details = { field };
        } else {
          const target = error.meta.target as string;
          const field = target.split("_")[1];

          server_error = 409;
          //message = `O(a) ${field} que pretende cadastrar já existe em ${model}s.`;
          //details = { model, field }; //Não achei bom entregar o nome do modelo.
          message = `O(a) ${field} que pretende cadastrar já existe.`;
          details = { field };
        }

        return { server_error, message, details };
      }
    } else if (error.code === "P2003") {
      /*
      "meta": {
        "modelName": "Quote",
        "field_name": "categoryId"
      },
      */
      if (error.meta) {
        const model = error.meta.modelName; //Não achei bonito entregar o nome da tabela
        const field = error.meta.field_name;
        server_error = 400;
        message =
          "Não é possível efetuar um registro com referência que não existe.";
        details = { field };
        return { server_error, message, details };
      }
    } else if (error.code === "P2004") {
      server_error = 500;
      message = "O banco de dados não encontrou o modelo ou a tabela.";
      return { server_error, message, details };
    } else if (error.code === "P2005") {
      server_error = 400;
      message = "Erro de tipo de dado (Informe os dados corretamente).";
      return { server_error, message, details };
    } else if (error.code === "P2006") {
      server_error = 400;
      message =
        "Violação de chave primária (Você não pode inserir um valor duplicado em uma chave primária).";
      return { server_error, message, details };
    } else if (error.code === "P2007") {
      server_error = 500;
      message = "Erro na migração, tabela inexistente.";
      return { server_error, message, details };
    } else if (error.code === "P2025") {
      server_error = 404;
      message = "Registro não encontrado.";
      return { server_error, message, details };
    } else if (error.code === "P2001") {
      server_error = 400;
      message = "Tipo de dado inválido em uma consulta.";
      return { server_error, message, details };
    } else if (error.code === "P2026") {
      server_error = 400;
      message = "Erro de consulta.";
      return { server_error, message, details };
    } else if (error.code === "P2021") {
      if (error.meta) {
        const model = error.meta.modelName;
        const target = error.meta.table as string;
        const field = target;

        const server_error = 500;
        const details = { model, field };
        const message = `A tabela '${model}' relacionada a esse serviço não existe.`;
        return { server_error, message, details };
      }
    }
  } else if (error instanceof PrismaClientInitializationError) {
    server_error = 500;
    message = "Falha ao conectar com o banco de dados.";
    return { server_error, message, details };
  } else if (error instanceof PrismaClientValidationError) {
    server_error = 400;
    //message = "O Banco de Dados detectou valor inválido em um campo.";
    message = error.message;
    return { server_error, message, details };
  }
  return { server_error: 500, details: {}, message: "" } as errorData;
};
