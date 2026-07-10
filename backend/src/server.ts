import app from "./app.js";
import { config, logger } from "./config";
import { connectToDatabase } from "./config/database.js";

const startServer = async (): Promise<void> => {
    try {
        await connectToDatabase();

        const server = app.listen(config.PORT, () => {
            logger.info({
                port: config.PORT,
                environment: config.NODE_ENV,
            },
                "Server started successfully."
            );
        });

        server.on("error", (error: Error) => {
            logger.fatal({
                err: error,
            },
                "Server failed to start."
            );

            process.exit(1);
        });
    } catch (error) {
        logger.fatal({
            err: error,
        },
            "Failed to start application."
        );

        process.exit(1);
    }
};

startServer();