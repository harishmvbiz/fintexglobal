## 📋 FINTEX GLOBAL GROUP — PROJECT CONTEXT (V7 Handoff)

---

### WHO YOU ARE
- **Company**: Fintex Global Group
- **Founder**: Venkata Harish Mannepalli — CA India (ICAI) · CPA Australia · ACCA (UK) · Based: Business Bay, Dubai
- **Slogan**: *"Beyond the Books. Beyond Borders."*
- **Website**: fintexglobal.com

---

### THREE ENTITIES
| Entity | Jurisdiction | Details |
|---|---|---|
| Tensquare Accounting & Tax | 🇦🇺 Australia | ABN: 20 772 623 135 · CPA Registered · Brisbane QLD · Partner: Arun Kalluparampil |
| Fintex Global Advisory LLC | 🇦🇪 UAE | FTA Registered · Business Bay, Dubai · Harish leads |
| Fintex Global Advisory Pvt Ltd | 🇮🇳 India | Newly incorporated · CA India (ICAI) · Harish leads |

---

### BRAND
- **Colors**: Navy `#0A1624` · Cyan `#08C8E8` · Green `#32C84E` · AU Gold `#FFCD00` · India Saffron `#FF9933` · UAE Cyan `#08C8E8`
- **Fonts**: Syne (headings) · DM Sans (body) · DM Serif Display (accent)
- **Region palettes**: AU = gold/green · India = saffron/orange · UAE = cyan/blue

---

### WEBSITE V7 — FILE LIST (17 files)
| File | Description |
|---|---|
| `index.html` | Homepage — 3 region cards, tabbed services preview, hero, why section |
| `services.html` | Tabbed AU / India / UAE services |
| `australia.html` | 🇦🇺 AU Hub — BAS calendar, pricing, free trial CTA |
| `india.html` | 🇮🇳 India Hub — 8 services, compliance calendar |
| `uae.html` | 🇦🇪 UAE Hub — VAT, Corporate Tax, bookkeeping, advisory |
| `about.html` | Mission/Vision/Values — **Founder/personal section removed in V7** |
| `team.html` | Harish + Arun + 2 coming-soon placeholders |
| `blog.html` | 15 articles, filter by AU / India / UAE / Outsourcing / Data Security |
| `contact.html` | Region-wise blocks + lead-capture form |
| `analytics.html` | Chart.js localStorage dashboard — pageviews, leads, CSV export |
| `shared.css` | **V7** Full brand system — fully responsive (mobile/tablet/desktop/wide) |
| `HOSTING_GUIDE.html` | Step-by-step Netlify deploy guide |
| `sitemap.xml` | All 9 public pages |
| `admin-portal.html` | Full admin dashboard |
| `client-portal.html` | Client document submission portal |
| `INTEGRATION_GUIDE.html` | Setup guide for all integrations |
| `PROJECT_CONTEXT_V7.md` | **This file** — always paste when starting a new V8+ session |

---

### V7 CHANGES FROM V6
- ✅ `about.html` — "The Person Behind Fintex" section + all founder personal details **removed**
- ✅ `shared.css` fully rewritten — responsive breakpoints at 420/560/600/768/900/1024px
- ✅ All public pages — `clamp()` fluid type/spacing, touch-friendly buttons (min 44px tap)
- ✅ All public pages — `nav-cta-wrap` class replaces inline style on nav button wrapper
- ✅ All public pages — Mobile menu gets "🔐 Client Portal" button
- ✅ All public pages — Favicon (inline SVG), `og:image`, `theme-color` meta added
- ✅ All public pages — Hardcoded `24px` side paddings replaced with `clamp(16px,4vw,24px)`
- ✅ All public pages — Hero paddings fluid with `clamp()`
- ✅ `shared.css` — `-webkit-backdrop-filter` added for Safari support
- ✅ `shared.css` — `form-select` gets `-webkit-appearance:none` for iOS

---

### NAVBAR — ALL 9 PUBLIC PAGES
Every page now has two buttons in the top-right (hidden on mobile, shown in hamburger menu):
- `🔐 Client Portal` → links to `client-portal.html`
- `💬 WhatsApp` → opens region popup

---

### ADMIN PORTAL (`admin-portal.html`)
**Login:** `admin@fintexglobal.com` / `FintexAdmin2024!` (demo — change in Credentials page)

**Pages/Sections:**
- Dashboard, Leads, Reports, All Clients, Submissions, Awaiting Info, Credentials, Integrations, Notifications
- All data stored in `localStorage` under `fintex_*` keys

---

### CLIENT PORTAL (`client-portal.html`)
**Demo login:** `client@example.com` / `Client123!`

---

### CREDENTIALS (Demo — Change Before Launch)
| Role | Email | Password |
|---|---|---|
| Admin (Harish) | `admin@fintexglobal.com` | `FintexAdmin2024!` |
| Admin (Arun) | `arun@tensquare.com.au` | `Arun2024!` |
| Demo Client | `client@example.com` | `Client123!` |
| Demo Client 2 | `priya@example.com` | `Priya123!` |

**⚠ Change all passwords via Admin Portal → Credentials before going live.**

---

### ⚠️ STILL PENDING (fill before publishing)
```
REPLACE_AU_WHATSAPP    → Arun's AU WhatsApp number (digits only, e.g. 61412345678)
REPLACE_AU_EMAIL       → Arun's email address
REPLACE_INDIA_WHATSAPP → India WhatsApp number (digits only, e.g. 919876543210)
REPLACE_INDIA_EMAIL    → India team email address
UAE WhatsApp           → 971557282794 ✅ already set
UAE email              → info@fintexglobal.com ✅ already set
```

---

### LOGO
Not yet finalised. Reference image: `1780383967589_image.png` — 20 concepts (left col 1–10, right col 1–10). Tell Claude which number + column to integrate as inline SVG across all pages.

---

### PUBLISHING CHECKLIST
1. Fill in the 4 REPLACE_ placeholders above
2. Pick logo concept and tell Claude to integrate it
3. Change all demo passwords in Admin Portal → Credentials
4. Deploy to Netlify (see `HOSTING_GUIDE.html`)
5. Point domain at Netlify (see `HOSTING_GUIDE.html` → Custom Domain section)
6. (Optional) Wire Google Sheets + EmailJS (see `INTEGRATION_GUIDE.html`)

---

### HOW TO CONTINUE (V8+)
1. Upload **FintexGlobalGroup_Website_v7.zip**
2. Paste this entire context block
3. Tell Claude what you want — it will read the ZIP and build V8
