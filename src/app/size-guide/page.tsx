import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/shared/page-shell";
import { Ruler, Video } from "lucide-react";

export default function SizeGuidePage() {
  return (
    <PageShell>
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-sand-600 font-medium">Guide</p>
            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] text-emerald-800 mt-2 leading-[0.95]">
              Size Guide
            </h1>
            <p className="text-charcoal/60 mt-3">Measurements in inches. Watch the video guide or follow the steps below.</p>
          </div>

          <div className="aspect-video bg-sand-100 flex items-center justify-center mb-12">
            <Video size={48} className="text-charcoal/20" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { title: "Waist", desc: "Measure around the narrowest part of your waist, usually just above the belly button." },
                { title: "Bust", desc: "Measure around the fullest part of your chest, keeping the tape parallel to the floor." },
                { title: "Hip", desc: "Measure around the widest part of your hips, about 7-8 inches below your waist." },
                { title: "Lehenga Length", desc: "Measure from your waist to the floor (or desired hem length). Add 1 inch for hemming." },
              ].map((m) => (
                <div key={m.title} className="flex gap-4">
                  <Ruler size={20} className="text-emerald-800 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-charcoal">{m.title}</h3>
                    <p className="text-xs text-charcoal/50 mt-1">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-sand-50">
              <h3 className="text-sm font-medium text-charcoal mb-4">Standard Size Chart (in inches)</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-charcoal/10">
                    <th className="text-left py-2 text-charcoal/50 font-medium">Size</th>
                    <th className="text-left py-2 text-charcoal/50 font-medium">Waist</th>
                    <th className="text-left py-2 text-charcoal/50 font-medium">Bust</th>
                    <th className="text-left py-2 text-charcoal/50 font-medium">Hip</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: "XS", waist: "26-27", bust: "32-33", hip: "36-37" },
                    { size: "S", waist: "28-29", bust: "34-35", hip: "38-39" },
                    { size: "M", waist: "30-31", bust: "36-37", hip: "40-41" },
                    { size: "L", waist: "32-34", bust: "38-40", hip: "42-44" },
                    { size: "XL", waist: "35-37", bust: "41-43", hip: "45-47" },
                    { size: "XXL", waist: "38-40", bust: "44-46", hip: "48-50" },
                  ].map((row) => (
                    <tr key={row.size} className="border-b border-charcoal/5">
                      <td className="py-2 font-medium">{row.size}</td>
                      <td className="py-2 text-charcoal/60">{row.waist}</td>
                      <td className="py-2 text-charcoal/60">{row.bust}</td>
                      <td className="py-2 text-charcoal/60">{row.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-charcoal/40 mt-4">Measurements may vary by style. Custom orders are made to your exact measurements.</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-emerald-50 text-sm text-emerald-800">
            <p>Need help measuring? <a href="https://wa.me/923209988777" target="_blank" rel="noopener noreferrer" className="underline">Chat with us on WhatsApp</a> — we can guide you through it.</p>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
