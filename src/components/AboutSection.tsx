
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About Xploreon</h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Xploreon is an Indian space‑tech company building agile, reusable, small‑satellite systems
              aimed at rapid experimentation in Low Earth Orbit (LEO). Our first mission, <span className="font-semibold">Xplovis‑1</span>,
              targets a 30‑day LEO demo with Earth‑return capability. We’re designing a controllable 5–8 kg
              spacecraft with reaction wheels, solar power, on‑board compute, and a ground station stack
              to enable real‑time experiments and safe recovery.
            </p>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Xploreon is led by <span className="font-semibold">Avikam Deol</span> (Founder & CEO) and supported by mentors at
              academic incubators including the <span className="font-semibold">TIDES Business Incubator at IIT Roorkee</span>.
              We are assembling a hands‑on team of aerospace engineers, software developers, and makers
              who believe in fast iteration and transparent engineering.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Mission Focus</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Reusable CubeSat‑class platform; rapid prototyping; safe Earth return.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Near‑Term Goals</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Hardware bring‑up, avionics stack, environmental testing, range & launch integration.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Where We Operate</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  India‑based with collaborators across universities and industry.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Contact</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <a href="mailto:physicsbyavikam@gmail.com" className="underline underline-offset-4">
                    physicsbyavikam@gmail.com
                  </a>{" "}
                  • <a href="https://xploreon.space" target="_blank" className="underline underline-offset-4">xploreon.space</a>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1517976487492-5765e4f35571?q=80&w=1200"
              alt="Xploreon spacecraft concept"
              className="w-full rounded-2xl shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
