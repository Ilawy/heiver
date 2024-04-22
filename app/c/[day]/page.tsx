import Header from "@/lib/components/header";
import Client from "./client";
import { Link } from "@/lib/hash";

export default function cDayPage({ params: { day: dayKey } }: any) {
  const result = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(dayKey);
  if (result === null) return <NotValid />;
  const [day, month, year] = result.slice(1).map(Number);
  if ([day, month, year].some((x) => isNaN(x))) return <NotValid />;

  return (
    <>
      <Header>
        <Link href={"/c"}>Go Back</Link>
      </Header>
      <Client dayKey={dayKey} />
    </>
  );
}

function NotValid() {
  return (
    <>
      <h1>Not Valid</h1>
      <Link href={"/"}>
        HOME
      </Link>
    </>
  );
}
