import { createFileRoute } from "@tanstack/react-router";
import pizzeIllustrazione from "@/assets/pizze-illustrazione.jpg";
import { MenuSection } from "@/components/MenuSection";
import {
  birreBottiglia,
  birreSpina,
  cascate,
  paesane,
  pizze,
  speciali,
} from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pizzeria La Torre — Menù, Sant'Annapelago" },
      {
        name: "description",
        content:
          "Il menù completo della Pizzeria La Torre: pizze classiche, paesane, speciali alle cascate e birre artigianali in bottiglia e alla spina.",
      },
      { property: "og:title", content: "Pizzeria La Torre — Menù" },
      {
        property: "og:description",
        content:
          "Pizze classiche, paesane, speciali e birre artigianali a Sant'Annapelago.",
      },
    ],
  }),
  component: Index,
});

const nav = [
  { id: "pizze", label: "Le nostre pizze" },
  { id: "paesane", label: "Le paesane" },
  { id: "speciali", label: "Le speciali" },
  { id: "cascate", label: "Le cascate" },
  { id: "birre", label: "Le birre" },
];

function Index() {
  return (
    <div className="paper min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b-2 border-primary/25 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <span className="font-display text-lg text-primary">La Torre</span>
          <nav className="-mx-1 flex gap-1 overflow-x-auto">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="font-display shrink-0 rounded-full px-3 py-1.5 text-xs text-primary/70 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5">
        <section className="grid items-center gap-8 py-12 md:grid-cols-2 md:py-20">
          <div>
            <h1 className="font-display text-6xl leading-[0.85] text-primary sm:text-7xl md:text-8xl">
              La Torre
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Pizzeria a Sant'Annapelago, sull'Appennino modenese. Impasti lunghi,
              ingredienti del territorio e pizze che portano i soprannomi del paese e i
              nomi delle nostre cascate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#pizze"
                className="font-display rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Guarda il menù
              </a>
              <a
                href="#contatti"
                className="font-display rounded-full border-2 border-primary px-6 py-3 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Contatti
              </a>
            </div>
          </div>
          <img
            src={pizzeIllustrazione}
            alt="Illustrazione di pizze e trance di pizza in stile serigrafico"
            width={1024}
            height={1536}
            className="mx-auto max-h-[520px] w-full rounded-sm object-cover"
          />
        </section>

        <MenuSection id="pizze" title="Le nostre pizze" items={pizze} />
        <MenuSection
          id="paesane"
          title="Le paesane"
          subtitle="(basate su soprannomi reali)"
          items={paesane}
        />
        <MenuSection
          id="speciali"
          title="Le speciali"
          subtitle="(inspirate dai nomi delle cascate)"
          items={speciali}
        />

        <section id="cascate" className="scroll-mt-20 py-12 md:py-16">
          <h2 className="font-display text-4xl leading-[0.95] text-primary sm:text-5xl md:text-6xl">
            Le cascate di S. Annapelago
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {cascate.map((c) => (
              <li
                key={c}
                className="font-display rounded-sm border-2 border-primary/30 bg-card px-4 py-6 text-center text-sm text-primary"
              >
                {c}
              </li>
            ))}
          </ul>
        </section>

        <MenuSection
          id="birre"
          title="Le nostre birre"
          subtitle="Birre in bottiglia"
          items={birreBottiglia}
          showPriceHeader={false}
        />
        <MenuSection
          id="spina"
          title="Birre alla spina"
          items={birreSpina}
          showPriceHeader={false}
        />
      </main>

      <footer id="contatti" className="mt-8 border-t-2 border-primary/25 bg-primary">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:grid-cols-2">
          <div>
            <p className="font-display text-3xl text-primary-foreground">La Torre</p>
            <p className="mt-2 text-sm text-primary-foreground/70">
              Sant'Annapelago, Pievepelago (MO)
            </p>
          </div>
          <div className="text-sm text-primary-foreground/80 sm:text-right">
            <p>Aperto tutte le sere · Chiuso il martedì</p>
            <p className="mt-2">Prenotazioni al telefono</p>
            <p className="mt-6 text-xs text-primary-foreground/50">
              © {new Date().getFullYear()} Pizzeria La Torre
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
