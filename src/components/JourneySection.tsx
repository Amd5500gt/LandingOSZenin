import React from "react";
import { Clock, Compass, Flame, Layers } from "lucide-react";

export const JourneySection: React.FC = () => {
  return (
    <div className="relative pointer-events-auto">
      {/* SECTION 2: Plan your time */}
      <section
        id="rhythm"
        aria-label="Plan your time"
        className="min-h-screen flex flex-col justify-center items-center sm:items-start max-w-4xl mx-auto px-6 py-28 text-center sm:text-left"
      >
        <div className="max-w-2xl backdrop-blur-[2px] p-2 rounded-2xl">
          <p className="text-xs uppercase tracking-widest font-semibold text-indigo-700 mb-2">
            01. Daily Architecture
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 text-balance">
            Plan your time.
          </h2>
          <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed mb-8 text-balance">
            Time is finite, yet most planners treat it like an endless list. Zenin OS maps your real available hours first, giving your tasks, habits, and commitments room to breathe.
          </p>

          {/* Abstract concept cues (clean typography & subtle icons, no cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Rhythm Mapping</p>
                <p className="text-xs text-slate-600">Hours allocated to what matters before noise intrudes.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Task Blocks</p>
                <p className="text-xs text-slate-600">Dynamic workloads bounded by true capacity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Work with intention */}
      <section
        id="intention"
        aria-label="Work with intention"
        className="min-h-screen flex flex-col justify-center items-center sm:items-end max-w-4xl mx-auto px-6 py-28 text-center sm:text-right"
      >
        <div className="max-w-2xl backdrop-blur-[2px] p-2 rounded-2xl">
          <p className="text-xs uppercase tracking-widest font-semibold text-emerald-700 mb-2">
            02. Intentional Flow
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 text-balance">
            Work with intention.
          </h2>
          <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed mb-8 text-balance">
            Zenin OS turns your available time into an actionable daily schedule. When your calendar matches your natural human rhythm, focus stops feeling like friction.
          </p>

          {/* Abstract concept cues (clean typography & subtle icons, no cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 sm:justify-items-end text-left sm:text-right">
            <div className="flex items-start sm:flex-row-reverse gap-3">
              <Compass className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Focus Horizons</p>
                <p className="text-xs text-slate-600">Deep-work sprints with zero clutter.</p>
              </div>
            </div>

            <div className="flex items-start sm:flex-row-reverse gap-3">
              <Flame className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Rhythm Momentum</p>
                <p className="text-xs text-slate-600">Streak milestones & XP built around consistency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
