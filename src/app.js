import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

// sưagger
import swaggerUi from "swagger-ui-express";
import router from "./api/routes/index.js";
import { corsUrl, port } from "./config.js";
import docs from "./docs/index.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(docs));

// Routes v1 version
app.use("/v1", router);

/**
 * Any error handler middleware must be added AFTER you define your routes.
 */
// app.use(errorHandlerMiddleware);

process.once("SIGUSR2", () => {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", () => {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});

app.listen(port, () =>
  console.log(`
🚀 Docs swagger ready at: http://localhost:${port}/docs`)
);
