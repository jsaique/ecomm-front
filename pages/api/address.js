import { mongooseConnect } from "@/lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Address } from "@/models/Address";

export default async function handler(req, res) {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOptions);
  if (req.method === "PUT") {
    const address = await Address.findOne({ userEmail: user.email });
    if (address) {
      // Update the current user
      res.json(await Address.findByIdAndUpdate(address._id, req.body));
    } else {
      // Create a user
      res.json(await Address.create({ userEmail: user.email, ...req.body }));
    }
  }
  if (req.method === "GET") {
    const address = await Address.findOne({ userEmail: user.email });
    res.json(address);
  }
}
