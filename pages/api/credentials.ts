import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

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

    res.end;
  }
};
