import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import prisma from "../../../db";
import { ResultData } from "@/types";

async function profile() {
  const session = await getServerSession(options);

  let user;
  if (session?.user?.email) {
    user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      select: {
        id: true,
      },
    });
  }

  let savedPlans: any;
  if (user?.id) {
    savedPlans = await prisma.search.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  return (
    <>
      name: {session?.user?.name}
      email: {session?.user?.email}
      {session?.user?.image ? <img src={session?.user?.image} /> : undefined}
      {savedPlans.map((plan: any) => {
        return (
          <>
            <h3>{plan.destination}</h3>
            <h3>{plan.duration}</h3>
          </>
        );
      })}
    </>
  );
}

export default profile;
