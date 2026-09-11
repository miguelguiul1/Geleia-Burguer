import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { brand } from "../data/brand";

export function Localizacao() {
  const { location } = brand;

  return (
    <section id="localizacao" className="bg-bone text-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <p className="font-display text-base italic text-fire">
          Onde estamos
        </p>
        <h2 className="mt-2 max-w-[28ch] font-display text-3xl italic font-black leading-tight sm:text-4xl">
          {location.neighborhood}, {location.city}
        </h2>
        {location.deliveryOnly && (
          <p className="mt-2 text-sm text-ink/50">
            Funciona só por delivery — não tem salão pra comer no local.
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex items-start gap-4 border border-ink/15 px-6 py-6">
            <MapPin size={22} className="mt-0.5 shrink-0 text-fire" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">
                Endereço
              </p>
              {location.fullAddress ? (
                <p className="mt-1 text-base text-ink/80">
                  {location.fullAddress}
                </p>
              ) : (
                <p className="mt-1 text-base text-ink/60">
                  Bairro {location.neighborhood}, {location.city} —
                  atendemos só por delivery.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4 border border-ink/15 px-6 py-6">
            <Clock size={22} className="mt-0.5 shrink-0 text-fire" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">
                Horário de funcionamento
              </p>
              {location.hours ? (
                <p className="mt-1 text-base text-ink/80">{location.hours}</p>
              ) : location.deliveryOnly ? (
                <p className="mt-1 text-base text-ink/60">
                  Sem atendimento presencial — confira o horário de pedidos
                  direto no iFood ou WhatsApp.
                </p>
              ) : (
                <p className="mt-1 text-base text-ink/60">
                  Ainda não confirmado — envie e eu preencho aqui.
                </p>
              )}
            </div>
          </div>
        </div>

        {location.mapEmbedUrl ? (
          <div className="mt-8 aspect-video w-full overflow-hidden">
            <iframe
              src={location.mapEmbedUrl}
              title={`Mapa da ${brand.name}`}
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        ) : (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${brand.name} ${location.neighborhood} ${location.city}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fire"
          >
            Buscar no Google Maps
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        )}
      </div>
    </section>
  );
}
