import multer from "multer";
import path from "path";
import fs from "fs";
import { send_response } from "../utils/response";
import { NextFunction, Response } from "express";

export const resolveUploadPath = () => {
  const uploadPath = path.resolve(__dirname, "../uploads");
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
  tipo: string,
) => {
  if (file.mimetype.startsWith(tipo)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerErrorHandler = (err: any, res: Response, next: NextFunction) => {
  if (
    err instanceof multer.MulterError &&
    err.code === "LIMIT_UNEXPECTED_FILE"
  ) {
    send_response(
      res,
      "error",
      400,
      "Campo de upload não reconhecido. Verifique os nomes dos campos enviados.",
      {
        field: err.field,
      },
      {},
    );
    return;
  } else if (err instanceof multer.MulterError) {
    send_response(
      res,
      "error",
      400,
      "Erro ao fazer upload",
      { message: err.message },
      {},
    );
    return;
  }
  next();
};

export default {
  storage,
  fileFilter,
  multerErrorHandler,
};
