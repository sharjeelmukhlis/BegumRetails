import type { Category } from "@/lib/types";

/**
 * FAQ content — structured, CMS-ready.
 * Category defaults inherit onto every product in that category unless
 * a product-specific override replaces the same id or adds new entries.
 */

export type FAQItem = {
  id: string;
  question: string;
  /** Supports light rich text: **bold** and [label](/path) links. */
  answer: string;
  order: number;
};

export type ProductFAQSet = {
  productId: string;
  /** When set, these FAQ ids from category defaults are omitted. */
  omitDefaultIds?: string[];
  productSpecific: FAQItem[];
};

export type ArticleFAQSet = {
  articleId: string;
  faqs: FAQItem[];
};

/** Care copy shown on the PDP — category default, overridable per product. */
export type CareGuidance = {
  title: string;
  body: string;
};

// ── Category defaults ────────────────────────────────────────────────────────

const lehengaFaqs: FAQItem[] = [
  {
    id: "alterations",
    question: "Can this lehenga be altered after delivery?",
    answer:
      "Yes — hems, blouse ease, and strap adjustments are free within 30 days of delivery in Pakistan. Embroidery borders sit at the hem, so we prefer to finalise length at your last fitting rather than cut after. For overseas brides, we ship with a hem allowance and guide your local tailor remotely.",
    order: 1,
  },
  {
    id: "lining-weight",
    question: "Does this piece need lining, and how heavy is it to wear?",
    answer:
      "Bridal lehengas ship with a built-in can-can petticoat and a soft inner lining so the embroidery never sits against skin. Weight depends on embroidery density — light resham pieces are dance-ready; full **zardozi** baraat pieces are court-weight by design. Ask us for the approximate kilogram weight of any specific piece.",
    order: 2,
  },
  {
    id: "custom-vs-ready",
    question: "How is customising different from buying this ready piece?",
    answer:
      "This ready piece is cut to a standard size chart and ships as shown. A [custom design](/customize) starts from your measurements, lets you choose fabric, embroidery technique and density, and is built in staged fittings — typically longer lead time, uniquely yours. Many brides buy a ready piece for one event and customise another.",
    order: 3,
  },
  {
    id: "care",
    question: "How should I care for and store this lehenga?",
    answer:
      "Dry-clean only, with a cleaner who knows metal-thread embroidery. Never steam directly onto zardozi or dabka. Store flat or on a wide padded hanger in a breathable garment bag — never plastic. Keep silica sachets nearby in humid cities. We include a care card with every piece.",
    order: 4,
  },
  {
    id: "lead-time",
    question: "How long until I receive this specific piece?",
    answer:
      "Lead time is stated plainly next to the price on this page. Ready-stock pieces ship within days; made-to-order bridal pieces typically take 6–18 weeks depending on embroidery density. If your wedding date is fixed, tell us before you pay — we will be honest if the timeline does not fit.",
    order: 5,
  },
];

const khussaFaqs: FAQItem[] = [
  {
    id: "sizing-conversion",
    question: "How do Pakistani sizes convert to UK / US / EU?",
    answer:
      "Our khussa use Pakistani sizing. Roughly: **PK 5 ≈ UK 4 / US 6 / EU 37**, **PK 6 ≈ UK 5 / US 7 / EU 38**, **PK 7 ≈ UK 6 / US 8 / EU 39**. If you are between sizes, size up — leather stretches slightly across the vamp but not in length. Message us your usual brand size and we will confirm.",
    order: 1,
  },
  {
    id: "break-in",
    question: "Do these need breaking in before the wedding?",
    answer:
      "Yes — wear them around the house for short sessions over a week. Soft leather moulds to your foot; the gold thread will not. A thin gel insole helps if you are standing for hours. Do not soak or force-stretch over a last at home.",
    order: 2,
  },
  {
    id: "sole",
    question: "What is the sole made of, and will it grip?",
    answer:
      "A leather sole with a thin rubber heel tip for outdoor grip. Indoor marble and stage floors are fine; wet grass and polished stone need care. We can add a full rubber sole on request before dispatch.",
    order: 3,
  },
  {
    id: "true-to-size",
    question: "Do Begum khussa run true to size?",
    answer:
      "They run true to Pakistani bridal sizing — slightly roomier in the toe than Western pointed flats, as traditional khussa should. If you usually wear a narrow last, stay with your measured size; if you have a wide forefoot, size up.",
    order: 4,
  },
];

