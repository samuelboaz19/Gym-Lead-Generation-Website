// ─── CURSOR ────────────────────────────────────────────────
const cur = document.getElementById('cursor');
const curR = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top = e.clientY + 'px';
  setTimeout(() => {
    curR.style.left = e.clientX + 'px';
    curR.style.top = e.clientY + 'px';
  }, 80);
});
document.querySelectorAll('input, button, a').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width = '18px'; cur.style.height = '18px';
    cur.style.background = '#0057ff';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width = '10px'; cur.style.height = '10px';
    cur.style.background = 'var(--red)';
  });
});

// ─── STEP PROGRESS ────────────────────────────────────────
function stepProgress(step) {
  const dots = ['sd1','sd2','sd3'];
  dots.forEach((id, i) => {
    const dot = document.getElementById(id);
    dot.className = 'step-dot';
    if (i < step) dot.classList.add('done');
    else if (i === step) dot.classList.add('active');
  });
}

// ─── VALIDATION ───────────────────────────────────────────
function clearErr(fieldId) {
  document.getElementById(fieldId).classList.remove('has-error');
}

function validate() {
  let ok = true;
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!fname) { document.getElementById('field-fname').classList.add('has-error'); ok = false; }
  if (!lname) { document.getElementById('field-lname').classList.add('has-error'); ok = false; }
  if (!phone || phone.length < 7) { document.getElementById('field-phone').classList.add('has-error'); ok = false; }
  if (!email || !email.includes('@')) { document.getElementById('field-email').classList.add('has-error'); ok = false; }
  return ok;
}

// ════════════════════════════════════════════════════════════
//  ★ PASTE YOUR GOOGLE SCRIPT URL HERE
// ════════════════════════════════════════════════════════════
const SHEET_URL = 'YOUR_GOOGLE_SCRIPT_URL';

// ════════════════════════════════════════════════════════════
//  ★ PASTE YOUR WHATSAPP DETAILS HERE
// ════════════════════════════════════════════════════════════
const WA_NUMBER = 'YOUR_WHATSAPP_NUMBER';
const WA_APIKEY = 'YOUR_API_KEY';

// ─── GOOGLE SHEETS ────────────────────────────────────────
function saveToGoogleSheet(fname, lname, phone, email) {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const url = SHEET_URL
    + '?firstName='  + encodeURIComponent(fname)
    + '&lastName='   + encodeURIComponent(lname)
    + '&phone='      + encodeURIComponent(phone)
    + '&email='      + encodeURIComponent(email)
    + '&timestamp='  + encodeURIComponent(timestamp)
    + '&source=1S+FIT+Society+Website';
  fetch(url, { method: 'GET', mode: 'no-cors' }).catch(() => {});
}

// ─── WHATSAPP ─────────────────────────────────────────────
function sendWhatsApp(fname, lname, phone, email) {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const msg = '🏋️ NEW 1S FIT LEAD!\n\nName: ' + fname + ' ' + lname
    + '\nPhone: ' + phone + '\nEmail: ' + email
    + '\nTime: ' + timestamp + '\n\n— 1S FIT Society';
  const url = 'https://api.callmebot.com/whatsapp.php?phone=' + WA_NUMBER
    + '&text=' + encodeURIComponent(msg) + '&apikey=' + WA_APIKEY;
  fetch(url, { method: 'GET', mode: 'no-cors' }).catch(() => {});
}

// ─── SUBMIT ───────────────────────────────────────────────
function submitForm() {
  if (!validate()) return;
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();

  const btn = document.getElementById('submit-btn');
  const txt = document.getElementById('btn-text');
  const spn = document.getElementById('spinner');
  btn.disabled = true;
  txt.style.display = 'none';
  spn.style.display = 'block';
  stepProgress(3);

  saveToGoogleSheet(fname, lname, phone, email);
  sendWhatsApp(fname, lname, phone, email);

  setTimeout(() => {
    document.getElementById('success-overlay').classList.add('show');
  }, 1200);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter') submitForm();
});
