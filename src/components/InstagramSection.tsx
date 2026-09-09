import { ArrowUpRight } from "lucide-react";
import { brand } from "../data/brand";
import { PhotoSlot } from "./PhotoSlot";
import { InstagramGlyph } from "./icons/InstagramGlyph";

const feedPhotos = [
  "/instagram/post-1.webp",
  "/instagram/post-2.webp",
  "/instagram/post-3.webp",
  "/instagram/post-4.webp",
];

export function InstagramSection() {
  return (
    <section id="instagram" className="bg-char-2">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-base italic text-gold">
              {brand.instagramHandle}
            </p>
            <h2 className="mt-2 font-display text-3xl italic font-black leading-tight text-cream sm:text-4xl">
              Segue a gente no Instagram
            </h2>
          </div>
          <a
            href={brand.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-sm border border-bone/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-bone/60"
          >
            <InstagramGlyph size={16} />
            Abrir Instagram
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {feedPhotos.map((photoUrl, i) => (
            <div key={i} className="aspect-square">
              <PhotoSlot
                photoUrl={photoUrl}
                alt={`Post do Instagram da ${brand.name}`}
                label="Post real do feed"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
