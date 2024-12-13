"use client";

import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export type SidbarItem = {
  title: string;
  href: string;
  icon: ReactNode;
};

type SidebarItemProps = {
  item: SidbarItem;
};

export default function SidebarItem({
  item: { icon, href, title },
}: SidebarItemProps) {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={cn("flex items-center p-2 hover:text-red-900 rounded-md", {
          "bg-red-600 text-gray-200 hover:text-red-200": pathname == href,
        })}
      >
        <span className="mr-2">{icon}</span>
        {title}
      </Link>
    </li>
  );
}
