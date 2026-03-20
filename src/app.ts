//Configuração do servidor
import cors from "cors";
import limiter from "./utils/rateLimiter";
import corsConfig from "./utils/corsCofig";
import express, { Application } from "express";
import helmetConfig from "./utils/helmetConfig";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

//Importação das rotas //////////////////////////////
import registerRoutes from "./routes";
import { resolveUploadPath } from "./middlewares/multerConfig";
/////////////////////////////////////////////////////

const app: Application = express();
//app.set("trust proxy", 1);

//Segurança na API
app.use(helmetConfig);
app.use(limiter);

//app.use(multerErrorHandler);
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Arquivos de upload
//resolveUploadPath();
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Rotas //////////////////////////////////////////////////
registerRoutes(app);
/////////////////////////////////////////////////////////

export default app;
