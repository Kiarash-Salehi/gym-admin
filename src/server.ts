import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import { envConf } from "./internal/config/config";
import { mongoConn } from "./internal/db/mongo.persistence";
import { authRouter } from "./route/auth.route";
import { memberRouter } from "./route/member.route";
import { planRouter } from "./route/plan.route";
import { logger, requestLogHandler } from "./internal/log/logger";
import path from "path";
import { authenticateJWT } from "./middleware/auth.middleware";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import { coockiesHandler } from "./internal/util/cooky.util";
import { errorHandler } from "./internal/util/error.util";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout/main");
app.use("/static", express.static(path.join(__dirname, "public")));

// app middlewares
app.use(cors());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      // Add 'unsafe-inline' to allow inline script execution
      "script-src": ["'self'", "'unsafe-inline'"],
    },
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route handler
// -- request pre requirements
app.use(requestLogHandler);
app.use(coockiesHandler);

// app.use(authenticateJWT);

// -- request routers
app.use("/auth", authRouter);
app.use("/member", authenticateJWT, memberRouter);
app.use("/plan", authenticateJWT, planRouter);

// -- wrong route handler
app.get("*", authenticateJWT, (_req, res) => {
  res.redirect("/member/list");
});

// -- error handler
app.use(errorHandler);

const main = async () => {
  await mongoConn();
  app.listen(envConf.port, () =>
    logger.log("info", `app is listening on port ${envConf.port}`)
  );
};
main();
