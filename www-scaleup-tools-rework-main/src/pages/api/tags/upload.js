import prisma from "../../../../lib/prisma";
import { filterData } from "@/components/Tools/filterConsts";

const handler = async (req, res) => {
   // filterData.map(async tag => {
  //   const newEvent = await prisma.tag.create({
  //     data: {
  //     title: tag.title,
  //     textId: tag.id,
  //     classNm: tag.classNm,
  //     name: tag.name,
  //     value: tag.value,
  //     labelFor: tag.labelFor,
  //     textColor: tag.textColor,
  //     bgColor: tag. bgColor,
  //     borderColor: tag.borderColor,
  //     bgColorTool: tag.bgColorTool,
  //   }});
  // });
  res.json({status: filterData.length});
}

export default handler;