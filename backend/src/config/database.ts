import mongoose from "mongoose";
import { env, logger } from "../config";
import { NODE_ENVS } from "../constants/env.constants";

export const connectToDatabase = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(env.MONGODB_URI, {
      autoIndex: env.NODE_ENV !== NODE_ENVS.PRODUCTION,
      serverSelectionTimeoutMS: 5000,
    });

    logger.info({
      database: mongoose.connection.name,
    },
      "MongoDB connected successfully."
    );

    mongoose.connection.on("error", (error: Error) => {
      logger.error({
        err: error,
      },
        "MongoDB connection error."
      );
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected.");
    });

  } catch (error: unknown) {
    logger.error({
      err: error,
    },
      "Failed to connect to MongoDB."
    );

    throw error;
  }
};


export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info("MongoDB disconnected successfully.");
  } catch (error: unknown) {
    logger.error({
      err: error,
    },
      "Failed to disconnect MongoDB."
    );

    throw error;
  }
};