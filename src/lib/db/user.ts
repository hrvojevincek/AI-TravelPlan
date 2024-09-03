import prisma from "./db";

export async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

export async function createUser(id: string, name: string, email: string) {
  return await prisma.user.create({
    data: {
      id: id,
      username: name,
      email: email,
    },
  });
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function getUserSearches(email: string) {
  return await prisma.search.findMany({
    where: {
      user: { email: email },
    },
  });
}
