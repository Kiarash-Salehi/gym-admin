"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./internal/config/config");
const mongo_persistence_1 = require("./internal/db/mongo.persistence");
const auth_route_1 = require("./route/auth.route");
const member_route_1 = require("./route/member.route");
const plan_route_1 = require("./route/plan.route");
const logger_1 = require("./internal/log/logger");
const path_1 = __importDefault(require("path"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const cooky_util_1 = require("./internal/util/cooky.util");
const error_util_1 = require("./internal/util/error.util");
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use(express_ejs_layouts_1.default);
app.set("layout", "layout/main");
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "public")));
// app middlewares
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        // Add 'unsafe-inline' to allow inline script execution
        "script-src": ["'self'", "'unsafe-inline'"],
    },
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// route handler
// -- request pre requirements
app.use(logger_1.requestLogHandler);
app.use(cooky_util_1.coockiesHandler);
// app.use(authenticateJWT);
// -- request routers
app.use("/auth", auth_route_1.authRouter);
app.use("/member", auth_middleware_1.authenticateJWT, member_route_1.memberRouter);
app.use("/plan", auth_middleware_1.authenticateJWT, plan_route_1.planRouter);
// -- wrong route handler
app.get("*", auth_middleware_1.authenticateJWT, (_req, res) => {
    res.redirect("/member/list");
});
// -- error handler
app.use(error_util_1.errorHandler);
const main = async () => {
    await (0, mongo_persistence_1.mongoConn)();
    app.listen(config_1.envConf.port, () => logger_1.logger.log("info", `app is listening on port ${config_1.envConf.port}`));
};
main();
