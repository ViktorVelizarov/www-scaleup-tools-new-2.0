import prisma from "../../../../lib/prisma";

const deleteTool = async (req, res) => {
  const id = req.query.id;
  // Delete all connections in the SUT_tool_tag
  await prisma.toolTag.deleteMany({
    where: {
      tool_id: parseInt(id),
    },
  });
  // Delete tool from the database
  await prisma.tool.delete({
    where: {
      id: parseInt(id),
    }
  });

  const updatedTools = await prisma.tool.findMany({
    include: {
      tags: {
        select: {
          tag: true,
        },
      },
    },
  });
  res.json(updatedTools);
};

export default deleteTool;
