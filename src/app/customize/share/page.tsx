import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BrandMark } from "@/components/shared/logo";
import { decodeSnapshot } from "@/lib/customize/share";
import { computePrice, fabricOptions, embroideryTechniques, densityMultipliers, addonOptions } from "@/lib/customize/price-engine";
import { measurementGuides } from "@/lib/customize/measurement-guides";
import { displayValue, type MeasurementFieldKey } from "@/lib/customize/schema";
import { SilhouettePreview } from "@/components/customize/silhouette-preview";
import { formatPrice } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "A design to verify — Begum",
  description: "A read-only snapshot of a custom Begum design, shared for a second opinion.",
  robots: { index: false },
};

export default async function SharePage(props: { searchParams: Promise<{ d?: string }> }) {
  const { d } = await props.searchParams;
  const snapshot = d ? decodeSnapshot(d) : null;

  if (!snapshot) {
    return (
      <div className="bg-ivory pt-40 pb-28 min-h-[70vh]">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <BrandMark size={52} className="mx-auto opacity-30 mb-6" />
            <h1 className="font-display text-3xl text-emerald-900">This link didn&rsquo;t open correctly</h1>
            <p className="mt-4 text-charcoal/70 leading-relaxed">
              The shared design snapshot could not be read. Ask the person who sent it to copy the
              link again from their customizer page.
            </p>
            <Link href="/customize" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-900 border-b border-emerald-900/30 pb-1">
              Open the customizer <ArrowRight size={13} />
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const price = computePrice({
    garmentType: snapshot.garmentType,
    fabric: snapshot.fabric,
    embroidery: snapshot.embroidery,
    density: snapshot.density,
    addons: snapshot.addons,
  });

  const fabricLabel = fabricOptions.find((f) => f.value === snapshot.fabric)?.label;
  const embroideryLabel = embroideryTechniques.find((e) => e.value === snapshot.embroidery)?.label;
  const densityLabel = snapshot.density ? densityMultipliers[snapshot.density].label : null;
  const addonLabels = snapshot.addons
    .map((a) => addonOptions.find((o) => o.value === a)?.label)
    .filter(Boolean) as string[];

  const measurementRows: { key: MeasurementFieldKey; value: number }[] = [];
  for (const [key, value] of Object.entries(snapshot.garment)) {
    if (typeof value === "number") measurementRows.push({ key: key as MeasurementFieldKey, value });
  }
  for (const [key, value] of Object.entries(snapshot.bottom)) {
    if (typeof value === "number") measurementRows.push({ key: key as MeasurementFieldKey, value });
  }
  if (snapshot.lehenga) {
    for (const [key, value] of Object.entries(snapshot.lehenga)) {
      if (typeof value === "number") measurementRows.push({ key: key as MeasurementFieldKey, value });
    }
  }

  return (
    <div className="bg-ivory pt-32 md:pt-40 pb-28">
      <Container>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-sand-700 font-medium">Shared for a second opinion</p>
          <h1 className="mt-3 font-display text-emerald-950 text-[clamp(1.9rem,4vw,3.2rem)] leading-[0.95]">
            Someone wants your eyes on their bridal design
          </h1>
          <p className="mt-4 text-charcoal/72 leading-relaxed max-w-[56ch]">
            This is a read-only snapshot — you can check every measurement and choice, but nothing
            here can be changed. If something looks off, just tell them.
          </p>

          <div className="mt-10 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <div className="border border-sand-300/55 bg-sand-50/50 p-5">
                <SilhouettePreview
                  garmentType={snapshot.garmentType}
                  garment={snapshot.garment}
                  bottom={snapshot.bottom}
                  lehenga={snapshot.lehenga ?? {}}
                />
              </div>
              <div className="mt-4 border border-sand-300/55 bg-ivory p-5 text-sm text-charcoal/75 space-y-2">
                <p className="text-charcoal font-medium capitalize">
                  {snapshot.garmentType?.replace("-", " ") ?? "Garment not chosen yet"}
                  {snapshot.occasion && <span className="text-charcoal/50"> · {snapshot.occasion}</span>}
                </p>
                {snapshot.size && <p>Started from size {snapshot.size}</p>}
                {fabricLabel && <p>{fabricLabel}{snapshot.fabricColor ? ` · ${snapshot.fabricColor}` : ""}</p>}
                {embroideryLabel && <p>{embroideryLabel}{densityLabel ? ` · ${densityLabel} density` : ""}</p>}
                {addonLabels.length > 0 && <p>{addonLabels.join(", ")}</p>}
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="border border-sand-300/55 bg-ivory">
                <p className="px-5 py-3.5 border-b border-sand-300/50 text-[10px] uppercase tracking-[0.22em] text-sand-700">
                  Measurements ({snapshot.unit})
                </p>
                <dl>
                  {measurementRows.map((row, i) => (
                    <div
                      key={row.key}
                      className={`flex justify-between px-5 py-2.5 text-sm ${i % 2 ? "" : "bg-sand-50/50"}`}
                    >
                      <dt className="text-charcoal/65">{measurementGuides[row.key]?.label.en ?? row.key}</dt>
                      <dd className="text-charcoal tabular-nums">
                        {displayValue(row.value, snapshot.unit)} {snapshot.unit}
                      </dd>
                    </div>
                  ))}
                  {snapshot.lehenga?.flareType && (
                    <div className="flex justify-between px-5 py-2.5 text-sm">
                      <dt className="text-charcoal/65">Flare type</dt>
                      <dd className="text-charcoal">{snapshot.lehenga.flareType}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {price.total > 0 && (
                <div className="mt-4 border border-sand-300/55 bg-ivory p-5 flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-charcoal/55">Estimated total</span>
                  <span className="font-display text-2xl text-emerald-900 tabular-nums">
                    {formatPrice(price.total, "PKR")}
                  </span>
                </div>
              )}

              <Link
                href="/customize"
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-900 border-b border-emerald-900/30 pb-1 hover:border-emerald-900 transition-colors"
              >
                Design your own with Begum <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
