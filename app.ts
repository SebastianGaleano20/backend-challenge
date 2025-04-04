import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import YAML from "yamljs";
import { projectRouter } from "@/routes/projectRoutes";
import { devRouter } from "./src/routes/devRoutes";

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 2010;
const swaggerDoc = YAML.load("./src/docs/swagger.yaml");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATH,DELETE",
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api", projectRouter(), devRouter());
app.listen(SERVER_PORT, () => {
  console.log(`Server on listening ${SERVER_PORT}`);
});
