import React from "react";
import { FiUpload } from "react-icons/fi";
import clsx from "clsx";

interface InputsProps {
  type?: "text" | "password" | "email" | "number" | "file" | "textarea" | "select" | "skeleton" | "checkbox";
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  className?: string;
  icon?: React.ReactNode;
  value?: string;
  name?: string;
  disabled?: boolean;
  ref?: any
  children?: any
  defaultValue?: any;
  id?: string | number | undefined;
  checked?: boolean
}

const Inputs: React.FC<InputsProps> = ({ type = "text", placeholder, onChange, className, icon, value, name, disabled, ref, children, defaultValue, id, checked }) => {
  switch (type) {
    case "text":
    case "password":
    case "email":
    case "number":
      return (
        <div className="relative w-full">
          <input
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            className={clsx(
              "h-10 pl-9 w-full rounded-md border outline-none",
              "bg-zinc-100 focus:bg-zinc-200 border-gray-300 text-gray-900",
              "dark:bg-slate-900 dark:focus:bg-slate-800 dark:border-gray-600 dark:text-white", // Dark Mode
              { "cursor-not-allowed opacity-50": disabled },
              className
            )}
          />
          {icon && <span className="absolute text-gray-500 dark:text-gray-300 top-0 left-3 h-full w-fit p-3 pl-0 flex items-center">{icon}</span>}
        </div>
      );

    case "file":
      return (
        <div className="h-[150px] rounded-md relative border-dashed border-2 bg-zinc-100 dark:bg-slate-900 border-gray-300 dark:border-gray-600 cursor-pointer">
          <input
            ref={ref}
            type="file"
            accept="image/png, image/jpeg , image/jpg"
            onChange={onChange}
            className="w-full h-full opacity-0 cursor-pointer z-50 absolute"
            name={name}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] text-zinc-400 dark:text-gray-300 cursor-pointer">
            <FiUpload />
          </div>
        </div>
      );

    case "textarea":
      return (
        <textarea
          name={name}
          ref={ref}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full max-h-[400px] bg-zinc-100 dark:bg-slate-900 border-gray-300 dark:border-gray-600 border p-4 focus:outline-none focus:bg-zinc-200 dark:focus:bg-zinc-700 text-gray-900 dark:text-white"
        />
      );

    case "select":
      return (
        <div>
          <select
            ref={ref}
            name={name}
            value={value}
            onChange={onChange}
            className={clsx(
              "h-10 w-full rounded-md border outline-none",
              "bg-zinc-100 focus:bg-white border-gray-300 text-gray-900", // Light Mode
              "dark:bg-slate-900 dark:focus:bg-zinc-700 dark:border-gray-600 dark:text-white", // Dark Mode
              className
            )}
          >
            {children}
          </select>
        </div>
      );

    case "skeleton":
      return (
        <div className="animate-pulse w-full">
          <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
      );
    case "checkbox":
      return (
        <div className="relative w-full flex flex-row items-center gap-x-4">
          <input
            id={id}
            ref={ref}
            value={value}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className={clsx(
              "h-5 pl-9 rounded-md border outline-none",
              "bg-zinc-100 focus:bg-zinc-200 border-gray-300 text-gray-900",
              "dark:bg-slate-900 dark:focus:bg-zinc-700 dark:border-gray-600 dark:text-white",
              className
            )}
          />
          <label htmlFor={id} className="text-gray-700 dark:text-gray-200">{placeholder}</label>

        </div>

      )
    default:
      return (
        <div className="relative w-full">
          <input
            ref={ref}
            value={value}
            name={name}
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            className={clsx(
              "h-10 pl-9 w-full rounded-md border outline-none",
              "bg-zinc-100 focus:bg-zinc-200 border-gray-300 text-gray-900", // Light Mode
              "dark:bg-slate-900 dark:focus:bg-zinc-700 dark:border-gray-600 dark:text-white", // Dark Mode
              className
            )}
          />
          {icon && <span className="absolute text-gray-500 dark:text-gray-300 top-0 left-3 h-full w-fit p-3 pl-0 flex items-center">{icon}</span>}
        </div>
      );
  }
};

export default Inputs;
