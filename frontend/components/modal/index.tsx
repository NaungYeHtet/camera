"use client";

import { cn } from "@/utils";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ReactNode } from "react";

type BackdropProps = {
  className: string;
};

const Backdrop = ({ className }: BackdropProps) => (
  <DialogBackdrop
    transition
    className={cn(
      "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in",
      className
    )}
  />
);

type TitleProps = {
  className?: string;
  children: React.ReactNode;
};

const Title = ({ className, children }: TitleProps) => {
  return (
    <DialogTitle
      as="h3"
      className={cn(
        "text-xl font-semibold text-gray-900 dark:text-gray-400",
        className
      )}
    >
      {children}
    </DialogTitle>
  );
};

type PanelProps = {
  title: ReactNode;
  children: ReactNode;
};

const Panel = ({ title, children }: PanelProps) => {
  return (
    <DialogPanel
      transition
      className="relative transform overflow-hidden rounded-lg bg-white  dark:bg-gray-600 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
    >
      <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start ">
          <div className="mt-3 text-center sm:m-4 w-full sm:mt-0 sm:text-left">
            {title}
            <div className="mt-2">{children}</div>
          </div>
        </div>
      </div>
    </DialogPanel>
  );
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[5000]">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center w-full justify-center p-4 text-center sm:items-center sm:p-0">
          {children}
        </div>
      </div>
    </Dialog>
  );
}

Modal.Title = Title;
Modal.Panel = Panel;

export default Modal;
