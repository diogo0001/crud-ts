import express from "express";
import cors from "cors";
import helmet from "helmet";
import { router } from "./routes/index.router";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/", router);

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

export default app;
