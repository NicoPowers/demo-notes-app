import { Api, use, StackContext } from "sst/constructs";
import { StorageStack } from "./StorageStack";


export function ApiStack({stack, app} : StackContext) {
    // Use DynamoDB table from StorageStack
    const { table } = use(StorageStack)

    // Create APi
    const api = new Api(stack, "Api" , {
        defaults: {
            function: {
                bind: [table],                             
            }
        }, routes: {
            "GET /notes": "packages/functions/src/list.main",
            "POST /notes": "packages/functions/src/create.main",
            "GET /notes/{id}": "packages/functions/src/get.main",
            
        }
    });

    stack.addOutputs({
        ApiEndpoint: api.url,
    });
    

    return {api}
}