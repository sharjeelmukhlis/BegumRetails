export interface Couplet {
  id: string;
  occasion: "love" | "marriage" | "anniversary" | "friendship" | "thank-you";
  lines: [string, string];
}

export const POETRY_LIBRARY: Couplet[] = [
  // ── URDU – LOVE (محبت) ──
  {
    id: "ur-love-1",
    occasion: "love",
    lines: [
      "تیرے ہونے سے ہی روشن ہے مرا ہر لمحہ",
      "تُو نہ ہو تو یہ جہاں خواب سا لگتا ہے مجھے",
    ],
  },
  {
    id: "ur-love-2",
    occasion: "love",
    lines: [
      "دل کے آنگن میں ترا نام سجا رکھا ہے",
      "ہر دعا میں تجھے ہی میں نے بسا رکھا ہے",
    ],
  },
  {
    id: "ur-love-3",
    occasion: "love",
    lines: [
      "ایک تیرا ساتھ ہو تو راستے آسان ہیں",
      "ورنہ منزل پاس ہو کر بھی بہت ویران ہے",
    ],
  },
  {
    id: "ur-love-4",
    occasion: "love",
    lines: [
      "تیری آنکھوں میں جو اتری ہے محبت کی جھلک",
      "اس تجلی سے سنورتا ہے مرا کون و مکاں",
    ],
  },

  // ── URDU – MARRIAGE (شادی و نکاح) ──
  {
    id: "ur-marriage-1",
    occasion: "marriage",
    lines: [
      "دو دلوں کا یہ ملن ہو سدا آباد رہے",
      "تم سلامت رہو، ہر خوشی تمہارے ساتھ رہے",
    ],
  },
  {
    id: "ur-marriage-2",
    occasion: "marriage",
    lines: [
      "ہاتھ میں ہاتھ رہے، دل میں محبت کا چراغ",
      "زندگی بھر یہ سفر یونہی مبارک ٹھہرے",
    ],
  },
  {
    id: "ur-marriage-3",
    occasion: "marriage",
    lines: [
      "نئی راہوں کا سفر، ساتھ تمہارا ہم سفر",
      "اللہ رکھے سلامت یہ جوڑی عمر بھر",
    ],
  },
  {
    id: "ur-marriage-4",
    occasion: "marriage",
    lines: [
      "بندھنِ عقد مبارک ہو دو پیاروں کا",
      "روشنی پھیل گئی جیسے ستاروں کی",
    ],
  },

  // ── URDU – ANNIVERSARY (سالگرہ) ──
  {
    id: "ur-anniv-1",
    occasion: "anniversary",
    lines: [
      "سال گزرے ہیں مگر چاہ وہی ہے اب تک",
      "تیری قربت کی پناہ وہی ہے اب تک",
    ],
  },
  {
    id: "ur-anniv-2",
    occasion: "anniversary",
    lines: [
      "جیسے خوشبو ہو گلابوں کی، پرانی ہو کر",
      "اور بھی بڑھ جاتی ہے ہر سال محبت ہم میں",
    ],
  },
  {
    id: "ur-anniv-3",
    occasion: "anniversary",
    lines: [
      "ساتھ تیرا ہے تو ہر سال مبارک لگتا ہے",
      "ہر نیا دن مجھے پہلا سا کمال لگتا ہے",
    ],
  },

  // ── URDU – FRIENDSHIP (دوستی) ──
  {
    id: "ur-friend-1",
    occasion: "friendship",
    lines: [
      "دوست وہ ہے جو اندھیرے میں چراغ بن جائے",
      "ہر کٹھن موڑ پہ بس ایک سہارا بن جائے",
    ],
  },
  {
    id: "ur-friend-2",
    occasion: "friendship",
    lines: [
      "ہنسی میں شریک، غم میں بھی ساتھ نبھایا",
      "دوستی نے مجھے جینا سکھایا",
    ],
  },
  {
    id: "ur-friend-3",
    occasion: "friendship",
    lines: [
      "تیری یاری نے سکھایا ہے کہ دنیا کیا ہے",
      "ایک سچا ساتھی ہو تو جہاں اپنا ہے",
    ],
  },

  // ── URDU – THANK YOU (شکریہ و تشکر) ──
  {
    id: "ur-thanks-1",
    occasion: "thank-you",
    lines: [
      "شکریہ تیرا کہ تُو نے مجھے سنبھالا ہے",
      "تیری ہر نیکی نے دل میں اجالا ہے",
    ],
  },
  {
    id: "ur-thanks-2",
    occasion: "thank-you",
    lines: [
      "لفظ کم ہیں، مگر احساس بہت گہرا ہے",
      "تیرے احسان کا ہر رنگ سنہرا ہے",
    ],
  },
  {
    id: "ur-thanks-3",
    occasion: "thank-you",
    lines: [
      "دعا ہے رب تری ہر راہ میں خوشیاں رکھے",
      "جیسے تُو نے مرے دامن میں کلیاں رکھیں",
    ],
  },
];

export function getCoupletsByOccasion(occasion: string) {
  if (occasion === "all") return POETRY_LIBRARY;
  return POETRY_LIBRARY.filter((c) => c.occasion === occasion);
}
