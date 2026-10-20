import type { GarmentMeasurements, BottomMeasurements, LehengaSpecific } from "./schema";

/**
 * Fit-confidence checks a derived validation layer that nudges,
 * never blocks. Warm microcopy, no red-alert error states: some brides
 * genuinely have atypical proportions and should not be stopped.
 */
export interface FitNotice {
  id: string;
  fields: string[];
  message: { en: string; ur: string };
}

export function runFitChecks(
  garment: Partial<GarmentMeasurements>,
  bottom: Partial<BottomMeasurements>,
  lehenga?: Partial<LehengaSpecific>
): FitNotice[] {
  const notices: FitNotice[] = [];

  if (garment.hip !== undefined && bottom.waist !== undefined && garment.hip < bottom.waist) {
    notices.push({
      id: "hip-below-waist",
      fields: ["hip", "waist"],
      message: {
        en: "Your hip measurement is smaller than your waist that combination is unusual. Want to double-check, or hop on a quick call?",
        ur: "کولہے کی پیمائش کمر سے کم ہے یہ غیر معمولی ہے۔ دوبارہ دیکھ لیں، یا ایک مختصر کال کر لیں؟",
      },
    });
  }

  if (garment.bust !== undefined && garment.armhole !== undefined) {
    const expected = garment.bust * 0.46;
    if (Math.abs(garment.armhole - expected) > 9) {
      notices.push({
        id: "armhole-vs-bust",
        fields: ["armhole", "bust"],
        message: {
          en: "That armhole looks a little unusual next to your bust measurement armhole is the one most brides measure differently. Worth a quick re-check with the guide?",
          ur: "آرم ہول سینے کی پیمائش کے مقابلے میں غیر معمولی لگ رہا ہے یہ وہ پیمائش ہے جو اکثر مختلف ہوتی ہے۔ گائیڈ کے ساتھ دوبارہ دیکھ لیں؟",
        },
      });
    }
  }

  if (garment.shoulder !== undefined && garment.bust !== undefined && garment.shoulder > garment.bust * 0.52) {
    notices.push({
      id: "shoulder-wide",
      fields: ["shoulder", "bust"],
      message: {
        en: "The shoulder reads quite wide against the bust remember to measure across the back, edge to edge of the shoulder bone.",
        ur: "کندھا سینے کے مقابلے میں کافی چوڑا لگ رہا ہے پیٹھ کی طرف سے، ہڈی کے کنارے تک ناپنا یاد رکھیں۔",
      },
    });
  }

  if (bottom.thigh !== undefined && bottom.hem !== undefined && bottom.hem > bottom.thigh) {
    notices.push({
      id: "hem-above-thigh",
      fields: ["hem", "thigh"],
      message: {
        en: "The hem opening is wider than the thigh fine for a flared style, but double-check if you wanted a fitted trouser.",
        ur: "پائنچہ ران سے چوڑا ہے گھیر والے انداز کے لیے ٹھیک ہے، مگر فٹ ٹراؤزر چاہیے تو دوبارہ دیکھ لیں۔",
      },
    });
  }

  if (garment.shirtLength !== undefined && lehenga?.lehengaLength !== undefined && garment.shirtLength > lehenga.lehengaLength) {
    notices.push({
      id: "shirt-longer-than-lehenga",
      fields: ["shirtLength", "lehengaLength"],
      message: {
        en: "Your shirt length is longer than the lehenga length intentional for some silhouettes, but worth confirming.",
        ur: "قمیض کی لمبائی لہنگے سے زیادہ ہے کچھ اندازوں میں ایسا ہوتا ہے، مگر تصدیق کر لیں۔",
      },
    });
  }

  return notices;
}
