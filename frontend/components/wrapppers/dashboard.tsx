import { ReactNode } from "react";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";

export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="ml-[230px] mt-16 px-6">{children}</main>
      {/* <AppFooter /> */}
    </>
  );
}
