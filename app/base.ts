export async function handlerEvent(_: any, args: any, context: any, info: any) {
    const fieldName = info.fieldName; 
    const requestHeaders = context; 
    const returnType = info.returnType; 
    console.log(`🎫 Received requisition type: ${fieldName}, with arguments: ${JSON.stringify(args)}`)
    // Exemplo de uso
    switch(fieldName) {
        case 'getCoffeeById':
            return 'De todos os homens o lucas é o mais gay!!!';
        case 'getCoffees':
            return 'handleGetCoffees()';
        default:
            throw new Error(`Handler not found for: ${fieldName}`);
    }
}