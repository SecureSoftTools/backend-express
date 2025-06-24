import { Router } from "express";
import aiToolRouter from "./modules/aiTool/aiTool.route";
import resumeRouter from "./modules/resume/resume.route";
import toolRouter from "./modules/tool/tool.route";
import packageRouter from "./modules/package/package.route";

const routes: Router = Router();

routes.use("/ai-tools", aiToolRouter);
routes.use("/resume", resumeRouter);
routes.use("/tools", toolRouter);
routes.use("/packages", packageRouter);

export { routes };
