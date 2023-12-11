export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;

      JWT_EXPIRES_IN: string;
      JWT_SECRET: string;

      APP_PASSWORD: string;
      EMAIL_USER: string;
      ID_CLIENT: string;
      REFRESH_TOKEN: string;
      SECRET_CLIENT: string;

      POSTGRES_DATABASE: string;
      POSTGRES_HOST: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_PRISMA_URL: string;
      POSTGRES_URL_NON_POOLING: string;
      POSTGRES_URL: string;
      POSTGRES_USER: string;
    }
  }
}

// declare module '*.html' {
//   const value: string;
//   export default value;
// }
