const env = {
  port: Number(process.env.PORT),
  jwtSecret: process.env.JWT_SECRET as string,
  jwtRefreshSecret: process.env.JWT_REFRESH as string,
  environment: process.env.ENVIRONMENT as string,
  host: process.env.HOST as string,
  paymentSecret: process.env.PAYMENT_SECRET as string,
  databaseUrl: process.env.DATABASE_URL as string,
  emailUser: process.env.EMAIL_USER as string,
  emailPass: process.env.EMAIL_PASS as string,
  frontUrl: process.env.FRONT_URL as string,
};

export default env;
