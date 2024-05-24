import prisma from "../../../../lib/prisma";

const update = async (req, res) => {
  const { id, title, image, description, tags } = req.body;
  // Update a tool
  const updatedTool = await prisma.tool.update({
    where: {id: id},
    data: {
      title: title.trim(),
      image: image.trim(),
      description: description.trim(),
    },
  });
  // Delete old connections in the SUT_tool_tag
  await prisma.toolTag.deleteMany({
    where: {
      tool_id: id,
    }
  })

  // Connect the updated tool with existing tags
  for (const tag of tags) {
    await prisma.toolTag.create({
      data: {
        tool_id: id,
        tag_id: parseInt(tag.value),
      },
    });
  }

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

export default update;
