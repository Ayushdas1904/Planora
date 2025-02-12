import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { LiveblocksProvider } from "@liveblocks/react";

export default async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = await params; // Await params before using it
  auth();

  return<RoomProvider roomId={id}>
          {children}
        </RoomProvider>
  // return <div>{children}</div>
}
