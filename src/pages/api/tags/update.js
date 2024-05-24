import prisma from "../../../../lib/prisma";

const update = async (req, res) => {
  const { id, title, textId } = req.body;
  // Update a tag
  const updatedTag = await prisma.tag.update({
    where: {id: id},
    data: {
      title: title.trim(),
      textId: textId.trim(),
      value: textId.trim(),
      labelFor: textId.trim(),
    },
  });

  const updatedTags = await prisma.tag.findMany({
    orderBy: {
      id: "desc",
    },
  });
  res.json(updatedTags);
}

export default update;