const jewelleryFaqs: FAQItem[] = [
  {
    id: "material",
    question: "What metal and plating is this made from?",
    answer:
      "Base is brass or copper alloy with gold or antique finish, set with polki, kundan, or semi-precious stones as described on the piece. This is traditional bridal jewellery craft — not solid gold unless the listing explicitly says so. Ask for a material card if you need it for customs or insurance.",
    order: 1,
  },
  {
    id: "skin-sensitivity",
    question: "Is it hypoallergenic? I have sensitive skin.",
    answer:
      "Pieces are nickel-tested, but very sensitive skin can still react to long wear of plated alloys. We recommend a clear barrier varnish on contact points, or wearing for shorter stretches with breaks. If you have a known metal allergy, tell us before ordering — we can advise or suggest alternatives.",
    order: 2,
  },
  {
    id: "pierced-clip",
    question: "Are the earrings pierced or clip-on?",
    answer:
      "Default is pierced posts with secure butterfly backs. Clip-on converters are available on request at no charge for most jhumka and passa styles — note it at checkout or on WhatsApp.",
    order: 3,
  },
  {
    id: "jewellery-care",
    question: "How do I prevent tarnish and keep it looking new?",
    answer:
      "Wipe with a soft dry cloth after wear. Store in the anti-tarnish pouch provided, away from perfume and humidity. Do not use ultrasonic cleaners or jewellery dip on polki or kundan. Re-plating is available through our atelier for heirloom pieces years later.",
    order: 4,
  },
  {
    id: "adjustability",
    question: "Can the fit be adjusted (necklace, matha patti, kamarband)?",
    answer:
      "Most necklaces and matha patti have an extension chain; kamarband and payal are made to a stated length range. For a precise bridal fit, send your neck, forehead, or waist measurement and we will confirm before dispatch.",
    order: 5,
  },
];

const dupattaFaqs: FAQItem[] = [
  {
    id: "dupatta-length",
    question: "What is the length and fabric weight?",
    answer:
      "Standard bridal dupattas are 2.5 yards unless the product notes otherwise. Silk and organza weights vary — light enough to drape, dense enough that embroidery does not sag. Exact centimetre length is listed in the size details on request.",
    order: 1,
  },
  {
    id: "matched-or-solo",
    question: "Is this matched to a specific lehenga, or sold standalone?",
    answer:
      "Both. Some dupattas are designed as companions (see **Complete the Look** on this page); all can be bought alone. If you already have a Begum lehenga, send a photo and we will tell you honestly whether this border and colour will sit well with it.",
    order: 2,
  },
  {
    id: "dupatta-care",
    question: "How should I store an embroidered dupatta?",
    answer:
      "Fold along the unembellished panels, never crease across heavy borders. Tissue between folds. Dry-clean only. Avoid hanging long-term — gravity pulls on silk and can warp a tilla edge.",
    order: 3,
  },
];

const bagFaqs: FAQItem[] = [
  {
    id: "dimensions",
    question: "What are the dimensions?",
    answer:
      "Exact centimetres are listed under product details. As a guide, potlis hold a phone, lipstick, and a folded tissue; clutches hold a phone and slim card case. Message us if you need to fit a specific item.",
    order: 1,
  },
  {
    id: "what-fits",
    question: "What fits inside on the wedding day?",
    answer:
      "Designed for essentials, not a day bag — phone, lip colour, blotting papers, and a spare earring back. For passports and larger items, pair with a travel pouch kept with your family.",
    order: 2,
  },
  {
    id: "closure-strap",
    question: "What closure and strap or chain length does it have?",
    answer:
      "Closures are drawstring (potli) or magnetic/flap (clutch) as shown. Chain or cord drop is typically 40–55 cm — long enough for the wrist or a short shoulder. We can shorten a chain before shipping if you tell us.",
    order: 3,
  },
];

