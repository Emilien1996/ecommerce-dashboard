export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
      ENV: 'test' | 'dev' | 'prod';
      DATABASE_URL : string
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME : string 
    }
  }
}
