import { Request, Response } from "express";
import {
  createListSchema,
  listIdSchema,
  listTokenSchema,
  listUpSchema,
} from "../schemas/list.schema";
import {
  send_200_response,
  send_201_response,
  send_204_response,
  send_400_response,
  send_401_response,
  send_403_response,
  send_404_response,
  send_409_response,
  send_response_error,
  send_zod_response_error,
} from "../utils/response";
import { listService } from "../services/list.service";
import { userService } from "../services/user.service";
import { getUserLimit, verifyFileExtension } from "../utils/funcs";
import { uploadToCloudinary } from "../utils/cloudinaryConfig";

export const listController = {
  async create(req: Request, res: Response) {
    const listData = createListSchema.safeParse(req.body);
    if (listData.error) {
      send_zod_response_error(res, listData.error);
      return;
    }
    try {
      const file = req.file as Express.Multer.File;
      if (file === null || file === undefined) {
        send_400_response(res, "Informe uma foto", {});
        return;
      }

      if (!verifyFileExtension(file)) {
        send_400_response(res, "Formato da imagem inválido.", {});
        return;
      }

      const foto: string | null = await uploadToCloudinary(
        file.buffer,
        file.originalname,
      );

      const userId = (req as any).userId;

      const user = await userService.byId(userId);
      if (!user?.ativo) {
        send_403_response(res, "Esta conta está temporariamente suspensa.");
        return;
      }

      console.log({ user, file });

      const limit = getUserLimit(user.plan!);
      const lists = await listService.byUserId(userId);
      if (lists.length >= limit) {
        send_403_response(
          res,
          "Você atingiu o limite de 10 listas do plano FREE.",
        );
        return;
      }

      const data = {
        produto: listData.data.produto,
        foto,
        disponivel: listData.data.disponivel === "true" ? true : false,
      };

      const produto = await listService.byProduto(userId, data.produto);
      if (Object.keys(produto).length > 0) {
        send_409_response(res, "Já existe um produto com esse nome.");
        return;
      }

      const list = await listService.create(userId, data);
      if (list) {
        send_201_response(res, "Lista criada com sucesso.", list);
        return;
      }
      send_400_response(res, "Erro ao criar lista.", {});
    } catch (error) {
      console.log({ error });
      send_response_error(res, error);
    }
  },
  async my(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const list = await listService.my(userId);
      if (Object.keys(list).length < 1) {
        send_404_response(res, "Nenhuma lista encontrada.");
        return;
      }
      send_200_response(res, "Minha lista", list);
    } catch (error) {
      send_response_error(res, error);
    }
  },
  async search(req: Request, res: Response) {
    const listToken = listTokenSchema.safeParse(req.params);
    if (listToken.error) {
      send_zod_response_error(res, listToken.error);
      return;
    }
    try {
      const list = await listService.search(listToken.data.token);
      if (!list) {
        send_404_response(res, "Nenhuma lista encontrada.");
        return;
      }
      send_200_response(res, "Lista encontrada.", list);
    } catch (error) {
      send_response_error(res, error);
    }
  },
  async upstatus(req: Request, res: Response) {
    const listId = listIdSchema.safeParse(req.params);
    if (listId.error) {
      send_zod_response_error(res, listId.error);
      return;
    }

    const listData = listUpSchema.safeParse(req.body);
    if (listData.error) {
      send_zod_response_error(res, listData.error);
      return;
    }

    try {
      const userId = (req as any).userId;

      //Verificar se o usuário logado é mesmo que criou a lista.
      const list = await listService.myById(userId, listId.data.id);
      if (!list) {
        send_404_response(res, "Lista não encontrada.");
        return;
      }

      const updated = await listService.upstatus(
        userId,
        list.id,
        listData.data,
      );
      if (updated) {
        send_204_response(res);
        return;
      }

      send_403_response(res, "Não foi possível atualizar a lista.");
    } catch (error) {
      send_response_error(res, error);
    }
  },
};
