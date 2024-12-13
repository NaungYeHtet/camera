"use client";

import Image from "next/image";
import avatar from "../../public/avatar.svg";
import { GrDashboard } from "react-icons/gr";
import SidebarItem, { SidbarItem } from "./sidebar-item";
import { Fragment, useEffect, useState } from "react";
import { cn } from "@/utils";
import { LiaTimesSolid } from "react-icons/lia";

const items: SidbarItem[] = [
  { title: "Dashboard", href: "/", icon: <GrDashboard /> },
];

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <section
      className={cn(
        "fixed top-0 px-2 pt-12 left-0 h-full w-[230px] bg-gray-100 text-gray-700 z-[5000] transition-transform",
        {
          "translate-x-0": isOpen,
          "-translate-x-full": !isOpen,
        }
      )}
    >
      <button
        className="md:hidden inline-flex absolute right-4 top-4"
        onClick={toggleSidebar}
      >
        <LiaTimesSolid />
      </button>
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
