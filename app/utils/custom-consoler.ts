import  {OperationLog} from '../interfaces/base-interfaces'
export class CustomConsoler{
    private logLevel: string;
    constructor(logLevel?:string){
        this.logLevel = logLevel || 'INFO'
    }

    log(message:string, operationType: OperationLog){
        console.log(`[${this.logLevel}] - ${operationType} - ${message}`)
    }
    
    success(message:string){
        console.log(`[${this.logLevel}] - ${OperationLog.SUCCESS} - ${message}`)
    }
    info(message:string){
        console.log(`[${this.logLevel}] - ${OperationLog.INFO} - ${message}`)
    }
    error(message:string,){
        console.log(`[${this.logLevel}] - ${OperationLog.ERROR} - ${message}`)
    }
    warn(message:string){
        console.log(`[${this.logLevel}] - ${OperationLog.WARNING} - ${message}`)
    }
    process(message:string){
        console.log(`[${this.logLevel}] - ${OperationLog.PROCESS} - ${message}`)
    }
}