# PROJECT CONTEXT — Fintex Global Group Website v11

Technical handoff notes for any developer who works on this site next. End users should read `README.md` and the in-browser guides instead.

## What changed in v11 (from v9/v10)

1. **New logo** swapped site-wide (nav + footer + favicons): a floating meridian globe above a faceted two-peak "M", with FINTEX / GLOBAL wordmark. Implemented as inline SVG so it is crisp at any size and needs no image files.
2. **Liquid-glass design system** applied globally via `shared.css` — glass tokens (`--glass-bg`, `--glass-stroke`, `--glass-blur`, etc.), an animated aurora `body::before`, and glassified cards, navbar, dropdowns, buttons, footer and badges, with a `@supports` fallback for browsers without `backdrop-filter`. Because every page links `shared.css`, the look is consistent everywhere.
3. **Practice portal rebuilt** (`portal.html` + external `portal.js`) with RBAC, job manager, leads, ATO/TPB onboarding, client database, documents inbox, reports (PDF/CSV/XLSX), team & access management, settings and an audit log. Client portal includes an intake form and document submission.
4. **Docs rewritten**: `WEBSITE_GUIDE.html` (new), `INTEGRATION_GUIDE.html`, `HOSTING_GUIDE.html`, `MARKETING_GUIDE.html` (new), `README.md`. `BANNER_GUIDE.html` was folded into the Marketing guide and removed.

## What changed in v11.1 (this update)

1. **Client self sign-up** — `portal.html` client login has an "Create your client account" link → `openSignup()` opens a modal replicating the contact form (name/email/phone/region/service/message + consent). `submitSignup()` writes a `fintex_signups` record (`status:'pending'`), mirrors a lead into `fintex_analytics.leads` with `source:'signup'` (so it feeds the Leads/advertising report), pushes a notification, and calls `notifyAdminOfSignup()` (auto email via EmailJS if configured; one-tap WhatsApp deep-link to the team number on the success screen).
2. **Sign-up Approvals** — new admin section (`#sec-approvals`, nav `data-sec="approvals"`, badge `bdgApprovals`). `renderApprovals()` lists pending sign-ups; `approveSignup(id)` creates a client (`mustReset:true`, password = settings default or `genPassword()`), opens onboarding (`Invited`), marks the signup approved, and shows the one-time password. `rejectSignup(id)` marks rejected. Gated to `edit`.
3. **Forced first-login password reset** — clients created via approval carry `mustReset:true`. `doClientLogin()` and the session-resume IIFE route them to `forcePwReset(c)` → `doForcePwReset(id)` (min 8 chars, must match) which clears the flag and shows the client portal.
4. **Notifications** — `fintex_notifications` store + bell button (`#bellBtn`/`#bellDot`) in the portal top bar (admin only, shown via `applyPerms()`). `pushNotif(type,text,key)` (dedupes by key), `syncSignupNotifs()` (creates notifications for contact-form leads on load), `openNotifs()` / `markNotifsRead()` / `clearNotifs()`. Badge counts in `updateBadges()`.
5. **Website content management** — `fintex_content` store `{testimonials:[],banners:[]}`, seeded with the existing homepage defaults. New admin section (`#sec-content`, nav `navContent`, gated to `edit`). `renderContent()` + CRUD: `openTestiModal/saveTesti/delTesti` and `openBannerModal/saveBanner/delBanner` (delete gated to `delete`). `index.html` now reads `fintex_content` on `DOMContentLoaded` and re-renders the banner slider (dynamic slide count + rebuilt dots) and testimonials grid when present, falling back to the static HTML defaults otherwise.
6. **Settings additions** — `settings.signup{defaultPassword,mode}` and `settings.notify{adminEmail,adminWhatsApp}`; new "Client sign-up & notifications" panel in `renderSettings()`; persisted in `saveSettings()`.
7. **UI fixes** — nav dropdowns are now solid dark (`#0C1B30`, no backdrop blur) for readability (was translucent glass); services region tabs (`services.html`) restyled as centered, larger pill buttons with flags in `.tflag` spans and the `.sec-head` spacing/overlap fixed (`shared.css`); footer **social-media row** (`.footer-social`/`.soc-link`) added to all marketing pages with LinkedIn/Facebook/Instagram/X/YouTube SVGs (placeholder handles).

