import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";

type ButtonVariant = React.ComponentProps<typeof Button>["variant"];

type ModalProps = {
  isOpen?: boolean;
  children: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  modalTitle: string;
  modalDescription?: string;
  actions?: SheetAction[];
};

type SheetAction = {
  title: string;
  variant?: ButtonVariant;
  isPending?: boolean;
  onClick?: () => void;
};

const Modal = ({
  isOpen = false,
  onOpen,
  onClose,
  modalTitle,
  modalDescription,
  children,
  actions = [],
}: ModalProps) => {
  const onOpenChange = (open: boolean) => {
    open
      ? typeof onOpen === "function" && onOpen()
      : typeof onClose === "function" && onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal>
      <DialogContent
        className="flex max-h-[80%] flex-col px-0 sm:max-w-2xl"
        onInteractOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-4">
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="px-4 sm:justify-end">
          {actions.map((action, index) => (
            // <DialogClose key={index} asChild>
            <Button
              key={index}
              variant={action.variant ?? "default"}
              type="submit"
              onClick={action.onClick}
            >
              {action.isPending && (
                <Loader2 className="animate-spin" size={24} />
              )}
              <span>{action.title}</span>
            </Button>
            // </DialogClose>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
