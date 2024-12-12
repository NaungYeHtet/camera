import { SIDEBAR_WIDTH } from "@/utils/constants";
import Link from "next/link";
import { CiSettings } from "react-icons/ci";

export default function Navbar() {
  return (
    <nav
      className={`fixed top-0 flex w-full justify-end bg-gray-700 p-3 pl-[230px]`}
    >
      <Link href={"/setting"}>
        <CiSettings />
      </Link>
    </nav>
  );
}
