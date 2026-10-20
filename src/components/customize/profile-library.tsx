"use client";

import { useState } from "react";
import { UserPlus, Trash2, Download } from "lucide-react";
import { useCustomizerStore } from "@/lib/store/customizer";

/**
 * Profile library save named measurement profiles (self, mother,
 * sister) and reuse them across orders. Common for family group orders.
 */
export function ProfileLibrary() {
  const { language, profiles, saveProfile, loadProfile, deleteProfile, garment, bottom } =
    useCustomizerStore();
  const [label, setLabel] = useState("");
  const isUrdu = language === "ur";

  const canSave =
    label.trim().length > 0 && Object.keys(garment).length >= 7 && Object.keys(bottom).length >= 3;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder={isUrdu ? "نام، مثلاً: میں / امی / بہن بارات" : 'A name "Me", "Amma", "Sister Baraat Guest"'}
          className="flex-1 px-4 py-2.5 text-sm bg-transparent border border-charcoal/15 focus:border-emerald-800 focus:outline-none"
          dir={isUrdu ? "rtl" : "ltr"}
        />
        <button
          type="button"
          disabled={!canSave}
          onClick={() => {
            saveProfile(label.trim());
            setLabel("");
          }}
          className="inline-flex items-center justify-center gap-2 border border-emerald-900/25 px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-emerald-900 hover:bg-emerald-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <UserPlus size={14} />
          {isUrdu ? "پروفائل محفوظ کریں" : "Save profile"}
        </button>
      </div>
      {!canSave && label.trim().length > 0 && (
        <p className="mt-2 text-[11px] text-charcoal/50">
          {isUrdu
            ? "محفوظ کرنے کے لیے پہلے تمام بنیادی پیمائشیں مکمل کریں۔"
            : "Complete the core measurements above before saving."}
        </p>
      )}

      {profiles.length > 0 && (
        <ul className="mt-5 space-y-2">
          {profiles.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-3 border border-sand-300/50 bg-sand-50/50 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-charcoal truncate">{p.label}</p>
                <p className="text-[11px] text-charcoal/55">
                  {p.standardSizeMatched ? `Size ${p.standardSizeMatched} base` : "Fully custom"} ·{" "}
                  {new Date(p.savedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => loadProfile(p.id)}
                  className="p-2 text-emerald-800 hover:bg-emerald-50 transition-colors"
                  aria-label={`${isUrdu ? "استعمال کریں" : "Use"} ${p.label}`}
                  title={isUrdu ? "استعمال کریں" : "Use this profile"}
                >
                  <Download size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => deleteProfile(p.id)}
                  className="p-2 text-charcoal/45 hover:text-charcoal hover:bg-sand-100 transition-colors"
                  aria-label={`${isUrdu ? "حذف کریں" : "Delete"} ${p.label}`}
                  title={isUrdu ? "حذف کریں" : "Delete"}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
