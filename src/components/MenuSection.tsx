import type { Dish } from "@/data/menu";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  items: Dish[];
  showPriceHeader?: boolean;
};

export function MenuSection({ id, title, subtitle, items, showPriceHeader = true }: Props) {
  return (
    <section id={id} className="scroll-mt-20 py-12 md:py-16">
      <h2 className="font-display text-4xl leading-[0.95] text-primary sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="font-display mt-2 text-lg text-primary/70 sm:text-xl">{subtitle}</p>
      )}

      {showPriceHeader && (
        <p className="font-display mt-6 text-right text-sm tracking-wide text-primary">Prezzo</p>
      )}

      <ul className="mt-2 space-y-4">
        {items.map((item) => (
          <li key={item.name}>
            <div className="flex items-end">
              <h3 className="font-display text-xl text-primary sm:text-2xl">{item.name}</h3>
              <span className="leader" aria-hidden="true" />
              {item.price && (
                <span className="font-display shrink-0 text-lg text-primary sm:text-xl">
                  € {item.price}
                </span>
              )}
            </div>
            {item.desc && (
              <p className="mt-1 max-w-2xl text-sm leading-snug text-muted-foreground sm:text-base">
                {item.desc}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
