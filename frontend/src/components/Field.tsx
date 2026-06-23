import { InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Field({ label, ...props }: FieldProps) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-800 outline-none
                   transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30
                   placeholder:text-slate-400"
      />
    </label>
  );
}
