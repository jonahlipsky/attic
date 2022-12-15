import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // res.status(200).json({ name: "John Doe" });

  if (req.method == "POST") {
    const sessionToken = req.cookies["next-auth.session-token"];
    console.log(sessionToken);
    const session = await prisma.session.findUnique({
      where: { sessionToken: sessionToken },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: session?.userId,
      },
    });

    const { accessKey, secretAccessKey } = req.body;

    // validation -- i want to verify here that there's a bucket called attic (or attic-dev for dev)
    const customerS3Client: S3Client = new S3Client({
      region: "us-east-2",
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
    });

    // instead of list buckets i could probably do a search for the exact bucket i want
    const command = new ListBucketsCommand({});
    try {
      const buckets = await customerS3Client.send(command);
      let bucketFound = false;
      let targetBucket = "attic";
      buckets.Buckets?.forEach((bucket) => {
        if (process.env.NODE_ENV !== "production") {
          targetBucket = "attic-dev";
        }

        if (bucket.Name == targetBucket) {
          bucketFound = true;
        }
      });
      if (bucketFound == false) {
        console.log("bucket not found");
        res.end;
      }
    } catch {
      console.log("credentials incorrect");
      res.end;
    }

    // key update

    res.end;
  }
};
