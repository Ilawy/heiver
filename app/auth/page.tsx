import { login } from "@/lib/actions";
import Client from "./client";

export default function Page() {
  
  return (
    <main className="flex flex-col p-3 gap-3 min-h-[100svh]">
     <Client login={login} />
    </main>
  );
}



