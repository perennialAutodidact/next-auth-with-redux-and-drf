// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password, password2 } = req.body;

  console.log({ email, password, password2 });

  res.status(200).json({ message: "success" });
}
