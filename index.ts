import {RouterManager,IRouterManager } from './app/routers/router-manager'
import Express from 'express'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser';
const app = Express();
dotenv.config()

//------------ Setup Routers ----------------
const routerManager:IRouterManager = new RouterManager(app)
routerManager.setupRouters()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const port = process.env.PORT! || 5000
app.listen(port, () => {
  console.log("✅ Server started");
});
