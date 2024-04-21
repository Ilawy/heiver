import Header from "@/lib/components/header";
import { createCalendar } from "@/lib/utils";
import DateSelector, { DateDisplay } from "./DateSelector";
import Client from "./client";

export default async function CalendarPage() {
  const YEAR = 2024;
  const MONTH = 1;
  return (
    <main className="min-h-screen p-3 grid grid-cols-2 gap-3">
     <Client date={[MONTH, YEAR]} />
    </main>
  );
}
