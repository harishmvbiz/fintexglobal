# Fintex Global Group — Website & Practice Portal (v11)

**Beyond the Books. Beyond Borders.**

This folder is your complete business website plus a private practice portal for managing your team, clients, jobs and client onboarding. It is built from plain files (HTML / CSS / JavaScript), so it is fast, you fully own it, and it can be hosted **for free**.

You do **not** need to know any code to use it.

---

## 🚀 Quick start (3 steps)

1. **Unzip** this folder.
2. **Double-click `index.html`** — your website opens in your browser. Click around; everything works offline, including the portal.
3. **Publish it free:** go to <https://app.netlify.com/drop> and **drag the `.zip` file itself** onto the page. Netlify unpacks it and your site goes live in seconds. (Prefer to unzip first? Open the folder, select **all** files so you can see `index.html`, and drag those files — not the parent folder.)

> **Seeing "Page not found" / 404 on Netlify?** It means `index.html` wasn't at the top level of what you uploaded (an extra wrapper folder got dragged in). Re-deploy by dragging the **.zip file itself**. In Netlify → your site → **Deploys → latest → Browse files**, you should see `index.html` at the top. Full steps in **HOSTING_GUIDE.html → "If you see Page not found (404)"**. This package includes a `netlify.toml` (pins the site root) and a branded `404.html`.

That's it — you have a live website. The detailed walkthrough is in **`WEBSITE_GUIDE.html`** (open it in your browser).

---

## 📘 Read these guides (open each in your browser)

| Guide | What it covers |
|---|---|
| **WEBSITE_GUIDE.html** | Start here. The files, the portal, where your data lives, editing, going live, maintenance, compliance. |
| **INTEGRATION_GUIDE.html** | Connect free services: email alerts (Formspree/EmailJS), Google Sheets, real analytics, and a cloud backend. |
| **HOSTING_GUIDE.html** | Publish for free, add your own domain + SSL, costs and maintenance. |
| **MARKETING_GUIDE.html** | Low / no-cost ways to get clients — Australia first, then UAE and India. |

---

## 🔐 The practice portal (`portal.html`)

Two logins: a **Client** area and a private **Team** (admin) area.

**Demo logins** (shown on the login screen — **change these before going live**):

| Who | Email | Password |
|---|---|---|
| Full Admin | admin@fintexglobal.com | FintexAdmin2024! |
| Full Admin | arun@tensquare.com.au | Arun2024! |
| Demo client | client@example.com | Client123! |

**What the portal does**

- **Dashboard** — key numbers, 7-day visits chart, recent activity
- **Job Manager** — drag-and-drop board (Monday.com style)
- **Leads** — enquiries from your contact form, auto-captured; convert to client in one click
- **Sign-up Approvals** — clients sign up on the website; review and approve to auto-create their login (they set their own password on first sign-in). A bell + badge show what's waiting.
- **Onboarding** — ATO/TPB-aligned client intake + checklist + sharable intake link (Ignition/FYI style)
- **Content & Banners** — edit homepage banner slides and testimonials yourself, no code
- **Onboarding Form** — build the client intake form like Google/MS Forms: add, edit, reorder or remove fields, no code. Deliberately does **not** collect TFN/ABN (see compliance note below)
- **Client Database** — searchable; add / edit / hold / delete
- **Documents** — Hubdoc-style inbox of client submissions
- **Reports** — export Leads, Clients, Jobs, Onboarding, Footfall, Audit as **PDF / CSV / Excel (.xlsx)**
- **Team & Access** — add staff with roles: Viewer · Editor · Editor + Delete · Full Admin; reset passwords; disable members
- **Settings** — company profile, client sign-up & notification options, integration keys
- **Audit Log** — record of key actions for compliance

---

## 💾 Where your data lives (please read)

Out of the box the portal stores data in your **web browser** (localStorage). This is great for a demo and for one person on one computer — it's instant and free.

**Honest limitation:** browser storage is per-device. Data on your laptop won't appear on your phone or a colleague's PC, and website footfall counts visits per device, not a shared total. This is normal for a static site and fine to launch with.

**When you're ready for shared, multi-user data:** connect a free backend (Supabase or Firebase). The portal was built for this — all data goes through one helper, so it's a clean upgrade. See **INTEGRATION_GUIDE.html → Backend**, and add real analytics (Cloudflare/GA4) for true footfall.

---

## ✏️ Before you go live — fill these in

A few contact placeholders are left as TODO. Open the files in a free editor (e.g. VS Code) and use Find & Replace:

| Placeholder | Replace with |
|---|---|
| `REPLACE_AU_WHATSAPP` | Australian WhatsApp number (e.g. 61…) |
| `REPLACE_AU_EMAIL` | arun@tensquare.com.au |
| `REPLACE_INDIA_WHATSAPP` | India WhatsApp (e.g. 91…) |
| `REPLACE_INDIA_EMAIL` | India email |

UAE WhatsApp (971 55 728 2794) and info@fintexglobal.com are already set.

**Also:** change the demo passwords in the portal (Team & Access).

**Social media:** the footer of every page links to LinkedIn, Facebook, Instagram, X and YouTube using default handles. Update them to your real profiles — search the footer for `fintexglobalgroup` / `fintexglobal` and Find & Replace across all files.

**Sign-up alerts:** in the portal under **Settings → Client sign-up & notifications**, set your team email + WhatsApp number and choose the starting-password style. Connect EmailJS (see INTEGRATION_GUIDE.html) for automatic email alerts when someone signs up.

---

## 💰 What it costs

| Item | Cost |
|---|---|
| Hosting + SSL | Free |
| Analytics, form emails (free tiers) | Free |
| Domain name (optional) | ~A$15–25 / year |
| Backend later (free tier) | Free to start |

You can run a professional, secure site for **A$0**, or ~**A$20/year** with your own domain.

---

## ⚖️ Compliance note (Australia)

The onboarding flow is built around TPB (client verification, engagement letter, Code of Conduct), ATO and AML/CTF expectations, with Privacy Act 1988 principles in mind. **Important:** the client onboarding form does **not** collect a Tax File Number (TFN) or ABN — under the ATO and the Privacy (Tax File Number) Rule 2015 these must not be gathered through a web form. Tax identifiers are verified separately through secure ATO/TPB channels (ATO Online services / client–agent linking). This is software that helps you follow good practice — it is **not legal advice**. Confirm your obligations with the TPB, ATO and a qualified adviser. Keep all advertising truthful (TPB rules prohibit false/misleading claims).

---

*Fintex Global Group — Australia · UAE · India · Website v11*
