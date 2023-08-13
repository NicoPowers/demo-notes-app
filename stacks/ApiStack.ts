import { Api, use, StackContext } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }: StackContext) {
  // Use DynamoDB table from StorageStack
  const { table } = use(StorageStack);

  // Create APi
  const api = new Api(stack, "Api", {
    customDomain: app.stage === "prod" ? "api.sst-demo-notes-app.click" : undefined,
    defaults: {
      authorizer: "iam",
      function: {
        bind: [table],
        environment: {
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
        },
      },
    },
    routes: {
      "GET /notes": "packages/functions/src/list.main",
      "POST /notes": "packages/functions/src/create.main",
      "GET /notes/{id}": "packages/functions/src/get.main",
      "PUT /notes/{id}": "packages/functions/src/update.main",
      "DELETE /notes/{id}": "packages/functions/src/delete.main",
      "POST /billing": "packages/functions/src/billing.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.customDomainUrl || api.url,
  });

  return { api };
}
