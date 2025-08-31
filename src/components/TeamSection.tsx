
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";

type Member = {
  name: string;
  title: string;
  blurb?: string;
  img?: string;
};

const team: Member[] = [
  { name: "Avikam Deol", title: "Founder & CEO", blurb: "Leads mission architecture, partnerships, and product direction." },
  { name: "Chaitanya Srivastava", title: "Director", blurb: "Aerospace system architecture, advanced propulsion, AI‑powered flight systems." },
  { name: "Prayesi Agarwal", title: "Chief Innovation Officer", blurb: "R&D programs and cross‑functional innovation." },
  { name: "Omprakash Kumar", title: "Head of Technology", blurb: "Avionics, software stack, and integration." },
  { name: "Narayan Kataruka", title: "Mission Systems CAD Designer", blurb: "Structures and CAD systems for spacecraft." },
  { name: "Rishita Mishra", title: "Software Engineer", blurb: "Ground systems, telemetry, and mission control UI." },
  { name: "Mehul Agarwal", title: "Infrastructure Project Manager", blurb: "Launchpad & facilities development." },
  { name: "Vishard Makwana", title: "Aerospace Engineer" },
  { name: "Priyansh Patel", title: "Aerospace Engineer" },
  { name: "Harshil Purohit", title: "Aerospace Engineer" },
  { name: "Neel Ghoil", title: "Aerospace Engineer" },
  { name: "Hemant Sharma", title: "Head of AI & Research" },
  { name: "Utkarsh Tripathi", title: "Mathematics Specialist" },
];

function initials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function TeamSection() {
  return (
    <section id="team" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Meet the Team</h2>
        <p className="mt-3 text-muted-foreground">
          A lean team blending aerospace, software, and research. We value clarity, iteration, and hands‑on engineering.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {team.map((m) => (
            <Card key={m.name}>
              <CardContent className="p-6 flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={m.img} alt={m.name} />
                  <AvatarFallback>{initials(m.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-muted-foreground">{m.title}</div>
                  {m.blurb && <div className="text-sm text-muted-foreground mt-1">{m.blurb}</div>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
