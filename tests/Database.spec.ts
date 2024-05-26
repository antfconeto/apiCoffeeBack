import { Sequelize } from "sequelize";
import Database from "../db/Database";
jest.mock("sequelize", () => {
  return {
    Sequelize: jest.fn().mockImplementation(() => {
      return {
        authenticate: jest.fn().mockReturnValue(true),
      };
    }),
  };
});

describe("Testing database connections", () => {
  const dbName = "dsads";
  const dbUser = "sdasd";
  const dbPass = "sadasd";
  const dbHost = "asdas";
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("shoud succesfull to connect in bd",()=>{
    const db = new Database(dbName, dbUser, dbPass, dbHost);
    const connect = db.connect()
    const dbQuery = db.useBd()
    expect(connect).toBe("connected on db")
    expect(dbQuery.authenticate()).toBeDefined
    
  })
  
});
