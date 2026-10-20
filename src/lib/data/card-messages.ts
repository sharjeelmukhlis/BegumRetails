export interface SuggestedMessage {
  id: string;
  occasion: "love" | "marriage" | "anniversary" | "friendship" | "thank-you";
  text: string;
  category: "English" | "Urdu";
}

export const SUGGESTED_MESSAGES: SuggestedMessage[] = [
  // ── LOVE ──
  {
    id: "msg-love-1",
    occasion: "love",
    category: "English",
    text: "You are the poetry I never knew how to write, and the grace my days were always waiting for.",
  },
  {
    id: "msg-love-2",
    occasion: "love",
    category: "English",
    text: "Every day with you feels like a garden in full bloom. Loving you is my life's most precious gift.",
  },
  {
    id: "msg-love-3",
    occasion: "love",
    category: "English",
    text: "In your quiet warmth, I found home. Thank you for making ordinary moments feel like timeless royalty.",
  },
  {
    id: "msg-love-4",
    occasion: "love",
    category: "Urdu",
    text: "میری زندگی کی سب سے خوبصورت کہانی تم ہو۔ تمہاری محبت میرا سب سے بڑا سرمایہ ہے۔",
  },
  {
    id: "msg-love-5",
    occasion: "love",
    category: "Urdu",
    text: "تمہارا ساتھ وہ دعا ہے جو بنا مانگے قبول ہوئی۔ محبت کا یہ سفر ہمیشہ ایسے ہی سلامت رہے۔",
  },
  {
    id: "msg-love-6",
    occasion: "love",
    category: "Urdu",
    text: "ہر دھڑکن میں تمہارا ہی نام ہے۔ دنیا کی ہر خوشی تمہارے قدموں میں نچھاور ہو۔",
  },

  // ── MARRIAGE ──
  {
    id: "msg-marr-1",
    occasion: "marriage",
    category: "English",
    text: "May your union be crowned with endless joy, deep peace, and the timeless blessings of companionship.",
  },
  {
    id: "msg-marr-2",
    occasion: "marriage",
    category: "English",
    text: "Wishing you a lifetime of whispered laughter, woven dreams, and devotion that deepens with every tomorrow.",
  },
  {
    id: "msg-marr-3",
    occasion: "marriage",
    category: "English",
    text: "Under the grace of tradition and the warmth of love, congratulations on this sacred new beginning.",
  },
  {
    id: "msg-marr-4",
    occasion: "marriage",
    category: "Urdu",
    text: "شادی کا یہ مقدس بندھن بہت مبارک ہو۔ دعا ہے کہ زندگی کا ہر لمحہ آپ دونوں کے لیے خوشیوں کا پیغام لائے۔",
  },
  {
    id: "msg-marr-5",
    occasion: "marriage",
    category: "Urdu",
    text: "اللہ کرے یہ نیا سفر محبت، برکت اور سکھ سے بھرپور ہو۔ آپ کی جوڑی سدا سلامت رہے۔",
  },
  {
    id: "msg-marr-6",
    occasion: "marriage",
    category: "Urdu",
    text: "نکاح کی مبارکباد۔ ربِ کریم آپ کے گھر کو امن، پیار اور خوشحالی کا گہوارہ بنائے۔",
  },

  // ── ANNIVERSARY ──
  {
    id: "msg-anniv-1",
    occasion: "anniversary",
    category: "English",
    text: "Years have passed like a gentle river, yet your grace and devotion remain as radiant as day one.",
  },
  {
    id: "msg-anniv-2",
    occasion: "anniversary",
    category: "English",
    text: "Happy Anniversary. Thank you for walking beside me through every turning path and golden twilight.",
  },
  {
    id: "msg-anniv-3",
    occasion: "anniversary",
    category: "English",
    text: "To the one who holds my heart with the gentlest hands: another year, forever woven in gold.",
  },
  {
    id: "msg-anniv-4",
    occasion: "anniversary",
    category: "Urdu",
    text: "شادی کی سالگرہ مبارک ہو۔ وقت کے ساتھ ساتھ یہ رشتہ اور بھی مضبوط اور سنہرا ہوتا جائے۔",
  },
  {
    id: "msg-anniv-5",
    occasion: "anniversary",
    category: "Urdu",
    text: "ایک اور سال محبت اور وفا کے ساتھ مکمل ہوا۔ آپ کا ساتھ میری زندگی کا سب سے انمول تحفہ ہے۔",
  },
  {
    id: "msg-anniv-6",
    occasion: "anniversary",
    category: "Urdu",
    text: "اللہ ہمارے اس خوبصورت ساتھ کو ہر نظرِ بد سے محفوظ رکھے اور سدا خوشیوں سے آباد رکھے۔",
  },

  // ── FRIENDSHIP ──
  {
    id: "msg-friend-1",
    occasion: "friendship",
    category: "English",
    text: "True friendship is an heirloom that time only makes more precious. Thank you for being my constant anchor.",
  },
  {
    id: "msg-friend-2",
    occasion: "friendship",
    category: "English",
    text: "No matter the distance or silence between seasons, having you as a friend makes the world infinitely softer.",
  },
  {
    id: "msg-friend-3",
    occasion: "friendship",
    category: "English",
    text: "Here is to shared laughter, late-night tea, and the bond of loyalty that never wavers. Forever grateful.",
  },
  {
    id: "msg-friend-4",
    occasion: "friendship",
    category: "Urdu",
    text: "ایک سچا دوست اندھیرے میں روشن چراغ ہوتا ہے۔ تمہارا ساتھ میری زندگی کی سب سے بڑی طاقت ہے۔",
  },
  {
    id: "msg-friend-5",
    occasion: "friendship",
    category: "Urdu",
    text: "دوستی کے اس خوبصورت رشتے پر فخر ہے۔ ہر حال میں ساتھ دینے کا دل سے شکریہ۔",
  },
  {
    id: "msg-friend-6",
    occasion: "friendship",
    category: "Urdu",
    text: "فاصلے کچھ بھی ہوں، دل ہمیشہ قریب رہتے ہیں۔ تمہاری سچی یاری پر سدا ناز رہے گا۔",
  },

  // ── THANK YOU ──
  {
    id: "msg-thanks-1",
    occasion: "thank-you",
    category: "English",
    text: "Your generosity and warmth have touched my heart more deeply than words can ever honor. Thank you.",
  },
  {
    id: "msg-thanks-2",
    occasion: "thank-you",
    category: "English",
    text: "With all my heart, thank you for standing beside me and offering a gentle hand when it mattered most.",
  },
  {
    id: "msg-thanks-3",
    occasion: "thank-you",
    category: "English",
    text: "No token could ever match your grace. May every blessing and goodness return to you tenfold.",
  },
  {
    id: "msg-thanks-4",
    occasion: "thank-you",
    category: "Urdu",
    text: "آپ کی بے لوث محبت اور خلوص کا تہہ دل سے شکریہ۔ آپ کی مہربانی ہمیشہ دل میں زندہ رہے گی۔",
  },
  {
    id: "msg-thanks-5",
    occasion: "thank-you",
    category: "Urdu",
    text: "لفظ کم ہیں آپ کی عنایتوں کا شکریہ ادا کرنے کے لیے۔ ربِ کریم آپ کو ہمیشہ خوش اور سلامت رکھے۔",
  },
  {
    id: "msg-thanks-6",
    occasion: "thank-you",
    category: "Urdu",
    text: "آپ کا حسنِ سلوک اور شفقت میرے لیے باعثِ فخر ہے۔ خلوصِ دل سے آپ کا ممنون ہوں۔",
  },
];
