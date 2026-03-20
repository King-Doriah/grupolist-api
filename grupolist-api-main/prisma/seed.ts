import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/client";
import prisma from "../src/model/prisma.client";
import { passwordHash } from "../src/utils/bcrypt";

async function main() {
  try {
    const admin = await prisma.user.create({
      data: {
        nome: "Miraldino Paulo Dória",
        senha: await passwordHash("@miraldino302"),
        telefone: 942225275,
        ativo: true,
        email: "miraldinodoria302@gmail.com",
        role: "ADMIN",
        level: 1,
      },
    });
    if (admin) {
      console.log("[+] Administrador registrado com sucesso.");

      const faqs = [
        {
          pergunta: "Quem é o criador desse sistema?",
          resposta:
            "Esse sistema foi criado por Miraldino Paulo Dória, um programador de 23 anos e fundador da Startup LaurinSoft Tecnologies.",
        },
        {
          pergunta: "O que é o GrupoList?",
          resposta:
            "É uma plataforma para acompanhar compras em grupo em tempo real. O dono cria uma lista, compartilha um token único no WhatsApp ou outro canal e todos acompanham cada etapa — sem perguntar no off.",
        },
        {
          pergunta: "Como funciona o token?",
          resposta:
            "Ao criar uma lista, um código único é gerado automaticamente (ex: ABBA7E28). Copie e cole no grupo. Qualquer pessoa com o token pode acompanhar, se a lista for pública.",
        },
        {
          pergunta: "Preciso de conta para acompanhar?",
          resposta:
            "Não! Participantes não precisam de conta. Apenas o dono da lista precisa de conta gratuita para criar e atualizar.",
        },
        {
          pergunta: "O que significa cada status?",
          resposta:
            "ABERTA: lista disponível. COMPRA FEITA: produto comprado. NO PROCESSO: produto está disponível para retirada do processo. ENCERRADA: todos já pagaram e retiraram.",
        },
        {
          pergunta: "Posso ter listas privadas?",
          resposta:
            'Sim. Ao criar ou editar, use o switch "Lista pública" para controlar a visibilidade. Você pode mudar quando quiser.',
        },
        {
          pergunta: "Quantas listas posso criar?",
          resposta: "No plano FREE tens 10 listas. No PRO é ilimitado.",
        },
        {
          pergunta: "Como recupero a minha senha?",
          resposta:
            'Clica em "Esqueci a senha" no login e segue as instruções por email.',
        },
        {
          pergunta: "Como compartilho minha lista?",
          resposta:
            "Após criar, copie o token com um toque e envie no grupo do WhatsApp.",
        },
      ];

      const faqCount = await prisma.faq.count();
      if (faqCount === 0) {
        await prisma.faq.createMany({ data: faqs });
        console.log("[+] FAQ's registradas com sucesso.");
      } else {
        console.log("[~] FAQ's já existem, ignorando.");
      }
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("[x] Administrador registrado com sucesso.");
      }
      console.log(error);
    }
  }
}

main()
  .catch((error) => {
    if (error) throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
