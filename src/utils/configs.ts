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
  resend: process.env.RESEND_API_KEY as string,
  brevoUser: process.env.BREVO_USER as string,
  brevoPass: process.env.BREVO_PASS as string,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
  cloudApiKey: process.env.CLOUDINARY_API_KEY as string,
  cloudApiSec: process.env.CLOUDINARY_API_SECRET as string,
};

export default env;
