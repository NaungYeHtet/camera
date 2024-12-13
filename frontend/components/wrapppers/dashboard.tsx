"use client";

import { ReactNode, useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { cn } from "@/utils";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function Dashboard({ children }: { children: ReactNode }) {
  const size = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (size.width && size.width > 800) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [size.width]);

  return (
    <>
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main
        className={cn(
          "transition-all mt-16 px-6",
          isOpen ? "md:ml-[230px]" : "ml-0"
        )}
      >
        {children}
      </main>
    </>
  );
}
