# Pro Touch Painting & Drywall Website

[![Next.js](https://img.shields.io/badge/Next.js-14.2.32-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180.0-white?logo=three.js)](https://threejs.org/)

A professional, responsive website for Pro Touch Painting & Drywall services featuring modern design, 3D model integration, and multilingual support.

## 🌟 Features

- **Modern Design**: Clean, professional UI with CSS Modules
- **3D Model Integration**: Interactive FBX model in hero section using Three.js
- **Responsive**: Mobile-first design that works on all devices
- **Multilingual**: English/Spanish support with i18next
- **Contact Forms**: Email and SMS notifications via Resend and Twilio
- **Gallery**: Before/after project showcase
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Next.js Image optimization and lazy loading
- **Type Safety**: Full TypeScript implementation
- **Testing**: Jest and React Testing Library setup

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd protouch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables (see [Environment Variables](#environment-variables))

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

### Core Technologies
- **Framework**: Next.js 14.2.32 (React 18)
- **Language**: TypeScript 5.3.3
- **Styling**: CSS Modules
- **3D Graphics**: Three.js with React Three Fiber

### Key Dependencies
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers for React Three Fiber
- **i18next**: Internationalization framework
- **react-i18next**: React bindings for i18next
- **resend**: Email service for contact forms
- **twilio**: SMS service for notifications

### Development Tools
- **ESLint**: Code linting with Next.js config
- **Jest**: Testing framework
- **@testing-library/react**: React component testing
- **TypeScript**: Static type checking

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx

# SMS Service (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890

# Contact Information
CONTACT_EMAIL=your-email@example.com
```

### Getting API Keys

1. **Resend API Key**
   - Sign up at [resend.com](https://resend.com)
   - Go to API Keys section
   - Create and copy your API key

2. **Twilio Credentials**
   - Sign up at [twilio.com](https://twilio.com)
   - Find Account SID and Auth Token in your dashboard
   - Purchase a phone number for SMS sending

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── __tests__/         # Component tests
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Hero3DModel.tsx    # 3D model component
│   ├── Gallery.tsx        # Project gallery
│   ├── Services.tsx       # Services section
│   ├── About.tsx          # About section
│   ├── Testimonials.tsx   # Customer testimonials
│   ├── Contact.tsx        # Contact form
│   ├── Footer.tsx         # Site footer
│   └── *.module.css       # Component-specific styles
├── lib/
│   └── i18n.ts           # Internationalization config
└── pages/
    └── api/
        └── submit-quote.ts # Contact form API endpoint
```

## 🎨 Styling

This project uses CSS Modules for component-scoped styling with a design system based on:

### Color Palette
- Primary Orange: `#D2691E`
- Deep Maroon: `#8B2635`
- Charcoal: `#2C3E50`
- Navy Blue: `#1E3A8A`
- Success Green: `#059669`
- Light Orange: `#F4A460`

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body**: Roboto (Google Fonts)

## 🌐 3D Model Integration

The hero section features an interactive 3D model using:

- **FBX Loader**: Loads `/assets/models/PROTOUCHYES.fbx`
- **Mouse Interaction**: Desktop users can interact with the model
- **Auto Rotation**: Mobile users see automatic rotation
- **Responsive Scaling**: Adapts to screen size
- **Performance Optimized**: Lazy loading and efficient rendering

## 🌍 Internationalization

The website supports English and Spanish:

- **i18next**: Translation framework
- **Language Toggle**: Header component with flag icons
- **Browser Detection**: Automatic language detection
- **Fallback**: English as default language

## 📱 Responsive Design

- **Mobile First**: Designed for mobile, enhanced for desktop
- **Breakpoints**: 768px for tablet, 1024px for desktop
- **Touch Friendly**: Large tap targets and mobile-optimized interactions
- **Performance**: Optimized images and lazy loading

## 🧪 Testing

Run tests with:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Testing Setup
- **Jest**: Test runner and framework
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import project in Vercel dashboard
   - Connect your Git repository

2. **Environment Variables**
   - Add all environment variables in Vercel settings
   - Use the same names as in `.env.example`

3. **Deploy**
   - Automatic deployment on push to main branch
   - Preview deployments for pull requests

### Static Export

For static hosting:

```bash
npm run build
```

The output will be in the `/out` directory.

## 📊 Performance

- **Lighthouse Score**: 95+ performance
- **Core Web Vitals**: Optimized for all metrics
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **3D Model**: Lazy loaded and optimized

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build production version
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Code Quality

- **ESLint**: Configured with Next.js and TypeScript rules
- **TypeScript**: Strict mode enabled
- **Prettier**: Code formatting (configure in your editor)

## 📧 Contact Form Integration

The contact form sends notifications via:

1. **Email**: Using Resend service to business email
2. **SMS**: Using Twilio to business phone number
3. **Validation**: Client and server-side validation
4. **Error Handling**: Graceful error handling and user feedback

## 🔒 Security

- **Environment Variables**: Sensitive data in environment variables
- **API Routes**: Server-side processing for forms
- **Input Validation**: Sanitized user inputs
- **Dependencies**: Regular security updates

## 📄 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Fallbacks**: Graceful degradation for older browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines

- Follow TypeScript strict mode
- Write tests for new components
- Use CSS Modules for styling
- Follow existing code patterns
- Update documentation as needed

## 📝 License

© 2025 Pro Touch Painting & Drywall. All rights reserved.

## 🆘 Support

For support, email jorgeruizpaint@yahoo.com or create an issue in the repository.

---

**Built with ❤️ using Next.js, React, and Three.js**