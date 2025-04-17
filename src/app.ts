import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import YAML from "yamljs";
import fs from "fs";
import { projectRouter } from "./routes/projectRoutes.js";
import { devRouter } from "./routes/devRoutes.js";

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 2010;
const swaggerDoc = YAML.load("./src/docs/swagger.yaml");
const app = express();
const routes = JSON.parse(fs.readFileSync("./src/utils/routes.json", "utf8"));

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATCH,DELETE",
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api", projectRouter(), devRouter());
app.use("/", (_req, res) => {
  res.json({
    message:
      "Welcome to the Project Management API, these are the available routes",
    routes: routes,
  });
});
app.listen(SERVER_PORT, () => {
  console.log(`Server on listening ${SERVER_PORT}`);
});
