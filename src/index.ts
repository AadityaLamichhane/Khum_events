import  pool from "./config/db";
import server from "./config/server";
import env from "./config/env";
import routeInit from "./routes";
import logger from "./config/logger";
import errorHandler from "./middlewares/errorHandler";

const startServer = async () => {
  try {
    // Connect to database
    const client = await pool.connect();
    client.release();
    logger.info("✅ Database connected");
    
    // Initialize routes
    await routeInit(server);

    // Add error handler (must be last)
    errorHandler(server);

    // Start server
    server.listen(env.PORT, () => {
      logger.info(`🚀 Server is running at port ${env.PORT}`);
    });
  } catch (err:any) {
    logger.error("❌ Server startup failed:", err);
    process.exit(1);
  }
};

startServer();
