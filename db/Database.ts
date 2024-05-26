import { Sequelize } from "sequelize";

export default class Database {
  private readonly dbName: string;
  private readonly dbUser: string;
  private readonly dbPass: string;
  private readonly dbHost: string;
  private sequelize: Sequelize;
  constructor(dbName: string, dbUser: string, dbPass: string, dbHost: string) {
    this.dbHost = dbHost;
    this.dbName = dbName;
    this.dbUser = dbUser;
    this.dbPass = dbPass;
    this.sequelize = new Sequelize(this.dbName, this.dbUser, this.dbPass, {
      dialect: "mysql",
      host: this.dbHost,
    });
  }
  connect(): string | Sequelize {
    try {
      this.sequelize.authenticate();
      this.sequelize.close();
      return "connected on db";
    } catch (e) {
      return "Erro em connectar ao db, e: " + e;
    }
  }
  useBd(): Sequelize {
    return this.sequelize;
  }
}
