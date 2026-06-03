## 📋 FINTEX GLOBAL GROUP — PROJECT CONTEXT (V8 Handoff)

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

### BRAND — V8 (New Design)
- **Logo**: Mountain/globe SVG (navy background, steel blue peaks, cyan globe grid) — based on uploaded reference image. Inline SVG in all pages.
- **Font**: Inter (Google Fonts) — clean, professional, replaces Syne/DM Sans
- **Primary palette**:
  - Navy `#0B1829` (background)
  - Steel blue `#1E4B7A` + Sky `#2E86C1` + Cyan `#00B4D8` (logo/accent)
- **Region palettes**:
  - AU = Gold `#E8B800` / Green `#006B35`
  - India = Saffron `#E07B00`
  - UAE = Cyan `#00B4D8` / Blue `#2E86C1`

---

### V8 CHANGES FROM V7
- ✅ New logo — SVG mountain+globe design aligned with uploaded reference image (Final_-_GPT.png)
- ✅ New font — Inter throughout, replacing Syne + DM Sans
- ✅ New colour palette — steel-blue navy derived from logo
- ✅ Fully rebuilt shared.css (431 lines) — all pages use CSS variables, clamp(), gap
- ✅ All 9 public pages fully rebuilt from scratch — clean, consistent, no inline style clutter
- ✅ Australia, India, UAE hub pages — full service grids + compliance calendars
- ✅ Services page — tab-based layout with URL hash support (#au, #india, #uae)
- ✅ Blog — 15 articles with filter-by-region
- ✅ Contact — region-wise blocks + full lead capture form with localStorage save
- ✅ Team — updated cards with new design system
- ✅ About — Mission/Vision/Values + Three Entities section (no founder personal details)
- ✅ Admin portal, client portal, analytics — font and colour updated to match
- ✅ Full link audit: 0 broken internal links, 0 old logos, 0 Syne font
- ✅ WhatsApp popup unified — consistent across all pages

---

### FILE LIST (17 files)
| File | Purpose |
|---|---|
| `index.html` | Homepage |
| `services.html` | All services, tabbed |
| `australia.html` | AU Hub |
| `india.html` | India Hub |
| `uae.html` | UAE Hub |
| `about.html` | Mission · Vision · Values · Three Entities |
| `team.html` | Harish + Arun + 2 placeholders |
| `blog.html` | 15 articles, filterable |
| `contact.html` | Contact form + region contacts |
| `analytics.html` | Internal dashboard |
| `shared.css` | V8 brand system |
| `admin-portal.html` | Admin dashboard |
| `client-portal.html` | Client document portal |
| `HOSTING_GUIDE.html` | Netlify deploy guide |
| `INTEGRATION_GUIDE.html` | Google Sheets, EmailJS, etc. |
| `sitemap.xml` | SEO sitemap |
| `PROJECT_CONTEXT_V8.md` | This file |

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

### CREDENTIALS (Demo — Change Before Launch)
| Role | Email | Password |
|---|---|---|
| Admin (Harish) | `admin@fintexglobal.com` | `FintexAdmin2024!` |
| Admin (Arun) | `arun@tensquare.com.au` | `Arun2024!` |
| Demo Client | `client@example.com` | `Client123!` |
| Demo Client 2 | `priya@example.com` | `Priya123!` |

---

### PUBLISHING CHECKLIST
1. Fill in 4 `REPLACE_` placeholders in all files (Python one-liner can do this in bulk)
2. Change all demo passwords via Admin Portal → Credentials
3. Deploy to Netlify — drag & drop the extracted folder (see HOSTING_GUIDE.html)
4. Point domain `fintexglobal.com` to Netlify (see HOSTING_GUIDE.html → Custom Domain)
5. Optional: wire Formspree for contact form, Google Sheets + EmailJS for leads

---

### HOW TO RESUME (V9+)
1. Upload `FintexGlobalGroup_Website_v8.zip`
2. Paste this entire context block
3. Tell Claude what you need — it reads the ZIP and builds V9
