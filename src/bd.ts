//import { PrismaClient } from "@prisma/client";
// const { PrismaClient } = require("@prisma/client");

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

process.on("SIGTERM", () => {
  console.log("Disconnecting from database…");

  void prisma.$disconnect();
});

export default prisma;
