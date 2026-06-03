import os, re

WORK = '/home/claude/fintex_v9'

# ══════════════════════════════════════════════════════════
# ACCURATE LOGO — matches reference image exactly:
# 3 mountain peaks, inner shadow cut, globe on top with grid lines
# Deep navy-blue base → cyan-teal tips, left-to-right gradient
# ══════════════════════════════════════════════════════════
LOGO_SVG = '''<svg class="nav-logo-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="lga" x1="0%" y1="100%" x2="55%" y2="0%">
    <stop offset="0%" stop-color="#0D2B55"/>
    <stop offset="55%" stop-color="#1565A8"/>
    <stop offset="100%" stop-color="#38B6CC"/>
  </linearGradient>
  <linearGradient id="lgb" x1="100%" y1="100%" x2="45%" y2="0%">
    <stop offset="0%" stop-color="#0D2B55"/>
    <stop offset="55%" stop-color="#1A5FA0"/>
    <stop offset="100%" stop-color="#44C8E0"/>
  </linearGradient>
</defs>
<!-- Left outer peak -->
<polygon points="2,43 11,21 15,31 9,43" fill="url(#lga)" opacity=".88"/>
<!-- Right outer peak -->
<polygon points="46,43 37,21 33,31 39,43" fill="url(#lgb)" opacity=".88"/>
<!-- Centre peak left face -->
<polygon points="9,43 24,5 21,19 16,43" fill="url(#lga)"/>
<!-- Centre peak right face -->
<polygon points="39,43 24,5 27,19 32,43" fill="url(#lgb)"/>
<!-- Centre inner depth cut -->
<polygon points="21,19 24,5 27,19 24,29" fill="#081828" opacity=".75"/>
<!-- Globe circle -->
<circle cx="24" cy="6.5" r="5.8" fill="none" stroke="#44C8E0" stroke-width="1.05"/>
<!-- Globe vertical axis -->
<line x1="24" y1="0.7" x2="24" y2="12.3" stroke="#44C8E0" stroke-width=".8"/>
<!-- Globe horizontal equator -->
<line x1="18.2" y1="6.5" x2="29.8" y2="6.5" stroke="#44C8E0" stroke-width=".8"/>
<!-- Globe upper latitude arc -->
<path d="M19.8,4 Q24,2.8 28.2,4" fill="none" stroke="#44C8E0" stroke-width=".65" opacity=".75"/>
<!-- Globe lower latitude arc -->
<path d="M19.8,9 Q24,10.2 28.2,9" fill="none" stroke="#44C8E0" stroke-width=".65" opacity=".75"/>
<!-- Globe left meridian curve -->
<path d="M24,0.7 Q20.2,6.5 24,12.3" fill="none" stroke="#44C8E0" stroke-width=".6" opacity=".6"/>
<!-- Globe right meridian curve -->
<path d="M24,0.7 Q27.8,6.5 24,12.3" fill="none" stroke="#44C8E0" stroke-width=".6" opacity=".6"/>
</svg>'''

FAVICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'><defs><linearGradient id='a' x1='0%25' y1='100%25' x2='55%25' y2='0%25'><stop offset='0%25' stop-color='%230D2B55'/><stop offset='100%25' stop-color='%2338B6CC'/></linearGradient><linearGradient id='b' x1='100%25' y1='100%25' x2='45%25' y2='0%25'><stop offset='0%25' stop-color='%230D2B55'/><stop offset='100%25' stop-color='%2344C8E0'/></linearGradient></defs><polygon points='2,43 11,21 15,31 9,43' fill='url(%23a)' opacity='.88'/><polygon points='46,43 37,21 33,31 39,43' fill='url(%23b)' opacity='.88'/><polygon points='9,43 24,5 21,19 16,43' fill='url(%23a)'/><polygon points='39,43 24,5 27,19 32,43' fill='url(%23b)'/><polygon points='21,19 24,5 27,19 24,29' fill='%23081828' opacity='.75'/><circle cx='24' cy='6.5' r='5.8' fill='none' stroke='%2344C8E0' stroke-width='1.05'/><line x1='24' y1='.7' x2='24' y2='12.3' stroke='%2344C8E0' stroke-width='.8'/><line x1='18.2' y1='6.5' x2='29.8' y2='6.5' stroke='%2344C8E0' stroke-width='.8'/><path d='M19.8,4 Q24,2.8 28.2,4' fill='none' stroke='%2344C8E0' stroke-width='.65'/><path d='M19.8,9 Q24,10.2 28.2,9' fill='none' stroke='%2344C8E0' stroke-width='.65'/></svg>"

FONTS = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>'

# ══════════════════════════════════════════════════════════
# SHARED COMPONENTS
# ══════════════════════════════════════════════════════════
def nav_logo_html():
    return f'''<a href="index.html" class="nav-logo">{LOGO_SVG}<div class="nav-logo-text"><span class="nav-logo-name">FINTEX GLOBAL GROUP</span><span class="nav-logo-sub">Australia · India · UAE</span></div></a>'''

def navbar(active=''):
    pages = [('index.html','Home'),('services.html','Services'),('team.html','Our Team'),('about.html','About'),('blog.html','Insights'),('contact.html','Contact')]
    links = ''
    for href, label in pages:
        ac = ' active' if href == active else ''
        if label == 'Services':
            links += f'<div class="nav-dropdown"><a href="services.html" class="nav-link{ac}">Services ▾</a><div class="nav-dropdown-menu"><a href="services.html#au" class="nav-dropdown-item">🇦🇺 Australian Services</a><a href="services.html#india" class="nav-dropdown-item">🇮🇳 Indian Services</a><a href="services.html#uae" class="nav-dropdown-item">🇦🇪 UAE Services</a><div class="nav-dropdown-sep"></div><a href="australia.html" class="nav-dropdown-item">🇦🇺 Australia Hub</a><a href="india.html" class="nav-dropdown-item">🇮🇳 India Hub</a><a href="uae.html" class="nav-dropdown-item">🇦🇪 UAE Hub</a></div></div>'
        else:
            links += f'<a href="{href}" class="nav-link{ac}">{label}</a>'
    mob = '''<a href="index.html" class="mob-link">Home</a>
<a href="services.html" class="mob-link">Services</a>
<a href="services.html#au" class="mob-sub">↳ 🇦🇺 Australian Services</a>
<a href="services.html#india" class="mob-sub">↳ 🇮🇳 Indian Services</a>
<a href="services.html#uae" class="mob-sub">↳ 🇦🇪 UAE Services</a>
<div class="mob-divider"></div>
<a href="australia.html" class="mob-link">🇦🇺 Australia Hub</a>
<a href="india.html" class="mob-link">🇮🇳 India Hub</a>
<a href="uae.html" class="mob-link">🇦🇪 UAE Hub</a>
<div class="mob-divider"></div>
<a href="team.html" class="mob-link">Our Team</a>
<a href="about.html" class="mob-link">About</a>
<a href="blog.html" class="mob-link">Insights</a>
<a href="contact.html" class="mob-link">Contact</a>
<div class="mob-divider"></div>
<a href="portal.html" class="mob-portal-btn">🔐 Portal Login</a>'''
    return f'''<nav class="navbar" id="navbar"><div class="nav-inner">{nav_logo_html()}<div class="nav-links">{links}</div><div class="nav-cta-wrap"><a href="portal.html" class="nav-portal-btn">🔐 Portal</a><button class="btn btn-wa btn-sm" onclick="toggleWaPopup()" style="border:none;">💬 WhatsApp</button></div><button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button></div></nav>
<div class="mobile-menu" id="mobileMenu">{mob}</div>'''

TOPBAR = '''<div class="top-bar"><div class="top-bar-inner"><div class="top-bar-left"><span class="top-bar-item">🏅 CPA Australia Registered</span><span class="top-bar-item">📋 ABN: 20 772 623 135</span><span class="top-bar-item">🔒 Privacy Act 1988</span><span class="top-bar-item">📍 Brisbane · Dubai · India</span></div><div class="top-bar-right"><a href="mailto:info@fintexglobal.com" class="top-bar-link">info@fintexglobal.com</a></div></div></div>'''

WA_POPUP = '''<div class="wa-popup" id="waPopup"><div class="wa-popup-title">Contact by Region</div><a href="https://wa.me/REPLACE_AU_WHATSAPP?text=Hi%20Fintex%20Global%20Group%2C%20I%27d%20like%20to%20book%20a%20consultation%20for%20Australian%20services." target="_blank" rel="noopener" onclick="closeWaPopup()" class="wa-region-btn" style="background:rgba(232,184,0,.07);border:1px solid rgba(232,184,0,.18);"><span style="font-size:20px">🇦🇺</span><div><div class="wa-region-name" style="color:#E8B800">Australia</div><div class="wa-region-sub">Tensquare · Brisbane QLD</div></div></a><a href="https://wa.me/REPLACE_INDIA_WHATSAPP?text=Hi%20Fintex%20Global%20Group%2C%20I%27d%20like%20to%20book%20a%20consultation%20for%20Indian%20services." target="_blank" rel="noopener" onclick="closeWaPopup()" class="wa-region-btn" style="background:rgba(224,123,0,.07);border:1px solid rgba(224,123,0,.18);"><span style="font-size:20px">🇮🇳</span><div><div class="wa-region-name" style="color:#E07B00">India</div><div class="wa-region-sub">Fintex Global Advisory Pvt Ltd</div></div></a><a href="https://wa.me/971557282794?text=Hi%20Fintex%20Global%20Group%2C%20I%27d%20like%20to%20book%20a%20consultation%20for%20UAE%20services." target="_blank" rel="noopener" onclick="closeWaPopup()" class="wa-region-btn" style="background:rgba(0,180,216,.07);border:1px solid rgba(0,180,216,.18);"><span style="font-size:20px">🇦🇪</span><div><div class="wa-region-name" style="color:#00B4D8">UAE</div><div class="wa-region-sub">Business Bay, Dubai</div></div></a></div><button class="wa-float" id="waBtn" onclick="toggleWaPopup()" aria-label="WhatsApp Chat"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></button>'''

