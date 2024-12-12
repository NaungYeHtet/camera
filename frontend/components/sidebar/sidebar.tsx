import Image from "next/image";
import avatar from "../../public/avatar.svg";
import { GrDashboard } from "react-icons/gr";
import SidebarItem, { SidbarItem } from "./sidebar-item";
import { Fragment } from "react";

const items: SidbarItem[] = [
  { title: "Dashboard", href: "/", icon: <GrDashboard /> },
];

export default function Sidebar() {
  return (
    <section className="w-[230px] pt-7 px-3 top-0 left-0 bg-gray-100 text-gray-700 fixed h-full">
      <div className="inline-flex w-full justify-center">
        <Image
          className="rounded-full border border-gray-500"
          src={avatar}
          alt="Avatar Image"
          width={50}
        />
      </div>
      <ul className="flex flex-col mt-3">
        {items.map((item) => (
          <Fragment key={item.title}>
            <SidebarItem item={item} />
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
