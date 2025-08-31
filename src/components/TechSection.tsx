
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Chip, Cpu, HardDrive, Satellite, Shield, Signal, Zap } from "lucide-react";

const items = [
  { icon: Satellite, title: "ADCS & Control", text: "Reaction wheels + sensor fusion for precise attitude control." },
  { icon: Cpu, title: "On‑board Compute", text: "Edge ML for compression and anomaly detection." },
  { icon: HardDrive, title: "Power & Thermal", text: "Solar array + battery management, thermal pathways." },
  { icon: Signal, title: "Comms & Ground", text: "Telemetry, command uplink, and mission ops dashboard." },
  { icon: Shield, title: "Reliability", text: "Fail‑safe modes, watchdogs, HIL testing, safe re‑entry plan." },
  { icon: Zap, title: "Rapid Iteration", text: "Modular stack enabling quick payload swaps and updates." },
];

export default function TechSection() {
  return (
    <section id="tech" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Tech Stack</h2>
        <p className="mt-3 text-muted-foreground">
          A modular, test‑first stack spanning avionics, flight software, and mission operations.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {items.map((i) => (
            <Card key={i.title}>
              <CardHeader className="pb-2 flex items-center gap-3">
                <i.icon className="h-5 w-5" />
                <CardTitle className="text-base">{i.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{i.text}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
