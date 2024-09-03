import prisma from "./db";

export async function findSearchWithPreferences(
  destination: string,
  duration: number,
  preferences: string[]
) {
  return await prisma.search.findFirst({
    where: {
      destination: destination.toLowerCase(),
      duration: duration,
      preferences: { equals: preferences.sort() },
    },
  });
}

export async function createSearch(
  destination: string,
  duration: number,
  response: string,
  preferences: string[]
) {
  return await prisma.search.create({
    data: {
      destination: destination.toLowerCase(),
      duration: duration,
      response: response,
      preferences: preferences.sort(),
    },
  });
}

export async function findSearchWithoutPreferences(
  destination: string,
  duration: number
) {
  return await prisma.search.findFirst({
    where: {
      destination: destination.toLowerCase(),
      duration: duration,
      preferences: {
        isEmpty: true,
      },
    },
  });
}
