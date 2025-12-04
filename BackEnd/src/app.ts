import express from "express";
import cors from "cors";
import { appConfig } from "./utils/config";
import { actionRouter } from "./Controllers/actionController";

async function bootstrap() {
  console.log("DB is working");

  const server = express();

  server.use(
    cors()
  );

  server.use(express.json());

  server.use(actionRouter);

  server.get("/ping", (_req, res) => {
    console.log("GET /ping hit");
    res.send("pong");
  });

  server.listen(appConfig.port, () => {
    console.log(
      `Express server started.\nhttp://localhost:${appConfig.port}`
    );
  });
}

bootstrap().catch((err) => {
  console.error("Fatal error during server startup");
  console.error(err);
  process.exit(1);
});
