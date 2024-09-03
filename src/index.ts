import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const searches = await prisma.search.findMany();
  console.log(searches);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
