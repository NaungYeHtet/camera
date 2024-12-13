import { cn } from "@/utils";
import { ReactNode } from "react";

type FieldLabelProps = {
  children?: ReactNode;
  id: string;
  className?: string;
};

const FieldLabel = ({ children, id, className }: FieldLabelProps) => (
  <label
    className={cn("mb-1 inline-block text-sm font-bold", className)}
    htmlFor={id}
  >
    {children}
  </label>
);

type ErrorMessageProps = {
  children?: string;
};

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  if (!children) return null;

  return (
    <p className="mt-1 text-sm text-red-500" role="alert">
      {children}
    </p>
  );
};

type FieldWrapperProps = {
  children?: ReactNode;
  errorMsg?: string;
};

const FieldWrapper = ({ children, errorMsg }: FieldWrapperProps) => (
  <div
    className={cn("border-2 border-transparent", {
      "border-2 border-red-400": errorMsg,
    })}
  >
    {children}
  </div>
);

type FieldGroupProps = {
  children: ReactNode;
};

function FieldGroup({ children }: FieldGroupProps) {
  return <div className="w-full">{children}</div>;
}

FieldGroup.Label = FieldLabel;
FieldGroup.ErrorMessage = ErrorMessage;
FieldGroup.Wrapper = FieldWrapper;

export default FieldGroup;
