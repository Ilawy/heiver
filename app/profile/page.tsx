import { getSession } from "@/lib/auth";
import ProfileSection from "./profileSection";
import { logout, updateUser } from "@/lib/actions";
import { PP } from "@/lib/components/header";
import Goback from "./goback";

export default async function ProfilePage() {
  const session = (await getSession())!;

  return (
    <>
      <div className="flex flex-col p-3 gap-3">
        <div className="bg-[var(--color-a)] p-3 rounded-2xl">
          <PP clickable={false} />
        </div>
        <Goback />
        <ProfileSection updateUser={updateUser} user={session.user} />
        <section>
          <form action={logout}>
            <input type="text" hidden readOnly value={"/"} name="redirectTo" />
            <button className="button">Logout</button>
          </form>
        </section>
      </div>
    </>
  );
}
