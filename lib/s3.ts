import { S3Client } from "@aws-sdk/client-s3";

declare global {
  var s3Client: S3Client | undefined;
}

const client = globalThis.s3Client || new S3Client({ region: "us-east-2" });

if (process.env.NODE_ENV !== "production") globalThis.s3Client = client;

export default client;
