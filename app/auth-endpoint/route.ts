import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { sessionClaims } = await auth();

  if (!sessionClaims?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = sessionClaims.email as string;
  const fullName = sessionClaims.fullName as string;
  const avatar = sessionClaims.image as string;

  const { room } = await req.json();
  
  const session = liveblocks.prepareSession(userEmail, {
    userInfo: {
      name: fullName,
      email: userEmail,
      avatar: avatar,
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", userEmail)
    .get();

  const userHasAccess = usersInRoom.docs.find((doc) => doc.id === room);

  if (userHasAccess) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    return new Response(body, { status });
  } else {
    return NextResponse.json({ error: "Unauthorized Access to this room" }, { status: 403 });
  }
}
