"use client";

import React, { useRef, useState, useEffect } from "react";

// Import the QR code generator as named import
import { QrCode, QrSegment } from "../typescript-javascript/qrcodegen";

export default function QrCodeGenerator() {
  const [qrText, setQrText] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoSizePct, setLogoSizePct] = useState(20); // percent
  const [error, setError] = useState("");
  const [qr, setQr] = useState<QrCode | null>(null); // Store QR object for redrawing
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw QR code and logo
  function drawQrCode(qrObj: QrCode, logoUrlVal: string | null) {
    if (!qrObj) return;
    const scale = 10; // 10 pixels per module
    const border = 4; // 4 modules
    const size = (qrObj.size + border * 2) * scale;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Draw background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, size, size);
    // Draw square modules for maximum compatibility
    for (let y = -border; y < qrObj.size + border; y++) {
      for (let x = -border; x < qrObj.size + border; x++) {
        ctx.fillStyle = qrObj.getModule(x, y) ? "#000000" : "#FFFFFF";
        ctx.fillRect((x + border) * scale, (y + border) * scale, scale, scale);
      }
    }
    // Draw logo if present
    if (logoUrlVal) {
      const img = new window.Image();
      img.onload = () => {
        const logoSize = size * (logoSizePct / 100);
        const x = (size - logoSize) / 2;
        const y = (size - logoSize) / 2;
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, logoSize / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, x, y, logoSize, logoSize);
        ctx.restore();
      };
      img.src = logoUrlVal;
    }
  }

  // Generate QR code and draw to canvas
  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!qrText) {
      setError("Please enter text to encode.");
      return;
    }
    try {
      // Use byte mode for encoding
      const segs = [QrSegment.makeBytes(Array.from(new TextEncoder().encode(qrText)))];
      const qrObj = QrCode.encodeSegments(
        segs,
        QrCode.Ecc.MEDIUM, // Error correction level M
        1, // min version
        40, // max version (let the library pick the smallest that fits)
        -1, // mask pattern automatic
        true // boost ECC
      );
      setQr(qrObj);
      drawQrCode(qrObj, logoUrl);
    } catch (err: unknown) {
      setError("Failed to generate QR code: " + (err instanceof Error ? err.message : String(err)));
    }
  }

  // Redraw logo when logo size or logoUrl changes
  useEffect(() => {
    if (qr) {
      drawQrCode(qr, logoUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoSizePct, logoUrl]);

  // Download QR code as image
  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    a.click();
  }

  // Handle logo upload
  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogoUrl(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 p-8 min-h-screen bg-background">
      <h1 className="text-3xl font-bold text-foreground">QR Code Generator</h1>
      <form onSubmit={handleGenerate} className="flex flex-col gap-4 w-full max-w-md bg-card p-6 rounded-lg border border-border shadow-sm">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-card-foreground">Text or URL to encode:</span>
          <input
            type="text"
            value={qrText}
            onChange={e => setQrText(e.target.value)}
            className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-card-foreground">Upload logo (optional):</span>
          <input type="file" accept="image/*" onChange={handleLogoUpload} className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80 cursor-pointer transition-all" />
        </label>
        {logoUrl && (
          <button
            type="button"
            className="bg-destructive text-destructive-foreground rounded-md px-3 py-1.5 text-sm font-medium w-fit self-start hover:bg-destructive/90 transition-colors"
            onClick={() => setLogoUrl(null)}
          >
            Remove logo
          </button>
        )}
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-card-foreground">Logo size: {logoSizePct}%</span>
          <input
            type="range"
            min={10}
            max={40}
            value={logoSizePct}
            onChange={e => setLogoSizePct(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </label>
        <button type="submit" className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
          Generate QR Code
        </button>
        {error && <div className="text-destructive text-sm">{error}</div>}
      </form>
      <canvas
        ref={canvasRef}
        className="border border-border rounded-lg shadow-sm"
        style={{ background: "#fff" }}
        width={256}
        height={256}
      />
      {qr && (
        <div className="text-sm text-muted-foreground">QR Code version: {qr.version}</div>
      )}
      <button
        onClick={handleDownload}
        className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Download QR Code
      </button>
      <footer className="mt-8 text-sm text-muted-foreground text-center">
        <p>
          Made with ❤️ by <a href="https://augustinchan.dev" className="text-primary hover:text-primary/80 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">Augustin Chan</a>
        </p>
        <p className="mt-2">
          Code at <a href="https://github.com/augchan42/qr-code-next" className="text-primary hover:text-primary/80 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">qr-code-next</a>
        </p>
      </footer>
    </div>
  );
}
