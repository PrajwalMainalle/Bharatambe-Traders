import { HiOutlineMenu } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultLogo from "../assets/SLLogo.png";
import { useTheme } from "./ThemeContext";
import { FaSun, FaMoon, FaClock } from "react-icons/fa";

const Headers = ({ onMenuClick }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { themeMode, theme, selectThemeMode } = useTheme();

  const getPageName = () => {
    const path = location.pathname.split("/").filter(Boolean);
    if (path.length === 0) return "Billing Portal";
    const segment = path[path.length - 1];
    if (segment === "home") return "Sales Dashboard";
    if (segment === "pos") return "Billing Terminal (POS)";
    if (segment === "invoices") return "Invoice History";
    if (segment === "inventory") return "Inventory & Products";
    if (segment === "reports") return "Reports & Business Auditing";
    if (segment === "settings") return "Settings & Profile";
    return segment.replace(/^\w/, (c) => c.toUpperCase());
  };

  const shopName = user?.profile?.shopName || user?.businessName || "SmartLedger";
  const logoSrc = user?.profile?.logo || defaultLogo;
  const ownerName = user?.ownerName || "Merchant Owner";

  return (
    <header className="flex items-center justify-between 
        bg-slate-900 border-b border-slate-800
        shadow px-6 h-16 text-slate-100 z-35">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded hover:bg-slate-800 text-slate-100"
        >
          <HiOutlineMenu size={22} />
        </button>
        <h1 className="text-sm md:text-base font-semibold tracking-wide text-slate-100">{getPageName()}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Cycle Button */}
        <button
          onClick={() => {
            const nextModes = { auto: "light", light: "dark", dark: "auto" };
            selectThemeMode(nextModes[themeMode]);
          }}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/50 hover:border-slate-600 transition flex items-center gap-1.5 shadow-sm"
          title={`Theme: ${themeMode === "auto" ? "Auto (Time-based)" : themeMode.toUpperCase()}`}
        >
          {themeMode === "auto" && (
            <>
              <FaClock className="text-orange-400 text-sm animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 hidden md:inline">AUTO</span>
            </>
          )}
          {themeMode === "light" && (
            <>
              <FaSun className="text-amber-500 text-sm" />
              <span className="text-[10px] font-bold text-slate-400 hidden md:inline">LIGHT</span>
            </>
          )}
          {themeMode === "dark" && (
            <>
              <FaMoon className="text-indigo-400 text-sm" />
              <span className="text-[10px] font-bold text-slate-400 hidden md:inline">DARK</span>
            </>
          )}
        </button>

        <div className="hidden lg:flex flex-col text-right">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Merchant Portal</span>
          <span className="text-xs font-semibold text-orange-400">{ownerName}</span>
        </div>
        <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-850 flex items-center justify-center border border-slate-800 overflow-hidden">
            <img src={logoSrc} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-xs text-slate-200 hidden sm:block truncate max-w-[120px]" title={shopName}>
            {shopName}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Headers;