/** Map each Category to its default FAQ set. */
export const categoryFAQDefaults: Record<Category, FAQItem[]> = {
  "bridal-lehenga": lehengaFaqs,
  "bridal-dupatta": dupattaFaqs,
  "bridal-purse-potli": bagFaqs,
  "bridal-clutch": bagFaqs,
  "bridal-shoes-khussa": khussaFaqs,
  "bridal-jewellery-sets": jewelleryFaqs,
  "bridal-bangles": jewelleryFaqs,
  kalire: jewelleryFaqs,
  "matha-patti": jewelleryFaqs,
  "jhumar-passa": jewelleryFaqs,
  nath: jewelleryFaqs,
  payal: jewelleryFaqs,
  kamarband: jewelleryFaqs,
  "hair-accessories": jewelleryFaqs,
};

export const categoryCareGuidance: Partial<Record<Category, CareGuidance>> = {
  "bridal-lehenga": {
    title: "Care & preservation",
    body: "Dry-clean only with a metal-thread specialist. Store flat or on a wide padded hanger in a breathable bag — never plastic. Keep away from direct steam on embroidery. A care card ships with every piece.",
  },
  "bridal-dupatta": {
    title: "Care & preservation",
    body: "Fold on plain panels only; tissue between layers. Dry-clean only. Do not hang long-term — gravity stretches silk and can warp embroidered borders.",
  },
  "bridal-shoes-khussa": {
    title: "Care & preservation",
    body: "Wipe leather with a soft dry cloth after wear. Stuff with tissue to hold shape. Keep away from rain; if damp, air-dry away from heat. Condition lightly once a season.",
  },
  "bridal-jewellery-sets": {
    title: "Care & preservation",
    body: "Wipe after wear, store in the anti-tarnish pouch, and keep perfume and hairspray off the metal. No ultrasonic cleaners on polki or kundan.",
  },
  "bridal-bangles": {
    title: "Care & preservation",
    body: "Store flat in the pouch provided. Wipe after wear. Avoid stacking against harder metals that can scratch plating.",
  },
  "bridal-purse-potli": {
    title: "Care & preservation",
    body: "Empty after the event, reshape the potli with tissue, and store in a dust bag away from humidity.",
  },
  "bridal-clutch": {
    title: "Care & preservation",
    body: "Wipe the exterior after wear, empty the lining, and store closed in a dust bag. Keep chains untangled.",
  },
};

// Jewellery categories share the same care note
for (const cat of [
  "kalire",
  "matha-patti",
  "jhumar-passa",
  "nath",
  "payal",
  "kamarband",
  "hair-accessories",
] as Category[]) {
  categoryCareGuidance[cat] = categoryCareGuidance["bridal-jewellery-sets"];
}

// ── Product-specific overrides ───────────────────────────────────────────────

