// Journal content — structured, CMS-ready. The index and article
// template both render from this data.

export type JournalCategory =
  | "real-weddings"
  | "styling-guides"
  | "craft-culture"
  | "size-fit";

export const journalCategories: { slug: JournalCategory; name: string }[] = [
  { slug: "styling-guides", name: "Styling Guides" },
  { slug: "real-weddings", name: "Real Weddings" },
  { slug: "craft-culture", name: "Craft & Culture" },
  { slug: "size-fit", name: "Size & Fit Advice" },
];

export interface ShopTheStoryLink {
  label: string;
  href: string;
  note: string;
}

export interface InlineImage {
  src: string;
  alt: string;
  caption?: string;
  /** 0-based paragraph index after which this image should appear */
  afterParagraph: number;
}

export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: JournalCategory;
  image: string;
  imageAlt: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  pullQuote?: string;
  body: string[];
  inlineImages?: InlineImage[];
  shopTheStory?: ShopTheStoryLink[];
}

export function getCategoryName(slug: JournalCategory): string {
  return journalCategories.find((c) => c.slug === slug)?.name ?? slug;
}

export const journalArticles: JournalArticle[] = [
  {
    slug: "what-is-a-begum",
    title: "What Is a Begum? The History and Meaning Behind the Title",
    excerpt: "There is a word that has moved through centuries and continents, carried in the names of queens and whispered at wedding ceremonies across Pakistan, India, Bangladesh, and beyond. That word is Begum. This post explores its origins in the Mughal court, its evolution into a cultural identity, and why Pakistani brides wherever they live in the world still feel something stir when they hear it.",
    category: "craft-culture",
    image: "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Bride in regal handcrafted bridal couture",
    author: "Begum Editorial",
    date: "2026-07-24",
    readTime: "8 min read",
    featured: true,
    pullQuote: "Begum is a Turkic-origin title meaning 'lady' or 'noblewoman,' historically used across the Mughal Empire to denote rank and dignity — and today, it is what every bride becomes the moment she steps into her own authority.",
    body: [
      "There is a word that has moved through centuries and continents, carried in the names of queens and whispered at wedding ceremonies across Pakistan, India, Bangladesh, and beyond. That word is Begum. This post explores its origins in the Mughal court, its evolution into a cultural identity, and why Pakistani brides wherever they live in the world still feel something stir when they hear it.",
      "Key Takeaways: Begum is a Turkic-origin title meaning 'lady' or 'noblewoman,' historically used across the Mughal Empire to denote rank and dignity. In Urdu and broader South Asian culture, Begum carries connotations of grace, authority, and feminine power — not just aristocracy. The title has traveled with the South Asian diaspora to the UK, USA, UAE, Canada, and Australia, where it remains a term of deep cultural resonance. Pakistani bridal identity is inseparable from the Begum archetype: a woman dressed with intention, received with honor, and remembered. Begum (bagum.com) was named after this title because every bride who wears the brand deserves to feel exactly that.",
      "What Does Begum Mean? Begum (also spelled Baigum or Baygum) is a feminine honorific title with roots in Turkic and Mongolic languages. At its core, it means 'lady' or 'noblewoman.' The male equivalent is Beg or Bey — a rank used across Central Asian and Ottoman cultures to denote authority and social standing. In Urdu, the word Begum (بیگم) functions both as a title and as a term of respectful address for a married woman. Over time, its meaning stretched beyond strict aristocracy. To call someone a Begum in everyday Pakistani speech is to acknowledge her dignity, her presence, her command of a room. The word carries weight. It is not decorative.",
      "The Historical Origins of the Begum Title in Mughal Culture. The Begum title entered South Asian consciousness through the Mughal Empire, which ruled the Indian subcontinent from 1526 to 1857. The Mughals were Central Asian Turco-Mongol in heritage, and they brought with them a vocabulary of rank that included Begum as the highest feminine designation. Mughal Begums were not passive figures. They held property, commissioned architecture, ran households of thousands, and — in some cases — shaped political outcomes. Nur Jahan, one of the most powerful women in Mughal history, held de facto authority during the reign of Emperor Jahangir. Mumtaz Mahal, whose name became synonymous with love and legacy, was a Begum whose memory shaped one of the world's most recognizable structures. The Begum title marked women who were not simply wives or mothers. They were patrons, administrators, and arbiters of taste. The zardozi embroidery that still adorns Pakistani bridal wear, the silk resham threadwork that karigar families have passed down for generations, the draped dupatta worn as a statement rather than an afterthought — much of this aesthetic was cultivated and codified in Mughal women's courts. To understand where Pakistani bridal fashion comes from, you have to understand the Begum.",
      "Why Every Pakistani Bride Wants to Be Called a Begum. A wedding in Pakistani culture is not simply a legal union. It is a declaration. For one day — or several days — the bride is centered, honored, and seen in full. She is dressed in colors that took weeks to select, in fabrics that karigar hands worked through long nights, in jewels that carry the weight of family history. In that context, the word Begum makes complete sense. It is what a bride becomes the moment she crosses that threshold. The desire to embody the Begum archetype is not about pretense. It is about a woman stepping into her own authority — graceful, certain, and entirely herself. Pakistani brides are not performing royalty. They are claiming a lineage of feminine dignity that runs centuries deep. This is why the word persists. It is not nostalgia. It is recognition.",
      "How the Begum Title Lives Across the South Asian Diaspora. The title did not stay in the subcontinent. It traveled. Across the UK, USA, UAE, Canada, and Australia, South Asian diaspora communities have carried the word Begum with them — through naming conventions, through terms of endearment, through the way an aunty is addressed at a gathering. In cities like London and Birmingham, Begum appears as a surname on electoral rolls, on medical records, on school registers — a daily reminder of origin. In Toronto and Houston, second-generation Pakistani women reclaim the word deliberately, as a statement of identity that refuses to shrink. The South Asian diaspora bridal market is one of the most culturally sophisticated consumer groups in the world. These brides are navigating two or more cultural contexts simultaneously. They want bridal wear that honors where they come from without flattening the complexity of who they are. The word Begum speaks to exactly that tension — it is rooted, but it is not rigid.",
      "How the Begum Name Connects to Pakistani Bridal Fashion and Identity. Pakistani bridal fashion is an entire language. The choice of fabric — whether katan silk, raw silk, or tissue — signals something. The density of zardozi on a nikkah ensemble versus a baraat outfit tells a story about the bride's aesthetic philosophy. The way a dupatta is draped communicates both regional heritage and personal expression. The Begum, historically, was the one who set these standards. Mughal-era begums patronized the ateliers, established the color vocabulary, and determined which silhouettes were worthy of celebration. Pakistani bridal fashion — particularly in its contemporary form — draws directly from this inheritance. When a brand situates itself within this lineage, it takes on a responsibility. The craftsmanship has to honor the source. The fabrics need to be chosen with the same deliberateness that karigar artisans bring to their work. The aesthetic must be legible across generations — familiar to the grandmother, exciting to the bride. That is not a small thing to claim. It is exactly what the Begum title demands.",
      "Why Begum (bagum.com) Was Named After This Title. Every brand name is a commitment. When a Pakistani bridal e-commerce brand chooses to name itself Begum, it is not reaching for prestige as decoration. It is making a promise about what every bride who wears the label deserves to feel. Begum (bagum.com) was founded on a single conviction: every bride, a Begum. That tagline is not a marketing line. It is the entire philosophy. The brand exists because the bridal experience — particularly for Pakistani women navigating diasporic identity — deserves to be met with clothing that understands its cultural weight. Not just beautiful garments, but garments that mean something. The name Begum was chosen because it is the most honest answer to the question every Pakistani bride is really asking when she searches for her outfit: Will I feel like myself, but more so? The Begum title has always been an answer to that question. Now, so is the brand.",
      "Looking Forward: What the Begum Title Tells Us About Bridal Identity Today. The word Begum has outlasted empires, migrations, and centuries of cultural change. It has survived because it captures something that does not go out of fashion: the idea that a woman's dignity is not circumstantial. It does not depend on which country she lives in, how large her wedding is, or what her budget looks like. The Mughal begums built their legacy through patronage and presence. The Pakistani brides of today — in Karachi, London, Dubai, Toronto, and Sydney — are doing something similar. They are choosing garments with intention, supporting artisanal craft, and insisting that their cultural identity be honored rather than diluted.",
    ],
    shopTheStory: [
      {
        label: "Explore Begum's Bridal Collections",
        href: "/collections",
        note: "Every garment is made for a woman who knows what she is stepping into",
      },
    ],
  },
  {
    slug: "zardozi-guide",
    title: "Zardozi Embroidery: The Art Behind Pakistani Bridal Couture",
    excerpt: "Learn what zardozi embroidery is, how it is made, and how to choose the right work for each wedding event — from mehndi to baraat. A comprehensive guide for Pakistani brides.",
    category: "craft-culture",
    image: "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Close-up of hand-worked zardozi gold thread embroidery on bridal fabric",
    author: "Begum Editorial",
    date: "2026-07-24",
    readTime: "10 min read",
    featured: true,
    pullQuote: "Zardozi is not decoration. It is the language the outfit speaks — about occasion, about family, about the weight of the moment.",
    body: [
      "There is a particular kind of silence in a karkhana when a karigar bends over a frame and begins to work. The fabric is stretched taut. The metallic thread catches whatever light exists. And the needle moves with a rhythm that has not changed in four hundred years. For Pakistani brides, zardozi is not decoration. It is the language the outfit speaks — about occasion, about family, about the weight of the moment. A bride choosing her baraat jora is not simply selecting a garment. She is deciding how much of that language she wants on her body, and how loudly she wants it to speak.",
      "Yet despite its centrality to Pakistani bridal culture, zardozi remains widely misunderstood — even by brides who have grown up surrounded by it. Many cannot distinguish it from resham work. Fewer still can tell authentic hand-worked zardozi from the machine-made approximation that has flooded the market in recent years. And almost none know how to match zardozi weight and density to each wedding event. This guide changes that. By the end, you will know exactly what zardozi is, where it comes from, how it is made, and how to use that knowledge to make sharper, more confident bridal decisions — whether you are ordering in person or from abroad.",
      "Key Takeaways: Zardozi is a metallic hand embroidery technique with roots in Mughal court culture, distinct from resham threadwork in both material and method. Authentic zardozi is worked by karigar on a stretched frame using a hooked needle called an ari, a process that cannot be replicated by machine without visible quality loss. Different wedding events — mehndi, nikkah, baraat, walima — call for different zardozi weights. Heavier metallic work belongs on the baraat; lighter, more color-forward embroidery suits the mehndi and walima. Machine embroidery mimics the surface appearance of zardozi but lacks the texture, irregularity, and depth that define the hand-worked original. Begum's karigar tradition preserves these techniques within a contemporary bridal context, allowing diaspora brides to access authentic craftsmanship regardless of where they live.",
      "What Is Zardozi Embroidery? Zardozi is a form of hand embroidery that uses metallic elements — gold and silver threads, fine wires, sequins, beads, and semi-precious stones — to create raised, textured surface decoration on fabric. The word itself comes from Persian: zar meaning gold, and dozi meaning embroidery. Together: gold embroidery. The technique is worked on a tightly stretched fabric using a hooked needle called an ari. The karigar pulls metallic threads up through the fabric from below, creating loops that are locked into place and built up into elaborate patterns. The result is a surface with dimension — not flat printed pattern, but actual topography you can feel with your fingertips. Zardozi is typically worked on rich base fabrics: velvet, silk, net, raw silk, and organza. The weight and drape of the fabric matters because zardozi adds significant physical mass to a garment. A fully embroidered velvet kameez is a substantial object. It is meant to be.",
      "The History of Zardozi in Mughal and South Asian Culture. Zardozi's documented history in South Asia begins with the Mughal court of the 16th century, where it was used to embellish royal garments, tent hangings, elephant trappings, and ceremonial objects. The Mughal emperors — particularly Akbar — formalized the art form by establishing karkhanas, imperial workshops where karigar worked under court patronage. During this period, zardozi reached its most elaborate expression. Garments were encrusted with real gold and silver threads, supplemented with pearls and precious stones. The work was slow, expensive, and intensely hierarchical — specific embroidery patterns were reserved for the court and could not legally be worn by others. The British colonial period disrupted the patronage system that had sustained zardozi karigar for generations. With the decline of Mughal court culture and the closure of imperial karkhanas, many master karigar migrated from Delhi toward Lucknow, which became a new center for zardozi craft in the 19th century. Partition in 1947 reshaped the geography of zardozi again. Many karigar families moved to Lahore and Karachi, bringing their techniques with them. The cities that now anchor Pakistani bridal couture — Lahore especially — carry this lineage directly. When a bride today orders a hand-embroidered jora from Lahore, she is, whether she knows it or not, wearing a craft tradition with an unbroken thread back to the Mughal court.",
      "How Zardozi Embroidery Is Made: The Karigar Process Step by Step. Understanding how zardozi is made is the fastest way to understand why it costs what it costs — and why no machine can fully replicate it. Step 1 — Preparing the Frame (Adda): The fabric is stretched over a wooden frame called an adda and secured so it is completely taut. Any slack in the fabric will distort the embroidery as it progresses. This preparation alone can take several hours for a large piece like a bridal dupatta. Step 2 — Transferring the Design: A paper pattern is perforated and placed over the fabric. Powder or chalk is dusted through the perforations to transfer the design outline onto the surface. The karigar works within these guidelines, though experienced hands often improvise on the detail. Step 3 — Ari Work (Hooking the Threads): The karigar holds the metallic thread or wire beneath the frame and uses the ari — a fine, hooked needle — to pull loops up through the fabric from above. Each loop is individually anchored. On dense zardozi work, a single square centimeter of fabric might contain dozens of these individual stitches. Step 4 — Adding Embellishments: Sequins (sitara), beads, mirrors (sheesha), and stones are stitched on individually or worked into the pattern as the embroidery progresses. Their placement is not random. The karigar reads the design and makes decisions about density, direction, and light reflection. Step 5 — Finishing: Once embroidery is complete, the piece is removed from the adda, pressed carefully, and inspected. A skilled karigar will correct any irregularities before the fabric leaves the frame. A full bridal jora with heavy zardozi can take a single karigar between four and twelve weeks of sustained work, depending on the complexity of the design and how much of the fabric surface is covered.",
      "Zardozi vs. Resham: What Is the Difference? The distinction matters practically, not just technically. Zardozi uses metallic materials — gold and silver threads, metal wires, sequins, beads — to create work that catches light and sits above the fabric surface. The result is luminous and textured. It reads as formal and weighty. Resham is silk thread embroidery. The threads are colored rather than metallic, the surface stays relatively flat, and the effect is softer, more painterly. Resham can be extraordinarily detailed and beautiful, but it communicates differently. Where zardozi announces itself, resham invites closer inspection. Many Pakistani bridal outfits use both techniques together — zardozi for the border, the focal panels, and the hem, resham for the fill work and fine detailing in between. The combination allows a karigar to control where the eye goes and where the garment rests. Neither technique is superior. They serve different purposes, and the best bridal outfits use both with intention.",
      "Why Zardozi Is Central to Pakistani Bridal Wear. Pakistani bridal occasions are not single events. They are multi-day sequences, each with its own dress code, visual register, and emotional weight. Zardozi sits at the apex of this hierarchy because of what metallic embroidery communicates: formality, celebration, and the public declaration of a significant moment. The baraat is the occasion zardozi was made for. The bride is seen by the largest gathering, at the highest level of ceremony, under event lighting that will make metallic embroidery gleam. A heavily worked zardozi jora — particularly in deep reds, greens, or golds — is the visual vocabulary of this moment across the entire subcontinent. There is also a material logic to the choice. A well-made zardozi garment holds its structure. The weight of the embellishments gives body to the fabric, creates a silhouette that moves with authority, and photographs with a depth that resham or printed work cannot match.",
      "How to Choose the Right Zardozi Weight for Each Wedding Event. Not all embroidery is baraat embroidery. One of the most common mistakes brides make is applying the same aesthetic register across all their wedding events. The result is visual fatigue — and outfits that don't serve the occasions they were made for. Mehndi: This is a celebratory, often outdoor daytime event. Lighter embroidery in bright colors — resham-heavy, with zardozi used as accent rather than dominant texture — suits the occasion. Heavy metallic work in evening fabrics feels incongruous at a mehndi. Nikkah: The nikkah is intimate and ceremonial. Embroidery here should feel refined rather than maximalist. Medium-weight zardozi on net or organza — precise, elegant, not overwhelming — works well. Pastel and ivory tones are common. Baraat: This is peak zardozi. Heavy metallic embroidery, rich base fabrics (velvet or silk), full coverage on the kameez and dupatta border. The baraat jora is the outfit a bride invests in most, and zardozi is the primary reason why. Walima: The walima calls for something lighter than the baraat but more polished than the mehndi. Subtle zardozi borders on fine fabrics, or resham-dominant work with metallic accents, works beautifully. Pastels, dusty rose, sage, and ivory are popular choices. When ordering your full bridal wardrobe, discuss this progression with your style advisor. A coherent four-event wardrobe tells a visual story; mismatched embroidery weights make each outfit feel disconnected.",
      "How to Identify Authentic Zardozi vs. Machine Embroidery. The market is full of machine-embroidered fabric sold as hand-worked zardozi. For diaspora brides ordering remotely, this is a real risk. Here is how to tell them apart. Texture and Dimension: Authentic hand-worked zardozi has irregular, raised texture. Run your fingertip across it and you will feel the individual threads and loops. Machine embroidery produces a flatter, more uniform surface — consistent to the point of looking stamped rather than stitched. Pattern Irregularity: Hand embroidery is human work. Look closely at the repetition of a motif: in authentic zardozi, there are minute variations between each repetition. Machine embroidery is perfectly uniform. Paradoxically, perfect regularity is a warning sign. Thread Ends and Backing: Turn the fabric over. Hand-worked zardozi will show thread ends that have been individually secured. Machine embroidery produces a looped, interlocked backing characteristic of a sewing machine's underside. Weight: Authentic zardozi adds meaningful weight to a fabric. If a heavily embroidered piece feels surprisingly light, the embellishments are likely applied rather than worked. Price as a Signal: A full baraat jora in genuine hand-worked zardozi cannot be produced cheaply. If a price seems too low relative to the density of embellishment you are seeing, it almost certainly is.",
      "Begum and the Karigar Tradition. Begum's embroidered bridal collection is built on direct relationships with karigar who have practiced zardozi within a family tradition — skills passed from ustaz to shagird across generations. This is not a marketing claim. It is a structural fact about how the work is sourced and how quality is maintained. Every embroidered piece in the Begum collection passes through the karigar process described above — adda stretching, ari work, hand-applied embellishments, and finished inspection before it reaches a bride. The milestone photography built into Begum's remote ordering process exists precisely so that diaspora brides can see this work at each stage of production, not just as a completed object. For brides ordering from the UK, USA, UAE, Canada, or Australia, this visibility matters. You are not buying blind. You are being shown your outfit as it is made, by the hands making it. That transparency is part of what Begum considers non-negotiable — along with the quality of the embroidery itself.",
      "The Weight of the Work. Zardozi is not a decorative afterthought. It is the technical and cultural core of Pakistani bridal couture — a four-hundred-year-old craft tradition that has survived the collapse of the courts that once patronized it, the disruption of Partition, and the industrialization of fashion. When you choose a hand-worked zardozi outfit for your baraat, you are not simply selecting embellishment. You are choosing where that tradition lives next.",
    ],
    shopTheStory: [
      {
        label: "Explore the Embroidered Bridal Collection",
        href: "/collections",
        note: "Hand-embroidered zardozi pieces by master karigars",
      },
      {
        label: "The Craft — Meet the Karigars",
        href: "/the-craft",
        note: "Portraits and process from the adda frame",
      },
      {
        label: "Book a Video Consultation",
        href: "/customize/consultation",
        note: "Start your bridal brief with a dedicated style advisor",
      },
    ],
  },
  {
    slug: "how-to-choose-lehenga-length",
    title: "How to Choose Your Lehenga Length",
    excerpt: "The one measurement brides get wrong most often — and how to get it right, with or without your heels decided.",
    category: "size-fit",
    image: "https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Bridal lehenga drape and length detail",
    author: "Begum Atelier Team",
    date: "2025-01-28",
    readTime: "4 min read",
    body: [
      "Lehenga length is the measurement our fitting team corrects most. The mistake is almost always the same: measuring to the floor barefoot, then deciding on heels later. A lehenga that grazes the floor barefoot will float two inches high in wedding shoes — and two inches is the difference between regal and slightly wrong.",
      "The rule: decide your shoe first, or at least your heel height. Measure from your natural waist — where you will actually tie the lehenga, which is usually higher than your jeans sit — to the floor, wearing that heel. For a baraat lehenga with a train effect, we add length at the back panel only, so you can still walk.",
      "If you genuinely cannot decide on shoes yet, tell us. We build the hem with an allowance and finalise it at your last fitting — this is exactly what staged fittings are for. What we cannot do is rescue a lehenga cut two inches short, because the embroidery border sits at the hem and cannot be moved.",
      "One more honest note: if you are between two lengths, take the longer. A hem can come up. A zardozi border cannot come down.",
    ],
    shopTheStory: [
      {
        label: "The Size Guide",
        href: "/size-guide",
        note: "Full measurement walkthrough, with video guidance",
      },
      {
        label: "Design Yours",
        href: "/customize",
        note: "Custom lehengas are cut to your exact measurements",
      },
    ],
  },
  {
    slug: "zaras-london-baraat",
    title: "Zara's London Baraat",
    excerpt: "Designing a bespoke lehenga from 6,000 kilometres away — in her own words.",
    category: "real-weddings",
    image: "https://images.unsplash.com/photo-1773439878577-5969ffc1b198?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Zara in her custom Begum lehenga at her London baraat",
    author: "As told to Begum Editorial",
    date: "2025-02-02",
    readTime: "6 min read",
    pullQuote: "The karigar sent me photos of my lehenga on the adda frame. I cried at my desk in Canary Wharf.",
    body: [
      "\"I grew up in London, and every bridal outfit I tried on here felt like it was designed for someone else's wedding. Beautiful, but generic. My mother kept saying the same thing: 'This is not how a lehenga should fit you.' She was right, and she is always right.\"",
      "\"A cousin had ordered from Begum, so we booked a video consultation. I was skeptical about the measurement part — I am not a seamstress, and the idea of self-measuring a £3,000 outfit terrified me. But they walk you through every measurement on video, twice, and then they build the first fitting against a toile before touching the real fabric.\"",
      "\"What actually sold me was the photos. At every stage — fabric, base construction, embroidery — someone sent photographs and waited for my yes before going further. The payments were staged the same way, so I never felt like I had thrown money across an ocean and hoped.\"",
      "\"On the day, the lehenga fit like it had been made on my body. Because, in every way that matters, it had been. My mother checked the back of the embroidery — she is from Lahore, she knows — and gave the single nod that means everything. That nod was worth more than the outfit.\"",
    ],
    shopTheStory: [
      {
        label: "Real Brides",
        href: "/real-brides",
        note: "More stories from Begum brides worldwide",
      },
      {
        label: "Book a Consultation",
        href: "/customize/consultation",
        note: "Start your own remote bespoke process",
      },
    ],
  },
  {
    slug: "mehndi-dressing-guide",
    title: "Dressing for the Mehndi: Move First, Pose Second",
    excerpt: "The mehndi is the night you dance. Here is how to choose an outfit that survives — and improves — the party.",
    category: "styling-guides",
    image: "https://images.unsplash.com/photo-1695876722054-3307043651eb?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Festive mehndi-night bridal styling with jewellery",
    author: "Begum Editorial",
    date: "2025-01-12",
    readTime: "5 min read",
    body: [
      "The mehndi is the least formal and most photographed night of the wedding — which is exactly the trap. Brides choose outfits for the photographs and then spend four hours unable to lift their arms. Our styling rule for mehndi is blunt: move first, pose second.",
      "Weight is the first decision. This is the night for resham and gota, not full zardozi — silk thread and ribbon-work give you color and shine at a third of the weight of metalwork. A mehndi lehenga should come in light enough that you forget it by the second dance.",
      "Color is the second. Mehndi is traditionally the most chromatically free night — yellows, corals, magentas, greens, often together. If you want to wear the unexpected color you cannot justify at the baraat, this is the night for it.",
      "Finally, sleeves and hems: fitted sleeves ride up when you dance with your arms raised — choose a relaxed cut or a sleeveless blouse with a dupatta you can pin and forget. And ask for your lehenga an inch shorter than floor length. Nobody notices the inch. Everybody notices the bride stepping on her hem during the dhol.",
    ],
    shopTheStory: [
      {
        label: "The Mehndi Collection",
        href: "/collections/occasion/mehndi",
        note: "Lightweight resham and gota pieces made to dance in",
      },
    ],
  },
  {
    slug: "reading-the-rituals",
    title: "Reading the Rituals: From Mehndi to Walima",
    excerpt: "Four events, four registers of dress — what each night of a Pakistani wedding asks of the bride, and why.",
    category: "craft-culture",
    image: "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Handcrafted bridal khussa and silk details",
    author: "Begum Editorial",
    date: "2024-12-18",
    readTime: "8 min read",
    pullQuote: "The four nights are not four outfits. They are four chapters of the same story, told in fabric.",
    body: [
      "A Pakistani wedding is a sequence, and the dress code is its grammar. Each event carries its own register — its own weight, color logic, and embroidery language — and understanding that grammar is the difference between four outfits and one coherent bridal story.",
      "The mehndi is joy: informal, chromatic, kinetic. Dress light — resham, gota, mirror-work — in colors that photograph loud. The nikkah is the opposite register: it is the legal and spiritual heart of the wedding, and its dress tradition leans serene — ivories, soft golds, quieter embroidery. Many brides choose their most restrained outfit here, and it is often the one they return to in photographs.",
      "The baraat is the crescendo. This is the night of maximum formality, the deep reds and emeralds, the full-weight zardozi, the jewellery inherited or acquired for exactly this moment. If one outfit in the sequence carries court-level craft, it is this one — which is why a baraat lehenga takes our karigars the better part of four months.",
      "The walima closes the sequence, hosted by the groom's family, and its register is polish rather than power: champagnes, pastels, silver-toned work, silhouettes that are elegant rather than monumental. After the baraat's declaration, the walima is composure.",
      "None of these are rules a bride owes anyone. They are a shared language — and like any language, once you can read it, you can choose your own accent.",
    ],
    shopTheStory: [
      {
        label: "Shop by Occasion",
        href: "/collections",
        note: "Mehndi, Nikkah, Baraat, and Walima edits",
      },
    ],
  },
  {
    slug: "meet-the-designer-behind-begum",
    title: "Meet the Designer Behind Begum",
    excerpt: "Usama Zahid on blending brand strategy, product design, and digital craft to build a bridal atelier for the modern age.",
    category: "craft-culture",
    image: "/images/usamazahid.webp",
    imageAlt: "Usama Zahid — brand and product designer who built the Begum digital atelier, blending Pakistani bridal heritage with modern design and interaction craft",
    author: "Usama Zahid",
    date: "2026-07-24",
    readTime: "5 min read",
    featured: true,
    pullQuote: "A brand is not what you say it is. It is what the architecture of every touchpoint — visual, verbal, digital — quietly proves.",
    body: [
      "Every bespoke bridal house has a story. This one has a designer who believed the story deserved a stage as crafted as the lehengas it showcases. Begum was built from the ground up — not just as a store, but as a digital atelier where every pixel, every animation, and every interaction carries the same weight as a zardozi stitch.",
      "Usama Zahid is the brand and product designer behind this experience. A multi-disciplinary designer working across brand identity, product strategy, and front-end architecture, Usama approached Begum as a design problem with three constraints: it must feel regal without being distant, modern without being cold, and handcrafted without being precious.",
      "The result is a site that reads less like a catalogue and more like an editorial space — where the typography breathes, the scroll has weight, and every offer card is framed with the same care a karigar gives to a hemline. From the hero parallax to the countdown on special offers, every detail was intentionally composed.",
      "Usama's process began with the brand name itself. Begum — a Mughal title of nobility and grace — became the north star for every design decision. The colour palette draws from emerald, sand, and ivory; the typography pairs Playfair Display with Instrument Sans for a regal-but-readable tone; and the motion language uses GSAP and ScrollTrigger to create a sense of physical depth and texture that mirrors handcrafted fabric.",
      "\"I wanted brides to feel, before they read a single word, that they were in a space designed for them,\" Usama says. \"That meant treating the website not as a utility but as a room — with light, with depth, with quiet details that reward attention.\"",
      "The result is a fully bespoke Next.js experience — 78 static routes, custom Zustand cart with localStorage persistence, dynamic product filtering by occasion and category, a complete customizer flow, WhatsApp-native customer support baked into every page, and a journal that doubles as an editorial platform. It is a digital flagship for a brand that ships across four continents.",
      "Usama Zahid is available for brand and product design projects. Visit usamazahid.design to see more work.",
    ],
    shopTheStory: [
      {
        label: "View the Designer's Portfolio",
        href: "https://www.usamazahid.design/",
        note: "Brand strategy, product design, and digital experiences by Usama Zahid",
      },
      {
        label: "Explore Begum Collections",
        href: "/collections",
        note: "Handcrafted bridal wear by master karigars",
      },
    ],
  },
  {
    slug: "order-pakistani-bridal-wear-from-abroad",
    title: "Order Pakistani Bridal Wear from Abroad: The Complete Guide",
    excerpt: "Seven in ten diaspora brides abandon their bridal order before it's placed. Not because the outfits aren't beautiful — but because the process feels too uncertain, too far away, and too important to risk getting wrong. This guide walks you through exactly how to order Pakistani bridal wear from the UK, USA, UAE, Canada, or Australia with full confidence: from your first video consultation to the moment your insured shipment arrives at your door.",
    category: "styling-guides",
    image: "https://images.unsplash.com/photo-1613442820539-65d61a0768e5?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Bride consulting virtually with style advisor across continents",
    author: "Begum Atelier Team",
    date: "2025-02-10",
    readTime: "14 min read",
    pullQuote: "77% of diaspora brides abandon their cart due to trust barriers — yet every single one of those barriers is solvable with the right process.",
    body: [
      "Seven in ten diaspora brides abandon their bridal order before it's placed. Not because the outfits aren't beautiful — but because the process feels too uncertain, too far away, and too important to risk getting wrong. This guide walks you through exactly how to order Pakistani bridal wear from the UK, USA, UAE, Canada, or Australia with full confidence: from your first video consultation to the moment your insured shipment arrives at your door. Every step is designed to eliminate the guesswork, protect your investment, and make sure your baraat outfit is everything you imagined.",
      "Key Takeaways: 77% of diaspora brides abandon their cart due to trust barriers — uncertainty about fit, fabric, and delivery timelines. A structured remote process resolves all of these. Video consultations, postal measurement guides, and fabric swatches remove the biggest risks before production begins. Staged milestone photography means you approve your outfit at every step, not just when it arrives. A 30/40/30 payment model protects both the bride and the brand across the full production cycle. Insured international shipping with full tracking is non-negotiable for high-value bridal orders sent to the UK, USA, UAE, Canada, and Australia.",
      "Why Ordering Pakistani Bridal Wear from Abroad Feels Risky — and Why It Doesn't Have to Be. The fear is specific: you've fallen in love with an outfit you've only seen on a screen. You can't touch the fabric. You can't try it on. You're not sure your measurements will translate. And if something goes wrong, you're thousands of miles from the karkhana. This anxiety is legitimate. It's also entirely solvable. The 77% cart abandonment rate among diaspora brides isn't a reflection of disinterest — it's a reflection of missing information at the right moment. Brides drop off when they can't answer three fundamental questions: Will it fit? Will it look the same as the photos? Will it actually arrive in time? A well-designed remote custom process answers all three before a single karigar picks up a needle. The steps below are not simply reassuring — they are structural safeguards built into the ordering journey.",
      "Step 1: Start with a Video Consultation with a Style Advisor. Before measurements, before fabric selection, before anything else — talk to a person. A video consultation with a trained style advisor is the single most important step in the remote bridal ordering process. It replaces the experience of walking into a boutique, and in many ways, it does something a boutique visit can't: it focuses entirely on you, without the ambient pressure of a showroom floor. During this session, a style advisor will: discuss your wedding events — nikkah, baraat, walima — and what each outfit needs to accomplish; review your references, whether that's a saved folder of inspo or a vague sense of a color direction you can't yet articulate; ask about your body proportions, silhouette preferences, and how you want to carry your dupatta; walk through current fabric options and explain what each one does in person versus how it photographs. This consultation is also where you establish timeline. Pakistani bridal wear takes time to make properly. Zardozi embroidery, intricate resham threadwork, hand-applied embellishments — these cannot be rushed without compromising quality. A style advisor will give you an honest production and delivery window, so there are no surprises later. Who benefits most from this step: Brides who have never ordered remotely before, brides navigating multiple outfit changes across a multi-day wedding, and brides who want something custom-designed rather than catalog-selected.",
      "Step 2: Use the Postal Measurement Guide with Illustrated Fitting Instructions. Sizing is where most remote bridal orders go wrong — not because brides measure incorrectly, but because they measure without context. A tape measure on its own doesn't capture how a Pakistani bridal silhouette is meant to sit on the body. A kameez is cut differently from Western formalwear. The placement of the waist seam, the fall of the skirt, the shoulder width relative to the sleeve depth — these are craft decisions that require garment-specific measurements, not generic sizing charts. Begum sends a physical measurement guide by post. It includes: illustrated step-by-step instructions for taking each measurement correctly; a reference booklet explaining how different silhouettes are measured and why; a pre-addressed return form so your measurements reach the team without relying on a WhatsApp screenshot. Why postal rather than digital? Because the guide itself matters. When you hold the measurement booklet, you take the process more seriously. The illustrations help you position the tape correctly. And the physical return form creates a paper trail that a casual DM does not. Practical tip: Have a trusted family member help you measure, ideally someone who has a familiarity with how tailored South Asian clothing fits. Two people taking measurements are almost always more accurate than one.",
      "Step 3: Review and Approve Fabric Swatches Before Production Begins. Color and texture are notoriously difficult to convey on a screen. What photographs as deep ruby can arrive as a dusty rose. What looks like a heavy silk might be a lightweight fabric that doesn't hold an embroidered hem correctly. Fabric swatches are sent physically before a single stitch of your outfit is sewn. You will receive: swatches of your shortlisted fabrics in the colors you're considering; a guide on fabric behavior — how each material drapes, how it responds to embroidery, and how it holds up across a long event day; a card showing thread colors so you can approve the resham or zardozi palette before embellishment begins. This step is irreversible once skipped. Approving your fabric swatch is the moment you move from browsing to making. It also protects you: if a fabric or color doesn't match your expectation, you discover that before production, not after.",
      "Step 4: Staged Milestone Photography — Approve at Every Production Step. This is the most distinctive part of ordering with Begum, and the one that most directly addresses the core fear of buying unseen. Rather than receiving a single 'your order is ready' notification, you receive photographs at each stage of production: cut and base construction (silhouette, proportions, and lining choice); embroidery in progress (placement, density, and thread color accuracy); embroidery completed (full embellishment reviewed before finishing); final outfit before packaging (complete garment with dupatta and any accessories). At each stage, you can request minor adjustments. By the time the outfit is packaged for shipping, you have seen it — really seen it — four times. There is no guesswork left. Why this matters for diaspora brides specifically: You cannot walk into the karkhana. You cannot ask to see the outfit mid-production in person. Milestone photography is the remote equivalent of being present, and it gives you the same ability to course-correct that an in-person client would have.",
      "Step 5: Understand the Staged Payment Structure (30/40/30 Model). High-value bridal orders require a payment structure that reflects how production actually works — and that protects both parties. Begum uses a 30/40/30 staged model: 30% upfront — confirms your order, books your karigar team, and initiates fabric procurement; 40% at mid-production — released when you approve your milestone photography at the embroidery stage; 30% before shipping — released after you approve the final photographs and your outfit is ready to leave. This structure is not incidental. It creates accountability at every stage. You are not paying in full for something you haven't seen, and the production team is not working without a confirmed commitment. Every payment release is tied to your explicit approval. For UK brides: Begum accepts payment in GBP. For USA brides: USD. UAE, Canada, and Australia payments are handled in the local currency where possible. Confirm currency and any bank transfer details during your initial consultation.",
      "Step 6: International Shipping with Full Tracking and Insurance. A Pakistani bridal outfit is not a parcel. It represents months of karigar work, significant financial investment, and an irreplaceable emotional stake in your wedding day. It must be shipped accordingly. Begum ships internationally via tracked, insured courier services to the UK, USA, UAE, Canada, and Australia. Every shipment includes: full end-to-end tracking with a link you can share with family members who will inevitably want to know where it is; insurance covering the declared value of the garment in the event of loss or damage in transit; customs documentation prepared to minimize delays at border entry for each destination country; protective garment packaging designed for the specific fabrics and embellishments in your order. Timeline guidance: Allow a minimum of 12–14 weeks from consultation to delivery for a custom bridal order. Orders with particularly intricate zardozi work may require 16 weeks. Build your order timeline backward from your wedding date, not forward from when you feel ready to start.",
      "Market-Specific Tips for Diaspora Brides by Region. UK Brides (London, Birmingham, Bradford, Manchester): Pakistani bridal wear ordered to the UK is subject to customs duty and import VAT on orders above the de minimis threshold. Work with the Begum team to ensure commercial invoices are accurate and reflect declared value correctly — underdeclaring creates customs delays that can affect your delivery timeline. Birmingham and Bradford brides in particular often have extended family networks nearby; it's worth considering whether you want the outfit delivered to a relative's home or directly to yours. USA Brides (New York, Houston, Chicago): US Customs requires accurate country-of-origin documentation on all textile imports. For brides in New York and Houston — where large Pakistani wedding communities mean some level of runway pressure — start the process early. Fashion expectations in these cities are high, and last-minute ordering creates unnecessary stress. The video consultation can happen at any hour that works with your time zone; Begum works across Eastern, Central, and Pacific time. UAE Brides: UAE-based Pakistani brides are often ordering for weddings that may take place in Pakistan, which introduces a logistical nuance — clarify with the Begum team whether your outfit should ship to Dubai first or directly to Pakistan. UAE import duties on clothing are relatively low, but courier documentation should be precise. Canada Brides: Canadian customs operates under the CBSA and requires a B3 form for dutiable commercial goods. For Ontario and British Columbia brides, allow an extra 3–5 business days for customs processing relative to the base shipping estimate. Australia Brides: Australian Border Force applies strict biosecurity and customs checks to all incoming parcels. Ensure your order's packaging materials are clearly documented. Sydney and Melbourne have active Pakistani bridal communities, and Begum ships to both cities regularly.",
      "Common Mistakes Diaspora Brides Make When Ordering Bridal Wear Online. Knowing what goes wrong for other brides is one of the most practical things you can read before placing your own order. Starting too late — custom Pakistani bridal wear takes 12–16 weeks to produce. Brides who begin the process six weeks before their wedding are setting themselves up for disappointment or rushed karigar work that doesn't meet the standard. Using generic measurement charts instead of garment-specific measurements — a size 10 in UK High Street sizing tells a Pakistani tailor almost nothing useful. Choosing fabric from screen images alone — colors shift dramatically between a phone screen, a desktop monitor, and natural light. Always request physical swatches. Skipping the video consultation — brides who go straight to ordering without speaking to a style advisor often discover mid-production that they wanted something different. Not building in contingency time for customs — international customs delays are not rare. A well-timed order absorbs a 5–7 day delay without it becoming a crisis. A last-minute order does not. Ordering the baraat outfit but forgetting the nikkah and walima — multi-event Pakistani weddings require multiple outfits, each with its own brief and timeline. Plan the complete wardrobe in a single consultation rather than returning with urgent add-on requests later.",
      "Take the First Step Toward Your Bridal Wardrobe. Ordering Pakistani bridal wear from abroad is not inherently risky. It is only risky without the right process in place. Every step in this guide — from the video consultation to insured international shipping — exists because the details matter, and because a bride who is thousands of miles from Lahore or Karachi deserves exactly the same confidence as one who walks into a boutique. The next step is straightforward: book your video consultation at bagum.com, and begin the process with a style advisor who understands what you're building toward. For further guidance on how to take your measurements correctly and what to expect from the custom ordering process, visit Begum's dedicated measurement guide and custom ordering pages at bagum.com.",
    ],
    shopTheStory: [
      {
        label: "Book a Video Consultation",
        href: "/customize/consultation",
        note: "Start your bridal brief with a dedicated style advisor",
      },
      {
        label: "The Size Guide",
        href: "/size-guide",
        note: "Full measurement walkthrough, with video guidance",
      },
      {
        label: "Customize Your Outfit",
        href: "/customize",
        note: "Custom lehengas cut to your exact measurements",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 2): JournalArticle[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  const sameCategory = journalArticles.filter(
    (a) => a.slug !== slug && a.category === current.category
  );
  const others = journalArticles.filter(
    (a) => a.slug !== slug && a.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}