## Architecture

- 100% static. No build step. Open `index.html` to run.
- Shared styling: `shared.css` (linked by every page).
- Portal logic: `portal.js` (loaded by `portal.html`). Kept external so it can be syntax-checked independently (`node --check portal.js`).
- `admin-portal.html` and `client-portal.html` are meta-refresh redirects to `portal.html` (kept for old bookmarks).

## Data model (localStorage)

All portal keys are namespaced `fintex_` via the `DB` helper in `portal.js`:

- `fintex_team` — staff `{id,name,email,password,role,status}`; roles: `viewer|editor|editor_delete|full_admin`.
- `fintex_clients` — `{id,name,email,password,region,service,status,entity,phone,created}`.
- `fintex_jobs` — `{id,title,client,service,assignee,due,priority,stage,created}`; stages `todo|progress|review|done`.
- `fintex_onboarding` — `{id,client,email,region,service,status,checklist{},created}`; statuses follow `ONB_STEPS`.
- `fintex_submissions` — client intake forms & document submissions (Documents inbox).
- `fintex_audit` — `{time,user,action}` (capped at 500).
- `fintex_settings` — company profile + integration config (sheetsUrl, emailjs, analytics) + `signup{defaultPassword,mode}` + `notify{adminEmail,adminWhatsApp}`.
- `fintex_signups` — website sign-up requests `{id,name,email,phone,region,service,message,status,created,ts}`; status `pending|approved|rejected`.
- `fintex_notifications` — `{id,key,type,text,time,read}` (capped 200); `type` `signup|lead|info`; deduped by `key`.
- `fintex_content` — `{testimonials:[{id,region,stars,text,name,role,initials}], banners:[{id,region,eyebrow,title,sub,b1,l1,b2,l2}]}`; read by `index.html` to render banners + testimonials.
- `fintex_session` — current login, used for session resume on load.
- `fintex_analytics` — **shared with the public site.** Marketing pages append `visits:[{page,date,time}]` and increment `pageviews{}`. `contact.html` pushes `leads:[{name,email,region,service,message,timestamp,source}]`. The portal reads leads + footfall from here.

## RBAC

`can(perm)` checks `view|edit|delete|admin` against the session's `teamRole` via `roleRank()`. `applyPerms()` disables/hides `[data-perm]` elements and the Team/Settings/Audit nav for non-admins. Every mutating action also calls `guard(perm)` server-of-truth-style before writing. At least one active Full Admin is always enforced.

## Exports

`exportData(type, fmt)` builds rows via `reportRows(type)` then:
- **CSV** — native Blob (always works offline; UTF-8 BOM for Excel).
- **XLSX** — SheetJS (`XLSX`, CDN).
- **PDF** — jsPDF + autotable (CDN).

CDN libs are loaded with `defer` in `portal.html`; export functions degrade gracefully with a toast if a lib hasn't loaded (e.g. offline).

## Validation performed

- `node --check portal.js` passes.
- Every `onclick`/handler in `portal.html` maps to a defined function in `portal.js` (static + dynamically-generated handlers checked).
- Every `getElementById` target exists in the static HTML or is injected by the portal before use.
- All internal `*.html` links across all pages resolve to existing files.
- Footfall trackers present on all marketing pages, writing the `visits` shape the portal reads.

## Known limitations / next steps

