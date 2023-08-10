import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { ApiStack } from "./stacks/ApiStack";
import { RemovalPolicy } from "aws-cdk-lib/core";
import { AuthStack } from "./stacks/AuthStack";
import { FrontendStack } from "./stacks/FrontendStack";

export default {
  config(_input) {
    return {
      name: "notes",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(ApiStack).stack(AuthStack).stack(FrontendStack);
    if (app.stage !== "production") {
      app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);
    }
  },
} satisfies SSTConfig;
