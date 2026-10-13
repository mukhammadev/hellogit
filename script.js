/* ========================================================
   FOR YOU ZAHROTIY 🤍 — ISLAMIC JAVASCRIPT
   Floating crescents & stars, Islamic duas, confetti
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

  // Islamic Wishes & Duas
  const islamicWishes = [
    "«Yo Alloh, Zahrotiyyimni har yomonlikdan asra va uni doimo baxtli qil! Omin 🤍»",
    "«Seni Alloh uchun sevaman — bu sevgi eng pok va eng abadiy sevgidir ☪️»",
    "«Yo Rabbiy, uni meni uchun nasib qil va meni uning uchun nasib qil! Omin»",
    "«Alloh sening tabassumingni hech aritmsin, yuzingni doimo nurli saqlasn 🤍»",
    "«6 yildan beri har sajdamda seni Allohdan so'rayman... Omin yo Robbiy!»",
    "«Alloh ikkalamizni Jannatda ham birga qilsin — bu mening eng katta orzuim ☪️»",
    "«Rasululloh ﷺ aytdilar: Seni Alloh uchun sevdim — bu eng ulug' sevgidir 🤍»",
    "«Yo Alloh, Zahroga uzun umr, barakali hayot va cheksiz baxt nasib qil! Omin»",
    "«Sening hijobingdagi hayolaring, ilm yo'lidagi sabring — meni Yaratganga shukrga undaydi ✨»",
    "«Allohim, seni menga ato qilgani uchun ming bor shukr! Tug'ilgan kuning muborak, Zahrotiyyim 🤍»"
  ];

  let currentWishIndex = 0;

  // Confetti — emerald & gold themed
  function triggerIslamicConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2ecc71', '#f4d03f', '#ffffff', '#27ae60', '#d4a017']
      });

      const end = Date.now() + 1500;
      const interval = setInterval(function() {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: ['#2ecc71', '#f4d03f', '#ffffff', '#1a8a4a']
        });
      }, 250);
    }
  }

  // Open Gift
  openGiftBtn.addEventListener('click', () => {
    introOverlay.classList.add('hide');
    triggerIslamicConfetti();
    playMusic();
  });

  // Music
  let isPlaying = false;

  function playMusic() {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicToggle.classList.add('playing');
    }).catch(err => {
      console.log('Audio not loaded:', err);
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

  // Wishes
  newWishBtn.addEventListener('click', () => {
    currentWishIndex = (currentWishIndex + 1) % islamicWishes.length;
    wishDisplay.style.opacity = 0;
    setTimeout(() => {
      wishDisplay.textContent = islamicWishes[currentWishIndex];
      wishDisplay.style.opacity = 1;
    }, 250);

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#2ecc71', '#f4d03f']
      });
    }
  });

  confettiBtn.addEventListener('click', () => {
    triggerIslamicConfetti();
  });

  // ========================================
  // Background Canvas — Floating ☪️ and ✨
  // ========================================
  const ctx = bgCanvas.getContext('2d');
  let width = (bgCanvas.width = window.innerWidth);
  let height = (bgCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = bgCanvas.width = window.innerWidth;
    height = bgCanvas.height = window.innerHeight;
  });

  class IslamicParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 60;
      this.size = Math.random() * 16 + 10;
      this.speedY = Math.random() * 0.6 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.15;

      const rand = Math.random();
      if (rand > 0.6) {
        this.symbol = '☪️';
        this.color = '#2ecc71';
      } else if (rand > 0.3) {
        this.symbol = '✨';
        this.color = '#f4d03f';
      } else {
        this.symbol = '🤍';
        this.color = '#ffffff';
      }
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      if (this.y < -40) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.font = `${this.size}px serif`;
      ctx.fillText(this.symbol, this.x, this.y);
      ctx.restore();
    }
  }

  const particles = [];
  for (let i = 0; i < 22; i++) {
    const p = new IslamicParticle();
    p.y = Math.random() * height;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
