import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import { cn } from "@/lib/utils";
import AppSidebar from "@/components/app-sidebar";

function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <AppSidebar />
      <div className="bg-[#F9F9F9] p-1">
        <div
          className={cn(
            "ml-[50px] flex h-[calc(100dvh-8px)] flex-col rounded-xl border border-border bg-white md:ml-[280px]"
          )}
        >
          {children ? children : <Outlet />}
        </div>
      </div>
    </>
  );
}

export default AppLayout;