export const productFAQSets: ProductFAQSet[] = [
  {
    productId: "bl-001",
    productSpecific: [
      {
        id: "bl-001-lining",
        question: "Does the Zari Dream need extra lining for a winter baraat?",
        answer:
          "It already ships with a full can-can and soft lining. For December–February outdoor baraats in the north, we can add a lightweight thermal petticoat layer before dispatch — ask on WhatsApp and we will confirm weight and timeline.",
        order: 10,
      },
      {
        id: "bl-001-neckline",
        question: "Can the blouse neckline be raised or deepened?",
        answer:
          "Yes on a custom or made-to-order run of this design. The ready piece ships with the neckline shown. If you need a higher boat neck or a deeper sweetheart, choose [Customise this piece](/customize) or message us before payment — embroidery around the neckline cannot be moved after it is set.",
        order: 11,
      },
      {
        id: "bl-001-karigar",
        question: "Who embroidered this, and can I see more of their work?",
        answer:
          "Master karigar **Muhammad Ali** in Lahore — 32 years in zardozi and dabka. His profile and work-in-progress photos live on [The Craft](/the-craft#muhammad-ali).",
        order: 12,
      },
    ],
  },
  {
    productId: "bl-002",
    productSpecific: [
      {
        id: "bl-002-dance",
        question: "Is the Resham Noor light enough to dance in at a mehndi?",
        answer:
          "Yes — that is what it was cut for. Resham silk-thread work is a fraction of the weight of full zardozi, and the ivory silk base moves with you. We still recommend a heel-aware hem so you are not stepping on the border mid-dhol.",
        order: 10,
      },
      {
        id: "bl-002-dupatta",
        question: "Is there a matching dupatta?",
        answer:
          "The [Sunrise Silk Dupatta](/product/sunrise-silk-dupatta) was designed as its companion — same blush-to-gold register. You can buy either alone.",
        order: 11,
      },
    ],
  },
  {
    productId: "jd-001",
    productSpecific: [
      {
        id: "jd-001-includes",
        question: "What exactly is included in the Emerald Heritage Set?",
        answer:
          "Necklace, earrings, and maang tikka — three pieces, photographed together. Passa, nath, and bangles are sold separately so you can build the stack you actually want.",
        order: 10,
      },
      {
        id: "jd-001-polki",
        question: "Are the polki stones natural uncut diamonds?",
        answer:
          "Yes — traditional uncut diamond (polki) with emerald accents in a gold-tone setting. We include a simple authenticity note with the set; ask if you need wording for insurance.",
        order: 11,
      },
    ],
  },
  {
    productId: "kh-001",
    productSpecific: [
      {
        id: "kh-001-dance-floor",
        question: "Will the Gold Thread Khussa survive a long baraat on outdoor ground?",
        answer:
          "The leather sole with rubber heel tip is built for mixed indoor/outdoor use. For lawn or gravel, we recommend the optional full rubber sole — add it free before dispatch if you message us within 24 hours of order.",
        order: 10,
      },
    ],
  },
  {
    productId: "dp-001",
    productSpecific: [
      {
        id: "dp-001-pair",
        question: "Which lehenga was this dupatta made for?",
        answer:
          "It was designed beside the [Resham Noor Lehenga](/product/resham-noor-lehenga) — same sunrise palette. It also sits well with ivory and blush mehndi outfits from other makers if the embroidery language is light.",
        order: 10,
      },
    ],
  },
];

// ── Article FAQs ─────────────────────────────────────────────────────────────

