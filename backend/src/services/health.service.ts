import mongoose from "mongoose";
import { APP } from "../constants/app.constants";

export const getHealthStatus = async () => {
    const database =
        mongoose.connection.readyState === 1
            ? APP.UP
            : APP.DOWN;

    return {
        status: database === APP.UP ? APP.UP : APP.DOWN,
        database,
        timestamp: new Date().toISOString(),
    };
};