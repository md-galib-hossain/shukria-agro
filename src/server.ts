import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
let server: Server;
const dbUrl = config.database_url
const port = config.port;
async function main() {
  try {
    await mongoose.connect(dbUrl as string);
    server = app.listen(port, () => {
      console.log(`App is listening on port: ${port}`);
    });
  } catch (err) {
    console.log(err)
  }
}
main()

process.on('unhandledRejection', (err) => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    }
    process.exit(1);
  });
  
  process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
  });
  