"use client"
import { Link } from "@/lib/hash";
import { useSearchParams } from "next/navigation";
import { ChevronLeft } from "react-feather";




export default function Goback() {
    const searchParams = useSearchParams()

    return <div>
    <Link href={searchParams.has("from") ? searchParams.get("from")! : "/"} className="flex items-center gap-1 text-lg font-bold">
      <ChevronLeft />
      Go Back
    </Link>
  </div>
}