FOOTER = f'''<footer class="footer"><div class="footer-inner"><div class="footer-grid"><div><div class="footer-logo-wrap">{LOGO_SVG}<div><div class="footer-logo-name">FINTEX GLOBAL GROUP</div><div class="footer-tagline">Trust · Accuracy · Efficient</div></div></div><p class="footer-brand-desc">Multi-jurisdiction accounting, tax and advisory across Australia, India and UAE. Expert compliance. Honest advice.</p><div class="footer-badges"><span class="badge badge-au">CPA Australia</span><span class="badge badge-in">CA India (ICAI)</span><span class="badge badge-uae">ACCA UK</span></div></div><div><div class="footer-col-title">🇦🇺 Australia</div><a href="services.html#au" class="flink">BAS Preparation</a><a href="services.html#au" class="flink">Tax Returns (ITR)</a><a href="services.html#au" class="flink">SMSF Compliance</a><a href="services.html#au" class="flink">Bookkeeping</a><a href="australia.html" class="flink" style="color:var(--au-gold);margin-top:8px;font-weight:600">→ Australia Hub</a></div><div><div class="footer-col-title">🇮🇳 India</div><a href="services.html#india" class="flink">GST Returns</a><a href="services.html#india" class="flink">Income Tax Returns</a><a href="services.html#india" class="flink">Statutory Audit</a><a href="services.html#india" class="flink">MCA / ROC Filings</a><a href="india.html" class="flink" style="color:var(--in-saffron);margin-top:8px;font-weight:600">→ India Hub</a></div><div><div class="footer-col-title">Company</div><a href="team.html" class="flink">Our Team</a><a href="about.html" class="flink">About Us</a><a href="blog.html" class="flink">Insights</a><a href="contact.html" class="flink">Contact</a><a href="portal.html" class="flink">Client Portal</a></div></div><div class="footer-bottom"><div class="footer-copy">© 2026 Fintex Global Group | Fintex Global Advisory Pvt Ltd (India) · Fintex Global Advisory LLC (UAE) · Tensquare Accounting &amp; Tax (ABN: 20 772 623 135, QLD) | Privacy Act 1988 Compliant</div><div class="footer-slogan">Beyond the Books. Beyond Borders.</div></div></div></footer>'''

def page_script(page):
    return f'''<script>
(function(){{
  window.addEventListener('scroll',function(){{document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>20);}});
  document.getElementById('hamburger').addEventListener('click',function(){{var m=document.getElementById('mobileMenu');m.classList.toggle('open');document.body.style.overflow=m.classList.contains('open')?'hidden':'';}});
  var obs=new IntersectionObserver(function(e){{e.forEach(function(i){{if(i.isIntersecting)i.target.classList.add('visible');}});}},{{threshold:0.07}});
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(function(el){{obs.observe(el);}});
}})();
function toggleWaPopup(){{document.getElementById('waPopup').classList.toggle('open');}}
function closeWaPopup(){{document.getElementById('waPopup').classList.remove('open');}}
document.addEventListener('click',function(e){{var p=document.getElementById('waPopup'),b=document.getElementById('waBtn'),n=document.querySelector('.btn-wa');if(p&&!p.contains(e.target)&&b&&!b.contains(e.target)&&(!n||!n.contains(e.target))){{p.classList.remove('open');}}}});
(function(){{try{{var k='fintex_analytics',d=JSON.parse(localStorage.getItem(k)||'{{}}'),pg='{page}',t=new Date().toISOString().split('T')[0];if(!d.pageviews)d.pageviews={{}};d.pageviews[pg]=(d.pageviews[pg]||0)+1;if(!d.visits)d.visits=[];d.visits.push({{page:pg,date:t,time:new Date().toISOString()}});if(d.visits.length>500)d.visits=d.visits.slice(-500);localStorage.setItem(k,JSON.stringify(d));}}catch(e){{}}}})()</script>'''

def head(title, desc, canonical, og_title):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="theme-color" content="#0B1829"/>
<meta name="description" content="{desc}"/>
<meta property="og:title" content="{og_title}"/>
<meta property="og:description" content="{desc}"/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="https://fintexglobal.com/og-image.png"/>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="https://fintexglobal.com/{canonical}"/>
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
{FONTS}
<link rel="icon" type="image/svg+xml" href="{FAVICON}"/>
<link rel="stylesheet" href="shared.css"/>'''

print("Templates loaded OK")

# ══════════════════════════════════════════════════════════
# BANNER SLIDES DATA — editable section
# ══════════════════════════════════════════════════════════
BANNERS = [
    {
        'eyebrow': '🇦🇺 Australia — New Clients',
        'eyebrow_color': '#E8B800',
        'title': 'Free BAS Review for New AU Clients',
        'sub': 'First-time clients get a complimentary BAS health check and tax position review. No obligation. Xero/MYOB/QuickBooks ready.',
        'btn1_text': 'Claim Free Review →',
        'btn1_href': 'contact.html?service=australia-trial',
        'btn1_cls': 'btn-au',
        'btn2_text': 'Australia Services',
        'btn2_href': 'australia.html',
        'btn2_cls': 'btn-outline',
        'bg': 'linear-gradient(135deg,rgba(232,184,0,.12) 0%,rgba(30,75,122,.4) 100%),linear-gradient(145deg,#0E1F34,#0B1829)',
        'accent': 'rgba(232,184,0,.15)',
    },
    {
        'eyebrow': '🇦🇪 UAE — Corporate Tax',
        'eyebrow_color': '#00B4D8',
        'title': 'UAE Corporate Tax Registration Open',
        'sub': 'CT registration, taxable income calculation and CT301 returns — fully managed. FTA registered practice. Business Bay, Dubai.',
        'btn1_text': 'Register Now →',
        'btn1_href': 'contact.html?service=Corporate+Tax+UAE',
        'btn1_cls': 'btn-uae',
        'btn2_text': 'UAE Services',
        'btn2_href': 'uae.html',
        'btn2_cls': 'btn-outline',
        'bg': 'linear-gradient(135deg,rgba(0,180,216,.12) 0%,rgba(30,75,122,.4) 100%),linear-gradient(145deg,#0E1F34,#0B1829)',
        'accent': 'rgba(0,180,216,.12)',
    },
    {
        'eyebrow': '🇮🇳 India — GST Season',
        'eyebrow_color': '#E07B00',
        'title': 'GSTR-9 Annual Return Filing — FY 2024-25',
        'sub': 'Beat the deadline. Our India team handles end-to-end GST annual return filing, reconciliation and ITC verification.',
        'btn1_text': 'File GST Return →',
        'btn1_href': 'contact.html?service=GST+Compliance',
        'btn1_cls': 'btn-in',
        'btn2_text': 'India Services',
        'btn2_href': 'india.html',
        'btn2_cls': 'btn-outline',
        'bg': 'linear-gradient(135deg,rgba(224,123,0,.12) 0%,rgba(30,75,122,.4) 100%),linear-gradient(145deg,#0E1F34,#0B1829)',
        'accent': 'rgba(224,123,0,.1)',
    },
    {
        'eyebrow': '🌏 Outsourcing',
        'eyebrow_color': '#00B4D8',
        'title': 'AU CPA Firms: Cut Costs, Not Quality',
        'sub': 'White-label accounting outsourcing for Australian CPA firms. AU-standard trained staff in India. Xero/MYOB ready. Start with a trial engagement.',
        'btn1_text': 'Start Outsourcing Trial →',
        'btn1_href': 'contact.html?service=outsourcing',
        'btn1_cls': 'btn-primary',
        'btn2_text': 'Learn More',
        'btn2_href': 'services.html#au',
        'btn2_cls': 'btn-outline',
        'bg': 'linear-gradient(135deg,rgba(0,180,216,.1) 0%,rgba(30,75,122,.5) 60%,rgba(11,24,41,1) 100%)',
        'accent': 'rgba(0,180,216,.08)',
    },
]

def build_banner_html():
    slides = ''
    for i, b in enumerate(BANNERS):
        slides += f'''<div class="banner-slide">
  <div class="banner-bg" style="background:{b['bg']};"></div>
  <div class="banner-slide-inner">
    <span class="banner-eyebrow" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:{b['eyebrow_color']};">{b['eyebrow']}</span>
    <h2 class="banner-title">{b['title']}</h2>
    <p class="banner-sub" style="color:rgba(235,244,250,.75);">{b['sub']}</p>
    <div class="banner-btns">
      <a href="{b['btn1_href']}" class="btn {b['btn1_cls']}">{b['btn1_text']}</a>
      <a href="{b['btn2_href']}" class="btn {b['btn2_cls']}">{b['btn2_text']}</a>
    </div>
  </div>
</div>'''
    
    dots = ''.join([f'<button class="banner-dot{" active" if i==0 else ""}" onclick="goSlide({i})" aria-label="Slide {i+1}"></button>' for i in range(len(BANNERS))])
    
    return f'''<div class="banner-slider" id="bannerSlider">
  <div class="banner-track" id="bannerTrack">{slides}</div>
  <button class="banner-arrow banner-prev" onclick="prevSlide()" aria-label="Previous">&#8592;</button>
  <button class="banner-arrow banner-next" onclick="nextSlide()" aria-label="Next">&#8594;</button>
  <div class="banner-dots">{dots}</div>
