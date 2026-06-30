// Navbar background on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Fade-up on scroll
const faders = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
faders.forEach(el => observer.observe(el));

// Accordion
document.querySelectorAll('.acc-head').forEach(head => {
  head.addEventListener('click', () => {
    const item = head.closest('.acc-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const navBackdrop = document.querySelector('.nav-backdrop');

function closeMobileNav() {
  if (!navToggle) return;
  navToggle.classList.remove('open');
  mobileNav.classList.remove('open');
  navBackdrop.classList.remove('open');
  document.body.classList.remove('nav-open');
}

if (navToggle && mobileNav && navBackdrop) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navBackdrop.classList.toggle('open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });

  navBackdrop.addEventListener('click', closeMobileNav);
}

// Smooth-scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      closeMobileNav();
    }
  });
});

// Searchable country-code dropdown
const COUNTRIES = [
  { name: "Afghanistan", iso: "AF", code: "+93" },
  { name: "Albania", iso: "AL", code: "+355" },
  { name: "Algeria", iso: "DZ", code: "+213" },
  { name: "Andorra", iso: "AD", code: "+376" },
  { name: "Angola", iso: "AO", code: "+244" },
  { name: "Antigua and Barbuda", iso: "AG", code: "+1268" },
  { name: "Argentina", iso: "AR", code: "+54" },
  { name: "Armenia", iso: "AM", code: "+374" },
  { name: "Australia", iso: "AU", code: "+61" },
  { name: "Austria", iso: "AT", code: "+43" },
  { name: "Azerbaijan", iso: "AZ", code: "+994" },
  { name: "Bahamas", iso: "BS", code: "+1242" },
  { name: "Bahrain", iso: "BH", code: "+973" },
  { name: "Bangladesh", iso: "BD", code: "+880" },
  { name: "Barbados", iso: "BB", code: "+1246" },
  { name: "Belarus", iso: "BY", code: "+375" },
  { name: "Belgium", iso: "BE", code: "+32" },
  { name: "Belize", iso: "BZ", code: "+501" },
  { name: "Benin", iso: "BJ", code: "+229" },
  { name: "Bhutan", iso: "BT", code: "+975" },
  { name: "Bolivia", iso: "BO", code: "+591" },
  { name: "Bosnia and Herzegovina", iso: "BA", code: "+387" },
  { name: "Botswana", iso: "BW", code: "+267" },
  { name: "Brazil", iso: "BR", code: "+55" },
  { name: "Brunei", iso: "BN", code: "+673" },
  { name: "Bulgaria", iso: "BG", code: "+359" },
  { name: "Burkina Faso", iso: "BF", code: "+226" },
  { name: "Burundi", iso: "BI", code: "+257" },
  { name: "Cambodia", iso: "KH", code: "+855" },
  { name: "Cameroon", iso: "CM", code: "+237" },
  { name: "Canada", iso: "CA", code: "+1" },
  { name: "Cape Verde", iso: "CV", code: "+238" },
  { name: "Central African Republic", iso: "CF", code: "+236" },
  { name: "Chad", iso: "TD", code: "+235" },
  { name: "Chile", iso: "CL", code: "+56" },
  { name: "China", iso: "CN", code: "+86" },
  { name: "Colombia", iso: "CO", code: "+57" },
  { name: "Comoros", iso: "KM", code: "+269" },
  { name: "Congo", iso: "CG", code: "+242" },
  { name: "Congo (DRC)", iso: "CD", code: "+243" },
  { name: "Costa Rica", iso: "CR", code: "+506" },
  { name: "Croatia", iso: "HR", code: "+385" },
  { name: "Cuba", iso: "CU", code: "+53" },
  { name: "Cyprus", iso: "CY", code: "+357" },
  { name: "Czech Republic", iso: "CZ", code: "+420" },
  { name: "Denmark", iso: "DK", code: "+45" },
  { name: "Djibouti", iso: "DJ", code: "+253" },
  { name: "Dominica", iso: "DM", code: "+1767" },
  { name: "Dominican Republic", iso: "DO", code: "+1809" },
  { name: "Ecuador", iso: "EC", code: "+593" },
  { name: "Egypt", iso: "EG", code: "+20" },
  { name: "El Salvador", iso: "SV", code: "+503" },
  { name: "Equatorial Guinea", iso: "GQ", code: "+240" },
  { name: "Eritrea", iso: "ER", code: "+291" },
  { name: "Estonia", iso: "EE", code: "+372" },
  { name: "Eswatini", iso: "SZ", code: "+268" },
  { name: "Ethiopia", iso: "ET", code: "+251" },
  { name: "Fiji", iso: "FJ", code: "+679" },
  { name: "Finland", iso: "FI", code: "+358" },
  { name: "France", iso: "FR", code: "+33" },
  { name: "Gabon", iso: "GA", code: "+241" },
  { name: "Gambia", iso: "GM", code: "+220" },
  { name: "Georgia", iso: "GE", code: "+995" },
  { name: "Germany", iso: "DE", code: "+49" },
  { name: "Ghana", iso: "GH", code: "+233" },
  { name: "Greece", iso: "GR", code: "+30" },
  { name: "Grenada", iso: "GD", code: "+1473" },
  { name: "Guatemala", iso: "GT", code: "+502" },
  { name: "Guinea", iso: "GN", code: "+224" },
  { name: "Guinea-Bissau", iso: "GW", code: "+245" },
  { name: "Guyana", iso: "GY", code: "+592" },
  { name: "Haiti", iso: "HT", code: "+509" },
  { name: "Honduras", iso: "HN", code: "+504" },
  { name: "Hong Kong", iso: "HK", code: "+852" },
  { name: "Hungary", iso: "HU", code: "+36" },
  { name: "Iceland", iso: "IS", code: "+354" },
  { name: "India", iso: "IN", code: "+91" },
  { name: "Indonesia", iso: "ID", code: "+62" },
  { name: "Iran", iso: "IR", code: "+98" },
  { name: "Iraq", iso: "IQ", code: "+964" },
  { name: "Ireland", iso: "IE", code: "+353" },
  { name: "Israel", iso: "IL", code: "+972" },
  { name: "Italy", iso: "IT", code: "+39" },
  { name: "Jamaica", iso: "JM", code: "+1876" },
  { name: "Japan", iso: "JP", code: "+81" },
  { name: "Jordan", iso: "JO", code: "+962" },
  { name: "Kazakhstan", iso: "KZ", code: "+7" },
  { name: "Kenya", iso: "KE", code: "+254" },
  { name: "Kiribati", iso: "KI", code: "+686" },
  { name: "Kuwait", iso: "KW", code: "+965" },
  { name: "Kyrgyzstan", iso: "KG", code: "+996" },
  { name: "Laos", iso: "LA", code: "+856" },
  { name: "Latvia", iso: "LV", code: "+371" },
  { name: "Lebanon", iso: "LB", code: "+961" },
  { name: "Lesotho", iso: "LS", code: "+266" },
  { name: "Liberia", iso: "LR", code: "+231" },
  { name: "Libya", iso: "LY", code: "+218" },
  { name: "Liechtenstein", iso: "LI", code: "+423" },
  { name: "Lithuania", iso: "LT", code: "+370" },
  { name: "Luxembourg", iso: "LU", code: "+352" },
  { name: "Macau", iso: "MO", code: "+853" },
  { name: "Madagascar", iso: "MG", code: "+261" },
  { name: "Malawi", iso: "MW", code: "+265" },
  { name: "Malaysia", iso: "MY", code: "+60" },
  { name: "Maldives", iso: "MV", code: "+960" },
  { name: "Mali", iso: "ML", code: "+223" },
  { name: "Malta", iso: "MT", code: "+356" },
  { name: "Marshall Islands", iso: "MH", code: "+692" },
  { name: "Mauritania", iso: "MR", code: "+222" },
  { name: "Mauritius", iso: "MU", code: "+230" },
  { name: "Mexico", iso: "MX", code: "+52" },
  { name: "Micronesia", iso: "FM", code: "+691" },
  { name: "Moldova", iso: "MD", code: "+373" },
  { name: "Monaco", iso: "MC", code: "+377" },
  { name: "Mongolia", iso: "MN", code: "+976" },
  { name: "Montenegro", iso: "ME", code: "+382" },
  { name: "Morocco", iso: "MA", code: "+212" },
  { name: "Mozambique", iso: "MZ", code: "+258" },
  { name: "Myanmar", iso: "MM", code: "+95" },
  { name: "Namibia", iso: "NA", code: "+264" },
  { name: "Nauru", iso: "NR", code: "+674" },
  { name: "Nepal", iso: "NP", code: "+977" },
  { name: "Netherlands", iso: "NL", code: "+31" },
  { name: "New Zealand", iso: "NZ", code: "+64" },
  { name: "Nicaragua", iso: "NI", code: "+505" },
  { name: "Niger", iso: "NE", code: "+227" },
  { name: "Nigeria", iso: "NG", code: "+234" },
  { name: "North Korea", iso: "KP", code: "+850" },
  { name: "North Macedonia", iso: "MK", code: "+389" },
  { name: "Norway", iso: "NO", code: "+47" },
  { name: "Oman", iso: "OM", code: "+968" },
  { name: "Pakistan", iso: "PK", code: "+92" },
  { name: "Palau", iso: "PW", code: "+680" },
  { name: "Palestine", iso: "PS", code: "+970" },
  { name: "Panama", iso: "PA", code: "+507" },
  { name: "Papua New Guinea", iso: "PG", code: "+675" },
  { name: "Paraguay", iso: "PY", code: "+595" },
  { name: "Peru", iso: "PE", code: "+51" },
  { name: "Philippines", iso: "PH", code: "+63" },
  { name: "Poland", iso: "PL", code: "+48" },
  { name: "Portugal", iso: "PT", code: "+351" },
  { name: "Qatar", iso: "QA", code: "+974" },
  { name: "Romania", iso: "RO", code: "+40" },
  { name: "Russia", iso: "RU", code: "+7" },
  { name: "Rwanda", iso: "RW", code: "+250" },
  { name: "Saint Kitts and Nevis", iso: "KN", code: "+1869" },
  { name: "Saint Lucia", iso: "LC", code: "+1758" },
  { name: "Saint Vincent and the Grenadines", iso: "VC", code: "+1784" },
  { name: "Samoa", iso: "WS", code: "+685" },
  { name: "San Marino", iso: "SM", code: "+378" },
  { name: "Sao Tome and Principe", iso: "ST", code: "+239" },
  { name: "Saudi Arabia", iso: "SA", code: "+966" },
  { name: "Senegal", iso: "SN", code: "+221" },
  { name: "Serbia", iso: "RS", code: "+381" },
  { name: "Seychelles", iso: "SC", code: "+248" },
  { name: "Sierra Leone", iso: "SL", code: "+232" },
  { name: "Singapore", iso: "SG", code: "+65" },
  { name: "Slovakia", iso: "SK", code: "+421" },
  { name: "Slovenia", iso: "SI", code: "+386" },
  { name: "Solomon Islands", iso: "SB", code: "+677" },
  { name: "Somalia", iso: "SO", code: "+252" },
  { name: "South Africa", iso: "ZA", code: "+27" },
  { name: "South Korea", iso: "KR", code: "+82" },
  { name: "South Sudan", iso: "SS", code: "+211" },
  { name: "Spain", iso: "ES", code: "+34" },
  { name: "Sri Lanka", iso: "LK", code: "+94" },
  { name: "Sudan", iso: "SD", code: "+249" },
  { name: "Suriname", iso: "SR", code: "+597" },
  { name: "Sweden", iso: "SE", code: "+46" },
  { name: "Switzerland", iso: "CH", code: "+41" },
  { name: "Syria", iso: "SY", code: "+963" },
  { name: "Taiwan", iso: "TW", code: "+886" },
  { name: "Tajikistan", iso: "TJ", code: "+992" },
  { name: "Tanzania", iso: "TZ", code: "+255" },
  { name: "Thailand", iso: "TH", code: "+66" },
  { name: "Timor-Leste", iso: "TL", code: "+670" },
  { name: "Togo", iso: "TG", code: "+228" },
  { name: "Tonga", iso: "TO", code: "+676" },
  { name: "Trinidad and Tobago", iso: "TT", code: "+1868" },
  { name: "Tunisia", iso: "TN", code: "+216" },
  { name: "Turkey", iso: "TR", code: "+90" },
  { name: "Turkmenistan", iso: "TM", code: "+993" },
  { name: "Tuvalu", iso: "TV", code: "+688" },
  { name: "Uganda", iso: "UG", code: "+256" },
  { name: "Ukraine", iso: "UA", code: "+380" },
  { name: "United Arab Emirates", iso: "AE", code: "+971" },
  { name: "United Kingdom", iso: "GB", code: "+44" },
  { name: "United States", iso: "US", code: "+1" },
  { name: "Uruguay", iso: "UY", code: "+598" },
  { name: "Uzbekistan", iso: "UZ", code: "+998" },
  { name: "Vanuatu", iso: "VU", code: "+678" },
  { name: "Vatican City", iso: "VA", code: "+379" },
  { name: "Venezuela", iso: "VE", code: "+58" },
  { name: "Vietnam", iso: "VN", code: "+84" },
  { name: "Yemen", iso: "YE", code: "+967" },
  { name: "Zambia", iso: "ZM", code: "+260" },
  { name: "Zimbabwe", iso: "ZW", code: "+263" }
];

