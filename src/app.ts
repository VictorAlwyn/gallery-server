import "reflect-metadata";
import express from "express";
import GalleryRouter from "./routers/gallery";
import env from "./config/environment";
import connection from "./config/connection";
import validator from "./middleware/validator";
import cors from "cors";

const app = express();

export const basePath = __dirname;

const start = async (): Promise<void> => {
  try {
    await connection.sync();

    try {
      await connection.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

    app.use(cors());

    app.use(express.static(__dirname));

    app.use(express.json());

    app.use("/api/v1/gallery", GalleryRouter());

    app.use(express.static(__dirname));

    app.use(validator.validationErrorMiddleware);

    app.listen(env.port, () => {
      console.log(`Server started on port ${env.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
