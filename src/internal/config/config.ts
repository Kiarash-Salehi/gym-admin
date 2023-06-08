export const envConf = {
  port: process.env.PORT as any,
  mongoUrl: process.env.MONGO_URL as any,
  jwtSecret: process.env.JWT_SECRET as any,
  jwtExpire: process.env.JWT_EXPIRE as any,
};
