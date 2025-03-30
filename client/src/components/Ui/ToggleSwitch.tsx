import { LuMoon } from "react-icons/lu";
import { FiSun } from "react-icons/fi";
import { useEffect } from "react";
import { useTheme } from "../../context/ThemeProvider";

export default function ToggleSwitch() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  return (
    <div
      className="flex items-center gap-3 rounded-full shadow-inner w-[60px] h-7 bg-zinc-100 dark:bg-slate-600 cursor-pointer"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      <div
        className={`w-7 h-7 rounded-full bg-black/95 dark:bg-white grid place-content-center transition-transform ${isDarkMode ? "translate-x-[32px]" : "translate-x-0"
          }`}
      >
        {!isDarkMode ? <FiSun className="text-white" /> : <LuMoon className="text-white dark:text-black" />}
      </div>
    </div>
  );
}
