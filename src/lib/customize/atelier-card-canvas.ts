/**
 * Atelier Couture Card Canvas Generator
 * Renders an award-winning high-resolution Atelier Bridal Dossier Card (1200 x 800)
 * containing the live SVG mannequin silhouette sketch + all bespoke measurements & specifications.
 */

export interface AtelierCardProps {
  svgElement: SVGSVGElement | null;
  garmentType: string;
  occasion: string;
  fabricLabel: string;
  fabricColorLabel: string;
  embroideryLabel: string;
  density: string;
  addons: string[];
  unit: string;
  measurements: { label: string; value: string }[];
  totalPrice: string;
  milestones: { label: string; amount: string; sub?: string }[];
  orderRef: string;
  shareUrl: string;
}

export async function generateAtelierCardImage(props: AtelierCardProps): Promise<{ blob: Blob; dataUrl: string }> {
  const width = 1200;
  const height = 800;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context could not be acquired.");
  }

  // ── 1. Base Luxury Background ──────────────────────────────────────────
  ctx.fillStyle = "#FAF6EF";
  ctx.fillRect(0, 0, width, height);

  // Subtle parchment texture / tint
  ctx.fillStyle = "rgba(201, 151, 90, 0.025)";
  ctx.fillRect(16, 16, width - 32, height - 32);

  // ── 2. Ornate Double Gold Borders & Corner Diamonds ────────────────────
  ctx.strokeStyle = "#C9975A";
  ctx.lineWidth = 1.8;
  ctx.strokeRect(16, 16, width - 32, height - 32);

  ctx.strokeStyle = "rgba(201, 151, 90, 0.45)";
  ctx.lineWidth = 0.8;
  ctx.strokeRect(23, 23, width - 46, height - 46);

  // Corner Diamond Accents
  const drawDiamond = (cx: number, cy: number, size: number) => {
    ctx.save();
    ctx.fillStyle = "#C9975A";
    ctx.beginPath();
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx + size, cy);
    ctx.lineTo(cx, cy + size);
    ctx.lineTo(cx - size, cy);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  drawDiamond(23, 23, 4);
  drawDiamond(width - 23, 23, 4);
  drawDiamond(23, height - 23, 4);
  drawDiamond(width - 23, height - 23, 4);

  // ── 3. Atelier Header ──────────────────────────────────────────────────
  ctx.textAlign = "center";
  ctx.fillStyle = "#9E723D";
  ctx.font = "600 10px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText("BEGUM HAUTE COUTURE · ATELIER LAHORE", width / 2, 48);

  ctx.fillStyle = "#062319";
  ctx.font = "bold 26px 'Playfair Display', Georgia, serif";
  ctx.letterSpacing = "0.5px";
  ctx.fillText("BESPOKE BRIDAL COUTURE DOSSIER", width / 2, 78);

  ctx.fillStyle = "#7A6F62";
  ctx.font = "500 11px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  ctx.letterSpacing = "1.5px";
  const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  ctx.fillText(`ORDER REF: ${props.orderRef}  ·  ISSUED: ${dateStr.toUpperCase()}`, width / 2, 98);

  // Ornate separator below header
  ctx.strokeStyle = "#DECFC0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(42, 114);
  ctx.lineTo(width - 42, 114);
  ctx.stroke();
  drawDiamond(width / 2, 114, 3.5);

  // ── 4. Left Column: Mannequin Sketch Easel ─────────────────────────────
  const sketchBoxX = 42;
  const sketchBoxY = 132;
  const sketchBoxW = 370;
  const sketchBoxH = 620;

  // Frame Box
  ctx.fillStyle = "#FFFFFF";
  ctx.strokeStyle = "#E4D7C8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(sketchBoxX, sketchBoxY, sketchBoxW, sketchBoxH, 4);
  ctx.fill();
  ctx.stroke();

  // Sketch Card Title
  ctx.textAlign = "left";
  ctx.fillStyle = "#9E723D";
  ctx.font = "600 9px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("I. ATELIER SKETCHPAD ILLUSTRATION", sketchBoxX + 18, sketchBoxY + 26);

  ctx.fillStyle = "#062319";
  ctx.font = "600 13px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  ctx.letterSpacing = "0px";
  ctx.fillText(`${props.garmentType.toUpperCase()} · ${props.occasion.toUpperCase()}`, sketchBoxX + 18, sketchBoxY + 44);

  // Render SVG onto Canvas
  if (props.svgElement) {
    try {
      const svgClone = props.svgElement.cloneNode(true) as SVGSVGElement;
      svgClone.setAttribute("width", "334");
      svgClone.setAttribute("height", "470");
      const xml = new XMLSerializer().serializeToString(svgClone);
      const svgBlob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
      const URLObj = window.URL || window.webkitURL || window;
      const blobURL = URLObj.createObjectURL(svgBlob);

      const img = new Image();
      await new Promise<void>((resolve) => {
        img.onload = () => {
          ctx.drawImage(img, sketchBoxX + 18, sketchBoxY + 54, 334, 470);
          URLObj.revokeObjectURL(blobURL);
          resolve();
        };
        img.onerror = () => {
          URLObj.revokeObjectURL(blobURL);
          resolve(); // gracefully proceed without failing the whole card
        };
        img.src = blobURL;
      });
    } catch (err) {
      console.warn("Could not draw SVG to canvas:", err);
    }
  }

  // Palette & Silk Footer in Sketch Box
  const sketchFooterY = sketchBoxY + sketchBoxH - 64;
  ctx.strokeStyle = "#F0E7DB";
  ctx.beginPath();
  ctx.moveTo(sketchBoxX + 18, sketchFooterY);
  ctx.lineTo(sketchBoxX + sketchBoxW - 18, sketchFooterY);
  ctx.stroke();

  ctx.fillStyle = "#7A6F62";
  ctx.font = "500 9px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  ctx.letterSpacing = "1.5px";
  ctx.fillText("SELECTED SILK & PALETTE", sketchBoxX + 18, sketchFooterY + 18);

  ctx.fillStyle = "#062319";
  ctx.font = "bold 13px 'Playfair Display', Georgia, serif";
  ctx.fillText(`${props.fabricColorLabel} · ${props.fabricLabel}`, sketchBoxX + 18, sketchFooterY + 36);

  ctx.fillStyle = "#9E723D";
  ctx.font = "italic 10px 'Playfair Display', Georgia, serif";
  ctx.fillText("Bespoke Handcrafted Cut", sketchBoxX + 18, sketchFooterY + 50);

  // ── 5. Right Column: Form Specifications ───────────────────────────────
  const rightX = 434;
  const rightW = width - rightX - 42;

  // Block A: Foundation & Karigari
  ctx.fillStyle = "#9E723D";
  ctx.font = "600 10px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("II. BRIDAL SPECIFICATIONS & KARIGARI", rightX, sketchBoxY + 16);

  ctx.fillStyle = "#062319";
  ctx.font = "bold 20px 'Playfair Display', Georgia, serif";
  ctx.fillText(`${props.garmentType.toUpperCase()} (${props.occasion.toUpperCase()})`, rightX, sketchBoxY + 40);

  // Karigari Info Pill
  ctx.fillStyle = "rgba(6, 35, 25, 0.04)";
  ctx.strokeStyle = "#E4D7C8";
  ctx.beginPath();
  ctx.roundRect(rightX, sketchBoxY + 52, rightW, 44, 3);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#062319";
  ctx.font = "600 12px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  ctx.fillText(`✨ Karigari: ${props.embroideryLabel}  (${props.density.toUpperCase()} DENSITY)`, rightX + 14, sketchBoxY + 72);

  ctx.fillStyle = "#7A6F62";
  ctx.font = "500 11px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  const addonsText = props.addons.length > 0 ? `💎 Add-ons: ${props.addons.join(", ")}` : "Authentic Mughal dabka, nakshi & zari hand-work";
  ctx.fillText(addonsText, rightX + 14, sketchBoxY + 88);

  // Block B: Proportions & Tailored Measurements Grid
  const gridTopY = sketchBoxY + 116;
  ctx.fillStyle = "#9E723D";
  ctx.font = "600 10px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText(`III. CUSTOM BODY PROPORTIONS (UNIT: ${props.unit.toUpperCase()})`, rightX, gridTopY);

  // Draw 2-column or 3-column measurements grid
  const cols = 3;
  const colW = (rightW - (cols - 1) * 10) / cols;
  const rowH = 34;
  const displayItems = props.measurements.slice(0, 12); // up to 12 measurements

  displayItems.forEach((m, idx) => {
    const c = idx % cols;
    const r = Math.floor(idx / cols);
    const itemX = rightX + c * (colW + 10);
    const itemY = gridTopY + 14 + r * (rowH + 8);

    // Box
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#E8DFD3";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(itemX, itemY, colW, rowH, 2);
    ctx.fill();
    ctx.stroke();

    // Key
    ctx.fillStyle = "#7A6F62";
    ctx.font = "500 10px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
    ctx.fillText(m.label, itemX + 10, itemY + 21);

    // Value
    ctx.textAlign = "right";
    ctx.fillStyle = "#062319";
    ctx.font = "bold 12px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
    ctx.fillText(m.value, itemX + colW - 10, itemY + 21);
    ctx.textAlign = "left";
  });

  // Block C: Investment & Payment Milestones
  const numRows = Math.ceil(displayItems.length / cols);
  const ledgerTopY = gridTopY + 24 + numRows * (rowH + 8) + 12;

  ctx.fillStyle = "#9E723D";
  ctx.font = "600 10px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("IV. INVESTMENT & ATELIER MILESTONES (30 / 40 / 30)", rightX, ledgerTopY);

  // Total Box
  ctx.fillStyle = "#062319";
  ctx.beginPath();
  ctx.roundRect(rightX, ledgerTopY + 12, rightW, 46, 3);
  ctx.fill();

  ctx.fillStyle = "#D6B485";
  ctx.font = "600 10px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  ctx.letterSpacing = "1.5px";
  ctx.fillText("ESTIMATED TOTAL INVESTMENT:", rightX + 16, ledgerTopY + 39);

  ctx.textAlign = "right";
  ctx.fillStyle = "#FAF7F2";
  ctx.font = "bold 20px 'Playfair Display', Georgia, serif";
  ctx.fillText(props.totalPrice, rightX + rightW - 16, ledgerTopY + 41);
  ctx.textAlign = "left";

  // Milestones Row (3 columns)
  const milestoneY = ledgerTopY + 66;
  const mColW = (rightW - 20) / 3;

  props.milestones.slice(0, 3).forEach((ms, i) => {
    const mx = rightX + i * (mColW + 10);
    ctx.fillStyle = i === 0 ? "rgba(201, 151, 90, 0.12)" : "#FFFFFF";
    ctx.strokeStyle = i === 0 ? "#C9975A" : "#E4D7C8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(mx, milestoneY, mColW, 46, 3);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = i === 0 ? "#9E723D" : "#7A6F62";
    ctx.font = "600 9px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
    ctx.letterSpacing = "1px";
    ctx.fillText(ms.label.toUpperCase(), mx + 10, milestoneY + 18);

    ctx.fillStyle = "#062319";
    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
    ctx.fillText(ms.amount, mx + 10, milestoneY + 36);
  });

  // Block D: Verification Footer & Official Seal
  const footerY = sketchBoxY + sketchBoxH - 52;
  ctx.strokeStyle = "#DECFC0";
  ctx.beginPath();
  ctx.moveTo(rightX, footerY);
  ctx.lineTo(rightX + rightW, footerY);
  ctx.stroke();

  ctx.fillStyle = "#062319";
  ctx.font = "600 11px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  ctx.fillText("👑 BEGUM ATELIER VERIFICATION", rightX, footerY + 20);

  ctx.fillStyle = "#7A6F62";
  ctx.font = "400 10px -apple-system, BlinkMacSystemFont, 'Instrument Sans', sans-serif";
  ctx.fillText("Every measurement is verified by our master tailor before fabric is cut.", rightX, footerY + 36);

  ctx.textAlign = "right";
  ctx.fillStyle = "#9E723D";
  ctx.font = "italic 11px 'Playfair Display', Georgia, serif";
  ctx.fillText("Begum Bridal Couture · Lahore, Pakistan", rightX + rightW, footerY + 28);
  ctx.textAlign = "left";

  // ── 6. Export to Blob & Data URL ───────────────────────────────────────
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to produce PNG blob from canvas."));
        return;
      }
      const dataUrl = canvas.toDataURL("image/png");
      resolve({ blob, dataUrl });
    }, "image/png");
  });
}
