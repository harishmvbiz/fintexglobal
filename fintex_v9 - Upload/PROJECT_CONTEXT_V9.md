## 📋 FINTEX GLOBAL GROUP — PROJECT CONTEXT (V9 Handoff)

### WHO YOU ARE
- Company: Fintex Global Group
- Founder: Venkata Harish Mannepalli — CA India (ICAI) · CPA Australia · ACCA (UK) · Business Bay, Dubai
- Slogan: "Beyond the Books. Beyond Borders."
- Website: fintexglobal.com

### THREE ENTITIES
| Entity | Jurisdiction | Details |
|---|---|---|
| Tensquare Accounting & Tax | 🇦🇺 Australia | ABN: 20 772 623 135 · CPA · Brisbane QLD · Partner: Arun Kalluparampil |
| Fintex Global Advisory LLC | 🇦🇪 UAE | FTA Registered · Business Bay, Dubai |
| Fintex Global Advisory Pvt Ltd | 🇮🇳 India | CA India (ICAI) |

### BRAND — V9
- Logo: 3 mountain peaks + globe on top. Deep navy-blue → steel blue → cyan-teal gradient (left to right). Matches Final_-_GPT.png reference. Inline SVG in all pages.
- Font: Inter (Google Fonts)
- Palette: Navy #0B1829 · Steel #1565A8 · Cyan #00B4D8 · AU Gold #E8B800 · India Saffron #E07B00

### V9 CHANGES FROM V8
- ✅ Accurate logo SVG rebuilt — 3 peaks + globe with meridian grid, matches uploaded reference image exactly
- ✅ Combined portal — admin-portal.html + client-portal.html merged into portal.html
  - Single login page with "Client Portal" and "Admin Portal" tabs
  - Switch between client and admin dashboards seamlessly
  - Old admin-portal.html and client-portal.html now redirect to portal.html
- ✅ Banner slider added to homepage — 4 promotional slides, auto-rotate, swipe on mobile
- ✅ Testimonials section added to homepage — 6 client reviews across AU/India/UAE
- ✅ BANNER_GUIDE.html — step-by-step guide to update banners, testimonials, contacts, blog, colours, credentials, and deploy
- ✅ Full link audit: 0 broken links · 0 old logos · 0 old fonts · portal tabs confirmed

### FILE LIST (18 files)
| File | Purpose |
|---|---|
| index.html | Homepage — banners, hero, regions, services, testimonials, why, CTA |
| services.html | All services tabbed |
| australia.html | 🇦🇺 AU Hub |
| india.html | 🇮🇳 India Hub |
| uae.html | 🇦🇪 UAE Hub |
| about.html | Mission · Vision · Values · Three Entities |
| team.html | Harish + Arun + 2 placeholders |
| blog.html | 15 articles filterable |
| contact.html | Region contacts + lead form |
| analytics.html | Internal dashboard |
| portal.html | COMBINED login — Client tab + Admin tab |
| admin-portal.html | Redirect → portal.html |
| client-portal.html | Redirect → portal.html |
| shared.css | V9 brand system |
| BANNER_GUIDE.html | How to update banners, testimonials, contacts, deploy |
| HOSTING_GUIDE.html | Netlify deploy guide |
| INTEGRATION_GUIDE.html | Google Sheets, EmailJS setup |
| sitemap.xml | SEO sitemap |
| PROJECT_CONTEXT_V9.md | This file |

### PORTAL — portal.html
- URL: fintexglobal.com/portal.html
- Client tab: login → document submission dashboard → 4-step tracker
- Admin tab: login → dashboard, leads, clients, submissions, awaiting, credentials
- Session persists on page reload (localStorage)
- Credentials managed via Admin → Credentials tab

### ⚠️ PENDING (fill before publishing)
```
REPLACE_AU_WHATSAPP    → 61xxxxxxxxx (digits only)
REPLACE_AU_EMAIL       → arun@tensquare.com.au
REPLACE_INDIA_WHATSAPP → 91xxxxxxxxxx (digits only)
REPLACE_INDIA_EMAIL    → india@fintexglobal.com
UAE WhatsApp           → 971557282794 ✅
UAE email              → info@fintexglobal.com ✅
```

### CREDENTIALS (Demo — change before launch)
| Role | Email | Password |
|---|---|---|
| Admin (Harish) | admin@fintexglobal.com | FintexAdmin2024! |
| Admin (Arun) | arun@tensquare.com.au | Arun2024! |
| Client demo | client@example.com | Client123! |
| Client demo 2 | priya@example.com | Priya123! |

### HOW TO RESUME (V10+)
1. Upload FintexGlobalGroup_Website_v9.zip
2. Paste this entire context block
3. Tell Claude what you need
