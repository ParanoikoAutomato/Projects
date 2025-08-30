import { HTMLAttributes } from "react";
import { RiVipDiamondLine } from "react-icons/ri";

import { cn } from "@/lib/utils";

import { Button, ButtonProps } from "./ui/button";

export type PageHeaderActionButton = {
  variant: ButtonProps["variant"];
  label?: string;
  icon: React.ReactNode;
  onClick: ButtonProps["onClick"];
  className?: HTMLAttributes<typeof Button>["className"];
};

type DatatableHeaderProps = {
  title: string;
  icon: JSX.Element;
  className?: string;
  actions?: PageHeaderActionButton[];
};

function PageHeader(props: DatatableHeaderProps) {
  const {
    title,
    icon = <RiVipDiamondLine size={28} />,
    className,
    actions = [],
  } = props;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex min-h-[40px] flex-row justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-2xl font-medium">{title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              onClick={action.onClick}
              size="sm"
              className={cn(action.className)}
            >
              {action.icon}
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

PageHeader.defaultProps = {
  hasCreate: false,
};

export default PageHeader;
