import { SSMClient } from "@aws-sdk/client-ssm";

declare global {
  var ssmClient: SSMClient | undefined;
}

const client = globalThis.ssmClient || new SSMClient({ region: "us-east-2" });

if (process.env.NODE_ENV !== "production") globalThis.ssmClient = client;

export default client;