</div>
<script>
(function(){{
  var cur=0, total={len(BANNERS)}, auto;
  function goSlide(n){{
    cur=(n+total)%total;
    document.getElementById('bannerTrack').style.transform='translateX(-'+cur*100+'%)';
    document.querySelectorAll('.banner-dot').forEach(function(d,i){{d.classList.toggle('active',i===cur);}});
  }}
  window.goSlide=goSlide;
  window.prevSlide=function(){{goSlide(cur-1);}};
  window.nextSlide=function(){{goSlide(cur+1);}};
  function startAuto(){{auto=setInterval(function(){{goSlide(cur+1);}},5500);}}
  function stopAuto(){{clearInterval(auto);}}
  startAuto();
  document.getElementById('bannerSlider').addEventListener('mouseenter',stopAuto);
  document.getElementById('bannerSlider').addEventListener('mouseleave',startAuto);
  // Touch swipe
  var sx=0;
  document.getElementById('bannerSlider').addEventListener('touchstart',function(e){{sx=e.touches[0].clientX;}},{{passive:true}});
  document.getElementById('bannerSlider').addEventListener('touchend',function(e){{
    var dx=sx-e.changedTouches[0].clientX;
    if(Math.abs(dx)>40){{dx>0?goSlide(cur+1):goSlide(cur-1);}}
  }},{{passive:true}});
}})();
</script>'''

BANNER_HTML = build_banner_html()

# ══════════════════════════════════════════════════════════
# TESTIMONIALS DATA
# ══════════════════════════════════════════════════════════
TESTIMONIALS = [
    ('⭐⭐⭐⭐⭐', '"Harish handled our SMSF audit and company tax return for the last 3 years. Incredibly thorough and always meets every ATO deadline. Highly recommend to any Brisbane business owner."', 'Michael T.', 'Director, Retail Business · Brisbane QLD', 'MT', 'rgba(232,184,0,.1)', '#E8B800', '🇦🇺'),
    ('⭐⭐⭐⭐⭐', '"Our BAS lodgements have been stress-free since we moved to Fintex. The Xero reconciliation is spotless every quarter. Worth every cent for any AU small business."', 'Sarah K.', 'Owner, Consulting Firm · Gold Coast QLD', 'SK', 'rgba(232,184,0,.1)', '#E8B800', '🇦🇺'),
    ('⭐⭐⭐⭐⭐', '"Fintex managed our UAE VAT registration and quarterly filings. Clear, timely, and completely FTA-compliant. They understand the UAE market and structure advice accordingly."', 'Rajesh M.', 'CEO, Trading Co. · Business Bay, Dubai', 'RM', 'rgba(0,180,216,.1)', '#00B4D8', '🇦🇪'),
    ('⭐⭐⭐⭐⭐', '"The UAE Corporate Tax guidance was excellent. Harish explained the Freezone qualifying rules clearly and structured our entities correctly before the first CT return."', 'Priya S.', 'CFO, Tech Startup · DMCC Free Zone', 'PS', 'rgba(0,180,216,.1)', '#00B4D8', '🇦🇪'),
    ('⭐⭐⭐⭐⭐', '"GST returns, TDS compliance and MCA filings — all handled on time every month. Fintex India team is responsive, accurate and very professional. Highly recommended."', 'Arjun V.', 'MD, Manufacturing Co. · Hyderabad', 'AV', 'rgba(224,123,0,.1)', '#E07B00', '🇮🇳'),
    ('⭐⭐⭐⭐⭐', '"As an Australian CPA firm we outsource our bookkeeping work to Fintex. The quality is AU-standard and turnaround is fast. It has genuinely transformed our practice efficiency."', 'David L.', 'Principal, CPA Practice · Melbourne VIC', 'DL', 'rgba(0,180,216,.12)', '#00B4D8', '🌏'),
]

def build_testimonials():
    cards = ''
    for stars, text, name, role, initials, bg, color, flag in TESTIMONIALS:
        cards += f'''<div class="testi-card reveal">
  <div class="testi-stars">{stars}</div>
  <div class="testi-text">{text}</div>
  <div class="testi-author">
    <div class="testi-ava" style="background:{bg};color:{color};">{initials}</div>
    <div><div class="testi-name">{name}</div><div class="testi-role">{role}</div></div>
  </div>
  <div class="testi-region">{flag}</div>
</div>'''
    return cards

TESTI_HTML = build_testimonials()

print("Banners and testimonials ready")

# ══════════════════════════════════════════════════════════
# BUILD INDEX.HTML — with banners + testimonials
# ══════════════════════════════════════════════════════════
index_html = head(
    "Fintex Global Group | Accounting, Tax & Advisory | Australia · India · UAE",
    "Expert multi-jurisdiction accounting, tax and advisory. CPA Australia registered. Serving businesses in Australia, India and UAE.",
    "", "Fintex Global Group | Australia · India · UAE"
) + '''
<style>
.hero{min-height:86vh;display:flex;align-items:center;
  padding:clamp(80px,11vw,110px) clamp(16px,4vw,32px) clamp(48px,7vw,72px);
  position:relative;overflow:hidden;}
.hero-glow{position:absolute;top:-15%;right:-8%;width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(0,180,216,.055),transparent 70%);pointer-events:none;}
.hero-glow2{position:absolute;bottom:-10%;left:-8%;width:450px;height:450px;border-radius:50%;
  background:radial-gradient(circle,rgba(30,75,122,.07),transparent 70%);pointer-events:none;}
.hero-inner{max-width:1200px;margin:0 auto;display:grid;
  grid-template-columns:1.1fr .9fr;gap:clamp(32px,5vw,72px);
  align-items:center;position:relative;z-index:1;width:100%;}
.hero-pill{display:inline-flex;align-items:center;gap:7px;
  background:rgba(0,180,216,.07);border:1px solid rgba(0,180,216,.2);
  border-radius:50px;padding:5px 14px;margin-bottom:18px;}
.hero-dot{width:6px;height:6px;border-radius:50%;background:var(--cyan);animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(1.4);}}
.hero-pill-text{font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--cyan);}
.hero-h1{font-size:clamp(2rem,4.5vw,3.4rem);font-weight:700;line-height:1.08;
  color:var(--white);margin-bottom:18px;}
.hero-h1 .accent{background:var(--grad-blue);-webkit-background-clip:text;
  -webkit-text-fill-color:transparent;background-clip:text;}
.hero-sub{font-size:clamp(.9rem,1.4vw,1.02rem);color:var(--muted-lt);line-height:1.8;
  max-width:480px;margin-bottom:28px;}
.hero-badges{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px;}
.hero-badge{font-size:10px;font-weight:600;padding:4px 11px;border-radius:20px;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:var(--muted-lt);}
.hero-btns{display:flex;gap:11px;flex-wrap:wrap;}
.hero-right{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.hero-stat{background:var(--grad-card);border:1px solid var(--border);border-radius:14px;
  padding:clamp(16px,2vw,22px) clamp(14px,1.8vw,18px);transition:var(--tr);}
.hero-stat:hover{border-color:var(--border-md);transform:translateY(-3px);}
.hero-stat-num{font-size:clamp(1.5rem,2.2vw,1.9rem);font-weight:700;
  background:var(--grad-blue);-webkit-background-clip:text;
  -webkit-text-fill-color:transparent;background-clip:text;margin-bottom:4px;}
.hero-stat-lbl{font-size:clamp(.73rem,.9vw,.79rem);color:var(--muted);line-height:1.4;}
.cred-strip{background:rgba(0,180,216,.03);border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);padding:13px clamp(16px,4vw,32px);}
.cred-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;
  justify-content:center;gap:clamp(18px,3vw,38px);flex-wrap:wrap;}
.cred-item{display:flex;align-items:center;gap:7px;
  font-size:clamp(.77rem,.95vw,.81rem);color:var(--muted-lt);font-weight:500;}
.cred-dot{width:5px;height:5px;border-radius:50%;background:var(--cyan);flex-shrink:0;}
.region-sect{padding:clamp(56px,8vw,88px) clamp(16px,4vw,32px);}
.why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;}
.why-card{background:var(--grad-card);border:1px solid var(--border);border-radius:14px;
  padding:clamp(20px,2.5vw,26px);transition:var(--tr);}
.why-card:hover{border-color:var(--border-md);transform:translateY(-4px);}
.why-icon{font-size:24px;margin-bottom:12px;}
.why-title{font-size:.92rem;font-weight:600;color:var(--white);margin-bottom:7px;}
.why-desc{font-size:clamp(.8rem,1vw,.85rem);color:var(--muted-lt);line-height:1.65;}
.rtabs{display:flex;gap:8px;justify-content:center;margin-bottom:28px;flex-wrap:wrap;}
.rtab{font-size:12.5px;font-weight:600;padding:9px 22px;border-radius:7px;
  border:1.5px solid rgba(255,255,255,.08);background:transparent;
  color:var(--muted);cursor:pointer;transition:all .25s;font-family:var(--font-h);}
.rtab.au.active{background:var(--au-bg);border-color:var(--au-border);color:var(--au-gold);}
.rtab.in.active{background:var(--in-bg);border-color:var(--in-border);color:var(--in-saffron);}
.rtab.uae.active{background:var(--uae-bg);border-color:var(--uae-border);color:var(--uae-cyan);}
.region-panel{display:none;}
.region-panel.active{display:block;}
.rp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;}
.cta-box{max-width:680px;margin:0 auto;background:var(--grad-card);border:1px solid var(--border);
  border-radius:18px;padding:clamp(36px,5vw,56px) clamp(24px,4vw,48px);text-align:center;}
@media(max-width:1024px){
  .hero-inner{grid-template-columns:1fr;}
  .hero-sub{max-width:100%;}
  .hero-right{max-width:440px;}
}
@media(max-width:600px){
  .hero-right{grid-template-columns:1fr 1fr;max-width:100%;gap:10px;}
  .hero-stat{padding:14px 12px;}
  .hero-stat-num{font-size:1.4rem;}
  .rp-grid,.why-grid{grid-template-columns:1fr;}
}
</style>
</head><body>
''' + TOPBAR + navbar('index.html') + BANNER_HTML + '''

<!-- HERO -->
<section class="hero">
  <div class="hero-glow"></div><div class="hero-glow2"></div>
  <div class="hero-inner">
    <div>
      <div class="hero-pill"><div class="hero-dot"></div><span class="hero-pill-text">Now Serving 3 Regions</span></div>
      <h1 class="hero-h1">Multi-Jurisdiction<br><span class="accent">Accounting & Advisory</span><br>Without Borders</h1>
      <p class="hero-sub">Expert accounting, tax compliance and advisory for businesses in Australia, India and UAE — delivered by triple-qualified professionals.</p>
      <div class="hero-badges">
        <span class="hero-badge">🏅 CPA Australia</span>
        <span class="hero-badge">📜 CA India (ICAI)</span>
        <span class="hero-badge">🎓 ACCA UK</span>
        <span class="hero-badge">ABN: 20 772 623 135</span>
      </div>
      <div class="hero-btns">
        <a href="contact.html" class="btn btn-primary">Book Free Consultation →</a>
        <a href="services.html" class="btn btn-outline">Explore Services</a>
      </div>
    </div>
    <div class="hero-right">
      <div class="hero-stat reveal"><div class="hero-stat-num">3</div><div class="hero-stat-lbl">Jurisdictions Covered</div></div>
      <div class="hero-stat reveal"><div class="hero-stat-num">3×</div><div class="hero-stat-lbl">Triple Qualified</div></div>
      <div class="hero-stat reveal"><div class="hero-stat-num">48h</div><div class="hero-stat-lbl">Query Response</div></div>
      <div class="hero-stat reveal"><div class="hero-stat-num">100%</div><div class="hero-stat-lbl">Compliance Focused</div></div>
    </div>
  </div>
</section>

