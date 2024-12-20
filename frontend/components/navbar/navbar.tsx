import { cn } from "@/utils";
import Link from "next/link";
import { CiMenuBurger, CiSettings } from "react-icons/ci";

type NavbarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Navbar({ isOpen, toggleSidebar }: NavbarProps) {
  return (
    <nav
      className={cn(
        "fixed top-0 flex w-full justify-between z-[5000] bg-gray-700 p-3 transition-all",
        isOpen ? "sm:pl-[240px]" : "pl-3"
      )}
    >
      <button onClick={toggleSidebar} className="inset-0 bg-black">
        <CiMenuBurger />
      </button>

      <Link href={"/settings"}>
        <CiSettings />
      </Link>
    </nav>
  );
}
