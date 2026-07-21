import express from "express";
import routes from "./routes";
import { httpLogger } from "./middlewares/httpLogger.middleware";
import { APP } from "./constants/app.constants";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";
import "./types/express.types";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import helmet from "helmet";
import { globalRateLimiter } from "./middlewares/rate-limit.middleware";

const app = express();

const swaggerDocument = YAML.load(
    path.join(process.cwd(), "openapi.yaml"),
);

app.use(helmet());

app.use(globalRateLimiter);

app.use(express.json());

app.use(httpLogger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(`/api/${APP.API_VERSION}`, routes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
