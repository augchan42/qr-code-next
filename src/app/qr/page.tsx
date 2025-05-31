"use client";

import React, { useRef, useState, useEffect } from "react";

// Import the QR code generator as named import
import { QrCode, QrSegment } from "../../typescript-javascript/qrcodegen";

export default function QrCodeGenerator() {
  const [qrText, setQrText] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoSizePct, setLogoSizePct] = useState(20); // percent
  const [error, setError] = useState("");
  const [qr, setQr] = useState<any>(null); // Store QR object for redrawing
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw QR code and logo
  function drawQrCode(qrObj: any, logoUrlVal: string | null, logoSize: number) {
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
        QrCode.Ecc.MEDIUM, // Error correction level H
        1, // min version
        40, // max version (let the library pick the smallest that fits)
        -1, // mask pattern automatic
        true // boost ECC
      );
      setQr(qrObj);
      drawQrCode(qrObj, logoUrl, logoSizePct);
    } catch (err: any) {
      setError("Failed to generate QR code: " + err.message);
    }
  }

  // Redraw logo when logo size or logoUrl changes
  useEffect(() => {
    if (qr) {
      drawQrCode(qr, logoUrl, logoSizePct);
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
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-2xl font-bold">QR Code Generator with Logo</h1>
      <form onSubmit={handleGenerate} className="flex flex-col gap-4 w-full max-w-md">
        <label className="flex flex-col gap-2">
          Text or URL to encode:
          <input
            type="text"
            value={qrText}
            onChange={e => setQrText(e.target.value)}
            className="border rounded px-2 py-1"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          Upload logo (optional):
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </label>
        {logoUrl && (
          <button
            type="button"
            className="bg-red-500 text-white rounded px-3 py-1 w-fit self-start hover:bg-red-600"
            onClick={() => setLogoUrl(null)}
          >
            Remove logo
          </button>
        )}
        <label className="flex flex-col gap-2">
          Logo size: {logoSizePct}%
          <input
            type="range"
            min={10}
            max={40}
            value={logoSizePct}
            onChange={e => setLogoSizePct(Number(e.target.value))}
          />
        </label>
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
          Generate QR Code
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
      <canvas
        ref={canvasRef}
        className="border"
        style={{ background: "#fff" }}
        width={256}
        height={256}
      />
      {qr && (
        <div className="text-sm text-gray-600">QR Code version: {qr.version}</div>
      )}
      <button
        onClick={handleDownload}
        className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
      >
        Download QR Code
      </button>
    </div>
  );
} 