import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import santAnnapelagoPanorama from "@/assets/santannapelago-panorama.jpg.asset.json";
import laTorreLogo from "@/assets/la-torre-logo-bianco.png.asset.json";
import bgBosco from "@/assets/bg-bosco.jpg.asset.json";
import bgCuore from "@/assets/bg-cuore.jpg.asset.json";
import bgCascata from "@/assets/bg-cascata.jpg.asset.json";
import { MenuSection } from "@/components/MenuSection";
import {
  birreBottiglia,
  birreSpina,
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: santAnnapelagoPanorama.url },
      { name: "twitter:image", content: santAnnapelagoPanorama.url },
    ],
  }),
  component: Index,
});

const nav = [
  { id: "pizze", label: "Le nostre pizze", short: "Pizze" },
  { id: "paesane", label: "Le paesane", short: "Paesane" },
  { id: "speciali", label: "Le speciali", short: "Speciali" },
  { id: "birre", label: "Le birre", short: "Birre" },
];

const backgrounds = [
  { key: "bosco", url: bgBosco.url },
  { key: "cuore", url: bgCuore.url },
  { key: "cascata", url: bgCascata.url },
];

// Un solo ciclo completo scorrendo la pagina: bosco -> cuore -> cascata.
// Lo sfondo è guidato dalla percentuale di scroll (monotona), non dalle
// sezioni: così nessuna immagine può tornare indietro o ripetersi.
function useScrollBgIndex(count: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      // soglie con isteresi implicita: 3 fasce uguali
      const next = Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
      setIndex((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  return index;
}

function Index() {
  const bgIndex = useScrollBgIndex(backgrounds.length);
  const currentBg = backgrounds[bgIndex].key;


  return (
    <div className="relative min-h-screen">
      {/* Sfondo dinamico a immagini con velo chiaro per la leggibilità */}
      <div className="fixed inset-0 -z-10">
        {backgrounds.map((b, i) => {
          const isActive = b.key === currentBg;
          return (
            <img
              key={b.key}
              src={b.url}
              alt=""
              aria-hidden="true"
              decoding="async"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              className={`bg-layer absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                isActive ? "bg-layer-active" : ""
              }`}
              style={{ opacity: isActive ? 1 : 0 }}
            />
          );
        })}
        <div className="veil paper absolute inset-0" />

      </div>

      <header className="fixed top-0 z-30 w-full border-b border-primary-foreground/15 bg-primary">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] sm:grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-5 sm:py-3">
          <span className="font-display hidden shrink-0 whitespace-nowrap text-base text-primary-foreground sm:inline sm:text-lg">
            La Torre
          </span>

          <nav className="no-scrollbar -mx-1 flex justify-between gap-1 sm:justify-end overflow-x-auto overscroll-x-contain px-1">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="font-display shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] text-primary-foreground/80 transition-colors hover:bg-primary-foreground hover:text-primary sm:px-3 sm:text-xs"
              >
                <span className="sm:hidden">{n.short}</span>
                <span className="hidden sm:inline">{n.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>


      <section id="hero" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={santAnnapelagoPanorama.url}
            alt="Panorama di Sant'Annapelago con il campanile della Torre e l'Appennino modenese"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <img
            src={laTorreLogo.url}
            alt="Logo Pizzeria La Torre — testa di cervo stilizzata"
            className="w-56 drop-shadow-lg sm:w-72 md:w-96"
          />
          <h1 className="sr-only">Pizzeria La Torre — Sant'Annapelago</h1>
          <a
            href="#pizze"
            className="font-display mt-10 rounded-full bg-primary px-8 py-3 text-sm text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Scopri il menù
          </a>
        </div>

        <a
          href="#pizze"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce"
          aria-label="Scorri verso il menù"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
      </section>

      <main className="mx-auto max-w-6xl px-5">
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
          subtitle="(ispirate ai nomi delle cascate)"
          items={speciali}
        />


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
