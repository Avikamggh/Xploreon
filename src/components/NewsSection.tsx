
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Item = { title: string; date: string; link?: string; summary: string };

const news: Item[] = [
  { title: "Xplovis‑1 Mission Planning Update", date: "2025‑08‑15", summary: "Completed v1 mission architecture and test plan; advancing avionics bring‑up." },
  { title: "Hiring Student Engineers (Fall 2025)", date: "2025‑08‑10", summary: "Looking for 2–3 builders passionate about small‑sat systems and ops." },
  { title: "Facilities & Launchpad Planning", date: "2025‑06‑06", summary: "Initiated planning for Xploreon’s physical facility and range integration." },
];

export default function NewsSection() {
  return (
    <section id="news" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">News & Updates</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {news.map((n) => (
            <Card key={n.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{n.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <div className="text-foreground font-medium">{n.date}</div>
                <div className="mt-1">{n.summary}</div>
                {n.link && <a href={n.link} target="_blank" className="underline underline-offset-4 mt-2 inline-block">Read more</a>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
