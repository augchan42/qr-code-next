# QR Code Generator with Logo

A modern, fast QR code generator built with Next.js that allows you to create professional QR codes with custom logo overlays. Perfect for business cards, marketing materials, and branding.

## ✨ Features

- 🚀 **Fast & Responsive** - Built with Next.js 15 and Turbopack for lightning-fast development
- 🎨 **Logo Integration** - Upload custom logos and overlay them on your QR codes
- 📱 **Mobile Friendly** - Responsive design that works on all devices
- 🔧 **Customizable** - Adjustable logo size (10-40% of QR code)
- 📥 **Download Ready** - Export QR codes as high-quality PNG images
- 🎯 **Error Correction** - Medium-level error correction for reliable scanning
- 🔄 **Real-time Preview** - See changes instantly as you adjust settings

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/augchan42/qr-code-next.git
cd qr-code-next
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Usage

1. **Enter Content**: Type or paste the text/URL you want to encode
2. **Upload Logo** (Optional): Choose an image file to overlay on the QR code
3. **Adjust Size**: Use the slider to control logo size (10-40%)
4. **Generate**: Click "Generate QR Code" to create your custom QR code
5. **Download**: Save the QR code as a PNG image

## 🏗️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Styling
- **Custom QR Code Library** - Pure TypeScript QR code generation

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main QR code generator component
│   └── globals.css         # Global styles
└── typescript-javascript/
    └── qrcodegen.ts        # QR code generation library
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 👨‍💻 Author

**Augustin Chan**
- Website: [augustinchan.dev](https://augustinchan.dev)
- GitHub: [@augchan42](https://github.com/augchan42)

## 🙏 Acknowledgments

- QR code generation based on the [QR Code generator library](https://www.nayuki.io/page/qr-code-generator-library) by Nayuki, with extensive modifications and fixes by Claude Code to ensure compatibility with Next.js 15 and modern TypeScript/React environments
- Built with [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

---

Made with ❤️ by [Augustin Chan](https://augustinchan.dev)