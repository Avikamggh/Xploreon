
import { CheckCircle2, Loader2, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Milestone = {
  title: string;
  status: "done" | "in-progress" | "planned";
  date?: string;
  note?: string;
};

const milestones: Milestone[] = [
  { title: "Concept & Systems Architecture for Xplovis‑1", status: "done", date: "2025‑03", note: "Reusable LEO demo with Earth return" },
  { title: "Team Assembly & University Collaborations", status: "in-progress", date: "2025‑06", note: "Intern cohort & advisors" },
  { title: "Avionics Bring‑Up & Software Stack", status: "in-progress", note: "On‑board compute, telemetry, ground station" },
  { title: "Mechanical Design & Fabrication Readiness", status: "in-progress", note: "Structure, thermal, power budgets" },
  { title: "Environmental & Hardware‑in‑the‑Loop Testing", status: "planned", note: "Vibe/thermal‑vac; fail‑safe modes" },
  { title: "Range Coordination & Launch Integration", status: "planned", note: "LEO insertion window selection" },
  { title: "Xplovis‑1 30‑Day On‑Orbit Trial", status: "planned", note: "Experiments & controlled de‑orbit/return" },
];

function StatusIcon({ s }: { s: Milestone["status"] }) {
  if (s === "done") return <CheckCircle2 className="h-5 w-5" />;
  if (s === "in-progress") return <Loader2 className="h-5 w-5 animate-spin-slow" />;
  return <Rocket className="h-5 w-5" />;
}

export default function MissionTracker() {
  return (
    <section id="mission" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Mission Tracker</h2>
        <p className="mt-3 text-muted-foreground">
          High‑level milestones for the Xplovis‑1 program. Dates reflect current planning and may adjust as we test, learn, and iterate.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {milestones.map((m) => (
            <Card key={m.title}>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <StatusIcon s={m.status} />
                <CardTitle className="text-base">{m.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {m.date && <div><span className="font-medium">Target: </span>{m.date}</div>}
                {m.note && <div className="mt-1">{m.note}</div>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
