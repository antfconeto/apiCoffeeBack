import Express,{ Router, Request, Response} from "express";

export interface IRouterManager{
  setupRouters():void
}

export class RouterManager implements IRouterManager{
  private router:Router;
  private app:any
  private prefixRouter:string
  constructor(app:any){
    this.app = app;
    this.router = Router()
    this.prefixRouter = '/coffee/api'
  }
  public setupRouters(): void {
    //main router
    this.router.get(`${this.prefixRouter}/`, async (req:Request, res:Response)=>{
      console.log(`❇️ Accessed main router!`)
      res.status(200).json({message: 'accessed'})
    })
    this.app.use(this.router)
  }

  private setupRoutersCoffeeEntity():void{
    
  }

}