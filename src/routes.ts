import { Router } from "express";
import aiToolRouter from "./modules/aiTool/aiTool.route";
import resumeRouter from "./modules/resume/resume.route";
import toolRouter from "./modules/tool/tool.route";

const routes: Router = Router();

routes.use("/ai-tools", aiToolRouter);
routes.use("/resume", resumeRouter);
routes.use("/tools", toolRouter);

export { routes };
