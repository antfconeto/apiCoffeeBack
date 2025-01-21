import { RouterManager, IRouterManager } from "./routers/router-manager";
import Express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { GraphqlSetup } from "./graphql/graphql-setup";
import { CustomConsoler } from "./utils/custom-consoler";
const app = Express();
dotenv.config();
//------------ Config logger ----------------
const consoler = new CustomConsoler()
//------------ Setup Routers ----------------
const routerManager: IRouterManager = new RouterManager(app);
routerManager.setupRouters();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//------------ Setup Graphql ----------------
const graphqlSetup: GraphqlSetup = new GraphqlSetup(app);
graphqlSetup.setupGraphql();
const port = process.env.PORT! || 5000;

app.get("/", async (req, res) => {
  res.send(200)
});
app.listen(port, () => {
  consoler.success("✅ Server started");
});

module.exports = app;
