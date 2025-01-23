import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";

import { config } from "./config/config.js";
import { requestLogger } from "./middleware/logger.js";
import requestRoutes from "./routes/requestRoutes.js";

const app: Express = express();

app.use(cors(config.cors));
app.use(bodyParser.json());
app.use(requestLogger);

app.use("/api", requestRoutes);

app.use((err: Error, _: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send({
    status: "error",
    message: "Something went wrong!",
  });
});

export { app };

if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(config.port, () => {
    console.info(`Server is running on port ${config.port}`);
  });
}
