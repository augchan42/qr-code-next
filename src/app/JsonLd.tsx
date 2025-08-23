export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "QR Code Generator with Logo",
    "description": "Generate custom QR codes with logo overlays. Free online tool for creating professional QR codes for business cards, marketing materials, and more.",
    "url": "https://junz.ai",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Augustin Chan",
      "url": "https://augustinchan.dev"
    },
    "publisher": {
      "@type": "Person",
      "name": "Augustin Chan",
      "url": "https://augustinchan.dev"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}