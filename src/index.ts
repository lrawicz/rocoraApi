import app from "./app";
import config from "./config/config";
import AppDataSource from "./dataSource";

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");

    app.listen(config.PORT, () => {
      console.log(`Server running at PORT: ${config.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit the process with failure
  }
}

startServer().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1); // Exit the process with failure
});


