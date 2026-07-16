import express from "express";
import routes from "./routes";
import { httpLogger } from "./middlewares/httpLogger.middleware";
import { APP } from "./constants/app.constants";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";
import "./types/express.types";

const app = express();

app.use(express.json());

app.use(httpLogger);

app.use(`/api/${APP.API_VERSION}`, routes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