- **Storage is per-browser/per-device.** For multi-user shared data, repoint the `DB` helper to Supabase or Firebase (see INTEGRATION_GUIDE). Screens won't need to change.
- **Footfall is per-device** until a real analytics tool (Cloudflare/GA4) is added.
- **Document uploads** record file *names* only (no server). Real upload arrives with the backend.
- **Passwords are stored in plain text in localStorage** — acceptable for a local demo only. The backend migration must move auth to a real provider (Supabase Auth / Firebase Auth) before holding real client data. This is also the right time to harden Privacy Act 1988 handling.

## Outstanding content TODOs

Replace before launch: `REPLACE_AU_WHATSAPP`, `REPLACE_AU_EMAIL`, `REPLACE_INDIA_WHATSAPP`, `REPLACE_INDIA_EMAIL`. UAE WhatsApp `971557282794` and `info@fintexglobal.com` are set. Change all demo passwords.

## Brand

Palette: navy `#0B1829`, steel `#1E4B7A`, sky `#2E86C1`, cyan `#00B4D8`, cyan-lt `#48CAE4`, AU-gold `#E8B800`, India-saffron `#E07B00`. Font: Inter. Slogan: *Beyond the Books. Beyond Borders.*

---

## v11.2 changelog (cross-platform flags, alignment, ATO-compliant form builder)

**Flags & symbols (cross-platform fix)**
- Root cause of the "AU / IN / AE / OUT / SEC" labels: flag **emoji do not render on Windows** (they fall back to country-code letters). Replaced **every** flag emoji site-wide with inline **SVG flags** (Australia, India, UAE, UK) and SVG symbols (globe for Outsourcing/Global, shield for Data Security). These render identically on PC, Mac, Android, iOS. New `.flag` / `.flag-ico` styles in `shared.css`. Region flags in `portal.js` use `FLAG_AU/IN/AE/GLOBE` SVG constants; `<option>` dropdowns use text labels only (SVG cannot render inside `<option>`). Seeded banner eyebrow text no longer contains flag emoji.

**Boxes / alignment**
- Removed `.region-card`, `.region-card-inner` and `.tab-panel` from the universal glass-surface rule — this was double-boxing the homepage region cards and wrapping the services panel in a misaligned border. Region cards now show a single clean coloured border; services panels have no outer box. Removed `.blog-card-tag` from the boxed-badge rule (no box around the blog category indicators).

**Footer / qualifications**
- Cleaned verbose qualifications to the agreed short forms: `CA (India)`, `CPA Australia`, `ACCA (UK)`, `FTA Registered (UAE)`. Removed "ICAI Member / ACCA UK Qualified / CPA Australia Registered" long forms from visible badges and the homepage trust strip.

**Onboarding form — ATO/TPB compliance + form builder**
- The client intake form **no longer collects TFN or ABN** (prohibited via web form under ATO / Privacy (TFN) Rule 2015). It now shows a security notice + consent reflecting that tax IDs are verified through secure ATO channels (client–agent linking). The ATO checklist item was reworded accordingly.
- New **Onboarding Form Builder** (admin portal, like Google/MS Forms): `Portal → Onboarding Form`. Add/edit/reorder/delete fields; types: short/long text, email, phone, number, date, dropdown, checkbox/consent, info note; mark required; dropdown options; restore default. Stored in `fintex_intakeForm`; client portal renders the form dynamically (`renderIntakeForm`), `submitIntake` reads dynamic `dyn-<id>` fields and validates required. Default form = 22 detailed fields, no TFN/ABN. New `portal.js` PART 4; `navForm` + `#sec-formbuilder` in `portal.html`; gated by `edit`/`delete` permissions.

**Docs updated:** WEBSITE_GUIDE (form builder step + sections list), INTEGRATION_GUIDE (§8 secure identity / TFN handling), README (features + compliance note), this file.

**Validation:** `node --check portal.js` OK; all 19 portal handlers defined; new IDs present; 0 broken local links (398); all HTML div-balanced; 0 flag emoji remaining; runtime smoke test passed (SVG flags, 22-field form with no TFN/ABN input, form-builder add/move/delete/restore, dynamic submitIntake).
