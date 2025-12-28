import express, { urlencoded } from "express";
import type { Application } from "express";
import path from "node:path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/environmentVariables.ts";

const app: Application = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ENV.NODE_ENV === "development" ? "http://localhost:5173" : "",
  })
);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get(/^\/(?!api).*/, (_, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

const port = ENV.PORT;
app.listen(port, () => {
  console.log(`Server is running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`);
});

export default app;
