# 11 PM Snacks — Official Website

> **Your Cravings. Our Calling.**  
> Indian masala-flavoured popcorn brand: Peri Peri, Tangy Tomato, and Cheese — small-batch crafted, made with sunflower oil and zero palm oil.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: Modern Vanilla CSS + [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Deployment Target**: [Vercel](https://vercel.com/)

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Open browser at
# http://localhost:3000
```

---

## 📦 Production Build Verification

This project is tested and verified to build cleanly without any errors or warnings:

```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

All 14 routes are statically prerendered for maximum speed and SEO performance:
- `/` — Homepage with Hero, Flavours, Healthy Snacking Guide, Nutrition Highlights
- `/healthy-snacking` — Comprehensive Educational Nutrition & Smart Snacking Guide
- `/flavours` — Complete flavour range
- `/flavours/peri-peri` — Peri Peri flavour page
- `/flavours/tangy-tomato` — Tangy Tomato flavour page
- `/flavours/cheese` — Cheese flavour page
- `/ingredients-nutrition` — Transparent ingredients & nutrition breakdown
- `/our-process` — Small-batch popping and seasoning craft
- `/why-11pm` — Brand ethos and zero palm oil philosophy
- `/about` — Origin story & team
- `/contact` — Contact details & distribution inquiry form
- `/_not-found` — Custom 404 page

---

## ⚡ How to Deploy on Vercel

### Method 1: Deploy with GitHub (Recommended)

1. **Push your code to GitHub**:
   ```bash
   # Add your GitHub repository as remote (if not already added):
   git remote set-url origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

   # Push to main branch:
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **"Add New..."** → **"Project"**.
   - Select your repository (`<YOUR-REPO-NAME>`) and click **"Import"**.
   - Vercel automatically detects **Next.js**. Framework Preset and Build settings are pre-configured:
     - **Framework Preset**: `Next.js`
     - **Build Command**: `next build` (or `npm run build`)
     - **Output Directory**: `.next`
     - **Install Command**: `npm install`
   - Click **"Deploy"**.

3. **Custom Domain (Optional)**:
   - Once deployed, go to your project in Vercel → **Settings** → **Domains**.
   - Add your custom domain (e.g. `11pmsnacks.com`) and follow Vercel's DNS instructions.

---

### Method 2: Deploy with Vercel CLI

```bash
# Login to Vercel
npx vercel login

# Deploy directly from terminal
npx vercel

# Deploy to production
npx vercel --prod
```

---

## ⚙️ Environment Variables (Optional)

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical website URL for OpenGraph and SEO tags | Automatically set to Vercel production URL or `https://11pmsnacks.com` |