export const articleFAQSets: ArticleFAQSet[] = [
  {
    articleId: "what-is-a-begum",
    faqs: [
      {
        id: "begum-what",
        question: "What is a Begum?",
        answer:
          "A Begum is a feminine title of Turkic origin meaning 'lady' or 'noblewoman.' Historically used across the Mughal Empire to designate rank, the title came to represent any woman of dignity, authority, and social standing. In contemporary South Asian usage, it is both an honorific and a term of deep cultural respect.",
        order: 1,
      },
      {
        id: "begum-urdu",
        question: "What does Begum mean in Urdu?",
        answer:
          "In Urdu, Begum (بیگم) translates most directly as 'lady' or 'Mrs.' and is commonly used as a respectful form of address for married women. The term carries historical weight beyond its literal translation - it implies grace, command, and a sense of earned presence.",
        order: 2,
      },
      {
        id: "begum-royal",
        question: "Is Begum a royal title?",
        answer:
          "Begum was originally a royal and aristocratic title used in the Mughal Empire and various South Asian sultanates to designate noblewomen and members of the imperial family. Over time, its usage broadened to include any woman of standing. Today, it functions as both a surname and a cultural honorific across Pakistani, Indian, Bangladeshi, and diaspora communities.",
        order: 3,
      },
      {
        id: "begum-bride",
        question: "Why do Pakistani brides identify with the Begum title?",
        answer:
          "The Begum archetype represents the ceremonial and cultural ideal of the Pakistani bride - a woman centered, honored, and dressed with full intention. The title captures the dignity that Pakistani weddings are designed to confer on the bride, making it a natural point of identification during the bridal journey.",
        order: 4,
      },
      {
        id: "begum-site",
        question: "What is bagum.com?",
        answer:
          "Bagum.com is the e-commerce home of Begum, a Pakistani bridal fashion brand whose philosophy is rooted in the cultural meaning of the Begum title. The brand was named to reflect its core belief: that every bride deserves to feel like a Begum.",
        order: 5,
      },
    ],
  },
  {
    articleId: "zardozi-guide",
    faqs: [
      {
        id: "zardozi-vs-zari",
        question: "What is the difference between zardozi and zari embroidery?",
        answer:
          "Zardozi and zari are related but distinct. Zari refers specifically to the metallic thread — gold or silver — used in embroidery and weaving. Zardozi is the embroidery technique that uses zari thread, along with wires, beads, and sequins, to create raised surface decoration. All zardozi involves zari, but not all zari use is zardozi.",
        order: 1,
      },
      {
        id: "zardozi-time",
        question: "How long does it take to embroider a bridal outfit with zardozi?",
        answer:
          "A fully embroidered baraat jora with dense zardozi coverage typically takes one karigar four to twelve weeks, depending on the intricacy of the design, the size of the garment, and how much of the fabric surface is covered. Complex patterns on velvet take longer than lighter work on net or organza. This is why custom bridal orders should begin at least 16 weeks before the wedding date.",
        order: 2,
      },
      {
        id: "zardozi-sustainable",
        question: "Is zardozi embroidery sustainable?",
        answer:
          "Traditional zardozi uses natural metallic threads and is worked by hand, which is inherently less resource-intensive than machine production. However, some modern zardozi uses synthetic metallic threads and plastic-based sequins. Brides who prioritize sustainability should ask specifically about thread and embellishment materials when placing a custom order.",
        order: 3,
      },
      {
        id: "zardozi-care",
        question: "Can zardozi be dry-cleaned?",
        answer:
          "Yes, but with care. Hand-worked zardozi should be dry-cleaned only, by a specialist familiar with embellished garments. Washing or steam-pressing without expertise can loosen embellishments, distort metallic threads, or flatten the raised texture that defines the work. Store your bridal outfit in acid-free tissue, laid flat or loosely rolled, away from direct light.",
        order: 4,
      },
      {
        id: "zardozi-cost",
        question: "Why does authentic zardozi cost significantly more than embroidered alternatives?",
        answer:
          "The cost reflects labor, materials, and time. A single karigar working on a heavily embroidered piece will spend weeks on a single garment. The metallic threads, stones, and sequins used in quality work are not cheap materials. And the skill required to execute complex patterns with precision is built over years of practice. Machine embroidery reduces all three variables simultaneously — and the quality difference is visible in the finished piece.",
        order: 5,
      },
      {
        id: "zardozi-begum",
        question: "How do I know if the zardozi on a Begum piece is hand-worked?",
        answer:
          "Begum's remote ordering process includes milestone photography at each stage of production, including photographs of the embroidery in progress. You can see the work on the adda, the hands of the karigar, and the developing pattern before the outfit is completed. This documentation removes ambiguity entirely.",
        order: 6,
      },
      {
        id: "zardozi-event",
        question: "Which wedding event should I prioritize for heavy zardozi work?",
        answer:
          "The baraat is the primary occasion for heavy zardozi embroidery. It is the most formal, the most public, and the event where metallic embellishment reads most powerfully under event lighting. If budget requires prioritizing one outfit for heavy karigar investment, it is almost always the baraat jora.",
        order: 7,
      },
    ],
  },
  {
    articleId: "how-to-choose-lehenga-length",
    faqs: [
      {
        id: "length-heels",
        question: "What if I have not decided between heels and flats yet?",
        answer:
          "Tell us your likely heel height range. We build a hem allowance and lock the final length at your last fitting — that is what staged fittings are for. What we cannot do is rescue a lehenga already cut short once the embroidery border is set.",
        order: 1,
      },
      {
        id: "length-alterations",
        question: "How much length should I allow for after alterations?",
        answer:
          "If you are between two lengths, take the longer. A hem can come up; a zardozi border cannot come down. For baraat trains we add length at the back panel only so you can still walk.",
        order: 2,
      },
      {
        id: "length-measure",
        question: "Where exactly do I measure from?",
        answer:
          "From your natural waist — where the lehenga will actually tie, usually higher than jeans sit — to the floor, wearing the heel you will wear. Full walkthrough in our [Size Guide](/size-guide).",
        order: 3,
      },
      {
        id: "length-custom",
        question: "Can a custom lehenga be cut to my exact length from day one?",
        answer:
          "Yes. In the [customiser](/customize) you enter lehenga length in centimetres, and we confirm it on a toile before the real fabric is cut.",
        order: 4,
      },
    ],
  },
  {
    articleId: "zaras-london-baraat",
    faqs: [
      {
        id: "zara-remote",
        question: "Can you really fit a lehenga from another country?",
        answer:
          "Yes — video measurement walkthroughs, a toile fitting before real fabric, and staged photo approvals at every embroidery stage. Payments follow the same stages so you never send the full amount across an ocean on hope alone.",
        order: 1,
      },
      {
        id: "zara-start",
        question: "How do I start a remote bespoke order like Zara’s?",
        answer:
          "Book a [consultation](/customize/consultation) — thirty minutes, free, no deposit required to talk. Or begin measurements in the [customiser](/customize) and share the snapshot with your family tailor for a second opinion.",
        order: 2,
      },
      {
        id: "zara-more",
        question: "Are there more stories from overseas brides?",
        answer:
          "Yes — see [Real Brides](/real-brides) for voices from Lahore, London, Dubai, and beyond.",
        order: 3,
      },
    ],
  },
  {
    articleId: "mehndi-dressing-guide",
    faqs: [
      {
        id: "mehndi-weight",
        question: "What embroidery should I choose if I want to dance all night?",
        answer:
          "Resham and gota — not full zardozi. Silk thread and ribbon-work give colour and shine at a fraction of the metal weight. The [Mehndi Collection](/collections/occasion/mehndi) is edited for exactly that.",
        order: 1,
      },
      {
        id: "mehndi-hem",
        question: "How much shorter should a mehndi lehenga be than floor length?",
        answer:
          "About an inch. Nobody notices the inch in photographs; everybody notices a bride stepping on her hem during the dhol. See also our note on [choosing lehenga length](/journal/how-to-choose-lehenga-length).",
        order: 2,
      },
      {
        id: "mehndi-colour",
        question: "Is it acceptable to wear bold colour at the mehndi?",
        answer:
          "It is the most chromatically free night of the wedding — yellows, corals, magentas, greens, often together. If you want the unexpected colour you cannot justify at the baraat, this is the night.",
        order: 3,
      },
    ],
  },
  {
    articleId: "reading-the-rituals",
    faqs: [
      {
        id: "rituals-four",
        question: "Do I need four completely different outfits?",
        answer:
          "Not as a rule — as a language. Many brides wear three and repeat a quieter piece; some customise one statement baraat lehenga and keep mehndi lighter. Read the register of each night, then choose your own accent.",
        order: 1,
      },
      {
        id: "rituals-baraat",
        question: "Which night should carry the heaviest embroidery?",
        answer:
          "Traditionally the baraat — maximum formality, deep colour, full-weight zardozi. That is why a baraat lehenga can take our karigars the better part of four months. Browse the [Baraat Collection](/collections/occasion/baraat).",
        order: 2,
      },
      {
        id: "rituals-walima",
        question: "What does a walima outfit usually feel like compared to the baraat?",
        answer:
          "Polish rather than power — champagnes, pastels, silver-toned work, silhouettes that are elegant rather than monumental. After the baraat's declaration, the walima is composure. See the [Walima edit](/collections/occasion/walima).",
        order: 3,
      },
    ],
  },
  {
    articleId: "order-pakistani-bridal-wear-from-abroad",
    faqs: [
      {
        id: "diaspora-how-far",
        question: "How far in advance should I order my Pakistani bridal wear from abroad?",
        answer:
          "Start your ordering process a minimum of 16 weeks before your wedding date for a custom-made outfit with intricate zardozi or resham embroidery. If your timeline is shorter than 12 weeks, discuss semi-custom options with a style advisor during your video consultation.",
        order: 1,
      },
      {
        id: "diaspora-fit",
        question: "What if my outfit doesn't fit when it arrives?",
        answer:
          "The measurement guide, karigar expertise, and milestone photography process are designed to minimize this risk. However, Begum's garments are made with standard alteration allowances factored into the cut, meaning minor adjustments — taking in or letting out a seam — can be handled by a local tailor in your city. Your style advisor will note this during the consultation.",
        order: 2,
      },
      {
        id: "diaspora-multiple",
        question: "Can I order multiple outfits for different wedding events?",
        answer:
          "Yes. Most diaspora brides order a complete bridal set covering the nikkah, baraat, and walima as a single order. This simplifies the consultation, ensures visual cohesion across events, and often results in a more efficient production timeline.",
        order: 3,
      },
      {
        id: "diaspora-cancel",
        question: "How does the 30/40/30 payment model work if I need to cancel?",
        answer:
          "Payment terms for cancellation at each stage will be confirmed in writing during your initial consultation. As a general principle, the upfront 30% covers procurement costs that cannot be reversed once fabric is sourced. Communicate early if your circumstances change.",
        order: 4,
      },
      {
        id: "diaspora-insurance",
        question: "Is the shipping insurance sufficient to cover the full value of my outfit?",
        answer:
          "Shipping insurance is declared at the full commercial value of the garment. Confirm the declared value with the Begum team at the point of dispatch and retain your tracking and insurance documentation until the outfit is safely in your hands.",
        order: 5,
      },
      {
        id: "diaspora-silhouette",
        question: "What if I don't know which silhouette or style I want yet?",
        answer:
          "That is exactly what the video consultation is for. Arrive with references — screenshots, saved posts, even vague descriptions of a feeling you want the outfit to create — and the style advisor will help translate that into a specific brief.",
        order: 6,
      },
      {
        id: "diaspora-swatches",
        question: "Can I see fabric swatches before committing to an order?",
        answer:
          "Yes. Fabric swatches are sent physically after the initial consultation and before production begins. No karigar work commences until you have reviewed and approved both the fabric and the color palette.",
        order: 7,
      },
    ],
  },
];

