import { brand } from "../data/brand";
import { PhotoSlot } from "./PhotoSlot";

const PENDING_TOPICS = ["Diferenciais", "Ingredientes", "Valores"];

export function Sobre() {
  return (
    <section id="sobre" className="bg-char">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">
        <div className="order-2 flex flex-col gap-5 md:order-1">
          <p className="font-display text-base italic text-gold">
            Sobre a {brand.name}
          </p>

          {brand.about.headline && (
            <h2 className="max-w-[16ch] font-display text-3xl italic font-black leading-tight text-cream sm:text-4xl">
              {brand.about.headline}
            </h2>
          )}

          {brand.about.story ? (
            <p className="max-w-[46ch] text-base leading-relaxed text-bone/75">
              {brand.about.story}
            </p>
          ) : (
            <p className="max-w-[46ch] text-base leading-relaxed text-bone/70">
              Essa seção está pronta para receber a história real da{" "}
              {brand.name} — como tudo começou e a filosofia por trás da
              casa.
            </p>
          )}

          <ul className="flex flex-wrap gap-2 pt-2">
            {PENDING_TOPICS.map((topic) => (
              <li
                key={topic}
                className="rounded-sm border border-bone/20 px-3 py-1.5 text-xs text-bone/60"
              >
                {topic} — pendente
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 aspect-[4/5] md:order-2">
          <PhotoSlot
            alt={`Ambiente ou equipe da ${brand.name}`}
            label="Foto da brasa, da cozinha ou da equipe para dar rosto à marca"
          />
        </div>
      </div>
    </section>
  );
}
