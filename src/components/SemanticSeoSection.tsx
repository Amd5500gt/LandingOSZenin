import React from "react";
import { Check, Target, Zap } from "lucide-react";

export const SemanticSeoSection: React.FC = () => {
  return (
    <section
      id="details"
      aria-label="About Zenin OS"
      className="max-w-4xl mx-auto px-6 py-20 border-t border-slate-200/60"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        {/* What is Zenin OS? */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-700">
            <Target className="w-5 h-5" />
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              What is Zenin OS?
            </h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Zenin OS is an Android productivity system designed to help users organize tasks, habits, focus sessions and daily schedules around the time they actually have.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Built without bloated social feeds or marketing noise, it emphasizes quiet daily execution, thoughtful prioritization, and sustainable momentum on your mobile device.
          </p>
        </div>

        {/* What can Zenin OS help with? */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-700">
            <Zap className="w-5 h-5" />
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              What can Zenin OS help with?
            </h2>
          </div>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold text-slate-900">Daily task planning:</strong>{" "}
                Break complex obligations into clear, sequential daily agendas.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold text-slate-900">Personal scheduling:</strong>{" "}
                Calibrate time blocks according to real available daylight hours.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold text-slate-900">Habit tracking & daily rhythm:</strong>{" "}
                Maintain healthy daily patterns with non-intrusive reminder cadence.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold text-slate-900">Focus & deep work:</strong>{" "}
                Timed focus sessions that safeguard attention during critical sprints.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold text-slate-900">XP and streaks:</strong>{" "}
                Motivating progress milestones grounded in tangible execution.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold text-slate-900">Lightweight APK distribution:</strong>{" "}
                Direct, privacy-first Android package install with zero background telemetry.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
