# Currency Converter Website

A simple web-based **currency converter** built with **Next.js 14, TypeScript, TailwindCSS**.  
This project is part of the **Web Frontend Developer Screening Test**.

---

## 🌐 Live Demo
[👉 View on GitHub Pages](https://devbankthanpat.github.io/currency-converter-website/)

---

## 📦 Tech Stack
- [Next.js 14](https://nextjs.org/) (Static Export mode)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide-react](https://lucide.dev/) (icons)

---

## 📊 API Sources
- **List of currencies**  
  `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`

- **Exchange rates by base currency**  
  `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/{base}.json`

⚠️ Note: This free API updates daily (not real-time).

---

## ▶️ Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/devbankthanpat/currency-converter-website.git
cd currency-converter-website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view in the browser.

---

## 🏗 Production Build & Preview

```bash
npm run build
npx serve out
```
This will generate a static export in the `out/` directory and serve it locally.

---

## 🚀 Deployment
Deployment is handled automatically using **GitHub Actions**:

- On every push to `main`, the project is built and exported to `out/`
- `.nojekyll` is added to ensure `_next/` assets are served correctly
- Artifact is deployed to GitHub Pages

You can view the workflow file in: `.github/workflows/deploy-pages.yml`

---

## 📂 Project Structure

```
src/
 ├─ app/                # Next.js App Router pages
 ├─ components/         # Reusable UI components (ConverterPanel, RateCard, etc.)
 ├─ services/           # API service layer (CurrencyService)
 ├─ lib/                # Utility functions (http wrapper, error handling)
 ├─ types/              # TypeScript types (models, interfaces)
 └─ config/             # App constants (default currencies)
```

---

## 📋 Technical Decisions
- **Next.js + Static Export**: suitable for GitHub Pages hosting  
- **TailwindCSS**: fast, utility-first styling with responsive design  
- **Services Layer**: centralized API handling with error handling & timeout  
- **TypeScript**: strict typing for reliability  
- **Responsive Design**: tested on both desktop and mobile  
- **Error/Loading States**: skeleton UI and retry option for better UX

---

## ⚠️ Limitations
- API is **daily updated** (not real-time exchange rates)  
- No persistent storage (history, favorites)  
- No authentication

---

## 🔮 Future Improvements
- Integrate real-time exchange rate API (e.g., ExchangeRate API, CurrencyAPI)  
- Add charts for currency trends  
- Allow saving frequently used conversions  
- Add i18n (multi-language support)

---

## 👤 Author
**Thanapat Munmanothum**  
Frontend Developer Candidate

---
