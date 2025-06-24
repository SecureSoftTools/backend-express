import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { NotFoundError } from "./utils/errors/NotFoundError";
import errorHandler from "./utils/error.handler";
import AppDataSource from "./database/db.config";
import { routes } from "./routes";

class App {
  public app: Express;
  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoutes();
  }

  configureMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.text());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: "http://localhost:5179",
      })
    );
    this.app.use(
      helmet({
        crossOriginResourcePolicy: {
          policy: "cross-origin",
        },
      })
    );
    this.app.use(morgan("dev"));
  }

  configureRoutes() {
    this.app.use("/api", routes);
    this.app.get(
      "/api/health",
      (_req: Request, res: Response, _next: NextFunction) => {
        res.send("Health check is working");
      }
    );
    // this.app.all("/*", (_req: Request, _res: Response, next: NextFunction) => {
    //   return next(new NotFoundError("Route not found"));
    // });
    this.app.use(errorHandler);
  }

  async start(port: number) {
    await this.connectToDb();

    this.app.listen(port, () => {
      console.info("----------------------------------------------------");
      console.info(`[Server]: Server is running on ${port}`);
      console.info(`Time : ${new Date()}`);
      console.info("----------------------------------------------------");
    });
  }

  private async connectToDb() {
    await AppDataSource();
  }
}

export const app = new App();
