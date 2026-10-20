import type { Metadata } from "next";
import { Instrument_Sans, Playfair_Display } from "next/font/google";
import {
  fontCormorant,
  fontCinzel,
  fontPlayfair,
  fontAmiri,
  fontNastaliq,
} from "@/lib/cards/fonts";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartSidebar } from "@/components/layout/cart-sidebar";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { BackToTop } from "@/components/shared/back-to-top";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { BEGUM_FAVICON } from "@/components/shared/logo";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { MicrosoftClarity } from "@/components/analytics/microsoft-clarity";

const figerly = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-figerly",
  display: "swap",
});

const bodySans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Begum Every Bride, a Begum",
    template: "%s Begum",
  },
  description:
    "Handcrafted Pakistani bridal wear and accessories by master karigars. Custom lehengas, jewellery, khussa, and more made for the modern bride.",
  icons: {
    icon: [{ url: BEGUM_FAVICON, type: "image/svg+xml" }],
    apple: [{ url: BEGUM_FAVICON, type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${figerly.variable} ${bodySans.variable} ${fontCormorant.variable} ${fontCinzel.variable} ${fontPlayfair.variable} ${fontAmiri.variable} ${fontNastaliq.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-ivory text-charcoal antialiased"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-4 focus:left-4 focus:bg-emerald-900 focus:text-ivory focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <Header />
          <ScrollProgress />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartSidebar />
          <WhatsAppButton />
          <BackToTop />
        </SmoothScrollProvider>
        <GoogleAnalytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
