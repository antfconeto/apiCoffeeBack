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
import cors from "cors";

const app = Express();
dotenv.config();

//------------ Configuração de CORS --------------
app.use(
  cors({
    origin: "http://localhost:3000", // Domínio que pode acessar o servidor
    methods: "GET,POST,PUT,DELETE", // Métodos permitidos
    allowedHeaders: "Content-Type,Authorization", // Cabeçalhos permitidos
  })
);

//------------ Setup Body Parsers ----------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//------------ Setup Routers ----------------
const routerManager: IRouterManager = new RouterManager(app);
routerManager.setupRouters();

//------------ Setup Graphql ----------------
const graphqlSetup: GraphqlSetup = new GraphqlSetup(app);
graphqlSetup.setupGraphql();

//------------ Rotas Testes ----------------
const port = process.env.PORT! || 5000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api-coffee-back-gei1xcjwt-antfconetos-projects.vercel.app/graphql",
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
  } catch (error: any) {
    res
      .status(500)
      .json({ error: `❌ Failed to fetch data, error: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log("✅ Server started on port", port);
});

module.exports = app;
