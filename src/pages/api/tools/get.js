import prisma from "../../../../lib/prisma";

const get = async (req, res) => {
  const tools = await prisma.tool.findMany({
    include: {
      tags: {
        select: {
          tag: true,
        },
      },
    },
  });
  res.json(tools);
};

export default get;
