
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 border-t">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
        <div>© {year} Xploreon. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a className="underline underline-offset-4" href="https://xploreon.space" target="_blank">Website</a>
          <a className="underline underline-offset-4" href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
