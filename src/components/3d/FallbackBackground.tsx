import React from "react";

export const FallbackBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#FAF9F6]"
    >
      {/* Soft pastel ambient gradient orbs */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-100/60 via-cyan-100/40 to-transparent blur-3xl animate-ambient-pulse" />
      <div
        className="absolute top-[30%] left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-100/50 via-rose-100/35 to-transparent blur-3xl animate-ambient-pulse"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-[60%] right-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-emerald-100/45 via-amber-100/35 to-transparent blur-3xl animate-ambient-pulse"
        style={{ animationDelay: "6s" }}
      />
      <div
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-cyan-100/60 via-indigo-100/50 to-transparent blur-3xl animate-ambient-pulse"
        style={{ animationDelay: "9s" }}
      />

      {/* Subtle architectural geometric depth rings */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50%"
          cy="22%"
          r="260"
          fill="none"
          stroke="rgba(79, 70, 229, 0.08)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <circle
          cx="50%"
          cy="22%"
          r="380"
          fill="none"
          stroke="rgba(6, 182, 212, 0.06)"
          strokeWidth="1.5"
        />
        <circle
          cx="48%"
          cy="52%"
          r="320"
          fill="none"
          stroke="rgba(139, 92, 246, 0.07)"
          strokeWidth="1.5"
          strokeDasharray="12 10"
        />
        <circle
          cx="52%"
          cy="85%"
          r="290"
          fill="none"
          stroke="rgba(16, 185, 129, 0.08)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