<!-- CREDENTIALS STRIP -->
<div class="cred-strip">
  <div class="cred-inner">
    <span class="cred-item"><span class="cred-dot"></span>CPA Australia Registered</span>
    <span class="cred-item"><span class="cred-dot"></span>FTA Registered UAE</span>
    <span class="cred-item"><span class="cred-dot"></span>CA India ICAI Member</span>
    <span class="cred-item"><span class="cred-dot"></span>ACCA UK Qualified</span>
    <span class="cred-item"><span class="cred-dot"></span>Privacy Act 1988 Compliant</span>
  </div>
</div>

<!-- REGIONS -->
<section class="region-sect">
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:44px;" class="reveal">
      <span class="eyebrow">Our Regions</span>
      <h2 class="section-title">Select Your Jurisdiction</h2>
      <p class="section-sub" style="margin:0 auto;">Specialist services, pricing and compliance support tailored to your jurisdiction.</p>
    </div>
    <div class="region-grid">
      <a href="australia.html" class="region-card au reveal">
        <div class="region-card-inner"><span class="region-card-flag">🇦🇺</span><div class="region-card-name">Australia</div><div class="region-card-tagline">Tensquare Accounting &amp; Tax · Brisbane QLD<br>CPA Australia Registered · ABN: 20 772 623 135</div><div class="region-card-services"><span class="region-tag">BAS / GST</span><span class="region-tag">Tax Returns</span><span class="region-tag">SMSF</span><span class="region-tag">Bookkeeping</span><span class="region-tag">Payroll</span></div><div class="region-card-cta">Explore Australia Services →</div></div>
      </a>
      <a href="india.html" class="region-card in reveal">
        <div class="region-card-inner"><span class="region-card-flag">🇮🇳</span><div class="region-card-name">India</div><div class="region-card-tagline">Fintex Global Advisory Pvt Ltd<br>CA India (ICAI) Registered</div><div class="region-card-services"><span class="region-tag">GST Returns</span><span class="region-tag">Income Tax</span><span class="region-tag">Statutory Audit</span><span class="region-tag">MCA / ROC</span></div><div class="region-card-cta">Explore India Services →</div></div>
      </a>
      <a href="uae.html" class="region-card uae reveal">
        <div class="region-card-inner"><span class="region-card-flag">🇦🇪</span><div class="region-card-name">UAE</div><div class="region-card-tagline">Fintex Global Advisory LLC<br>FTA Registered · Business Bay, Dubai</div><div class="region-card-services"><span class="region-tag">UAE VAT</span><span class="region-tag">Corporate Tax</span><span class="region-tag">Bookkeeping</span><span class="region-tag">Advisory</span></div><div class="region-card-cta">Explore UAE Services →</div></div>
      </a>
    </div>
  </div>
</section>

<!-- SERVICES PREVIEW -->
<section style="padding:0 clamp(16px,4vw,32px) clamp(56px,8vw,88px);">
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:36px;" class="reveal">
      <span class="eyebrow">Services</span>
      <h2 class="section-title">What We Do</h2>
    </div>
    <div class="rtabs">
      <button class="rtab au active" onclick="showTab('au')">🇦🇺 Australia</button>
      <button class="rtab in" onclick="showTab('in')">🇮🇳 India</button>
      <button class="rtab uae" onclick="showTab('uae')">🇦🇪 UAE</button>
    </div>
    <div id="tab-au" class="region-panel active"><div class="rp-grid">
      <div class="service-card au"><div class="service-icon">📊</div><div class="service-title">BAS Preparation</div><div class="service-desc">Quarterly/monthly BAS via ATO portal. Xero/MYOB ready. STP payroll.</div></div>
      <div class="service-card au"><div class="service-icon">🧾</div><div class="service-title">Tax Returns (ITR)</div><div class="service-desc">Individual, company, trust and partnership returns. Tax planning included.</div></div>
      <div class="service-card au"><div class="service-icon">🏦</div><div class="service-title">SMSF Compliance</div><div class="service-desc">Annual audit, financial statements and ATO lodgement — fully managed.</div></div>
      <div class="service-card au"><div class="service-icon">📚</div><div class="service-title">Bookkeeping</div><div class="service-desc">Weekly/monthly bookkeeping, reconciliation and financial reports in Xero.</div></div>
    </div><div style="text-align:center;margin-top:20px;"><a href="australia.html" class="btn btn-au">Full Australia Services →</a></div></div>
    <div id="tab-in" class="region-panel"><div class="rp-grid">
      <div class="service-card in"><div class="service-icon">📋</div><div class="service-title">GST Returns</div><div class="service-desc">GSTR-1, GSTR-3B, annual return filing and ITC reconciliation.</div></div>
      <div class="service-card in"><div class="service-icon">🧾</div><div class="service-title">Income Tax (ITR)</div><div class="service-desc">ITR filing for individuals, companies and LLPs. Advance tax planning.</div></div>
      <div class="service-card in"><div class="service-icon">🏢</div><div class="service-title">MCA / ROC Filings</div><div class="service-desc">Annual ROC compliance, AOC-4, MGT-7 and event-based MCA filings.</div></div>
      <div class="service-card in"><div class="service-icon">🔍</div><div class="service-title">Statutory Audit</div><div class="service-desc">Independent audit under Companies Act 2013 with full documentation.</div></div>
    </div><div style="text-align:center;margin-top:20px;"><a href="india.html" class="btn btn-in">Full India Services →</a></div></div>
    <div id="tab-uae" class="region-panel"><div class="rp-grid">
      <div class="service-card uae"><div class="service-icon">🧾</div><div class="service-title">UAE VAT</div><div class="service-desc">VAT registration, quarterly returns, voluntary disclosure — FTA compliant.</div></div>
      <div class="service-card uae"><div class="service-icon">🏢</div><div class="service-title">Corporate Tax</div><div class="service-desc">CT registration, taxable income, CT301 returns and Pillar Two support.</div></div>
      <div class="service-card uae"><div class="service-icon">📚</div><div class="service-title">Bookkeeping</div><div class="service-desc">IFRS-aligned monthly accounts, AP/AR and management reports.</div></div>
      <div class="service-card uae"><div class="service-icon">🌐</div><div class="service-title">Business Advisory</div><div class="service-desc">Freezone vs Mainland, cross-border structuring, setup advisory.</div></div>
    </div><div style="text-align:center;margin-top:20px;"><a href="uae.html" class="btn btn-uae">Full UAE Services →</a></div></div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="testimonials-section" style="background:rgba(0,0,0,.1);">
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:12px;" class="reveal">
      <span class="eyebrow">Client Reviews</span>
      <h2 class="section-title">Trusted by Businesses Across 3 Regions</h2>
      <p class="section-sub" style="margin:0 auto;">Real feedback from clients in Australia, India and UAE.</p>
    </div>
    <div class="testi-grid">
''' + TESTI_HTML + '''
    </div>
  </div>
</section>

<!-- WHY FINTEX -->
<section style="padding:clamp(56px,8vw,88px) clamp(16px,4vw,32px);">
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:36px;" class="reveal">
      <span class="eyebrow">Why Us</span>
      <h2 class="section-title">Built Different. Qualified Everywhere.</h2>
    </div>
    <div class="why-grid">
      <div class="why-card reveal"><div class="why-icon">🎓</div><div class="why-title">Triple Qualified</div><div class="why-desc">CA India (ICAI) · CPA Australia · ACCA UK — rare multi-jurisdiction qualifications under one roof.</div></div>
      <div class="why-card reveal"><div class="why-icon">🌏</div><div class="why-title">Cross-Border Expertise</div><div class="why-desc">We understand AU-India-UAE business structures and compliance in full — not just one market.</div></div>
      <div class="why-card reveal"><div class="why-icon">⚡</div><div class="why-title">48-Hour Response</div><div class="why-desc">Standard queries answered within 48 hours. Urgent matters handled same business day.</div></div>
      <div class="why-card reveal"><div class="why-icon">🔒</div><div class="why-title">Data Security</div><div class="why-desc">Privacy Act 1988 compliant. Client data encrypted, never shared, never sold.</div></div>
      <div class="why-card reveal"><div class="why-icon">💡</div><div class="why-title">Proactive Advisory</div><div class="why-desc">We flag tax risks and opportunities before they become problems — not just compliance.</div></div>
      <div class="why-card reveal"><div class="why-icon">🤝</div><div class="why-title">Long-Term Partnership</div><div class="why-desc">Advisors, not just service providers. Long-term relationships, not transactional engagements.</div></div>
    </div>
  </div>
</section>

<!-- CTA -->
<section style="padding:0 clamp(16px,4vw,32px) clamp(56px,8vw,88px);">
  <div class="cta-box reveal">
    <span class="eyebrow" style="display:block;text-align:center;margin-bottom:10px;">Free Consultation</span>
    <h2 style="font-size:clamp(1.4rem,2.8vw,2rem);font-weight:700;color:var(--white);margin-bottom:12px;">Ready to Go Beyond the Books?</h2>
    <p style="color:var(--muted-lt);margin-bottom:28px;max-width:460px;margin-left:auto;margin-right:auto;line-height:1.75;">Book a free 30-minute consultation. No obligation — just an honest conversation about your business needs.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <a href="contact.html" class="btn btn-primary" style="font-size:14.5px;padding:14px 32px;">Book Free Consultation →</a>
      <a href="services.html" class="btn btn-outline">View All Services</a>
    </div>
  </div>
</section>

''' + FOOTER + WA_POPUP + '''
<script>
function showTab(t){
  ['au','in','uae'].forEach(function(x){
    document.getElementById('tab-'+x).classList.remove('active');
    document.querySelectorAll('.rtab.'+x).forEach(function(b){b.classList.remove('active');});
  });
  document.getElementById('tab-'+t).classList.add('active');
  document.querySelector('.rtab.'+t).classList.add('active');
}
</script>
''' + page_script('index.html') + '\n</body></html>'

with open(os.path.join(WORK,'index.html'),'w') as f: f.write(index_html)
print("index.html done")

# ══════════════════════════════════════════════════════════
# BUILD COMBINED PORTAL.HTML
# Single login page with tabs: Client | Admin
# Swaps between dashboards after login
# ══════════════════════════════════════════════════════════

portal_html = head(
    "Portal Login | Fintex Global Group",
    "Fintex Global Group secure portal — client document submission and admin dashboard.",
    "portal", "Portal | Fintex Global Group"
) + '''
<style>
body{background:radial-gradient(ellipse at 60% 30%,rgba(0,180,216,.06),transparent 60%),var(--navy);}
.portal-page{min-height:100vh;display:flex;flex-direction:column;align-items:center;
  justify-content:center;padding:clamp(70px,10vw,90px) clamp(16px,4vw,24px) 40px;}
