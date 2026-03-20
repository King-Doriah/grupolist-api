-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'OWNER');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "ListStatus" AS ENUM ('OPEN', 'PURCHASED', 'ON_PROCESS', 'FINISHED');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,
    "token" TEXT,
    "role" "Roles" NOT NULL DEFAULT 'OWNER',
    "plan" "Plan",
    "planExpires" TIMESTAMP(3),
    "level" INTEGER NOT NULL DEFAULT 3,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listas" (
    "id" TEXT NOT NULL,
    "produto" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "status" "ListStatus" NOT NULL DEFAULT 'OPEN',
    "disponivel" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "listas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_telefone_key" ON "usuarios"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "listas_token_key" ON "listas"("token");

-- CreateIndex
CREATE UNIQUE INDEX "faqs_pergunta_key" ON "faqs"("pergunta");

-- CreateIndex
CREATE UNIQUE INDEX "faqs_resposta_key" ON "faqs"("resposta");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_key" ON "password_reset"("token");

-- AddForeignKey
ALTER TABLE "listas" ADD CONSTRAINT "listas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
