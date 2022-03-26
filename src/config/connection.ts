import { Sequelize } from "sequelize-typescript";
import { Gallery } from "../model/gallery-model";
import env from "./environment";

const connection = new Sequelize({
  dialect: "mysql",
  port: env.db.port,
  host: env.db.hostname,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  logging: false,
  models: [Gallery],
});

export default connection;
