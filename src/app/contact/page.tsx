import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";
import { ContactForm } from "@/components/forms/contact-form";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <PageShell>
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-sand-600 font-medium">Contact</p>
            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-emerald-800 mt-2 leading-[0.95]">
              We are here to help.
            </h1>
            <p className="text-charcoal/60 mt-3 max-w-xl">
              WhatsApp is the fastest way to reach us it is how Pakistan talks, and we believe in meeting our brides where they are.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <a
                href="https://wa.me/923209988777"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-emerald-800 text-ivory hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle size={32} className="text-sand-400" />
                <div>
                  <p className="font-medium">Chat on WhatsApp</p>
                  <p className="text-sm text-sand-200/70">Typically responds within 30 minutes</p>
                </div>
              </a>

              {[
                { icon: Phone, label: "WhatsApp", value: "+92 320 9988777", detail: "Primary responds within 30 min" },
                { icon: Phone, label: "Alt. Number", value: "+92 302 4794282", detail: "Secondary contact" },
                { icon: Mail, label: "Email", value: "begumretails@gmail.com", detail: "We reply within 24 hours" },
                { icon: MapPin, label: "Studio", value: "Lahore, Pakistan", detail: "By appointment only" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 border border-charcoal/5">
                  <item.icon size={20} className="text-emerald-800 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">{item.value}</p>
                    <p className="text-xs text-charcoal/50">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 border border-charcoal/5">
              <h2 className="font-display text-xl text-emerald-800 mb-6">Send us a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
