import type { MeasurementFieldKey, Language } from "./schema";

/**
 * Per-field guided measuring content, bilingual (EN/UR).
 * Each field gets its own instructional loop an illustrated diagram
 * plus specific steps never one generic size-guide link.
 *
 * `diagram` keys map to illustrated highlights in the guide modal's
 * body diagram (drawn in SVG, no video assets required at launch).
 */
export interface MeasurementGuide {
  label: { en: string; ur: string };
  group: "garment" | "bottom" | "lehenga";
  steps: { en: string[]; ur: string[] };
  commonMistake: { en: string; ur: string };
  diagram: "neck" | "shoulder" | "sleeve" | "armhole" | "bust" | "hip" | "shirt-length" | "waist" | "thigh" | "trouser-length" | "hem" | "lehenga-length" | "dupatta";
}

export const measurementGuides: Record<MeasurementFieldKey, MeasurementGuide> = {
  neckDepth: {
    label: { en: "Neck Depth", ur: "گلے کی گہرائی" },
    group: "garment",
    diagram: "neck",
    steps: {
      en: [
        "Stand straight in front of a mirror.",
        "Place the tape at the highest point of your shoulder, beside the neck.",
        "Measure straight down to where you want the neckline to sit.",
      ],
      ur: [
        "آئینے کے سامنے سیدھی کھڑی ہوں۔",
        "فیتہ کندھے کے سب سے اونچے مقام پر، گردن کے پاس رکھیں۔",
        "سیدھا نیچے وہاں تک ناپیں جہاں آپ گلا رکھنا چاہتی ہیں۔",
      ],
    },
    commonMistake: {
      en: "Most brides measure from the collarbone start from the top of the shoulder instead.",
      ur: "اکثر دلہنیں ہنسلی سے ناپتی ہیں اس کے بجائے کندھے کے اوپر سے شروع کریں۔",
    },
  },
  shoulder: {
    label: { en: "Shoulder", ur: "کندھا" },
    group: "garment",
    diagram: "shoulder",
    steps: {
      en: [
        "Ask someone to help if possible this one is hard alone.",
        "Measure across the back, from the edge of one shoulder bone to the other.",
        "Keep the tape flat and straight, not curved over the neck.",
      ],
      ur: [
        "ممکن ہو تو کسی سے مدد لیں یہ اکیلے مشکل ہے۔",
        "پیٹھ کی طرف سے، ایک کندھے کی ہڈی کے کنارے سے دوسرے تک ناپیں۔",
        "فیتہ سیدھا اور ہموار رکھیں، گردن پر خم نہ دیں۔",
      ],
    },
    commonMistake: {
      en: "Measuring over the front of the body always measure across the back.",
      ur: "جسم کے سامنے سے ناپنا ہمیشہ پیٹھ کی طرف سے ناپیں۔",
    },
  },
  sleevesLength: {
    label: { en: "Sleeves Length", ur: "آستین کی لمبائی" },
    group: "garment",
    diagram: "sleeve",
    steps: {
      en: [
        "Relax your arm at your side, slightly bent.",
        "Measure from the shoulder edge down to where you want the sleeve to end.",
        "For full sleeves, measure to the wrist bone.",
      ],
      ur: [
        "بازو کو ڈھیلا چھوڑیں، ہلکا سا مڑا ہوا۔",
        "کندھے کے کنارے سے وہاں تک ناپیں جہاں آستین ختم کرنی ہے۔",
        "پوری آستین کے لیے کلائی کی ہڈی تک ناپیں۔",
      ],
    },
    commonMistake: {
      en: "Measuring with a straight, stiff arm keep a slight natural bend.",
      ur: "سیدھے سخت بازو سے ناپنا بازو میں ہلکا قدرتی خم رکھیں۔",
    },
  },
  armhole: {
    label: { en: "Armhole", ur: "آرم ہول" },
    group: "garment",
    diagram: "armhole",
    steps: {
      en: [
        "Loop the tape over the top of your shoulder and under your armpit.",
        "Keep one finger inside the tape for ease you should be able to move.",
        "Read the measurement where the tape meets, without pulling tight.",
      ],
      ur: [
        "فیتہ کندھے کے اوپر سے لے کر بغل کے نیچے سے گھمائیں۔",
        "آسانی کے لیے فیتے کے اندر ایک انگلی رکھیں حرکت ممکن ہونی چاہیے۔",
        "جہاں فیتہ ملے وہاں پیمائش دیکھیں، سختی سے نہ کھینچیں۔",
      ],
    },
    commonMistake: {
      en: "This is the field brides get wrong most. Do not pull the tape tight a snug loop with one finger of ease is correct.",
      ur: "یہ وہ پیمائش ہے جو اکثر غلط ہوتی ہے۔ فیتہ سختی سے نہ کھینچیں ایک انگلی کی گنجائش درست ہے۔",
    },
  },
  bust: {
    label: { en: "Bust", ur: "سینہ" },
    group: "garment",
    diagram: "bust",
    steps: {
      en: [
        "Wear the bra you plan to wear at the event.",
        "Wrap the tape around the fullest part of your bust.",
        "Keep the tape parallel to the floor, snug but not compressing.",
      ],
      ur: [
        "وہی انڈر گارمنٹ پہنیں جو تقریب میں پہننا ہے۔",
        "فیتہ سینے کے سب سے بھرے حصے کے گرد لپیٹیں۔",
        "فیتہ فرش کے متوازی رکھیں، آرام دہ مگر دبانے والا نہیں۔",
      ],
    },
    commonMistake: {
      en: "Measuring over loose clothing measure over fitted innerwear only.",
      ur: "ڈھیلے کپڑوں پر ناپنا صرف فٹ انڈر گارمنٹ پر ناپیں۔",
    },
  },
  hip: {
    label: { en: "Hip", ur: "کولہا" },
    group: "garment",
    diagram: "hip",
    steps: {
      en: [
        "Stand with feet together.",
        "Wrap the tape around the widest part of your hips usually 18–20cm below the waist.",
        "Check in a mirror that the tape is level all the way around.",
      ],
      ur: [
        "پاؤں ملا کر کھڑی ہوں۔",
        "فیتہ کولہوں کے سب سے چوڑے حصے کے گرد لپیٹیں عموماً کمر سے 18–20 سینٹی میٹر نیچے۔",
        "آئینے میں دیکھیں کہ فیتہ چاروں طرف برابر ہے۔",
      ],
    },
    commonMistake: {
      en: "Measuring at the hip bone instead of the widest point go lower.",
      ur: "کولہے کی ہڈی پر ناپنا سب سے چوڑے مقام پر، تھوڑا نیچے ناپیں۔",
    },
  },
  shirtLength: {
    label: { en: "Shirt Length", ur: "قمیض کی لمبائی" },
    group: "garment",
    diagram: "shirt-length",
    steps: {
      en: [
        "Measure from the highest point of the shoulder, beside the neck.",
        "Run the tape straight down the front of the body.",
        "Stop where you want the shirt hem to end.",
      ],
      ur: [
        "کندھے کے سب سے اونچے مقام سے، گردن کے پاس سے ناپیں۔",
        "فیتہ جسم کے سامنے سیدھا نیچے لے جائیں۔",
        "جہاں قمیض کا دامن ختم کرنا ہے وہاں رکیں۔",
      ],
    },
    commonMistake: {
      en: "Starting from the collarbone shortens the shirt by 4–5cm start at the shoulder top.",
      ur: "ہنسلی سے شروع کرنے سے قمیض 4–5 سینٹی میٹر چھوٹی ہو جاتی ہے کندھے کے اوپر سے شروع کریں۔",
    },
  },
  waist: {
    label: { en: "Waist", ur: "کمر" },
    group: "bottom",
    diagram: "waist",
    steps: {
      en: [
        "Find your natural waist the narrowest point, usually above the belly button.",
        "This is where you will tie the trouser or lehenga.",
        "Wrap the tape snugly without holding your breath in.",
      ],
      ur: [
        "اپنی قدرتی کمر تلاش کریں سب سے پتلا مقام، عموماً ناف سے اوپر۔",
        "یہیں آپ ٹراؤزر یا لہنگا باندھیں گی۔",
        "سانس روکے بغیر فیتہ آرام سے لپیٹیں۔",
      ],
    },
    commonMistake: {
      en: "Measuring where jeans sit bridal bottoms tie higher, at the natural waist.",
      ur: "جہاں جینز ہوتی ہے وہاں ناپنا شادی کے لباس قدرتی کمر پر، اوپر بندھتے ہیں۔",
    },
  },
  thigh: {
    label: { en: "Thigh", ur: "ران" },
    group: "bottom",
    diagram: "thigh",
    steps: {
      en: [
        "Stand with weight even on both feet.",
        "Wrap the tape around the fullest part of one thigh.",
        "Needed only for fitted trouser styles skip for flared bottoms.",
      ],
      ur: [
        "دونوں پاؤں پر برابر وزن ڈال کر کھڑی ہوں۔",
        "فیتہ ایک ران کے سب سے بھرے حصے کے گرد لپیٹیں۔",
        "صرف فٹ ٹراؤزر کے لیے ضروری ہے گھیر والے پاجامے کے لیے چھوڑ دیں۔",
      ],
    },
    commonMistake: {
      en: "Measuring mid-thigh measure at the fullest point, near the top.",
      ur: "ران کے درمیان ناپنا سب سے بھرے مقام پر، اوپر کے قریب ناپیں۔",
    },
  },
  length: {
    label: { en: "Trouser Length", ur: "ٹراؤزر کی لمبائی" },
    group: "bottom",
    diagram: "trouser-length",
    steps: {
      en: [
        "Measure from your natural waist down the side of the leg.",
        "Stop at the ankle bone, or where you want the trouser to end.",
        "Wear the heel height you plan for the event if you can.",
      ],
      ur: [
        "قدرتی کمر سے ٹانگ کے پہلو سے نیچے ناپیں۔",
        "ٹخنے کی ہڈی پر، یا جہاں ٹراؤزر ختم کرنا ہے وہاں رکیں۔",
        "ممکن ہو تو تقریب والی ہیل پہن کر ناپیں۔",
      ],
    },
    commonMistake: {
      en: "Measuring barefoot when you will wear heels the trouser will look short.",
      ur: "ننگے پاؤں ناپنا جبکہ ہیل پہننی ہو ٹراؤزر چھوٹا لگے گا۔",
    },
  },
  hem: {
    label: { en: "Hem (Pauncha)", ur: "پائنچہ" },
    group: "bottom",
    diagram: "hem",
    steps: {
      en: [
        "This is the opening at the bottom of the trouser leg.",
        "For a fitted look, measure loosely around your ankle and add 5cm.",
        "For a straight or flared style, we recommend the standard value.",
      ],
      ur: [
        "یہ ٹراؤزر کے نیچے کا کھلا حصہ ہے۔",
        "فٹ انداز کے لیے ٹخنے کے گرد ڈھیلا ناپ کر 5 سینٹی میٹر بڑھائیں۔",
        "سیدھے یا گھیر والے انداز کے لیے معیاری پیمائش بہتر ہے۔",
      ],
    },
    commonMistake: {
      en: "A hem tighter than your heel measurement your foot must pass through.",
      ur: "ایڑی سے تنگ پائنچہ پاؤں کا گزرنا ممکن ہونا چاہیے۔",
    },
  },
  lehengaLength: {
    label: { en: "Lehenga Length", ur: "لہنگے کی لمبائی" },
    group: "lehenga",
    diagram: "lehenga-length",
    steps: {
      en: [
        "Wear the heels you plan to wear or decide your heel height first.",
        "Measure from your natural waist straight down to the floor.",
        "Tell us if you want it floor-grazing or with walking clearance.",
      ],
      ur: [
        "وہ ہیل پہنیں جو پہننی ہے یا پہلے ہیل کی اونچائی طے کریں۔",
        "قدرتی کمر سے سیدھا فرش تک ناپیں۔",
        "بتائیں کہ فرش کو چھوتا ہوا چاہیے یا چلنے کی گنجائش کے ساتھ۔",
      ],
    },
    commonMistake: {
      en: "Measuring barefoot and choosing heels later the single most common lehenga mistake.",
      ur: "ننگے پاؤں ناپ کر بعد میں ہیل چننا لہنگے کی سب سے عام غلطی۔",
    },
  },
  dupattaLength: {
    label: { en: "Dupatta Length", ur: "دوپٹے کی لمبائی" },
    group: "lehenga",
    diagram: "dupatta",
    steps: {
      en: [
        "Standard bridal dupattas run 2.5 metres; trail styles up to 3.5.",
        "For a head-draped style, add at least 30cm over standard.",
        "If unsure, keep the recommended value we finalise at fitting.",
      ],
      ur: [
        "معیاری دلہن کا دوپٹہ 2.5 میٹر ہوتا ہے؛ ٹریل انداز 3.5 تک۔",
        "سر پر اوڑھنے کے انداز کے لیے کم از کم 30 سینٹی میٹر بڑھائیں۔",
        "یقین نہ ہو تو تجویز کردہ پیمائش رکھیں فٹنگ پر طے ہو گی۔",
      ],
    },
    commonMistake: {
      en: "Choosing trail length without a plan to carry it trails need a hand or a pin.",
      ur: "بغیر منصوبے کے ٹریل لمبائی چننا ٹریل کے لیے ہاتھ یا پن درکار ہے۔",
    },
  },
};

export const uiStrings = {
  guideTitle: { en: "How to measure", ur: "ناپنے کا طریقہ" },
  commonMistakeTitle: { en: "The common mistake", ur: "عام غلطی" },
  close: { en: "Close", ur: "بند کریں" },
  garmentGroup: { en: "Garment (Shirt / Blouse)", ur: "قمیض / بلاؤز" },
  bottomGroup: { en: "Bottom (Trouser / Lehenga base)", ur: "ٹراؤزر / لہنگا" },
  lehengaGroup: { en: "Lehenga Specific", ur: "لہنگے کی تفصیل" },
} as const;

export function t(pair: { en: string; ur: string }, lang: Language): string {
  return pair[lang];
}
