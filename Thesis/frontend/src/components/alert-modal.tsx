import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AlertModalProps = {
  title: string;
  description: string;
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  onSuccess: () => void;
};

function AlertModal({
  title,
  description,
  isOpen,
  setOpen,
  onSuccess,
}: AlertModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSuccess}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertModal;
