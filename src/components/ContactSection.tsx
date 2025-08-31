
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Contact Xploreon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <div><span className="font-medium text-foreground">General:</span> <a href="mailto:physicsbyavikam@gmail.com" className="underline underline-offset-4">physicsbyavikam@gmail.com</a></div>
            <div><span className="font-medium text-foreground">Website:</span> <a href="https://xploreon.space" target="_blank" className="underline underline-offset-4">xploreon.space</a></div>
            <div><span className="font-medium text-foreground">Opportunities:</span> We're hiring hands‑on builders (aero, embedded, ops). Send a short note with links to your work.</div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
