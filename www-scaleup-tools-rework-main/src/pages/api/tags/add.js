import prisma from "../../../../lib/prisma";

const add = async (req, res) => {
  const { title, textId } = req.body;
  const latestTag = await prisma.tag.findFirst({
    orderBy:{
      id: "desc",
    }
  });
  let colorIndx = latestTag.textColor.split("-").pop();
  colorIndx = colorIndx === "8" ? "1" : (parseInt(colorIndx) + 1).toString();
  // Create a new tag
  const newTag = await prisma.tag.create({
    data: {
      title: title.trim(),
      textId: textId.trim(),
      classNm: "jobs-inpts",
      name: "category",
      value: textId.trim(),
      labelFor: textId.trim(),
      textColor: "text-tag-color-" + colorIndx,
      bgColor: "hover:bg-tag-color-" + colorIndx,
      borderColor: "border-tag-color-" + colorIndx,
      bgColorTool: "bg-tag-color-" + colorIndx,
    },
  });

  const updatedTags = await prisma.tag.findMany({
     orderBy:{
      id: "desc",
    }
  });
  res.json(updatedTags);
};

export default add;
