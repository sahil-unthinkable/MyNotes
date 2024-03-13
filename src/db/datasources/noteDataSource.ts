import { DataSource, type DataSourceOptions } from "typeorm";
import sqliteParams from "../sqliteParams";
import * as migrations from "../migrations/note";
import * as entities from "../entities/note";

const dbName = "MY_NOTES";

const dataSourceConfig: DataSourceOptions = {
  name: "authorConnection",
  type: "capacitor",
  driver: sqliteParams.connection,
  database: dbName,
  mode: "no-encryption",
  entities: entities,
  migrations: migrations,
  subscribers: [],
  logging: [/*'query',*/ "error", "schema"],
  synchronize: false, // !!!You will lose all data in database if set to `true`
  migrationsRun: false, // Required with capacitor type
};
export const dataSourceNote = new DataSource(dataSourceConfig);
const noteDataSource = {
  dataSource: dataSourceNote,
  dbName: dbName,
};

export default noteDataSource;
