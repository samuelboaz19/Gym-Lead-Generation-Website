// ============================================================
// THREE.JS 3D BACKGROUND — Floating Dumbbells + Particles
// ============================================================
(function() {
  const canvas = document.getElementById('canvas-bg');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 10;

  // ── LIGHTS ────────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));

  const redLight = new THREE.PointLight(0xe8002d, 10, 30);
  redLight.position.set(-4, 3, 6);
  scene.add(redLight);

  const blueLight = new THREE.PointLight(0x0057ff, 8, 30);
  blueLight.position.set(4, -2, 6);
  scene.add(blueLight);

  const topLight = new THREE.DirectionalLight(0xffffff, 1.8);
  topLight.position.set(0, 8, 12);
  scene.add(topLight);

  const fillLight = new THREE.PointLight(0xffffff, 3, 20);
  fillLight.position.set(0, 0, 8);
  scene.add(fillLight);

  // ── MATERIALS ─────────────────────────────────────────────
  const steelMat  = new THREE.MeshStandardMaterial({ color: 0xd0d0d8, metalness: 1.0, roughness: 0.08 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 1.0, roughness: 0.05 });
  const darkMat   = new THREE.MeshStandardMaterial({ color: 0x1a1a22, metalness: 0.9, roughness: 0.2 });
  const redMat    = new THREE.MeshStandardMaterial({ color: 0xe8002d, metalness: 0.7, roughness: 0.1, emissive: 0xe8002d, emissiveIntensity: 0.5 });
  const blueMat   = new THREE.MeshStandardMaterial({ color: 0x0057ff, metalness: 0.7, roughness: 0.1, emissive: 0x0057ff, emissiveIntensity: 0.4 });
  const goldMat   = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });

  // ── HERO BARBELL ─────────────────────────────────────────
  function buildBarbell(scl) {
    const g = new THREE.Group();

    // Long bar
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 6.0, 24), chromeMat);
    bar.rotation.z = Math.PI / 2;
    g.add(bar);

    // Knurling bands (dark stripes)
    [-1.4, -0.7, 0, 0.7, 1.4].forEach(x => {
      const k = new THREE.Mesh(new THREE.CylinderGeometry(0.050, 0.050, 0.22, 20), darkMat);
      k.rotation.z = Math.PI / 2; k.position.x = x;
      g.add(k);
    });

    // Plates function
    function plates(xBig, xSmall) {
      // big outer plate
      const bigP = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.24, 36), redMat);
      bigP.rotation.z = Math.PI / 2; bigP.position.x = xBig; g.add(bigP);
      // plate hole
      const h1 = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.26, 16), chromeMat);
      h1.rotation.z = Math.PI / 2; h1.position.x = xBig; g.add(h1);
      // rim ring
      const r1 = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.02, 8, 36), chromeMat);
      r1.rotation.y = Math.PI / 2; r1.position.x = xBig; g.add(r1);
      // inner groove ring
      const gr = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.015, 8, 36), darkMat);
      gr.rotation.y = Math.PI / 2; gr.position.x = xBig; g.add(gr);
      // smaller second plate
      const smP = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 0.18, 32), darkMat);
      smP.rotation.z = Math.PI / 2; smP.position.x = xSmall; g.add(smP);
      const h2 = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.20, 16), chromeMat);
      h2.rotation.z = Math.PI / 2; h2.position.x = xSmall; g.add(h2);
    }
    plates(-2.4, -2.0);
    plates( 2.4,  2.0);

    // Collar locks — BLUE glow
    [-1.7, 1.7].forEach(x => {
      const cl = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.20, 18), blueMat);
      cl.rotation.z = Math.PI / 2; cl.position.x = x; g.add(cl);
      const ct = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.015, 8, 18), blueMat);
      ct.rotation.y = Math.PI / 2; ct.position.x = x; g.add(ct);
    });

    // End caps — gold
    [-2.95, 2.95].forEach(x => {
      const ec = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.15, 16), goldMat);
      ec.rotation.z = Math.PI / 2; ec.position.x = x; g.add(ec);
    });

    g.scale.setScalar(scl);
    return g;
  }

  const heroBarbell = buildBarbell(1.0);
  heroBarbell.position.set(0, 0.3, 0);
  scene.add(heroBarbell);

  // ── DUMBBELL BUILDER ─────────────────────────────────────
  function buildDumbbell(scl, platCol) {
    const g = new THREE.Group();
    const pMat = platCol === 'red' ? redMat : platCol === 'blue' ? blueMat : darkMat;

    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 1.6, 16), chromeMat);
    bar.rotation.z = Math.PI / 2; g.add(bar);

    // Knurl center
    const kn = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.5, 16), darkMat);
    kn.rotation.z = Math.PI / 2; g.add(kn);

    [-0.65, 0.65].forEach(x => {
      const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.16, 24), pMat);
      p1.rotation.z = Math.PI / 2; p1.position.x = x; g.add(p1);
      const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.18, 20), darkMat);
      p2.rotation.z = Math.PI / 2; p2.position.x = x * 0.78; g.add(p2);
      const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.18, 12), chromeMat);
      hole.rotation.z = Math.PI / 2; hole.position.x = x; g.add(hole);
    });

    // End caps
    [-0.85, 0.85].forEach(x => {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), chromeMat);
      cap.position.x = x; g.add(cap);
    });

    g.scale.setScalar(scl);
    return g;
  }

  // ── FLOATING DUMBBELLS (scattered background) ────────────
  const dumbbells = [];
  const dbConfigs = [
    { pos: [-6.0,  2.8, -4.5], scl: 0.55, col: 'red',  rx: 0.006, ry: 0.010 },
    { pos: [ 6.2, -2.0, -5.5], scl: 0.48, col: 'blue', rx:-0.007, ry: 0.008 },
    { pos: [-4.5, -3.2, -6.0], scl: 0.42, col: 'dark', rx: 0.009, ry:-0.006 },
    { pos: [ 5.5,  3.5, -7.5], scl: 0.60, col: 'red',  rx:-0.005, ry: 0.012 },
    { pos: [-6.8,  0.5, -7.0], scl: 0.38, col: 'blue', rx: 0.008, ry:-0.009 },
    { pos: [ 1.5, -4.5, -5.5], scl: 0.45, col: 'dark', rx:-0.006, ry: 0.007 },
    { pos: [ 0.0,  5.0, -9.0], scl: 0.50, col: 'red',  rx: 0.007, ry: 0.005 },
    { pos: [-3.5,  4.0,-10.0], scl: 0.35, col: 'blue', rx:-0.008, ry: 0.010 },
    { pos: [ 5.0,  1.0, -8.5], scl: 0.40, col: 'dark', rx: 0.005, ry:-0.007 },
    { pos: [-2.0, -5.0, -7.0], scl: 0.52, col: 'red',  rx: 0.010, ry: 0.006 },
    { pos: [ 7.5,  0.0, -9.0], scl: 0.44, col: 'blue', rx:-0.007, ry:-0.008 },
    { pos: [-7.0, -1.5, -8.5], scl: 0.46, col: 'dark', rx: 0.006, ry: 0.009 },
  ];
  dbConfigs.forEach(cfg => {
    const db = buildDumbbell(cfg.scl, cfg.col);
    db.position.set(...cfg.pos);
    db.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI*0.5);
    db.userData = { rx: cfg.rx, ry: cfg.ry, fs: 0.3+Math.random()*0.6, fo: Math.random()*Math.PI*2, iy: cfg.pos[1] };
    scene.add(db);
    dumbbells.push(db);
  });

  // ── PARTICLES ─────────────────────────────────────────────
  const pCount = 500;
  const pPos = new Float32Array(pCount * 3);
  const pCol = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i*3]   = (Math.random()-0.5)*40;
    pPos[i*3+1] = (Math.random()-0.5)*25;
    pPos[i*3+2] = (Math.random()-0.5)*20 - 5;
    const r = Math.random();
    if (r < 0.38)      { pCol[i*3]=0.91; pCol[i*3+1]=0;    pCol[i*3+2]=0.18; }
    else if (r < 0.72) { pCol[i*3]=0.0;  pCol[i*3+1]=0.34; pCol[i*3+2]=1.0;  }
    else               { pCol[i*3]=1.0;  pCol[i*3+1]=1.0;  pCol[i*3+2]=1.0;  }
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
  const pMesh = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.055, vertexColors: true, transparent: true, opacity: 0.9 }));
  scene.add(pMesh);

  // ── GRID LINES ────────────────────────────────────────────
  function gridLine(x1,y1,z1,x2,y2,z2,col,op) {
    const pts = [new THREE.Vector3(x1,y1,z1), new THREE.Vector3(x2,y2,z2)];
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op }));
  }
  for (let i = -7; i <= 7; i++) {
    scene.add(gridLine(i*2,-8,-14, i*2,8,-14, 0x0057ff, 0.12));
    scene.add(gridLine(-14,i*2,-14, 14,i*2,-14, 0xe8002d, 0.10));
  }

  // ── MOUSE ─────────────────────────────────────────────────
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = -(e.clientY / window.innerHeight - 0.5) * 2;
  });
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── ANIMATE ───────────────────────────────────────────────
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.01;

    // Hero barbell: float up/down + slow Y spin + gentle X tilt
    heroBarbell.position.y = 0.3 + Math.sin(t * 0.55) * 0.35;
    heroBarbell.rotation.y = t * 0.22;
    heroBarbell.rotation.x = Math.sin(t * 0.38) * 0.15;
    heroBarbell.rotation.z = Math.sin(t * 0.25) * 0.06;

    // Floating dumbbells — each spins + bobs independently
    dumbbells.forEach(db => {
      db.rotation.x += db.userData.rx;
      db.rotation.y += db.userData.ry;
      db.position.y = db.userData.iy + Math.sin(t * db.userData.fs + db.userData.fo) * 0.5;
    });

    // Particles drift
    pMesh.rotation.y = t * 0.015;
    pMesh.rotation.x = t * 0.008;

    // Parallax camera
    camera.position.x += (mx * 0.7 - camera.position.x) * 0.04;
    camera.position.y += (my * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    // Pulsing lights
    redLight.intensity  = 9  + Math.sin(t * 1.6) * 2.5;
    blueLight.intensity = 7  + Math.cos(t * 1.3) * 2.0;
    fillLight.intensity = 2.5 + Math.sin(t * 0.9) * 0.5;

    // Emissive pulse on red/blue materials
    redMat.emissiveIntensity  = 0.4 + Math.sin(t * 2.0) * 0.2;
    blueMat.emissiveIntensity = 0.35 + Math.cos(t * 1.7) * 0.15;

    renderer.render(scene, camera);
  }
  animate();
})();

