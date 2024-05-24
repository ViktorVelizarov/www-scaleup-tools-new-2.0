import prisma from "../../../../lib/prisma";

const add = async (req, res) => {
  const { title, image, description, tags } = req.body;
  // Create a new tool
  const newTool = await prisma.tool.create({
    data: {
      title: title.trim(),
      image: image.trim(),
      description: description.trim(),
    },
  });

  // Connect the tool with existing tags
  for (const tag of tags) {
    await prisma.toolTag.create({
      data: {
        tool_id: newTool.id,
        tag_id: parseInt(tag.value),
      },
    });
  }

  const updatedTools = await prisma.tool.findMany({
    include: {
      tags: {
        select: {
          tag: true,
        }
      }
    }
  });
  res.json(updatedTools);
}

export default add