.portal-wrap{width:100%;max-width:480px;}
.portal-logo-row{display:flex;align-items:center;justify-content:center;gap:11px;margin-bottom:28px;}
.portal-logo-name{font-family:var(--font-h);font-size:14px;font-weight:700;letter-spacing:.5px;
  background:var(--grad-blue);-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;line-height:1.1;}
.portal-logo-sub{font-size:8px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;}
.portal-card{background:rgba(17,30,48,.97);border:1px solid var(--border);border-radius:18px;
  padding:clamp(28px,4vw,40px);box-shadow:0 24px 64px rgba(0,0,0,.4);}
.portal-tabs{display:flex;gap:0;border-bottom:2px solid var(--border);margin-bottom:24px;}
.portal-tab{flex:1;font-family:var(--font-h);font-size:13px;font-weight:600;
  padding:10px 8px;background:none;border:none;color:var(--muted);cursor:pointer;
  transition:all .22s;border-bottom:2px solid transparent;margin-bottom:-2px;}
.portal-tab.active{color:var(--cyan);border-bottom-color:var(--cyan);}
.portal-panel{display:none;}
.portal-panel.active{display:block;}
.p-label{display:block;font-size:10.5px;font-weight:700;color:var(--muted);
  text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;}
.p-input{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(0,180,216,.15);
  border-radius:8px;padding:11px 14px;color:var(--white);font-family:var(--font-b);
  font-size:.9rem;transition:all .2s;margin-bottom:13px;}
.p-input:focus{outline:none;border-color:var(--cyan);box-shadow:0 0 0 3px rgba(0,180,216,.08);}
.p-input::placeholder{color:var(--muted);}
.p-btn{width:100%;padding:13px;border-radius:8px;font-family:var(--font-h);font-size:14px;
  font-weight:600;cursor:pointer;border:none;background:var(--grad-main);
  color:#fff;transition:var(--tr);margin-top:2px;}
.p-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,180,216,.3);}
.p-err{display:none;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);
  color:#F87171;font-size:.81rem;padding:9px 12px;border-radius:7px;margin-top:10px;}
.p-note{font-size:.77rem;color:var(--muted);text-align:center;margin-top:14px;line-height:1.55;}
.p-note a{color:var(--cyan);}

/* ── CLIENT DASHBOARD ── */
.cdash{display:none;max-width:860px;width:100%;padding:clamp(80px,10vw,96px) clamp(16px,4vw,24px) 60px;margin:0 auto;}
.step-bar{display:flex;gap:0;margin-bottom:28px;overflow-x:auto;padding-bottom:4px;}
.step{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;
  position:relative;min-width:72px;}
.step:not(:last-child)::after{content:'';position:absolute;top:13px;
  left:calc(50% + 15px);right:calc(-50% + 15px);height:2px;background:var(--border);}
.step.done:not(:last-child)::after,.step.active:not(:last-child)::after{background:var(--cyan);}
.step-circle{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;
  justify-content:center;font-size:11px;font-weight:700;background:var(--border);
  color:var(--muted);border:2px solid transparent;transition:all .3s;}
.step.active .step-circle{background:var(--cyan);color:#fff;border-color:var(--cyan);}
.step.done .step-circle{background:rgba(0,180,216,.12);color:var(--cyan);border-color:var(--cyan);}
.step-label{font-size:9.5px;font-weight:600;color:var(--muted);text-align:center;white-space:nowrap;}
.step.active .step-label,.step.done .step-label{color:var(--cyan);}
.status-banner{padding:13px 18px;border-radius:10px;margin-bottom:22px;
  display:flex;align-items:flex-start;gap:11px;}
.status-banner.pending{background:var(--uae-bg);border:1px solid var(--uae-border);}
.status-banner.submitted{background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.2);}
.status-banner.frozen{background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.2);}
.status-banner.info{background:rgba(232,184,0,.07);border:1px solid var(--au-border);}
.doc-checklist{background:var(--grad-card);border:1px solid var(--border);border-radius:12px;padding:20px 22px;margin-bottom:16px;}
.doc-item{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04);}
.doc-item:last-child{border-bottom:none;}
.doc-check{width:18px;height:18px;border-radius:4px;border:2px solid var(--border);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;}
.doc-check.done{background:var(--cyan);border-color:var(--cyan);color:#fff;}
.upload-zone{border:2px dashed var(--border);border-radius:10px;padding:28px;
  text-align:center;cursor:pointer;transition:all .2s;background:rgba(0,180,216,.02);}
.upload-zone:hover,.upload-zone.dragover{border-color:var(--cyan);background:rgba(0,180,216,.05);}

/* ── ADMIN DASHBOARD ── */
.adash{display:none;width:100%;max-width:1200px;padding:clamp(80px,10vw,96px) clamp(16px,4vw,24px) 60px;margin:0 auto;}
.admin-nav{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:28px;border-bottom:1px solid var(--border);padding-bottom:14px;}
.admin-nav-btn{font-family:var(--font-h);font-size:12px;font-weight:600;padding:7px 14px;
  border-radius:7px;border:1px solid var(--border);background:transparent;
  color:var(--muted);cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:5px;}
.admin-nav-btn.active,.admin-nav-btn:hover{background:rgba(0,180,216,.08);
  border-color:var(--border-md);color:var(--cyan);}
.admin-section{display:none;}
.admin-section.active{display:block;}
.a-stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:24px;}
.a-stat{background:var(--grad-card);border:1px solid var(--border);border-radius:12px;padding:16px 18px;}
.a-stat-num{font-family:var(--font-h);font-size:1.7rem;font-weight:700;color:var(--white);}
.a-stat-lbl{font-size:.74rem;color:var(--muted);margin-top:3px;}
.a-table{width:100%;border-collapse:collapse;font-size:.83rem;}
.a-table th{font-family:var(--font-h);font-size:.72rem;font-weight:700;color:var(--muted);
  letter-spacing:1px;text-transform:uppercase;padding:10px 12px;
  border-bottom:1px solid var(--border);text-align:left;}
.a-table td{padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.04);color:var(--muted-lt);}
.a-table tr:hover td{background:rgba(0,180,216,.03);}
.a-badge{display:inline-flex;align-items:center;font-size:.7rem;font-weight:700;
  padding:2px 8px;border-radius:10px;}
