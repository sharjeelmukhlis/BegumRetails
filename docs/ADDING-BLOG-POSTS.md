# Adding a Blog Post (Journal Article)

**File:** `src/lib/data/journal.ts`

---

## Quick Steps

1. Add article object to `journalArticles` array
2. Optionally add FAQs in `src/lib/data/faqs.ts`
3. Run `npm run build` — the new route is generated automatically

---

## Article Data Structure

```typescript
interface InlineImage {
  src: string;               // Image URL
  alt: string;               // Alt text
  caption?: string;          // Optional figcaption
  afterParagraph: number;    // 0-based index: appears after this paragraph
}

interface JournalArticle {
  slug: string;              // URL: /journal/[slug]
  title: string;
  excerpt: string;           // Used as meta description
  category: JournalCategory; // "styling-guides" | "real-weddings" | "craft-culture" | "size-fit"
  image: string;             // Hero image URL (Unsplash or /images/ path)
  imageAlt: string;
  author: string;            // e.g. "Begum Editorial"
  date: string;              // ISO format: "2025-02-10"
  readTime: string;          // e.g. "8 min read"
  featured?: boolean;        // Pins to top of /journal
  pullQuote?: string;        // Highlighted quote mid-article
  body: string[];            // Each string = one paragraph
  inlineImages?: InlineImage[];  // Images placed between body paragraphs
  shopTheStory?: {           // 2-3 related links
    label: string;
    href: string;
    note: string;
  }[];
}
```

---

## Example

Add this inside `journalArticles` array (before the closing `];`):

```typescript
{
  slug: "my-new-article",
  title: "My New Article Title",
  excerpt: "A short description for search results and preview cards.",
  category: "styling-guides",
  image: "https://images.unsplash.com/photo-XXXXXXXXX?auto=format&fit=crop&w=1600&q=85",
  imageAlt: "Descriptive alt text for the image",
  author: "Begum Editorial",
  date: "2025-03-01",
  readTime: "6 min read",
  featured: false,
  pullQuote: "A memorable quote from the article that deserves emphasis.",
  body: [
    "First paragraph of the article text.",
    "Second paragraph — each array entry becomes a <p> tag.",
    "Third paragraph, and so on.",
  ],
  inlineImages: [
    {
      src: "https://images.unsplash.com/photo-XXXXXXXXX?auto=format&fit=crop&w=1200&q=85",
      alt: "Descriptive alt text for the image",
      caption: "Optional caption shown below the image in italics",
      afterParagraph: 1,   // Appears after paragraph index 1 (the second paragraph)
    },
  ],
  shopTheStory: [
    {
      label: "Explore Bridal Collections",
      href: "/collections",
      note: "Handcrafted pieces by master karigars",
    },
    {
      label: "Book a Consultation",
      href: "/customize/consultation",
      note: "Start your bridal brief with a style advisor",
    },
  ],
},
```

---

## Adding Article FAQs

**File:** `src/lib/data/faqs.ts`

Add an entry to the `articleFAQSets` array:

```typescript
{
  articleId: "my-new-article",    // Must match the article slug
  faqs: [
    {
      id: "my-faq-1",             // Unique ID (kebab-case)
      question: "What is this article about?",
      answer:
        "This article covers [topic]. You can use **bold** and [link text](/path) in answers.",
      order: 1,
    },
    {
      id: "my-faq-2",
      question: "Another frequently asked question?",
      answer:
        "The answer text supports **bold** and [links](/path).",
      order: 2,
    },
  ],
},
```

---

## Inline Images

You can place images between body paragraphs using the `inlineImages` field. Each image is placed after the paragraph specified by `afterParagraph` (0-based index).

**Example:** To place an image after the 3rd paragraph:

```typescript
body: [
  "First paragraph.",       // index 0
  "Second paragraph.",      // index 1
  "Third paragraph...",     // index 2 — image goes here
  "Fourth paragraph.",      // index 3
],
inlineImages: [
  {
    src: "https://images.unsplash.com/photo-XXXXXXXXX?auto=format&fit=crop&w=1200&q=85",
    alt: "Close-up of hand embroidery detail",
    caption: "The karigar at work on a zardozi border — each stitch is placed by hand.",
    afterParagraph: 2,       // Appears after paragraph index 2
  },
],
```

**Multiple images** can be placed after the same paragraph (they stack vertically). Each entry in `inlineImages` is independent, so you can scatter images across the article at different positions.

Images render as 16/9 aspect ratio on mobile and 3/2 on desktop, within the reading measure.

---

## Tips

- Keep `excerpt` under 160 characters for optimal SEO
- Use high-quality Unsplash images (1600px width recommended for hero, 1200px for inline)
- `pullQuote` should be one compelling sentence — it renders larger and centered
- The `shopTheStory` array should have 2-3 links maximum
- Inline image `src` can be an Unsplash URL or a `/images/` local path
- Build after adding to verify: `npm run build`
