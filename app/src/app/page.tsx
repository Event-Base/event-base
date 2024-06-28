import { auth } from "@/auth";

export default async  function Home() {
  const session = await auth();
  const user = session?.user
    return(
      <div>
        <p >{user ? user.name : "No user"}</p>
      </div>
    );
        
}