.a-badge.submitted{background:rgba(16,185,129,.1);color:#34D399;border:1px solid rgba(16,185,129,.2);}
.a-badge.pending{background:rgba(232,184,0,.1);color:#E8B800;border:1px solid rgba(232,184,0,.2);}
.a-badge.frozen{background:rgba(239,68,68,.1);color:#F87171;border:1px solid rgba(239,68,68,.2);}
.a-badge.info{background:rgba(0,180,216,.1);color:var(--cyan);border:1px solid var(--uae-border);}
.a-action-btn{font-family:var(--font-h);font-size:.72rem;font-weight:600;padding:4px 10px;
  border-radius:6px;border:1px solid var(--border);background:transparent;
  color:var(--muted-lt);cursor:pointer;transition:all .2s;margin-right:4px;}
.a-action-btn:hover{border-color:var(--cyan);color:var(--cyan);}
.dash-card{background:var(--grad-card);border:1px solid var(--border);border-radius:12px;padding:20px 22px;margin-bottom:16px;}
.dash-card-title{font-family:var(--font-h);font-size:.84rem;font-weight:700;color:var(--white);margin-bottom:14px;}
@media(max-width:600px){
  .admin-nav{gap:4px;}
  .admin-nav-btn{font-size:11px;padding:6px 10px;}
  .a-stat-grid{grid-template-columns:1fr 1fr;}
}
</style>
</head><body>

<!-- TOP NAV BAR (minimal for portal) -->
<nav class="navbar" id="navbar" style="position:fixed;">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">''' + LOGO_SVG + '''<div class="nav-logo-text"><span class="nav-logo-name">FINTEX GLOBAL GROUP</span><span class="nav-logo-sub">Secure Portal</span></div></a>
    <div style="display:flex;gap:10px;align-items:center;">
      <a href="index.html" class="nav-link" style="font-size:12px;">← Back to Website</a>
      <button id="logoutBtn" onclick="doLogout()" style="display:none;font-family:var(--font-h);font-size:12px;font-weight:600;padding:7px 14px;border-radius:7px;border:1px solid rgba(239,68,68,.3);background:transparent;color:#F87171;cursor:pointer;">Sign Out</button>
    </div>
  </div>
</nav>

<!-- ── LOGIN PAGE ── -->
<div class="portal-page" id="loginPage">
  <div class="portal-wrap">
    <div class="portal-logo-row">''' + LOGO_SVG + '''
      <div><div class="portal-logo-name">FINTEX GLOBAL GROUP</div><div style="font-size:8px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;">Secure Portal</div></div>
    </div>
    <div class="portal-card">
      <div class="portal-tabs">
        <button class="portal-tab active" onclick="switchPortalTab('client')">👤 Client Portal</button>
        <button class="portal-tab" onclick="switchPortalTab('admin')">🛡️ Admin Portal</button>
      </div>

      <!-- CLIENT LOGIN -->
      <div class="portal-panel active" id="panel-client">
        <div style="margin-bottom:18px;">
          <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:var(--white);margin-bottom:4px;">Welcome Back</div>
          <div style="font-size:.82rem;color:var(--muted);">Sign in to submit documents and track your engagement.</div>
        </div>
        <div><label class="p-label">Email Address</label><input class="p-input" type="email" id="c-email" placeholder="your@email.com" onkeydown="if(event.key==='Enter')doClientLogin()"/></div>
        <div><label class="p-label">Password</label><input class="p-input" type="password" id="c-pass" placeholder="••••••••" onkeydown="if(event.key==='Enter')doClientLogin()"/></div>
        <button class="p-btn" onclick="doClientLogin()">Sign In to Client Portal →</button>
        <div class="p-err" id="c-err">Invalid email or password. Please try again.</div>
        <div class="p-note">Need access? <a href="contact.html">Contact your account manager</a>.<br/>Your credentials are provided by Fintex Global Group.</div>
      </div>

      <!-- ADMIN LOGIN -->
      <div class="portal-panel" id="panel-admin">
        <div style="margin-bottom:18px;">
          <div style="font-family:var(--font-h);font-size:1.05rem;font-weight:700;color:var(--white);margin-bottom:4px;">Admin Access</div>
          <div style="font-size:.82rem;color:var(--muted);">Authorised Fintex team members only.</div>
        </div>
        <div><label class="p-label">Admin Email</label><input class="p-input" type="email" id="a-email" placeholder="admin@fintexglobal.com" onkeydown="if(event.key==='Enter')doAdminLogin()"/></div>
        <div><label class="p-label">Password</label><input class="p-input" type="password" id="a-pass" placeholder="••••••••" onkeydown="if(event.key==='Enter')doAdminLogin()"/></div>
        <button class="p-btn" style="background:linear-gradient(135deg,#1E4B7A,#2E86C1);" onclick="doAdminLogin()">Sign In to Admin Dashboard →</button>
        <div class="p-err" id="a-err">Invalid admin credentials.</div>
        <div class="p-note">Forgot your password? Contact Harish directly.</div>
      </div>
    </div>
  </div>
</div>

<!-- ── CLIENT DASHBOARD ── -->
<div class="cdash" id="clientDash">
  <div id="clientDashInner"></div>
</div>

<!-- ── ADMIN DASHBOARD ── -->
<div class="adash" id="adminDash">
  <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
    <div>
      <div style="font-family:var(--font-h);font-size:1.2rem;font-weight:700;color:var(--white);" id="adminGreeting">Admin Dashboard</div>
      <div style="font-size:.8rem;color:var(--muted);" id="adminEmail"></div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="a-action-btn" onclick="exportCSV()" style="color:var(--cyan);border-color:var(--cyan);">⬇ Export CSV</button>
    </div>
  </div>
  <div class="admin-nav">
    <button class="admin-nav-btn active" onclick="adminSection('dashboard')">📊 Dashboard</button>
    <button class="admin-nav-btn" onclick="adminSection('leads')">📩 Leads <span id="lead-badge" style="background:rgba(239,68,68,.8);color:#fff;font-size:9px;padding:1px 5px;border-radius:8px;margin-left:3px;display:none;">0</span></button>
    <button class="admin-nav-btn" onclick="adminSection('clients')">👥 All Clients</button>
    <button class="admin-nav-btn" onclick="adminSection('submissions')">📁 Submissions</button>
    <button class="admin-nav-btn" onclick="adminSection('awaiting')">⏳ Awaiting</button>
    <button class="admin-nav-btn" onclick="adminSection('credentials')">🔑 Credentials</button>
  </div>

  <!-- DASHBOARD SECTION -->
  <div class="admin-section active" id="sec-dashboard">
    <div class="a-stat-grid" id="statGrid"></div>
    <div class="dash-card">
      <div class="dash-card-title">Recent Activity</div>
      <div id="recentActivity" style="font-size:.82rem;color:var(--muted-lt);"></div>
    </div>
  </div>

  <!-- LEADS SECTION -->
  <div class="admin-section" id="sec-leads">
    <div class="dash-card">
      <div class="dash-card-title">Contact Form Leads</div>
      <div style="overflow-x:auto;"><table class="a-table" id="leadsTable"><thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Region</th><th>Service</th><th>Actions</th></tr></thead><tbody id="leadsTbody"></tbody></table></div>
    </div>
  </div>

  <!-- CLIENTS SECTION -->
  <div class="admin-section" id="sec-clients">
    <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap;">
      <input id="clientSearch" class="p-input" placeholder="Search clients..." style="max-width:280px;margin:0;" oninput="renderClients()"/>
      <button class="a-action-btn" onclick="addClient()" style="color:var(--cyan);border-color:var(--cyan);">+ Add Client</button>
    </div>
    <div class="dash-card">
      <div style="overflow-x:auto;"><table class="a-table"><thead><tr><th>Name</th><th>Email</th><th>Region</th><th>Status</th><th>Service</th><th>Actions</th></tr></thead><tbody id="clientsTbody"></tbody></table></div>
    </div>
  </div>

  <!-- SUBMISSIONS SECTION -->
  <div class="admin-section" id="sec-submissions">
    <div class="dash-card">
      <div class="dash-card-title">Document Submissions</div>
      <div id="submissionsList" style="font-size:.83rem;color:var(--muted-lt);"></div>
    </div>
  </div>

  <!-- AWAITING SECTION -->
  <div class="admin-section" id="sec-awaiting">
    <div class="dash-card">
      <div class="dash-card-title">Clients Awaiting Document Submission</div>
      <div id="awaitingList" style="font-size:.83rem;color:var(--muted-lt);"></div>
    </div>
  </div>

  <!-- CREDENTIALS SECTION -->
  <div class="admin-section" id="sec-credentials">
    <div class="dash-card">
      <div class="dash-card-title">Manage Login Credentials</div>
      <p style="font-size:.82rem;color:var(--muted-lt);margin-bottom:16px;">Add, edit or remove client and admin passwords. Changes take effect immediately.</p>
      <div id="credsList"></div>
      <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;">
        <input class="p-input" id="newCredEmail" placeholder="Email address" style="max-width:220px;margin:0;"/>
        <input class="p-input" id="newCredPass" placeholder="Password" type="password" style="max-width:200px;margin:0;"/>
        <select class="p-input" id="newCredRole" style="max-width:140px;margin:0;">
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
        <button class="a-action-btn" onclick="addCredential()" style="color:var(--cyan);border-color:var(--cyan);">+ Add</button>
      </div>
    </div>
  </div>
</div>

<script>
// ══════════════════════════════════════════════════
// STORAGE HELPER
// ══════════════════════════════════════════════════
var DB = {
  get: function(k){try{return JSON.parse(localStorage.getItem('fintex_'+k)||'null');}catch(e){return null;}},
  set: function(k,v){try{localStorage.setItem('fintex_'+k,JSON.stringify(v));}catch(e){}},
  del: function(k){localStorage.removeItem('fintex_'+k);}
};

// ── DEFAULT CREDENTIALS (change via Credentials tab) ──
function getCredentials(){
  var c = DB.get('credentials');
  if(!c) {
    c = [
      {email:'admin@fintexglobal.com', password:'FintexAdmin2024!', role:'admin', name:'Harish'},
      {email:'arun@tensquare.com.au', password:'Arun2024!', role:'admin', name:'Arun'},
      {email:'client@example.com', password:'Client123!', role:'client', name:'Demo Client', region:'AU', service:'BAS Preparation'},
      {email:'priya@example.com', password:'Priya123!', role:'client', name:'Priya Sharma', region:'India', service:'GST Returns'}
    ];
    DB.set('credentials', c);
  }
  return c;
}

// ══════════════════════════════════════════════════
// LOGIN
// ══════════════════════════════════════════════════
function switchPortalTab(t){
  document.querySelectorAll('.portal-tab').forEach(function(b,i){b.classList.toggle('active',i===(t==='client'?0:1));});
  document.getElementById('panel-client').classList.toggle('active', t==='client');
  document.getElementById('panel-admin').classList.toggle('active', t==='admin');
}

function doClientLogin(){
  var email = document.getElementById('c-email').value.trim().toLowerCase();
  var pass  = document.getElementById('c-pass').value;
  var creds = getCredentials();
  var user  = creds.find(function(c){return c.email.toLowerCase()===email && c.password===pass && c.role==='client';});
  if(!user){document.getElementById('c-err').style.display='block';return;}
  document.getElementById('c-err').style.display='none';
  DB.set('session', {role:'client', email:user.email, name:user.name, region:user.region||'', service:user.service||''});
  showClientDash(user);
}

function doAdminLogin(){
  var email = document.getElementById('a-email').value.trim().toLowerCase();
  var pass  = document.getElementById('a-pass').value;
  var creds = getCredentials();
  var user  = creds.find(function(c){return c.email.toLowerCase()===email && c.password===pass && c.role==='admin';});
  if(!user){document.getElementById('a-err').style.display='block';return;}
  document.getElementById('a-err').style.display='none';
  DB.set('session', {role:'admin', email:user.email, name:user.name});
  showAdminDash(user);
}

function doLogout(){
  DB.del('session');
  document.getElementById('loginPage').style.display='flex';
  document.getElementById('clientDash').style.display='none';
  document.getElementById('adminDash').style.display='none';
  document.getElementById('logoutBtn').style.display='none';
}

// Resume session on page load
(function(){
  var sess = DB.get('session');
  if(!sess) return;
  var creds = getCredentials();
  var user = creds.find(function(c){return c.email.toLowerCase()===sess.email.toLowerCase();});
  if(!user) return;
  if(sess.role==='admin') showAdminDash(user);
  else showClientDash(user);
})();

// ══════════════════════════════════════════════════
// CLIENT DASHBOARD
// ══════════════════════════════════════════════════
function showClientDash(user){
  document.getElementById('loginPage').style.display='none';
  document.getElementById('clientDash').style.display='block';
  document.getElementById('logoutBtn').style.display='block';
  
  var data = DB.get('client_'+user.email) || {status:'pending', docs:[], notes:'', submitted:false};
  var service = user.service || 'General';
  var statusMap = {
    pending: {cls:'pending', icon:'📋', text:'Ready for document submission.', detail:'Please upload the required documents below and complete the financial information form.'},
    submitted: {cls:'submitted', icon:'✅', text:'Documents submitted — under review.', detail:'Your documents have been received. Our team will review and contact you within 2 business days.'},
    frozen: {cls:'frozen', icon:'🔒', text:'Portal under review — submissions paused.', detail:'Your documents are currently under review. No further uploads are required at this time.'},
    info_requested: {cls:'info', icon:'📌', text:'Additional information requested.', detail: (data.admin_note||'Please re-upload the requested documents and re-submit.')}
  };
  var st = statusMap[data.status] || statusMap['pending'];
  var steps = ['Account','Submit','Review','Complete'];
  var stepIdx = {pending:1, submitted:2, frozen:2, info_requested:1, complete:3}[data.status]||1;
  
  var stepsHtml = steps.map(function(s,i){
    var cls = i<stepIdx?'done':(i===stepIdx?'active':'');
    return '<div class="step '+cls+'"><div class="step-circle">'+(i<stepIdx?'✓':(i+1))+'</div><div class="step-label">'+s+'</div></div>';
  }).join('');

  var docTypes = {
    'BAS Preparation':['Bank statements (last quarter)','Xero/MYOB file or CSV export','Sales invoices summary','Purchase invoices summary','Payroll summary (if applicable)'],
    'Tax Returns (ITR)':['Payment summaries / income statements','Bank interest certificates','Rental income/expense records','Share trade records (if applicable)','Prior year tax return'],
    'SMSF Compliance':['SMSF bank statements (full year)','Investment statements','Member contribution records','Trustee declarations','Prior year financial statements'],
    'GST Returns':['Sales register (GSTR-1 data)','Purchase register (GSTR-2A/2B)','Bank statements','E-way bills (if applicable)'],
    'UAE VAT':['Sales invoices (quarter)','Purchase invoices (quarter)','Bank statements','Emirates ID / Trade license copy'],
    'Corporate Tax':['Audited financial statements','Trial balance','Fixed asset register','Directors\' report'],
    'Bookkeeping':['Bank statements (all accounts)','Credit card statements','Sales invoices','Expense receipts'],
  };
  var docs = docTypes[service] || ['Financial statements','Bank statements','Supporting documents','Prior year returns'];
  var docsHtml = docs.map(function(d){
    return '<div class="doc-item"><div class="doc-check '+(data.docs&&data.docs.indexOf(d)>=0?'done':'')+'">✓</div><div style="font-size:.83rem;color:var(--muted-lt);">'+d+'</div></div>';
  }).join('');

  var locked = data.status==='submitted' || data.status==='frozen';
  
  document.getElementById('clientDashInner').innerHTML = `
<div class="step-bar">${stepsHtml}</div>
<div class="status-banner ${st.cls}">
  <div style="font-size:22px;flex-shrink:0;">${st.icon}</div>
  <div><div style="font-family:var(--font-h);font-size:.88rem;font-weight:600;color:var(--white);margin-bottom:3px;">${st.text}</div>
  <div style="font-size:.8rem;color:var(--muted-lt);">${st.detail}</div></div>
</div>
<div style="display:grid;grid-template-columns:1fr 1.3fr;gap:18px;align-items:start;">
  <div>
    <div style="font-family:var(--font-h);font-size:10px;font-weight:700;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Required Documents — ${service}</div>
    <div class="doc-checklist">${docsHtml}</div>
    ${!locked?`
    <div class="upload-zone" id="dropzone" onclick="document.getElementById('fileInput').click()" ondragover="this.classList.add('dragover');event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event)">
      <div style="font-size:28px;margin-bottom:8px;">📁</div>
      <div style="font-family:var(--font-h);font-size:.85rem;font-weight:600;color:var(--white);margin-bottom:4px;">Drop files here or click to upload</div>
      <div style="font-size:.75rem;color:var(--muted);">PDF, Excel, Word, Images, ZIP — max 20MB each</div>
      <input type="file" id="fileInput" multiple style="display:none" onchange="handleFiles(this.files)" accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpg,.jpeg,.zip"/>
    </div>
    <div id="uploadedFiles" style="margin-top:10px;"></div>`:''}
  </div>
  <div>
    <div style="font-family:var(--font-h);font-size:10px;font-weight:700;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Financial Information</div>
    <div class="dash-card">
      ${!locked?`
      <div style="display:grid;gap:10px;">
        <div><label class="p-label">Period / Financial Year</label><input class="p-input" id="fi-period" placeholder="e.g. Q1 2025 or FY 2024-25" style="margin:0;" value="${data.fi_period||''}"/></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div><label class="p-label">Revenue (approx.)</label><input class="p-input" id="fi-rev" placeholder="e.g. AUD 250,000" style="margin:0;" value="${data.fi_revenue||''}"/></div>
          <div><label class="p-label">Employees</label><input class="p-input" id="fi-emp" placeholder="e.g. 5" style="margin:0;" value="${data.fi_employees||''}"/></div>
        </div>
        <div><label class="p-label">ABN / TFN / TRN / PAN (as applicable)</label><input class="p-input" id="fi-id" placeholder="Tax identification number" style="margin:0;" value="${data.fi_id||''}"/></div>
        <div><label class="p-label">Business Address</label><input class="p-input" id="fi-addr" placeholder="Registered business address" style="margin:0;" value="${data.fi_address||''}"/></div>
        <div><label class="p-label">Additional Notes</label><textarea class="p-input" id="fi-notes" rows="3" placeholder="Any special instructions or notes..." style="margin:0;resize:vertical;">${data.fi_notes||''}</textarea></div>
        <div style="display:flex;align-items:flex-start;gap:8px;padding:10px;background:rgba(0,180,216,.04);border:1px solid var(--border);border-radius:8px;">
          <input type="checkbox" id="decl" style="margin-top:2px;"/>
          <label for="decl" style="font-size:.78rem;color:var(--muted-lt);cursor:pointer;">I declare that the information and documents provided are accurate, complete and to the best of my knowledge.</label>
        </div>
        <button class="p-btn" onclick="submitPortal('${user.email}')">Submit Documents →</button>
      </div>`:`<div style="text-align:center;padding:20px;font-size:.83rem;color:var(--muted-lt);">${data.status==='frozen'?'🔒 Portal locked during review. Contact your account manager if you have questions.':'✅ Information submitted successfully.'}</div>`}
    </div>
    <div style="margin-top:14px;padding:14px 16px;background:var(--grad-card);border:1px solid var(--border);border-radius:10px;">
      <div style="font-family:var(--font-h);font-size:.8rem;font-weight:600;color:var(--white);margin-bottom:8px;">Need Help?</div>
      <div style="font-size:.78rem;color:var(--muted-lt);margin-bottom:10px;">Contact your account manager directly.</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <a href="mailto:info@fintexglobal.com" class="btn btn-outline btn-sm">✉️ Email Us</a>
        <a href="https://wa.me/971557282794?text=Hi%20Fintex%2C%20I%20need%20help%20with%20my%20portal." target="_blank" rel="noopener" class="btn btn-wa btn-sm">💬 WhatsApp</a>
      </div>
    </div>
  </div>
</div>`;
  
  // File count
  window._uploadedFileNames = data.docs || [];
  renderUploadedFiles();
}

function renderUploadedFiles(){
  var el = document.getElementById('uploadedFiles');
  if(!el) return;
  if(!window._uploadedFileNames.length){el.innerHTML='';return;}
  el.innerHTML = '<div style="font-size:10px;font-weight:700;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;">Uploaded Files</div>' +
    window._uploadedFileNames.map(function(n){return '<div style="display:flex;align-items:center;gap:7px;padding:6px 10px;background:rgba(0,180,216,.05);border:1px solid var(--border);border-radius:6px;margin-bottom:4px;font-size:.78rem;color:var(--muted-lt);">📄 '+n+'</div>';}).join('');
}
function handleFiles(files){
  Array.from(files).forEach(function(f){
    if(f.size>20*1024*1024){alert(f.name+' exceeds 20MB limit.');return;}
    if(window._uploadedFileNames.indexOf(f.name)<0) window._uploadedFileNames.push(f.name);
  });
  renderUploadedFiles();
}
function handleDrop(e){
  e.preventDefault();
  document.getElementById('dropzone').classList.remove('dragover');
  handleFiles(e.dataTransfer.files);
}
function submitPortal(email){
  if(!document.getElementById('decl') || !document.getElementById('decl').checked){
    alert('Please check the declaration box before submitting.');return;
  }
  var data = DB.get('client_'+email) || {};
  data.status = 'submitted';
  data.docs = window._uploadedFileNames || [];
  data.fi_period = (document.getElementById('fi-period')||{}).value || '';
  data.fi_revenue = (document.getElementById('fi-rev')||{}).value || '';
  data.fi_employees = (document.getElementById('fi-emp')||{}).value || '';
  data.fi_id = (document.getElementById('fi-id')||{}).value || '';
  data.fi_address = (document.getElementById('fi-addr')||{}).value || '';
  data.fi_notes = (document.getElementById('fi-notes')||{}).value || '';
  data.submitted_at = new Date().toISOString();
  DB.set('client_'+email, data);
  // Save to analytics leads
  try{var k='fintex_analytics',an=JSON.parse(localStorage.getItem(k)||'{}');if(!an.submissions)an.submissions=[];an.submissions.push({email:email,date:data.submitted_at});localStorage.setItem(k,JSON.stringify(an));}catch(x){}
  var sess = DB.get('session');
  var creds = getCredentials();
  var user = creds.find(function(c){return c.email.toLowerCase()===email.toLowerCase();});
  if(user) showClientDash(user);
}

// ══════════════════════════════════════════════════
// ADMIN DASHBOARD
// ══════════════════════════════════════════════════
function showAdminDash(user){
  document.getElementById('loginPage').style.display='none';
  document.getElementById('adminDash').style.display='block';
  document.getElementById('logoutBtn').style.display='block';
  document.getElementById('adminGreeting').textContent = 'Welcome, '+user.name;
  document.getElementById('adminEmail').textContent = user.email;
  adminSection('dashboard');
  renderStats();
  renderLeads();
  renderClients();
  renderCredentials();
}

function adminSection(s){
  document.querySelectorAll('.admin-section').forEach(function(el){el.classList.remove('active');});
  document.querySelectorAll('.admin-nav-btn').forEach(function(b){b.classList.remove('active');});
  document.getElementById('sec-'+s).classList.add('active');
  event && event.target && event.target.classList && event.target.classList.add('active');
  if(s==='submissions') renderSubmissions();
  if(s==='awaiting') renderAwaiting();
  if(s==='credentials') renderCredentials();
}

function renderStats(){
  var creds = getCredentials();
  var clients = creds.filter(function(c){return c.role==='client';});
  var an = JSON.parse(localStorage.getItem('fintex_analytics')||'{}');
  var leads = (an.leads||[]).length;
  var submitted = 0, awaiting = 0, frozen = 0, infoReq = 0;
  clients.forEach(function(c){
    var d = DB.get('client_'+c.email);
    if(!d||d.status==='pending') awaiting++;
    else if(d.status==='submitted') submitted++;
    else if(d.status==='frozen') frozen++;
    else if(d.status==='info_requested') infoReq++;
  });
  var stats = [
    {n:clients.length, l:'Total Clients', c:'var(--cyan)'},
    {n:submitted, l:'Submitted', c:'#34D399'},
    {n:awaiting, l:'Awaiting Docs', c:'#E8B800'},
    {n:leads, l:'Form Leads', c:'var(--in-saffron)'},
    {n:frozen, l:'Under Review', c:'#F87171'},
    {n:infoReq, l:'Info Requested', c:'#A78BFA'},
  ];
  document.getElementById('statGrid').innerHTML = stats.map(function(s){
    return '<div class="a-stat"><div class="a-stat-num" style="color:'+s.c+'">'+s.n+'</div><div class="a-stat-lbl">'+s.l+'</div></div>';
  }).join('');
  var an2 = JSON.parse(localStorage.getItem('fintex_analytics')||'{}');
  var recent = (an2.visits||[]).slice(-8).reverse().map(function(v){
    return '<div style="padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04);display:flex;gap:10px;"><span style="color:var(--muted);min-width:100px;font-size:.75rem;">'+v.date+'</span><span>'+v.page+'</span></div>';
  }).join('');
  document.getElementById('recentActivity').innerHTML = recent || '<span style="color:var(--muted);">No activity yet.</span>';
  // Lead badge
  var unread = (an.leads||[]).filter(function(l){return !l.read;}).length;
  var badge = document.getElementById('lead-badge');
  badge.textContent = unread;
  badge.style.display = unread>0?'inline':'none';
}

function renderLeads(){
  var an = JSON.parse(localStorage.getItem('fintex_analytics')||'{}');
  var leads = (an.leads||[]).slice().reverse();
  document.getElementById('leadsTbody').innerHTML = leads.length===0
    ? '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:20px;">No leads yet.</td></tr>'
    : leads.map(function(l,i){
      return '<tr><td style="white-space:nowrap;">'+((l.timestamp||'').substring(0,10)||'—')+'</td><td>'+escH(l.firstName||'')+(l.lastName?' '+escH(l.lastName):'')+'</td><td>'+escH(l.email||'—')+'</td><td>'+escH(l.region||'—')+'</td><td>'+escH(l.service||'—')+'</td><td><a href="mailto:'+escH(l.email||'')+'" class="a-action-btn">✉️ Email</a>'+(l.phone?'<a href="https://wa.me/'+escH(l.phone.replace(/\\D/g,''))+'?text=Hi%20there" target="_blank" rel="noopener" class="a-action-btn">💬 WA</a>':'')+'</td></tr>';
    }).join('');
}

function renderClients(){
  var creds = getCredentials();
  var search = (document.getElementById('clientSearch')||{value:''}).value.toLowerCase();
  var clients = creds.filter(function(c){return c.role==='client' && (!search||(c.email+c.name).toLowerCase().indexOf(search)>=0);});
  document.getElementById('clientsTbody').innerHTML = clients.length===0
    ? '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:20px;">No clients yet.</td></tr>'
    : clients.map(function(c){
      var d = DB.get('client_'+c.email) || {status:'pending'};
      var badges = {submitted:'submitted',pending:'pending',frozen:'frozen',info_requested:'info'};
      var badge = badges[d.status]||'pending';
      return '<tr><td>'+escH(c.name||'')+'</td><td>'+escH(c.email)+'</td><td>'+escH(c.region||'—')+'</td><td><span class="a-badge '+badge+'">'+escH(d.status||'pending')+'</span></td><td>'+escH(c.service||'—')+'</td><td>'
        +'<button class="a-action-btn" onclick="freezeClient(\''+escH(c.email)+'\')">'+( d.status==='frozen'?'🔓 Unlock':'🔒 Freeze')+'</button>'
        +'<button class="a-action-btn" onclick="requestInfo(\''+escH(c.email)+'\')">📌 Req. Info</button>'
        +'<button class="a-action-btn" onclick="deleteClient(\''+escH(c.email)+'\')">🗑</button>'
        +'</td></tr>';
    }).join('');
}

function renderSubmissions(){
  var creds = getCredentials();
  var html = '';
  creds.filter(function(c){return c.role==='client';}).forEach(function(c){
    var d = DB.get('client_'+c.email);
    if(!d||d.status==='pending') return;
    html += '<div style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,.04);">'
      +'<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:6px;">'
      +'<span style="font-weight:600;color:var(--white);">'+escH(c.name)+'</span>'
      +'<span style="color:var(--muted);font-size:.78rem;">'+escH(c.email)+'</span>'
      +'<span class="a-badge '+(d.status==='submitted'?'submitted':d.status==='frozen'?'frozen':'info')+'">'+d.status+'</span>'
      +'</div>'
      +'<div style="font-size:.78rem;color:var(--muted);">Submitted: '+(d.submitted_at||'—').substring(0,16)+'</div>'
      +'<div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap;">'
      +(d.docs||[]).map(function(f){return '<span style="background:rgba(0,180,216,.05);border:1px solid var(--border);border-radius:5px;padding:2px 8px;font-size:.73rem;color:var(--muted-lt);">📄 '+escH(f)+'</span>';}).join('')
      +'</div></div>';
  });
  document.getElementById('submissionsList').innerHTML = html || '<span style="color:var(--muted);">No submissions yet.</span>';
}

function renderAwaiting(){
  var creds = getCredentials();
  var html = '';
  creds.filter(function(c){return c.role==='client';}).forEach(function(c){
    var d = DB.get('client_'+c.email);
    if(d && d.status!=='pending' && d.status!=='info_requested') return;
    html += '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.04);">'
      +'<div style="flex:1;min-width:160px;"><div style="font-weight:600;color:var(--white);font-size:.85rem;">'+escH(c.name)+'</div><div style="font-size:.75rem;color:var(--muted);">'+escH(c.email)+'</div></div>'
      +'<a href="https://wa.me/'+((c.phone||'').replace(/\\D/g,''))+'?text=Hi%20'+encodeURIComponent(c.name||'')+'%2C%20please%20submit%20your%20documents%20via%20the%20Fintex%20portal." target="_blank" rel="noopener" class="a-action-btn">💬 WhatsApp</a>'
      +'<button class="a-action-btn" onclick="requestInfo(\''+escH(c.email)+'\')">📌 Request Info</button>'
      +'</div>';
  });
  document.getElementById('awaitingList').innerHTML = html || '<span style="color:var(--muted);">All clients have submitted — great!</span>';
}

function renderCredentials(){
  var creds = getCredentials();
  document.getElementById('credsList').innerHTML = creds.map(function(c,i){
    return '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04);">'
      +'<span style="min-width:160px;font-size:.82rem;color:var(--white);">'+escH(c.email)+'</span>'
      +'<span style="font-size:.75rem;background:rgba(0,180,216,.07);color:var(--cyan);padding:2px 8px;border-radius:10px;">'+c.role+'</span>'
      +'<span style="font-size:.75rem;color:var(--muted);">'+escH(c.name||'')+'</span>'
      +'<button class="a-action-btn" onclick="resetCred('+i+')">🔄 Reset</button>'
      +(i>=2?'<button class="a-action-btn" onclick="deleteCred('+i+')">🗑</button>':'')
      +'</div>';
  }).join('');
}

// Admin actions
function freezeClient(email){
  var d = DB.get('client_'+email) || {status:'pending'};
  d.status = d.status==='frozen' ? 'pending' : 'frozen';
  DB.set('client_'+email, d);
  renderClients();
}
function requestInfo(email){
  var note = prompt('Enter message for client (what info/docs are needed):','Please resubmit with the following documents:');
  if(note===null) return;
  var d = DB.get('client_'+email) || {};
  d.status = 'info_requested';
  d.admin_note = note;
  DB.set('client_'+email, d);
  renderClients();
}
function addClient(){
  var email = prompt('Client email:');
  if(!email) return;
  var name = prompt('Client name:');
  if(!name) return;
  var pass = prompt('Temporary password:');
  if(!pass) return;
  var region = prompt('Region (AU / India / UAE):') || '';
  var service = prompt('Service assigned:') || '';
  var creds = getCredentials();
  creds.push({email:email.trim(), password:pass, role:'client', name:name, region:region, service:service});
  DB.set('credentials', creds);
  renderClients();
  renderCredentials();
}
function deleteClient(email){
  if(!confirm('Delete client '+email+'?')) return;
  var creds = getCredentials().filter(function(c){return c.email!==email;});
  DB.set('credentials', creds);
  DB.del('client_'+email);
  renderClients();
}
function addCredential(){
  var email = document.getElementById('newCredEmail').value.trim();
  var pass  = document.getElementById('newCredPass').value;
  var role  = document.getElementById('newCredRole').value;
  if(!email||!pass){alert('Email and password required.');return;}
  var creds = getCredentials();
  var existing = creds.findIndex(function(c){return c.email.toLowerCase()===email.toLowerCase();});
  if(existing>=0){creds[existing].password=pass;creds[existing].role=role;}
  else creds.push({email:email, password:pass, role:role, name:email.split('@')[0]});
  DB.set('credentials', creds);
  document.getElementById('newCredEmail').value='';
  document.getElementById('newCredPass').value='';
  renderCredentials();
  alert('Credential saved.');
}
function resetCred(i){
  var np = prompt('Enter new password:');
  if(!np) return;
  var creds = getCredentials();
  creds[i].password = np;
  DB.set('credentials', creds);
  renderCredentials();
  alert('Password updated.');
}
function deleteCred(i){
  var creds = getCredentials();
  if(!confirm('Remove '+creds[i].email+'?')) return;
  creds.splice(i,1);
  DB.set('credentials', creds);
  renderCredentials();
}
function exportCSV(){
  var an = JSON.parse(localStorage.getItem('fintex_analytics')||'{}');
  var leads = an.leads || [];
  if(!leads.length){alert('No leads to export.');return;}
  var rows = [['Date','First Name','Last Name','Email','Phone','Region','Service','Message']];
  leads.forEach(function(l){rows.push([(l.timestamp||'').substring(0,10),l.firstName||'',l.lastName||'',l.email||'',l.phone||'',l.region||'',l.service||'',l.message||'']);});
  var csv = rows.map(function(r){return r.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');}).join('\\n');
  var a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download='fintex-leads.csv';a.click();
}
function escH(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

window.addEventListener('scroll',function(){document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>20);});
(function(){try{var k='fintex_analytics',d=JSON.parse(localStorage.getItem(k)||'{}'),t=new Date().toISOString().split('T')[0];if(!d.pageviews)d.pageviews={};d.pageviews['portal.html']=(d.pageviews['portal.html']||0)+1;localStorage.setItem(k,JSON.stringify(d));}catch(e){}})();
</script>
</body></html>'''

with open(os.path.join(WORK,'portal.html'),'w',encoding='utf-8') as f:
    f.write(portal_html)
print("portal.html (combined) done")
