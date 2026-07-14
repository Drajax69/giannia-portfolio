import { Masthead } from "@/components/catalog/masthead";
import { Catalog } from "@/components/catalog/catalog";

export default function Home() {
  return (
    <>
      <Masthead />
      <main className="flex-1">
        <Catalog />
      </main>
      <footer className="border-t border-foreground/12 px-5 py-8 sm:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 font-mono text-[10px] tracking-[0.25em] text-foreground/40 sm:flex-row sm:items-center">
          <span>&copy; MMXXVI &mdash; AN ONGOING INDEX</span>
          <span className="flex items-center gap-2">
            <span className="seal-mark h-1.5 w-1.5 rotate-45" aria-hidden />
            GIANNIA
          </span>
        </div>
      </footer>
    </>
  );
}
