import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function FormField({
  label,
  hint,
  error,
  actionLabel,
  onAction,
  id,
  className,
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold text-[#111]">
        {label}
      </label>
      <div
        className={cn(
          "flex items-center h-11 px-3 rounded-lg border bg-white",
          error ? "border-red-500" : "border-[#e5e7eb]",
        )}
      >
        <input
          id={id}
          className={cn(
            "flex-1 min-w-0 text-sm text-[#111] placeholder:text-[#aaa] outline-none bg-transparent",
            className,
          )}
          {...inputProps}
        />
        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="ml-2 shrink-0 text-[11px] font-bold text-blue-600 cursor-pointer"
          >
            {actionLabel}
          </button>
        )}
      </div>
      {error ? (
        <p className="text-[11px] text-red-500">{error}</p>
      ) : (
        hint && <p className="text-[11px] text-[#999]">{hint}</p>
      )}
    </div>
  );
}
