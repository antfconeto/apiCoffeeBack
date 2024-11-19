import { RouterManager, IRouterManager } from "./routers/router-manager";
import Express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { GraphqlSetup } from "./graphql/graphql-setup";
import {
  FirebaseConfigFactory,
  FirebaseService,
} from "./.firebase/firebase-setup";
import axios from "axios";
const app = Express();
dotenv.config();

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
  try {
    const response = await axios.post(
      "https://api-coffee-back-72cmssdh3-antfconetos-projects.vercel.app//graphql",
      {
        query: `
        query {
          listAllCoffees {
    id
    name
    description
    price
    createdAt
    updatedAt
          }
        }
      `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
app.listen(port, () => {
  console.log("✅ Server started");
});

module.exports = app;
