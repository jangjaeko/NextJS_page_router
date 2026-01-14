import { NextApiRequest, NextApiResponse } from "next";

export default async function revalidateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
  } catch (err) {
    res.status(500).json({ message: "Error revalidating" });
    console.error("Revalidation error:", err);
  }
}
