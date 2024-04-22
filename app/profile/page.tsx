import { getSession } from "@/lib/auth";
import ProfileSection from "./profileSection";
import { updateUser } from "@/lib/actions";
import { ChevronLeft } from "react-feather";
import { Link } from "@/lib/hash";

export default async function ProfilePage() {
  const session = (await getSession())!;
  return (
    <>
      <div className="flex flex-col p-3 gap-3">
        <div className="bg-[var(--color-a)] p-3 rounded-2xl">
          <div
            style={{
              viewTransitionName: "profile-pic",
            }}
            className="inline-block h-[48px] bg-[var(--color-c)] aspect-square rounded-full"
          >
          </div>
        </div>
        <div>
          <Link href="/" className="flex items-center gap-1 text-lg font-bold">
            <ChevronLeft />
            Go Back
          </Link>
        </div>
        <ProfileSection updateUser={updateUser} user={session.user} />
      </div>
    </>
  );
}
