import { GOOGLE_FONTS_EMBED_CSS } from "./fonts";

export interface ExportCardOptions {
  svgElement: SVGSVGElement;
  filename?: string;
  isSquare?: boolean;
}

/**
 * High-resolution 2x client-side PNG export of an SVG greeting card.
 * Inlines web fonts, preserves gradients and vector sharpness.
 */
export async function exportCardToBlob(options: ExportCardOptions): Promise<Blob> {
  const { svgElement, isSquare = false } = options;

  // Await page web fonts readiness
  if (typeof document !== "undefined" && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Proceed if font readiness check fails
    }
  }

  const width = isSquare ? 2160 : 2160;
  const height = isSquare ? 2160 : 2700;
  const viewBoxWidth = 1080;
  const viewBoxHeight = isSquare ? 1080 : 1350;

  // Clone SVG node so live DOM is untouched
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("width", String(width));
  clone.setAttribute("height", String(height));
  clone.setAttribute("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

  // Ensure defs and style tags exist with embedded Google Font rules
  let defs = clone.querySelector("defs");
  if (!defs) {
    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    clone.insertBefore(defs, clone.firstChild);
  }

  // Prepend embedded font stylesheet
  const fontStyle = document.createElementNS("http://www.w3.org/2000/svg", "style");
  fontStyle.textContent = GOOGLE_FONTS_EMBED_CSS;
  defs.appendChild(fontStyle);

  const xml = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
  const URLObj = window.URL || window.webkitURL || window;
  const blobURL = URLObj.createObjectURL(svgBlob);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    URLObj.revokeObjectURL(blobURL);
    throw new Error("Could not acquire 2D canvas context for card export.");
  }

  const img = new Image();
  img.crossOrigin = "anonymous";

  await new Promise<void>((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URLObj.revokeObjectURL(blobURL);
      resolve();
    };
    img.onerror = (err) => {
      URLObj.revokeObjectURL(blobURL);
      reject(err);
    };
    img.src = blobURL;
  });

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Canvas toBlob failed."));
      }
    }, "image/png", 1.0);
  });
}

/**
 * Downloads the card as a high-resolution 2x PNG image.
 */
export async function downloadCardPng(options: ExportCardOptions) {
  const blob = await exportCardToBlob(options);
  const filename = options.filename || "Begum-Royal-Card.png";
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/**
 * Shares the card using Web Share API (with file) if supported,
 * otherwise provides fallback copying to clipboard and WhatsApp link.
 */
export async function shareCard(options: {
  svgElement: SVGSVGElement;
  recipientName: string;
  senderName: string;
  isSquare?: boolean;
}): Promise<{ method: "share-api" | "whatsapp" | "clipboard"; success: boolean }> {
  try {
    const blob = await exportCardToBlob({
      svgElement: options.svgElement,
      isSquare: options.isSquare,
    });
    const file = new File([blob], `Begum-Card-For-${options.recipientName.replace(/\s+/g, "_") || "You"}.png`, {
      type: "image/png",
    });

    if (
      typeof navigator !== "undefined" &&
      navigator.canShare &&
      navigator.canShare({ files: [file] }) &&
      navigator.share
    ) {
      await navigator.share({
        title: "A Royal Greeting from Begum",
        text: `A handcrafted Mughal & Persian greeting card for ${options.recipientName || "You"} with love from ${options.senderName || "Begum"}.`,
        files: [file],
      });
      return { method: "share-api", success: true };
    }

    // Attempt to copy image to clipboard
    if (typeof navigator !== "undefined" && navigator.clipboard && window.ClipboardItem) {
      try {
        const item = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);
        return { method: "clipboard", success: true };
      } catch {
        // Fall back to WhatsApp
      }
    }

    // Fallback WhatsApp message
    const waText = encodeURIComponent(
      `A royal Mughal & Persian card was handcrafted for ${options.recipientName || "You"} by ${options.senderName || "someone who cares"} on Begum: https://begumretails.com/cards`
    );
    window.open(`https://wa.me/?text=${waText}`, "_blank", "noopener,noreferrer");
    return { method: "whatsapp", success: true };
  } catch (err) {
    console.error("Error sharing card:", err);
    return { method: "whatsapp", success: false };
  }
}
