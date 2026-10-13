/* ========================================================
   FOR YOU ZAHROTIY 🤍 — JAVASCRIPT
   Smooth ambient sparkles, elegant golden petals, audio control
======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const introOverlay = document.getElementById('introOverlay');
  const openGiftBtn = document.getElementById('openGiftBtn');
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  const wishDisplay = document.getElementById('wishDisplay');
  const newWishBtn = document.getElementById('newWishBtn');
  const confettiBtn = document.getElementById('confettiBtn');
  const bgCanvas = document.getElementById('bg-canvas');

  // Poetic Islamic Wishes & Duas
  const islamicWishes = [
    "«Yo Alloh, Zahrotiyyimni har yomonlikdan asra va uni doimo baxtli qil! Omin 🤍»",
    "«Seni Alloh uchun sevaman — bu sevgi eng pok va eng abadiy sevgidir ☪️»",
    "«Yo Rabbiy, uni mening qalbimga, meni uning qalbiga xayrli juft et! Omin»",
    "«Alloh sening tabassumingni hech arimasin, yuzingni doimo nurli saqlasin 🤍»",
    "«6 yildan beri har bir sajdamda seni Allohdan so'rayman... Omin yo Robbiy!»",
    "«Alloh ikkalamizni dunyoda ham, oxiratda ham birga qilsin — mening oliy niyatim ☪️»",
    "«Rasululloh ﷺ: "Alloh uchun sevish — imonning eng go'zal halovatidir" 🤍»",
    "«Yo Alloh, Zahroga uzun umr, barakali hayot va cheksiz tinchlik ato et! Omin»",
    "«Sening hijobingdagi hayolaring va sabring — meni har kun Yaratganga shukr qilishga undaydi ✨»",
    "«Allohim, seni menga eng go'zal ne'mat qilib bergani uchun ming bor shukr! 🤍»"
  ];

  let currentWishIndex = 0;

  // Ultra Elegant Luxury Confetti
  function triggerIslamicConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#e5c378', '#52b788', '#ffffff', '#f9e2af', '#2e7d5e'],
        ticks: 250,
        gravity: 0.8
      });

      // Side golden showers
      const end = Date.now() + 1400;
      const interval = setInterval(function() {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
          startVelocity: 35,
          spread: 360,
          ticks: 80,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: ['#e5c378', '#f9e2af', '#ffffff', '#52b788']
        });
      }, 240);
    }
  }

  // Open Gift
  openGiftBtn.addEventListener('click', () => {
    introOverlay.classList.add('hide');
    triggerIslamicConfetti();
    playMusic();
  });

  // Music Playback
  let isPlaying = false;

  function playMusic() {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicToggle.classList.add('playing');
    }).catch(err => {
      console.log('Audio playback notice:', err);
    });
  }

  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
      musicToggle.classList.remove('playing');
    } else {
      playMusic();
    }
  });

  // Wishes Transition
  newWishBtn.addEventListener('click', () => {
    currentWishIndex = (currentWishIndex + 1) % islamicWishes.length;
    wishDisplay.style.opacity = '0';
    wishDisplay.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      wishDisplay.textContent = islamicWishes[currentWishIndex];
      wishDisplay.style.opacity = '1';
      wishDisplay.style.transform = 'translateY(0)';
    }, 280);

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 22,
        spread: 45,
        origin: { y: 0.82 },
        colors: ['#e5c378', '#52b788', '#ffffff']
      });
    }
  });

  confettiBtn.addEventListener('click', () => {
    triggerIslamicConfetti();
  });

  // ========================================================
  // Canvas: Soft Glowing Gold & Emerald Starlight Ambient
  // ========================================================
  const ctx = bgCanvas.getContext('2d');
  let width = (bgCanvas.width = window.innerWidth);
  let height = (bgCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = bgCanvas.width = window.innerWidth;
    height = bgCanvas.height = window.innerHeight;
  });

  class EtherealOrb {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.radius = Math.random() * 2.5 + 1.2;
      this.speedY = Math.random() * 0.45 + 0.25;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.baseOpacity = Math.random() * 0.4 + 0.25;
      this.opacity = this.baseOpacity;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulse = Math.random() * Math.PI;

      // Color scheme
      const rand = Math.random();
      if (rand > 0.6) {
        this.color = '229, 195, 120'; // Warm luxury gold
      } else if (rand > 0.3) {
        this.color = '82, 183, 136';  // Soft emerald
      } else {
        this.color = '255, 255, 255';  // Pure white star
      }
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.pulse += this.pulseSpeed;
      this.opacity = this.baseOpacity + Math.sin(this.pulse) * 0.18;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${Math.max(0.1, this.opacity)})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(${this.color}, 0.8)`;
      ctx.fill();
      ctx.restore();
    }
  }

  const orbCount = 38;
  const orbs = [];
  for (let i = 0; i < orbCount; i++) {
    const orb = new EtherealOrb();
    orb.y = Math.random() * height; // evenly populate
    orbs.push(orb);
  }

  function renderAmbient() {
    ctx.clearRect(0, 0, width, height);
    orbs.forEach(orb => {
      orb.update();
      orb.draw();
    });
    requestAnimationFrame(renderAmbient);
  }

  renderAmbient();
});
