import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();

const { APP_PORT } = process.env;

const startServer = (): void => {
  try {
    const port: number = Number(APP_PORT) || 5000;
    app.start(port);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
