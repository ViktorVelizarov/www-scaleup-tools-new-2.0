import prisma from "../../../../lib/prisma";

const deleteTag = async (req, res) => {
  const id = req.query.id;
  // Delete all connections in the SUT_tool_tag
  await prisma.toolTag.deleteMany({
    where: {
      tag_id: parseInt(id),
    },
  });
  // Delete all tags from 
  await prisma.tag.delete({
    where: {
      id: parseInt(id),
    },
  });
  const updatedTags = await prisma.tag.findMany({
    orderBy: {
      id: "desc",
    },
  });
  res.json(updatedTags);
}

export default deleteTag;