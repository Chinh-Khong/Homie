"use client";

import { SessionProvider, useSession } from "next-auth/react";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <DebugSession />
      {children}
    </SessionProvider>
  );
}

function DebugSession() {
  const { data: session, status } = useSession();
  console.log("Session Status:", status);
  console.log("Session Data:", session);
  return null; // This component is only for debugging purposes.
}
