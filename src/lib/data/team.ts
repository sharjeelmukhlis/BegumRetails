export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  title: string;
  category: "leadership" | "master-karigar" | "artisan";
  city: string;
  workshopLocation: string;
  experienceYears: number;
  avatar: string;
  heroImage: string;
  detailImage: string;
  shortBio: string;
  fullStory: string[];
  quote: string;
  craftSpecialty: string;
  signatureTechniques: string[];
  milestones: { year: string; title: string; desc: string }[];
  stats: {
    hoursLogged: string;
    heirloomsCrafted: string;
    apprenticesTrained: number;
  };
  featuredProductSlugs: string[];
}

export const teamMembers: TeamMember[] = [
  {
    slug: "sherjeel-mukhlis",
    name: "Sherjeel Mukhlis",
    role: "Founder & Creative Director",
    title: "Visionary & Custodian of Mughal Bridal Aesthetics",
    category: "leadership",
    city: "Lahore",
    workshopLocation: "Begum Flagship Atelier, Gulberg, Lahore",
    experienceYears: 24,
    avatar: "https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1200&q=85",
    heroImage: "https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1600&q=85",
    detailImage: "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1200&q=85",
    shortBio:
      "Sherjeel Mukhlis founded Begum to protect centuries of South Asian royal textile traditions: ethical artisan dignity, 100% pure handloom silks, and bespoke fit without shortcuts.",
    fullStory: [
      "Guided by a passion for historical Mughal textiles and royal atelier craftsmanship, Sherjeel Mukhlis observed how modern commercial bridal markets were abandoning traditional artisans for synthetic materials and machine embroidery.",
      "In 1994, he established the Begum atelier in Lahore alongside three master karigars. His foundational philosophy remains uncompromised: every bridal piece must be handcrafted with genuine human reverence, crediting the artisan by name, and cut exclusively from pure handloom silks.",
      "Under Sherjeel's leadership, Begum has dressed brides across London, Dubai, Toronto, and Lahore, establishing new benchmarks for artisan welfare, staged milestone transparency, and heirloom longevity.",
    ],
    quote: "We don't manufacture bridalwear; we preserve centuries of royal dignity and handcraft an heirloom for the woman who owns her moment.",
    craftSpecialty: "Mughal Textile Heritage, Haute Couture Architecture & Artisan Dignity",
    signatureTechniques: [
      "Imperial Arch & Jaal Motif Direction",
      "Indigenous Pure Katan Silk Revival",
      "Bespoke Bridal Draping & Kinetic Engineering",
    ],
    milestones: [
      { year: "1994", title: "Founded Begum in Lahore", desc: "Started with three master karigars serving bridal families with bespoke commissions." },
      { year: "2008", title: "Flagship Couture Atelier", desc: "Expanded into full bridal couture, pattern drafting, and private fitting salons." },
      { year: "2022", title: "The 4-Occasion Lines", desc: "Launched dedicated design languages for Baraat, Walima, Mehndi, and Nikkah." },
    ],
    stats: {
      hoursLogged: "38,000+",
      heirloomsCrafted: "1,200+",
      apprenticesTrained: 18,
    },
    featuredProductSlugs: ["zari-dream-lehenga", "ruby-court-lehenga", "emerald-zari-dupatta"],
  },
  {
    slug: "hamza-tariq",
    name: "Hamza Tariq",
    role: "Head Couturier & Atelier Director",
    title: "Master of Loom Allocation & Silhouette Engineering",
    category: "leadership",
    city: "Lahore",
    workshopLocation: "Main Workshop & Loom Floor, Lahore",
    experienceYears: 19,
    avatar: "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1200&q=85",
    heroImage: "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1600&q=85",
    detailImage: "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1200&q=85",
    shortBio:
      "Hamza directs technical blueprint drafting, pure silk yardage allocation, and remote video consultations for bespoke bride commissions worldwide.",
    fullStory: [
      "Hamza joined Begum with an architectural eye for garment volume. He pioneered Begum's internal structural can-can armature, allowing heavy hand-embroidered circular lehengas to maintain their regal flare without pulling at the bride's waist.",
      "He personally audits each commission's blueprint against bride measurements before fabric is laid on the cutting table. His oversight ensures that intricate embroidery motifs align seamlessly across kalis (lehenga panels).",
      "Hamza also leads our sustainable loom initiatives, collaborating directly with generational silk farming collectives in Punjab to revive antique 80-gram pure katan silk.",
    ],
    quote: "A bridal lehenga is kinetic architecture. It must dance with the bride's stride and command the room in stillness.",
    craftSpecialty: "Pattern Architecture, Kali Alignment & Silk Loom Logistics",
    signatureTechniques: [
      "Multi-Tiered Canvas Waistband Construction",
      "Seamless Motif Mirroring Across Lehenga Panels",
      "Tension-Balanced Zardozi Blueprinting",
    ],
    milestones: [
      { year: "2012", title: "Pioneered Weight-Balanced Can-Can", desc: "Developed Begum's lightweight structural lining system." },
      { year: "2018", title: "Diaspora Remote Protocol", desc: "Formalized millimeter-accurate virtual fitting protocols for overseas brides." },
      { year: "2024", title: "Katan Silk Revival", desc: "Secured exclusive partnerships with Pakistan's oldest heritage handlooms." },
    ],
    stats: {
      hoursLogged: "31,000+",
      heirloomsCrafted: "850+",
      apprenticesTrained: 12,
    },
    featuredProductSlugs: ["zari-dream-lehenga", "resham-noor-lehenga"],
  },
  {
    slug: "mariam-siddiqui",
    name: "Mariam Siddiqui",
    role: "Head of Bridal Styling & Client Concierge",
    title: "Senior Bridal Stylist & Diaspora Consultant",
    category: "leadership",
    city: "Karachi / London",
    workshopLocation: "Client Concierge Suite & Fitting Salon",
    experienceYears: 14,
    avatar: "https://images.unsplash.com/photo-1695876722054-3307043651eb?auto=format&fit=crop&w=1200&q=85",
    heroImage: "https://images.unsplash.com/photo-1695876722054-3307043651eb?auto=format&fit=crop&w=1600&q=85",
    detailImage: "https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1200&q=85",
    shortBio:
      "Oversees bride relationships, jewellery curations, and remote video measurement fittings for diaspora brides across the UK, UAE, USA, and Canada.",
    fullStory: [
      "Mariam understands the emotional landscape of planning a South Asian wedding from thousands of miles away. Having worked in both London and Karachi, she bridges cultural nuances and diaspora styling preferences.",
      "She has personally conducted over 600 live WhatsApp video fittings, walking brides step-by-step through measurement guidelines, dupatta drape options (double dupatta vs royal veil), and jewellery pairings.",
      "Her concierge desk provides weekly photographic progress updates from the embroidery frames, giving families complete peace of mind throughout the 90-to-120 day handcrafting journey.",
    ],
    quote: "Distance disappears the moment a bride sees her lehenga taking shape on the embroidery frame in HD video.",
    craftSpecialty: "Bridal Styling, Remote Video Fittings & Royal Dupatta Draping",
    signatureTechniques: [
      "Milestone Video Progress Documentation",
      "Double Dupatta Weight Balancing & Anchoring",
      "Bespoke Jewellery & Ensemble Suite Pairing",
    ],
    milestones: [
      { year: "2016", title: "Joined Begum Styling Desk", desc: "Introduced diaspora concierge services for UK and North American brides." },
      { year: "2020", title: "Virtual Fitting Suite", desc: "Launched live WhatsApp 1-on-1 measurement consultations." },
      { year: "2024", title: "Complete the Look", desc: "Curated matching bridal khussas, potlis, and matha pattis for every lehenga." },
    ],
    stats: {
      hoursLogged: "22,000+",
      heirloomsCrafted: "640+",
      apprenticesTrained: 8,
    },
    featuredProductSlugs: ["resham-noor-lehenga", "ruby-court-lehenga"],
  },
  {
    slug: "muhammad-ali",
    name: "Ustadh Muhammad Ali",
    role: "Master of Zardozi & Pure Dabka",
    title: "Senior Karigar & Zari Master",
    category: "master-karigar",
    city: "Lahore",
    workshopLocation: "Old Lahore Atelier, Mochi Gate Workshop",
    experienceYears: 32,
    avatar: "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1200&q=85",
    heroImage: "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1600&q=85",
    detailImage: "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1200&q=85",
    shortBio:
      "A living legend of Lahore embroidery with 32 years of heritage. Muhammad Ali leads the zardozi frame for Begum's most regal Baraat bridal lehengas.",
    fullStory: [
      "Muhammad Ali learned the ancient art of zardozi at the age of twelve from his father, sitting beside him on the floor of a sunlit courtyard in Old Lahore. The trade has been in his family for five generations, originating in the royal courts of the Mughal Empire.",
      "His signature is the 3D raised relief dabka—coiling fine gold-washed silver wire over cotton cord padding so the floral petals cast delicate shadows under chandelier light. Each lehenga border requires over 400 hours of his focused needlework.",
      "Today, Muhammad Ali sits as the elder statesman of the Begum workshop. He mentors eight apprentices, ensuring that the rhythm of the aari needle and the tactile feel of pure silver bullion are carried forward to the next generation.",
    ],
    quote: "My father taught me when I was twelve. In every bullion wire coil, I weave patience and the dignity of the bride who will wear it.",
    craftSpecialty: "Pure Silver Dabka, Zardozi Bullion Wire & Pearl Encrusting",
    signatureTechniques: [
      "Raised 3D Bullion Relief over Padding",
      "Hand-Cut Metallic Sequin Setting",
      "Imperial Mughal Floral Border Composition",
    ],
    milestones: [
      { year: "1992", title: "Apprenticeship Completion", desc: "Recognized as a master karigar in the historic workshops of Old Lahore." },
      { year: "2004", title: "Joined Begum Atelier", desc: "Became head of the master zardozi frame for royal bridal commissions." },
      { year: "2019", title: "Master Artisan Recognition", desc: "Celebrated for 25+ years of continuous handloom preservation." },
    ],
    stats: {
      hoursLogged: "54,000+",
      heirloomsCrafted: "420+",
      apprenticesTrained: 16,
    },
    featuredProductSlugs: ["zari-dream-lehenga", "ruby-court-lehenga", "emerald-zari-dupatta"],
  },
  {
    slug: "fatima-tariq",
    name: "Fatima Tariq",
    role: "Master of Resham Silk Painting",
    title: "Senior Resham Artist & Colorway Virtuoso",
    category: "master-karigar",
    city: "Karachi",
    workshopLocation: "Karachi Silk Atelier",
    experienceYears: 18,
    avatar: "https://images.unsplash.com/photo-1773439878577-5969ffc1b198?auto=format&fit=crop&w=1200&q=85",
    heroImage: "https://images.unsplash.com/photo-1773439878577-5969ffc1b198?auto=format&fit=crop&w=1600&q=85",
    detailImage: "https://images.unsplash.com/photo-1711130388758-2ccf44bb735c?auto=format&fit=crop&w=1200&q=85",
    shortBio:
      "Pioneers Begum's luminous silk-thread resham embroidery in sunrise tones. Known for needlework that feels like oil painting on silk.",
    fullStory: [
      "Fatima began her journey studying miniature painting before translating her color sensibility into fine spun silk thread. Where traditional bridalwear relied heavily on gold metallic, Fatima introduced poetic botanical shading that captures natural morning light.",
      "Her work on the Resham Noor Lehenga combines sixteen shades of coral, blush, and antique ochre silk thread. She uses micro French knots and satin stitch so fine that the transition between tones appears seamless from just inches away.",
      "In our Karachi workshop, Fatima trains young women in the exacting science of silk tension, preserving the quiet intimacy of needlework created for daytime Nikkahs and evening Mehndis.",
    ],
    quote: "Silk thread behaves like watercolor on a canvas. Every sunrise tone requires intuition, stillness, and a gentle touch.",
    craftSpecialty: "Resham Silk Thread Shading, Botanical Motifs & Micro French Knots",
    signatureTechniques: [
      "Ombré Silk Thread Blending",
      "Microscopic French Knot Texture",
      "Pristine Ivory & Coral Floral Tapestry",
    ],
    milestones: [
      { year: "2006", title: "Began Silk Embroidery Practice", desc: "Studied miniature painting and classical needlecraft in Sindh." },
      { year: "2015", title: "Joined Begum Craft Network", desc: "Introduced botanical silk shading to Begum's Mehndi and Nikkah collections." },
      { year: "2023", title: "Resham Noor Creation", desc: "Completed the signature Resham Noor lehenga featured in global editorial." },
    ],
    stats: {
      hoursLogged: "29,000+",
      heirloomsCrafted: "280+",
      apprenticesTrained: 11,
    },
    featuredProductSlugs: ["resham-noor-lehenga"],
  },
  {
    slug: "rabia-anwar",
    name: "Rabia Anwar",
    role: "Master of Tilla & Metallic Threadwork",
    title: "Senior Tilla Virtuoso & Border Specialist",
    category: "master-karigar",
    city: "Lahore",
    workshopLocation: "Lahore Atelier, Tilla Studio",
    experienceYears: 22,
    avatar: "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1200&q=85",
    heroImage: "https://images.unsplash.com/photo-1743229995753-69be4b438204?auto=format&fit=crop&w=1600&q=85",
    detailImage: "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1200&q=85",
    shortBio:
      "Renowned for the steadiest hands in Lahore. Rabia weaves ethereal gold and silver tilla jaal work on tissue organza and raw silk dupattas.",
    fullStory: [
      "Tilla is unforgiving—the metallic thread can easily fray or puck silk if the needle tension fluctuates by a millimeter. Rabia Anwar has mastered this stillness over twenty-two years at the embroidery frame in Lahore.",
      "She specializes in the intricate geometric jaal (trellis) patterns that frame Begum bridal dupattas. Her lines are so straight and harmonious that they seem drawn with a jeweler's ruler.",
      "Her work ensures that Begum dupattas drape with liquid grace around the bride's shoulders while remaining light enough to wear comfortably for eight hours of wedding festivities.",
    ],
    quote: "The finest tilla requires absolute stillness of breath. This art taught me reverence for the bride who will celebrate in it.",
    craftSpecialty: "Fine Metallic Tilla Wire, Geometric Jaal Weaving & Dupatta Borders",
    signatureTechniques: [
      "Ultra-Fine Tilla Outline Weaving",
      "Zero-Pucker Tissue Organza Embroidery",
      "Four-Sided Scalloped Border Engineering",
    ],
    milestones: [
      { year: "2002", title: "First Master Piece", desc: "Completed a full royal tilla shawl exhibited in Lahore craft councils." },
      { year: "2014", title: "Joined Begum Flagship", desc: "Assigned as lead artisan for all bridal dupatta and veil commissions." },
      { year: "2021", title: "Master Educator", desc: "Authored Begum's internal quality standard for metallic thread tension." },
    ],
    stats: {
      hoursLogged: "36,000+",
      heirloomsCrafted: "510+",
      apprenticesTrained: 14,
    },
    featuredProductSlugs: ["zari-dream-lehenga", "emerald-zari-dupatta"],
  },
  {
    slug: "umar-farooq",
    name: "Umar Farooq",
    role: "Master Pattern Drafter & Silhouette Architect",
    title: "Senior Master Cutter & Can-Can Engineer",
    category: "artisan",
    city: "Gujranwala / Lahore",
    workshopLocation: "Begum Technical Cutting Floor, Lahore",
    experienceYears: 26,
    avatar: "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1200&q=85",
    heroImage: "https://images.unsplash.com/photo-1762708597196-5b81b1649b93?auto=format&fit=crop&w=1600&q=85",
    detailImage: "https://images.unsplash.com/photo-1724856604254-f7cf4e9c8f72?auto=format&fit=crop&w=1200&q=85",
    shortBio:
      "The engineering mind behind Begum's dramatic lehenga flare. Umar drafts the 16-to-24 kali circular patterns that allow lehengas to glide with weightless volume.",
    fullStory: [
      "An intricately embroidered lehenga can weigh upwards of six kilograms. Without flawless internal pattern engineering, this weight pulls downward, causing discomfort and distorting the embroidery.",
      "Umar Farooq has spent twenty-six years mastering the distribution of couture garment weight. By angling each kali cut along the true bias of the silk and anchoring the structure with reinforced waistband boning, he ensures the weight sits comfortably on the hips.",
      "He hand-cuts every bespoke commission individually, accounting for the bride's exact shoe heel height and stride length. His work is the invisible foundation upon which all of Begum's embroidery rests.",
    ],
    quote: "A lehenga is sculpture. It must celebrate the bride's natural posture and glide effortlessly with every step she takes.",
    craftSpecialty: "True-Bias Kali Cutting, Can-Can Armatures & Couture Weight Balancing",
    signatureTechniques: [
      "16-to-24 Panel True-Bias Kali Drafting",
      "Horsehair Braid Hem Reinforcement",
      "Anatomical Hip-Load Waistband Structuring",
    ],
    milestones: [
      { year: "1998", title: "Master Cutter Accreditation", desc: "Earned master cutter standing in Gujranwala's historic textile houses." },
      { year: "2011", title: "Joined Begum Atelier", desc: "Redesigned Begum's standard silhouette blocks for modern bridal mobility." },
      { year: "2025", title: "Virtual 3D Pattern Alignment", desc: "Collaborated on digital blueprint mapping for our 3D Alteration Canvas." },
    ],
    stats: {
      hoursLogged: "42,000+",
      heirloomsCrafted: "980+",
      apprenticesTrained: 9,
    },
    featuredProductSlugs: ["zari-dream-lehenga", "ruby-court-lehenga"],
  },
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllTeamSlugs(): string[] {
  return teamMembers.map((m) => m.slug);
}
