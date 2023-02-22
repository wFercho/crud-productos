export const ENV = {
    DB_PORT:
      process.env.DB_PORT !== undefined ? parseInt(process.env.DB_PORT) : 5432,
    DB_HOST: process.env.DB_HOST,
    DB_USERPASS: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    APP_PORT: process.env.PORT,
    ID_ARCH_PLANO_DRIVE: process.env.ID_ARCH_PLANO_DRIVE,
    SERVER: process.env.SERVER || 'http://localhost:3000'
  };