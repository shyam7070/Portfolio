# Portfolio Website

A modern, responsive personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. Features a clean design with dark/light theme support, smooth animations, and a fully functional contact form.

### Live Demo

🔗 https://santhosh-sanapathi-0911.vercel.app

## ✨ Features

- 🎨 **Modern UI** - Built with shadcn/ui components for consistent, accessible design
- 🌓 **Dark/Light Theme** - Automatic theme switching with system preference detection
- 🎭 **Smooth Animations** - Framer Motion for delightful page transitions and micro-interactions
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- ⚡ **Fast Performance** - Built with Next.js 14 App Router for optimal performance
- 📧 **Contact Form** - Functional contact form with reCAPTCHA protection and rate limiting
- 🖼️ **Project Showcase** - Image carousels with lightbox viewer for project screenshots
- 🏆 **Certifications** - Certificate viewer with modal display
- ♿ **Accessible** - Following WCAG accessibility guidelines
- 🔍 **SEO Optimized** - Proper metadata and OpenGraph tags

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alpharibbin/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   - `YOUR_EMAIL` - Your Gmail address
   - `YOUR_APP_PASSWORD` - Gmail App Password ([How to generate](https://support.google.com/accounts/answer/185833))
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - reCAPTCHA Site Key
   - `RECAPTCHA_SECRET_KEY` - reCAPTCHA Secret Key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page with hero section
│   ├── about/             # About page
│   ├── experience/        # Experience page
│   ├── projects/          # Projects page with image carousels
│   ├── skills/            # Skills page
│   ├── certifications/    # Certifications page
│   ├── contact/           # Contact page with form
│   └── api/               # API routes
│       └── contact/       # Contact form API endpoint
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation bar
│   ├── footer.tsx        # Footer component
│   ├── theme-provider.tsx # Theme provider wrapper
│   └── page-transition.tsx # Page transition animations
├── data/                 # Data files
│   ├── personal.ts       # Personal information
│   ├── experience.ts     # Work experience
│   ├── projects.ts       # Projects data
│   ├── skills.ts         # Skills data
│   ├── education.ts      # Education data
│   └── certifications.ts # Certifications data
├── lib/                  # Utility functions
│   ├── email.ts         # Email sending functionality
│   ├── rate-limit.ts     # Rate limiting for contact form
│   └── utils.ts          # Utility functions
└── public/               # Static assets
    ├── projects/         # Project screenshots
    └── certificates/     # Certificate images
```

## 🎨 Customization

### Update Personal Information

Edit files in the `data/` directory:

- `data/personal.ts` - Your name, role, bio, email, social links
- `data/experience.ts` - Your work experience entries
- `data/projects.ts` - Your projects and portfolio items
- `data/skills.ts` - Your technical skills
- `data/education.ts` - Your educational background
- `data/certifications.ts` - Your certifications and achievements

### Modify Theme Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  /* ... */
}
```

### Update SEO Metadata

Edit `app/layout.tsx` to change default metadata:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Your portfolio description",
  // ...
}
```

### Add Project Images

1. Place images in `public/projects/[Project Name]/`
2. Name them sequentially: `1.png`, `2.png`, etc.
3. Add image paths to `data/projects.ts`:

```typescript
images: [
  "/projects/Project Name/1.png",
  "/projects/Project Name/2.png",
]
```

## 🛠️ Building for Production

```bash
npm run build
npm start
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

Make sure to set all environment variables in your hosting platform.

## 🔒 Security Features

- **Rate Limiting** - 1 message per day per IP address
- **reCAPTCHA v3** - Invisible bot protection
- **Input Validation** - Server-side validation with Zod
- **XSS Protection** - HTML escaping for all user inputs
- **Environment Variables** - Sensitive data stored securely

## 📚 Documentation

- [Installation Guide](./docs/INSTALL.md) - Detailed setup instructions
- [Contact Form Setup](./docs/CONTACT.md) - Contact form configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Animations with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)
