import app from "./app";
import settings from "./config/settings";
import AppDataSource from "./dataSource";

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");

    app.listen(settings.PORT, () => {
      console.log(`Server running at PORT: ${settings.PORT}`);
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


