"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Ruler } from "lucide-react";
import { useCustomizerStore } from "@/lib/store/customizer";
import type { StandardSize } from "@/lib/customize/schema";

interface ProductFitSignalProps {
  /** Product size options, e.g. XS–XXL. Shoe sizes are ignored. */
  sizes?: string[];
}

const STANDARD: StandardSize[] = ["XS", "S", "M", "L", "XL"];

type FitSnapshot = {
  selectedSize: StandardSize | null;
  recommendedSize: StandardSize | null;
  hasProfile: boolean;
  profileLabel: string | null;
};

/** Stable server snapshot must be referentially constant. */
const SERVER_SNAPSHOT: FitSnapshot = {
  selectedSize: null,
  recommendedSize: null,
  hasProfile: false,
  profileLabel: null,
};

/** Cached client snapshot getSnapshot must return the same ref when values are unchanged. */
let cachedSnapshot: FitSnapshot = SERVER_SNAPSHOT;

function subscribe(onStoreChange: () => void) {
  return useCustomizerStore.subscribe(onStoreChange);
}

function getSnapshot(): FitSnapshot {
  const s = useCustomizerStore.getState();
  const next: FitSnapshot = {
    selectedSize: s.selectedSize,
    recommendedSize: s.recommendedSize,
    hasProfile: s.profiles.length > 0,
    profileLabel: s.profiles[0]?.label ?? null,
  };

  if (
    cachedSnapshot.selectedSize === next.selectedSize &&
    cachedSnapshot.recommendedSize === next.recommendedSize &&
    cachedSnapshot.hasProfile === next.hasProfile &&
    cachedSnapshot.profileLabel === next.profileLabel
  ) {
    return cachedSnapshot;
  }

  cachedSnapshot = next;
  return cachedSnapshot;
}

function getServerSnapshot(): FitSnapshot {
  return SERVER_SNAPSHOT;
}

/**
 * Inline fit confidence when the bride has a saved size from Customize.
 * Hydration-safe via useSyncExternalStore with a cached snapshot.
 */
export function ProductFitSignal({ sizes }: ProductFitSignalProps) {
  const { selectedSize, recommendedSize, hasProfile, profileLabel } =
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const garmentSizes = (sizes ?? []).filter((s) =>
    STANDARD.includes(s as StandardSize),
  );
  if (garmentSizes.length === 0) return null;

  const saved = selectedSize ?? recommendedSize;
  if (!saved && !hasProfile) {
    return (
      <p className="mt-3 flex items-start gap-2 text-xs text-charcoal/55 leading-relaxed">
        <Ruler size={14} className="mt-0.5 shrink-0" />
        <span>
          Save a fit in the{" "}
          <Link href="/customize" className="text-emerald-800 underline underline-offset-2">
            customiser
          </Link>{" "}
          and we will compare it here next time.
        </span>
      </p>
    );
  }

  if (!saved) return null;

  const inChart = garmentSizes.includes(saved);
  const idx = STANDARD.indexOf(saved);
  const nextUp = idx >= 0 && idx < STANDARD.length - 1 ? STANDARD[idx + 1] : null;
  const productHasUp = nextUp && garmentSizes.includes(nextUp);

  return (
    <div className="mt-3 border border-sand-300/70 bg-sand-50/80 px-3.5 py-3 text-xs text-charcoal/70 leading-relaxed">
      <p className="flex items-start gap-2">
        <Ruler size={14} className="mt-0.5 shrink-0 text-emerald-800" />
        <span>
          {inChart ? (
            <>
              This runs close to your saved{" "}
              <strong className="font-medium text-emerald-900">size {saved}</strong>
              {profileLabel ? ` (“${profileLabel}”)` : ""} from the customiser.
              {productHasUp && (
                <>
                  {" "}
                  Prefer ease through the hip? Try{" "}
                  <Link href="/size-guide" className="text-emerald-800 underline underline-offset-2">
                    size {nextUp}
                  </Link>{" "}
                  see why in the size guide.
                </>
              )}
            </>
          ) : (
            <>
              Your saved size is <strong className="font-medium text-emerald-900">{saved}</strong>.
              This piece uses a different chart {" "}
              <Link href="/size-guide" className="text-emerald-800 underline underline-offset-2">
                check the size guide
              </Link>{" "}
              or message us with your measurements.
            </>
          )}
        </span>
      </p>
    </div>
  );
}
