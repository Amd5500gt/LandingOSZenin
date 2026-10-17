import React from "react";
import { CalendarDays, Check, Clock3, Flame, Layers3, MoveUpRight, Target } from "lucide-react";

const features = [
  {
    icon: Clock3,
    number: "01",
    title: "Make time visible",
    copy: "Start with the hours you really have. Shape a day that fits your life, not an endless to-do list.",
    className: "feature-lilac",
  },
  {
    icon: Layers3,
    number: "02",
    title: "Find your next step",
    copy: "Turn priorities into a clear, practical schedule with enough breathing room to stay on track.",
    className: "feature-mint",
  },
  {
    icon: Flame,
    number: "03",
    title: "Build gentle momentum",
    copy: "Keep meaningful habits in view and celebrate showing up, one consistent day at a time.",
    className: "feature-peach",
  },
];

export const JourneySection: React.FC = () => {
  return (
    <>
      <section id="rhythm" aria-label="Plan your time" className="rhythm-section content-section">
        <div className="section-heading">
          <p className="eyebrow eyebrow-centered">Less overwhelm, more intention</p>
          <h2>A little structure.<br /><span>A lot more clarity.</span></h2>
          <p>Zenin brings your tasks, routines, and focus into one thoughtful daily rhythm.</p>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, number, title, copy, className }) => (
            <article className={`feature-card ${className}`} key={number}>
              <div className="feature-card-top"><span className="feature-icon"><Icon size={21} /></span><span className="feature-number">{number}</span></div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <div className="feature-decoration" aria-hidden="true"><span /><span /><span /></div>
            </article>
          ))}
        </div>
      </section>

      <section id="intention" aria-label="Work with intention" className="intention-section content-section">
        <div className="intention-visual" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="intention-center"><Target size={31} strokeWidth={1.5} /></div>
          <span className="orbit-point point-one"><Check size={14} /></span>
          <span className="orbit-point point-two"><CalendarDays size={15} /></span>
          <span className="orbit-point point-three"><Clock3 size={15} /></span>
        </div>
        <div className="intention-copy">
          <p className="eyebrow"><span className="eyebrow-mark" /> Your day, designed around you</p>
          <h2>Focus on what<br />feels <span>important.</span></h2>
          <p>When your plan reflects your real capacity, it’s easier to begin—and easier to keep going. Zenin helps you make space for focused work, everyday routines, and a life beyond your checklist.</p>
          <ul className="intention-list">
            <li><span><Check size={14} /></span>Plan around your available hours</li>
            <li><span><Check size={14} /></span>Keep priorities and habits together</li>
            <li><span><Check size={14} /></span>Make progress without the pressure</li>
          </ul>
          <a className="text-link" href="#details">Explore the features <MoveUpRight size={16} /></a>
        </div>
      </section>
    </>
  );
};
