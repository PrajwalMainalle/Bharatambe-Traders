import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingOverlay = ({ message = "Loading data..." }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center pointer-events-auto select-none">
      <div className="flex flex-col items-center gap-3 text-slate-100 p-6 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl">
        <FaSpinner className="animate-spin text-orange-500 text-3xl" />
        <span className="text-sm font-semibold tracking-wide">{message}</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
