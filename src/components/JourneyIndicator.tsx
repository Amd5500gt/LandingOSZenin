import React from "react";

interface JourneyIndicatorProps {
  progress: number;
  onNavigate: (sectionId: string) => void;
}

export const JourneyIndicator: React.FC<JourneyIndicatorProps> = ({
  progress,
  onNavigate,
}) => {
  const steps = [
    { id: "hero", label: "Origin", at: 0.05 },
    { id: "rhythm", label: "01. Plan", at: 0.35 },
    { id: "intention", label: "02. Intend", at: 0.68 },
    { id: "download", label: "03. Launch", at: 0.95 },
  ];

  return (
    <aside
      aria-label="Journey Progress"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3 pointer-events-auto"
    >
      {steps.map((step) => {
        const isActive = Math.abs(progress - step.at) < 0.18;
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onNavigate(step.id)}
            className="group flex items-center gap-2 cursor-pointer focus:outline-none"
            aria-label={`Jump to ${step.label}`}
          >
            <span
              className={`text-[11px] font-medium tracking-wider transition-all duration-300 ${
                isActive
                  ? "text-slate-900 opacity-100 font-semibold"
                  : "text-slate-400 opacity-0 group-hover:opacity-100"
              }`}
            >
              {step.label}
            </span>
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-indigo-600 scale-125 shadow-xs"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
};
