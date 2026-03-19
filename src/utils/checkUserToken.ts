/*
//Exemplo de checagem de Token

import prisma from "../model/prisma.client";

export const checkUserToken = async (
  userId: number,
  role: string,
  token: string
): Promise<Boolean> => {
  //Promise<Response> => {
  if (role === "MOTORISTA") {
    const driver = await prisma.motorista.findUnique({
      where: {
        id: userId,
      },
      select: {
        driverToken: {
          select: {
            token: true,
          },
        },
      },
    });
    if(!driver){
      return false;
    }
    return true;
  }else if(role === "ADMIN" || role === "MODERADOR"){
    const admin = await prisma.admin.findUnique({
      where: {
        id: userId,
      },
      select: {
        adminToken: {
          select: {
            token: true,
          },
        },
      },
    });
    if(!admin){
      return false;
    }
    return true;
  }else if(role === "CLIENTE"){
    const client = await prisma.cliente.findUnique({
      where: {
        id: userId,
      },
      select: {
        clientToken: {
          select: {
            token: true,
          },
        },
      },
    });
    if(!client){
      return false;
    }
    return true;
  }
  return false;
};

(async () => {
  const response = await checkUserToken(
    1,
    "MOTORISTA",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJNT1RPUklTVEEiLCJpYXQiOjE3NDgyMDY5MjQsImV4cCI6MTc0ODgxMTcyNH0.332kvsktIEysvUAg5bIl9u-tFAD4z186xCuSv4QsL1s"
  )
  if(response){
    console.log("FOI")
  }else{
    console.log("INCORRETO.")
  }
})()
*/