// ── Resolvers ────────────────────────────────────────────────────────────────

export function resolveProductFaqs(
  productId: string,
  category: Category,
): FAQItem[] {
  const defaults = categoryFAQDefaults[category] ?? [];
  const set = productFAQSets.find((s) => s.productId === productId);
  const omit = new Set(set?.omitDefaultIds ?? []);
  const inherited = defaults.filter((f) => !omit.has(f.id));
  const specific = set?.productSpecific ?? [];
  return [...inherited, ...specific].sort((a, b) => a.order - b.order);
}

export function resolveArticleFaqs(articleId: string): FAQItem[] {
  const set = articleFAQSets.find((s) => s.articleId === articleId);
  return (set?.faqs ?? []).slice().sort((a, b) => a.order - b.order);
}

export function resolveCareGuidance(
  category: Category,
  productOverride?: CareGuidance,
): CareGuidance | null {
  return productOverride ?? categoryCareGuidance[category] ?? null;
}

/** Plain-text answer for JSON-LD (strip simple markup). */
export function faqAnswerToPlainText(answer: string): string {
  return answer
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export function leadTimeMessage(leadTimeDays: number, inStock: boolean): {
  headline: string;
  detail: string;
  ready: boolean;
} {
  if (inStock && leadTimeDays <= 7) {
    return {
      headline: `Ready to ship in ${leadTimeDays} day${leadTimeDays === 1 ? "" : "s"}`,
      detail: "In stock — packed after your size confirmation.",
      ready: true,
    };
  }
  if (leadTimeDays <= 21) {
    const weeks = Math.max(2, Math.round(leadTimeDays / 7));
    return {
      headline: `Made to order — about ${weeks} weeks`,
      detail: "Cut and finished after your order; timeline confirmed before payment.",
      ready: false,
    };
  }
  const weeksLow = Math.max(4, Math.floor(leadTimeDays / 7) - 1);
  const weeksHigh = Math.ceil(leadTimeDays / 7) + 1;
  return {
    headline: `Made to order — ${weeksLow} to ${weeksHigh} weeks`,
    detail: "Embroidery density drives the calendar. We will be honest if your wedding date does not fit.",
    ready: false,
  };
}

export function whatsappProductUrl(productName: string, slug: string): string {
  const text = encodeURIComponent(
    `Hi Begum — I have a question about "${productName}" (/product/${slug}). `,
  );
  return `https://wa.me/923209988777?text=${text}`;
}

export function whatsappArticleUrl(articleTitle: string, slug: string): string {
  const text = encodeURIComponent(
    `Hi Begum — I was reading "${articleTitle}" (/journal/${slug}) and I have a follow-up question. `,
  );
  return `https://wa.me/923209988777?text=${text}`;
}
