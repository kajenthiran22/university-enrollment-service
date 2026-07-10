import express from "express";
import routes from "./routes";
import { httpLogger } from "./middlewares/httpLogger.middleware";
import { APP } from "./constants/app.constants";

const app = express();

app.use(express.json());

app.use(httpLogger);

app.use(`/api/${APP.API_VERSION}`, routes);

export default app;