// ============================================================
// CURSOR
// ============================================================
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  }, 80);
});
document.querySelectorAll('a, button, .program-card, .transform-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px'; cursor.style.height = '20px';
    cursor.style.background = 'var(--red)';
    cursorRing.style.width = '52px'; cursorRing.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    cursor.style.background = 'var(--neon)';
    cursorRing.style.width = '36px'; cursorRing.style.height = '36px';
  });
});

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// ============================================================
// TESTIMONIALS SLIDER
// ============================================================
const track = document.getElementById('testimonials-track');
const cards = track.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.t-dot');
let currentSlide = 0;
const totalSlides = 2;

function slideTo(index) {
  currentSlide = Math.max(0, Math.min(index, totalSlides));
  const cardW = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${currentSlide * cardW}px)`;
  cards.forEach((c, i) => c.classList.toggle('active', i === currentSlide));
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

document.getElementById('t-prev').addEventListener('click', () => slideTo(currentSlide - 1));
document.getElementById('t-next').addEventListener('click', () => slideTo(currentSlide + 1));
dots.forEach(dot => dot.addEventListener('click', () => slideTo(parseInt(dot.dataset.i))));

// Auto-slide
setInterval(() => slideTo((currentSlide + 1) % (totalSlides + 1)), 5000);

// ============================================================
// STAT COUNTER ANIMATION
// ============================================================
function animateCounter(el, target, suffix, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelector('.stat:nth-child(1) .stat-number').innerHTML = '<span id="c1">0</span><span class="accent">K+</span>';
      document.querySelector('.stat:nth-child(2) .stat-number').innerHTML = '<span id="c2">0</span><span class="accent">%</span>';
      document.querySelector('.stat:nth-child(3) .stat-number').innerHTML = '<span id="c3">0</span><span class="accent">+</span>';
      setTimeout(() => {
        animateCounter(document.getElementById('c1'), 5, '');
        animateCounter(document.getElementById('c2'), 100, '');
        animateCounter(document.getElementById('c3'), 10, '');
      }, 300);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ============================================================
// HERO TEXT ANIMATION ON LOAD
// ============================================================
window.addEventListener('load', () => {
  document.querySelector('.hero-badge').style.animation = 'badgePulse 3s ease-in-out infinite, fadeInUp 0.8s ease forwards';
  const heroTitle = document.querySelector('.hero-title');
  heroTitle.style.opacity = '0'; heroTitle.style.transform = 'translateY(30px)';
  heroTitle.style.transition = 'opacity 1s 0.3s, transform 1s 0.3s';
  setTimeout(() => { heroTitle.style.opacity = '1'; heroTitle.style.transform = 'translateY(0)'; }, 100);
  const heroSub = document.querySelector('.hero-sub');
  heroSub.style.opacity = '0'; heroSub.style.transform = 'translateY(20px)';
  heroSub.style.transition = 'opacity 1s 0.6s, transform 1s 0.6s';
  setTimeout(() => { heroSub.style.opacity = '1'; heroSub.style.transform = 'translateY(0)'; }, 100);
  const heroButtons = document.querySelector('.hero-buttons');
  heroButtons.style.opacity = '0'; heroButtons.style.transform = 'translateY(20px)';
  heroButtons.style.transition = 'opacity 1s 0.9s, transform 1s 0.9s';
  setTimeout(() => { heroButtons.style.opacity = '1'; heroButtons.style.transform = 'translateY(0)'; }, 100);
});



