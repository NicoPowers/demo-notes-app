import { Table, Bucket } from "sst/constructs";
import { StackContext } from "sst/constructs";

export function StorageStack({ stack, app }: StackContext) {
  // Create the DynamoDB table
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: {
      partitionKey: "userId",
      sortKey: "noteId",
    },
  });

  // Create S3 Bucket
  const bucket = new Bucket(stack, "Uploads", {
    cors: [
      {
        maxAge: "1 day",
        allowedOrigins: ["*"],
        allowedHeaders: ["*"],
        allowedMethods: ["GET", "PUT", "POST", "HEAD"],
      },
    ],
  });

  return { table, bucket };
}
