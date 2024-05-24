import prisma from "../../../../lib/prisma";

const handler = async (req, res) => {
  const userArray = req.body;
  const newUsers = [];
  for (let i = 0; i < userArray.length; i++) {
    const user = userArray[i];
    const existingUser = user.id
      ? await prisma.users.findUnique({ where: { id: user.id } })
      : false;

    if (existingUser) {
      await prisma.users.update({
        where: { id: user.id },
        data: user,
      });
    } else {
      newUsers.push(user);
    }
  }
  const existingUsers = await prisma.users.findMany({
    where: {
      id: {
        notIn: userArray
          .filter((user) => user.id)
          .map((user) => user.id),
      },
    },
  });
  existingUsers.forEach(async (user) => {
    await prisma.users.delete({
      where: { id: user.id },
    });
  });
  // writing have to be in a separate function because of the problem with race condition
  if (newUsers.length) {
    await createNewUsers(newUsers);
  }
  res.status(200).end();
};

const createNewUsers = async (users) => {
  for (const user of users) {
    const result = await prisma.users.create({
      data: {
        email: user.email,
        role: user.role,
      },
    });
  }
  return true;
};

export default handler;
