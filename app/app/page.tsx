import { getSession } from "@/lib/auth";
import Client from "./client";

export default async function AppPage() {
  const session = await getSession();
  console.log(session);
  
  return (
    <>
      <Client />
    </>
  );
}
