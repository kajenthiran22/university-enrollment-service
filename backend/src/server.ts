import app from "./app.js";
import { env, logger, connectToDatabase } from "./config";

const startServer = async (): Promise<void> => {
    try {
        await connectToDatabase();

        const server = app.listen(env.PORT, () => {
            logger.info({
                port: env.PORT,
                environment: env.NODE_ENV,
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