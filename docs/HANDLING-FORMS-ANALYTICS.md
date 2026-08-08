# Forms & Analytics Configuration

---

## WhatsApp Integration

WhatsApp is the primary communication channel. Two numbers are configured:

| Number | Role |
|--------|------|
| `+92 320 9988777` | Primary customer support |
| `+92 302 4794282` | Secondary / overflow |

### Where Numbers Are Used

| Location | File |
|----------|------|
| WhatsApp floating button | `src/components/layout/whatsapp-button.tsx` |
| Product "Ask about this piece" | `src/lib/data/faqs.ts` → `whatsappProductUrl()` |
| Article "I have a question" | `src/lib/data/faqs.ts` → `whatsappArticleUrl()` |
| Checkout order message | `src/lib/whatsapp.ts` |
| Footer contact | `src/components/layout/footer.tsx` |
| Contact page | `src/app/contact/page.tsx` |

### To Change a Number

Edit the number in `src/lib/whatsapp.ts` (the `whatsappProductUrl` and `whatsappArticleUrl` functions use a hardcoded number), then update the display numbers in `footer.tsx` and `contact/page.tsx`.

---

## Web3Forms (Contact Forms)

**File:** `src/lib/web3forms.ts`
**Hook:** `src/hooks/use-web3form.ts`

Web3Forms handles contact form submissions and emails them to the store owner.

### How It Works

1. User fills out a form (contact, consultation booking)
2. Form data is sent to Web3Forms API (`https://api.web3forms.com/submit`)
3. Web3Forms forwards the submission as an email to the configured address

### Configuration

The access key is stored in `.env.local`:

```
NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key-here
```

### Available Forms

| Form | Component | Endpoint |
|------|-----------|----------|
| General Contact | `src/components/forms/contact-form.tsx` | Web3Forms |
| Consultation Booking | `src/components/forms/consultation-form.tsx` | Web3Forms |
| Newsletter | `src/components/forms/newsletter-form.tsx` | Web3Forms (or separate service) |

### To Change the Email Recipient

Update the access key in `.env.local` to point to a different Web3Forms form configuration.

### Type Definition

```typescript
// src/lib/web3forms.ts
export interface Web3FormPayload {
  access_key: string;
  subject?: string;          // Optional — auto-filled
  name: string;
  email: string;
  message: string;
  // Additional fields per form
}
```

---

## Analytics

### Google Analytics

**File:** `src/components/analytics/google-analytics.tsx`

Configure via `.env.local`:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

The component loads the GA script only in production (`process.env.NODE_ENV === "production"`).

### Microsoft Clarity

**File:** `src/components/analytics/microsoft-clarity.tsx`

Configure via `.env.local`:

```
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

Also loads only in production.

### Adding a New Analytics Service

1. Create a component in `src/components/analytics/`
2. Read the ID from `process.env.NEXT_PUBLIC_*`
3. Add it to the root layout (`src/app/layout.tsx`):

```typescript
// src/app/layout.tsx
import NewAnalytics from "@/components/analytics/new-analytics";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <NewAnalytics />
        {children}
      </body>
    </html>
  );
}
```

---

## Environment Variables

All required `.env.local` variables:

```
NEXT_PUBLIC_WEB3FORMS_KEY=xxx
NEXT_PUBLIC_GA_ID=G-xxx
NEXT_PUBLIC_CLARITY_ID=xxx
```
