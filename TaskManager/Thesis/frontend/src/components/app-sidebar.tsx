import { Fragment } from "react";
import { UserRoles } from "@/enums/enums";
import {
  BookCheck,
  ChevronsUpDown,
  Component,
  FolderDot,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import useAuth from "@/hooks/use-auth";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const SIDEBAR_ITEMS = [
  {
    title: "Tasks",
    path: "/",
    icon: <BookCheck size={20} strokeWidth={2} />,
    visible_to_roles: [UserRoles.Admin, UserRoles.Simple],
  },
  {
    title: "Categories",
    path: "/categories",
    icon: <Component size={20} strokeWidth={2} />,
    visible_to_roles: [UserRoles.Admin],
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <FolderDot size={20} strokeWidth={2} />,
    visible_to_roles: [UserRoles.Admin],
  },
  {
    title: "Users",
    path: "/users",
    icon: <Users size={20} strokeWidth={2} />,
    visible_to_roles: [UserRoles.Admin],
  },
];

function AppSidebar() {
  const { user } = useAuth();
  return (
    <aside
      className={cn(
        "fixed bottom-0 left-0 top-0 z-20 w-[50px] flex-col border-border bg-[#F9F9F9] transition-all duration-300 ease-in-out md:w-[280px] "
      )}
    >
      <AppLogo />
      <nav className="flex flex-1 flex-col overflow-y-auto p-2">
        <SidebarProfile />
        <ul className="no-scrollbar flex-1 space-y-1 overflow-y-auto">
          {SIDEBAR_ITEMS.filter((item) =>
            item.visible_to_roles.includes(user.role)
          ).map((item) => (
            <Fragment key={item.title}>
              <SidebarItem
                key={`${item.title}_${item.path}`}
                name={item.title}
                path={item.path}
                icon={item.icon}
              />
            </Fragment>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function AppLogo() {
  return (
    <div className="m-1 hidden cursor-default items-center justify-center rounded-sm border border-border bg-white py-2 md:flex">
      <div className="flex flex-col">
        <span className="text-center text-5xl font-bold text-[#242424]">
          TASK MANAGER
        </span>
        <span className="text-center text-sm font-thin tracking-widest text-[#323232]">
          Organize your tasks Better
        </span>
      </div>
    </div>
  );
}

function SidebarProfile() {
  const { signOut, user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mb-2 hidden md:block">
        <div className=" flex flex-row items-center justify-between rounded-lg border border-border bg-white p-2">
          <div className="flex flex-row items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>TG</AvatarFallback>
            </Avatar>
            <span>
              {user.firstName} {user.lastName}
            </span>
          </div>
          <ChevronsUpDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarItem({
  name,
  path,
  icon,
}: {
  name: string;
  path: string;
  icon: React.ReactNode;
}) {
  const { pathname } = useLocation();

  const isSelected = path === pathname;

  return (
    <Link
      className={cn(
        "group m-[1px] flex cursor-pointer flex-row rounded-lg border-border px-2 py-2 hover:bg-white hover:shadow-[0px_0px_2px_1px_hsl(var(--border))] ",
        isSelected && "bg-white shadow-[0px_0px_2px_1px_hsl(var(--border))]"
      )}
      to={path}
    >
      <div className="mr-2">{icon}</div>
      <span
        className={cn(
          "hidden text-base font-light tracking-wide text-[#747474] group-hover:text-[#000] md:block "
        )}
      >
        {name}
      </span>
    </Link>
  );
}

export default AppSidebar;
