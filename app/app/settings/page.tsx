import { getSession } from "@/lib/auth";
import { ChevronRight, Clock, Globe, User } from "react-feather";
import EditName from "./edit_name";
import { updateName, updateTimeZone } from "@/lib/actions";
import Tz from "./tz";

export default async function Profile() {
  const session = (await getSession())!;
    
  return (
    <main className="p-3 flex flex-col gap-3">
      <section className="flex items-center justify-between gap-3 bg-gray-50 p-3 border rounded-xl">
        <div className="flex-1 flex flex-col gap-3">
          <span className="flex gap-3 items-center">
            <User stroke="#15F5BA" />
            <span className="text-lg text-gray-600">Name</span>
          </span>
          <div>
            {session?.user.name}
          </div>
        </div>
        <div>
            <ChevronRight />
        </div>
      </section>
      <section className="flex items-center justify-between gap-3 bg-gray-50 p-3 border rounded-xl">
        <div className="flex-1 flex flex-col gap-3">
          <span className="flex gap-3 items-center">
            <Clock stroke="#15F5BA" />
            <span className="text-lg text-gray-600">Time zone</span>
          </span>
          <div>
            {session.user.timezone ? session.user.timezone : <i className="text-gray-600">Default</i>}
            <Tz updateTimeZone={updateTimeZone} />
          </div>
        </div>
        <div>
            <ChevronRight />
        </div>
      </section>
      <span className="w-fit" style={{
        viewTransitionName: "vesta",
      }}>Vesta</span>
    </main>
  );
}
