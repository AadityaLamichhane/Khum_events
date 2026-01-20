import "reflect-metadata";
import { DataSource } from "typeorm";
import Schemas  from "./schema"
import env from "../env";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: env.DATABASE_URL,

  // 🔹 POOL CONFIGURATION
  extra: {
    max: 50,                    // max connections
    min: 10,                    // min connections
    idleTimeoutMillis: 60000,
    connectionTimeoutMillis: 5000,
    statement_timeout: 30000,
    query_timeout: 60000,
    keepAlive: true,
  },

  synchronize: false, // true only in dev
  logging: env.MODE === "DEVELOPMENT",
  entities: [Schemas.adminSchema , Schemas.venturesSchema],
});
export default AppDataSource ; 