import { Request, Response } from "express";
import {
  send_200_response,
  send_201_response,
  send_204_response,
  send_403_response,
  send_404_response,
  send_response_error,
  send_zod_response_error,
} from "../../utils/response";
import { userService } from "../../services/user.service";
import { listService } from "../../services/list.service";
import {
  accStatusSchema,
  createUserSchema,
  userIdSchema,
} from "../../schemas/user.schema";
import { adminService } from "../../services/admin/admin.service";
import { diaSchema } from "../../schemas/plan.schema";
import { planService } from "../../services/plan.service";

export const adminController = {
  async resetUserPassword(req: Request, res: Response) {},
  async total(_: Request, res: Response) {
    /*
    Total de Listas
    Total de Abertas
    Total de Fechadas
    Total de Processo
    Total de Compradas
    Total de Usuários
    */

    try {
      const users = await userService.all();
      const totalActives = users.filter(
        (u) => u.ativo === true && u.level !== 1,
      ).length;
      const totalDesactived = users.filter((u) => u.ativo === false).length;
      const lists = await listService.all();
      const total = lists.length;
      const totalOpen = lists.filter((l) => l.status === "OPEN").length;
      const totalFinished = lists.filter((l) => l.status === "FINISHED").length;
      const totalPurchased = lists.filter(
        (l) => l.status === "PURCHASED",
      ).length;
      const totalOnProcess = lists.filter(
        (l) => l.status === "ON_PROCESS",
      ).length;

      send_200_response(res, "Relatório do Sistema", {
        users,
        totalUsers: users.length,
        totalActives,
        totalDesactived,
        totalLists: total,
        totalOpen,
        totalFinished,
        totalPurchased,
        totalOnProcess,
      });
    } catch (error) {
      send_response_error(res, error);
    }
  },
  async accountStatus(req: Request, res: Response) {
    const userId = userIdSchema.safeParse(req.params);
    if (userId.error) {
      send_zod_response_error(res, userId.error);
      return;
    }

    const accStatus = accStatusSchema.safeParse(req.body);
    if (accStatus.error) {
      send_zod_response_error(res, accStatus.error);
      return;
    }

    try {
      const user = await userService.byId(userId.data.id);
      if (!user) {
        send_404_response(res, "Usuário não encontrado.");
        return;
      }

      //Verificar quem está a tentar desativar. E não permitir desativar ADMIN
      const myUser = await userService.byId((req as any).userId);
      if (myUser) {
        if (user.level === 1 && myUser.level !== 1) {
          send_403_response(res, "Você não pode desativar um ADMIN.");
          return;
        }

        if (user.level === 2 && myUser.level === 2) {
          send_403_response(res, "Você não pode desativar a sua conta.");
          return;
        }
      }

      const status = accStatus.data.status === "true" ? true : false;

      const newStatus = await userService.accStatus(user.id, status);
      if (newStatus) {
        send_204_response(res);
      }
    } catch (error) {
      send_response_error(res, error);
    }
  },
  async statusAllOwners(_: Request, res: Response) {
    try {
    } catch (error) {}
  },
  async create(req: Request, res: Response) {
    const adminData = createUserSchema.safeParse(req.body);
    if (adminData.error) {
      send_zod_response_error(res, adminData.error);
      return;
    }
    try {
      const created = await adminService.create(adminData.data);
      if (created) {
        send_201_response(res, "Administrador criado com sucesso.", created);
      }
    } catch (error) {
      send_response_error(res, error);
    }
  },
  async changePassword(req: Request, res: Response) {},
  async updatePlan(req: Request, res: Response) {
    try {
      const userId = userIdSchema.safeParse(req.params);
      if (userId.error) {
        send_zod_response_error(res, userId.error);
        return;
      }

      const diasData = diaSchema.safeParse(req.body);
      if (diasData.error) {
        send_zod_response_error(res, diasData.error);
        return;
      }

      const user = await userService.byId(userId.data.id);
      if (!user) {
        send_404_response(res, "Usuário não encontrado.");
        return;
      }

      if (user.ativo) {
        const updated = await planService.updateUserPlan(
          user.id,
          diasData.data.dias,
          user.planExpires!,
        );

        if (updated) {
          send_200_response(res, "Plano atualizado com sucesso.", updated);
          return;
        }
      }

      send_403_response(res, "Esta conta está temporariamente suspensa.");
    } catch (error) {
      send_response_error(res, error);
    }
  },
};
