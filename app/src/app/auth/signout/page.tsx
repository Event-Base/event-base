"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Signin() {
  const router = useRouter();
  const { status } = useSession();




  useEffect(() => {
    if (status === "authenticated") {
      signOut();
      
    }
    router.push("/")
  }, [status, router]);

  return <div></div>;
}