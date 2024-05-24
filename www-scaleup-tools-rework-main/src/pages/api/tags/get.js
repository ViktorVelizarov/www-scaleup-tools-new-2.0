import prisma from "../../../../lib/prisma";

const handler = async (req, res) => {
  let sort = { title: "asc" };
  if(req.query.sort){
    sort = { id: req.query.sort };
  }
  try {
    const tags = await prisma.tag.findMany({
      orderBy: sort
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Unable to fetch tags'});
  }
}

export default handler;