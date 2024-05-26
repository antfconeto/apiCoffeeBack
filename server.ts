import dotenv from "dotenv";
import Express from "express";
import Database from "./db/Database";
import bodyParser from "body-parser";
const router = require("./src/routers/router");
const app = Express();
//configurando variáveis de ambiente
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: ".env." + env });
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

//connectando ao bd
let db = new Database(dbName!, dbUser!, dbPass!, dbHost!).connect();
//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
//usando rotas
app.use(router);

export default app;