const ccSelect = document.getElementById('ccSelect');
if (ccSelect) {
  const ccTrigger = ccSelect.querySelector('.cc-trigger');
  const ccTriggerText = ccSelect.querySelector('.cc-trigger-text');
  const ccValue = document.getElementById('ccValue');
  const ccDropdown = ccSelect.querySelector('.cc-dropdown');
  const ccSearch = ccSelect.querySelector('.cc-search');
  const ccList = ccSelect.querySelector('.cc-list');

  function renderList(filter = '') {
    const q = filter.trim().toLowerCase();
    const matches = COUNTRIES.filter(c =>
      !q || c.name.toLowerCase().includes(q) || c.code.includes(q) || c.iso.toLowerCase() === q
    );
    ccList.innerHTML = '';
    if (matches.length === 0) {
      const li = document.createElement('li');
      li.className = 'cc-empty';
      li.textContent = 'No country found';
      ccList.appendChild(li);
      return;
    }
    matches.forEach(c => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.dataset.code = c.code;
      li.innerHTML = `<span class="cc-item-name">${c.name}</span><span class="cc-item-code">${c.code}</span>`;
      li.addEventListener('click', () => {
        ccValue.value = c.code;
        ccTriggerText.textContent = `${c.iso} ${c.code}`;
        closeCcDropdown();
      });
      ccList.appendChild(li);
    });
  }

  function openCcDropdown() {
    ccSelect.classList.add('open');
    ccTrigger.setAttribute('aria-expanded', 'true');
    ccSearch.value = '';
    renderList();
    setTimeout(() => ccSearch.focus(), 50);
  }

  function closeCcDropdown() {
    ccSelect.classList.remove('open');
    ccTrigger.setAttribute('aria-expanded', 'false');
  }

  ccTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    ccSelect.classList.contains('open') ? closeCcDropdown() : openCcDropdown();
  });

  ccSearch.addEventListener('input', () => renderList(ccSearch.value));
  ccSearch.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('click', (e) => {
    if (!ccSelect.contains(e.target)) closeCcDropdown();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCcDropdown();
  });

  renderList();
}
