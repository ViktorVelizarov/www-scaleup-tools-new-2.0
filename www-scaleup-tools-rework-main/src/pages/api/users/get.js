import prisma from "../../../../lib/prisma";

const handler = async (req, res) => {
  console.log("getting users in API");
  const users = await prisma.users.findMany();
  res.status(200).json(users);
};

export default handler;
