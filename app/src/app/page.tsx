"use client"
import { useSession } from "next-auth/react";

export default  function Home() {
  const { data: session, status, update } = useSession()
    return(
      <div>
        <p className="text-white">{session?.user?.name || "no user"}</p>
      </div>
    );
        
}
