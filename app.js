// ─── NAVIGATION ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  }
}

document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-page]');
  if (target) {
    e.preventDefault();
    showPage(target.dataset.page);
  }
  const gotoBooking = e.target.closest('[data-goto-booking]');
  if (gotoBooking) {
    e.preventDefault();
    showPage('page-booking');
  }
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── BOOKING FORM ──────────────────────────────────────────
const loaderOverlay = document.getElementById('loader-overlay');
const driverResult = document.getElementById('driver-result');
const findBtn = document.getElementById('find-driver-btn');
const bookingFormEl = document.getElementById('booking-form');

const dummyDrivers = [
  {
    name: 'Rajan Kumar',
    emoji: '👨‍✈️',
    exp: '8 Years Experience',
    languages: 'Malayalam, English, Tamil, Hindi',
    traits: ['Punctual', 'Polite', 'Non-Smoker', 'AC Expert'],
    rating: '4.9',
    reviews_count: '312',
    area: 'Kollam & Nearby',
    vehicle: 'Comfortable with all car types',
    reviews: [
      { author: 'Anil Nair', stars: '★★★★★', text: 'Exceptional driver! Arrived on time and took the safest routes. Made our hospital visit stress-free. Highly recommended.' },
      { author: 'Priya Menon', stars: '★★★★★', text: 'Very professional and courteous. Drove us to the wedding venue and waited patiently. Will book again!' },
      { author: 'Suresh Pillai', stars: '★★★★☆', text: 'Good driver, knows Kollam roads very well. Polite and kept the car clean throughout the journey.' }
    ]
  },
  {
    name: 'Manoj Das',
    emoji: '🧑‍✈️',
    exp: '12 Years Experience',
    languages: 'Malayalam, Tamil, English',
    traits: ['Highway Expert', 'Long-trip Specialist', 'Calm Driver'],
    rating: '4.8',
    reviews_count: '547',
    area: 'All Kerala Routes',
    vehicle: 'Experienced in SUVs & Sedans',
    reviews: [
      { author: 'Deepa Thomas', stars: '★★★★★', text: 'Booked for a Trivandrum to Kochi long trip. Drove smoothly, no rash driving. Very knowledgeable about routes.' },
      { author: 'Rajesh Kumar', stars: '★★★★★', text: 'Excellent long-trip driver. Made multiple stops on request without any fuss. Very accommodating.' },
      { author: 'Sreeja Varma', stars: '★★★★☆', text: 'Good experience overall. Manoj was helpful and ensured we reached safely.' }
    ]
  },
  {
    name: 'Vinod Krishnan',
    emoji: '👨‍🦱',
    exp: '5 Years Experience',
    languages: 'Malayalam, English',
    traits: ['Friendly', 'City Expert', 'Helpful', 'Music Lover'],
    rating: '4.7',
    reviews_count: '189',
    area: 'Kollam City & District',
    vehicle: 'Hatchbacks, Sedans, Small SUVs',
    reviews: [
      { author: 'Meera Pillai', stars: '★★★★★', text: 'Wonderful experience! Vinod knew every shortcut in the city. Made my hospital appointment visit very comfortable.' },
      { author: 'Rahul Joseph', stars: '★★★★☆', text: 'Good city driver. Very helpful with luggage too. Arrived 10 minutes early!' },
      { author: 'Anitha Babu', stars: '★★★★★', text: 'Really friendly driver. Felt very safe throughout the trip. Will definitely book again for events.' }
    ]
  }
];

if (findBtn) {
  findBtn.addEventListener('click', () => {
    const pickup = document.getElementById('pickup').value.trim();
    const drop = document.getElementById('drop').value.trim();
    const datetime = document.getElementById('datetime').value;
    const duration = document.getElementById('duration').value;
    const purpose = document.getElementById('purpose').value;
    const custName = document.getElementById('cust-name').value.trim();

    if (!pickup || !drop || !datetime || !duration || !purpose || !custName) {
      let err = document.getElementById('form-error');
      if (!err) {
        err = document.createElement('div');
        err.id = 'form-error';
        err.style.cssText = 'color:#f87171;font-size:.88rem;text-align:center;margin-top:1rem;padding:.7rem;background:rgba(248,113,113,.1);border-radius:8px;border:1px solid rgba(248,113,113,.3);animation:fadeInUp .4s ease;';
        findBtn.parentElement.insertAdjacentElement('afterend', err);
      }
      err.textContent = '⚠️ Please fill in all fields before searching for a driver.';
      setTimeout(() => { if (err) err.remove(); }, 4000);
      return;
    }

    bookingFormEl.style.display = 'none';
    loaderOverlay.classList.add('show');
    driverResult.classList.remove('show');

    const driver = dummyDrivers[Math.floor(Math.random() * dummyDrivers.length)];

    setTimeout(() => {
      loaderOverlay.classList.remove('show');
      renderDriverCard(driver, { pickup, drop, datetime, duration, purpose, custName });
      driverResult.classList.add('show');
    }, 3200);
  });
}

function renderDriverCard(driver, booking) {
  const dt = new Date(booking.datetime);
  const dateStr = isNaN(dt) ? booking.datetime : dt.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = isNaN(dt) ? '' : dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  document.getElementById('d-emoji').textContent = driver.emoji;
  document.getElementById('d-name').textContent = driver.name;
  document.getElementById('d-exp').textContent = driver.exp;
  document.getElementById('d-rating').textContent = driver.rating;
  document.getElementById('d-reviews-count').textContent = `(${driver.reviews_count} reviews)`;

  const stars = parseFloat(driver.rating);
  const fullStars = Math.floor(stars);
  const halfStar = stars % 1 >= 0.5 ? '½' : '';
  document.getElementById('d-rating-stars').textContent = '★'.repeat(fullStars) + halfStar;

  const badgesEl = document.getElementById('d-badges');
  badgesEl.innerHTML = driver.traits.map(t => `<span class="badge">${t}</span>`).join('');

  document.getElementById('d-languages').textContent = driver.languages;
  document.getElementById('d-area').textContent = driver.area;
  document.getElementById('d-vehicle').textContent = driver.vehicle;

  const reviewsEl = document.getElementById('d-reviews');
  reviewsEl.innerHTML = driver.reviews.map(r => `
    <div class="review">
      <div class="review-header">
        <span class="review-author">${r.author}</span>
        <span class="review-stars">${r.stars}</span>
      </div>
      <p>${r.text}</p>
    </div>
  `).join('');

  const waMsg = encodeURIComponent(
`Hello DriveEase! 🚗

I'd like to confirm a driver booking:

👤 *Name:* ${booking.custName}
📍 *Pickup:* ${booking.pickup}
📍 *Drop:* ${booking.drop}
📅 *Date & Time:* ${dateStr}${timeStr ? ' at ' + timeStr : ''}
⏱️ *Duration:* ${booking.duration}
🎯 *Purpose:* ${booking.purpose}
🧑‍✈️ *Assigned Driver:* ${driver.name} (⭐ ${driver.rating})

Please confirm my booking. Thank you!`
  );

  const waBtn = document.getElementById('wa-confirm-btn');
  waBtn.href = `https://wa.me/919019933097?text=${waMsg}`;

  const resetBtn = document.getElementById('reset-booking');
  resetBtn.onclick = () => {
    driverResult.classList.remove('show');
    bookingFormEl.style.display = 'block';
    bookingFormEl.reset();
  };
}

// ─── CONTACT FORM ──────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('c-name').value;
    const phone = document.getElementById('c-phone').value;
    const subject = document.getElementById('c-subject').value;
    const message = document.getElementById('c-message').value;

    const waMsg = encodeURIComponent(`Hi DriveEase! 👋\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Subject:* ${subject}\n\n*Message:* ${message}`);
    window.open(`https://wa.me/919019933097?text=${waMsg}`, '_blank');

    document.getElementById('contact-form-wrapper').style.display = 'none';
    document.getElementById('form-success').classList.add('show');
  });
}

// ─── CHATBOT ──────────────────────────────────────────────
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatMessages = document.getElementById('chat-messages');
const chatOptions = document.getElementById('chat-options');

const chatReplies = {
  'Book Driver': {
    msg: '🚗 Great choice! Taking you to the Booking Page now. Fill in your trip details and we\'ll find the perfect driver for you!',
    action: () => { showPage('page-booking'); }
  },
  'Pricing': {
    msg: '💰 Our pricing:\n\n• Hourly: ₹150–250/hr (min 2hrs)\n• Half Day (4hrs): ₹600–900\n• Full Day (8hrs): ₹1000–1500\n• Long Trips: Custom quote\n\nFinal price depends on vehicle & distance. Contact us for exact quotes!'
  },
  'Contact': {
    msg: '📞 Reach us anytime!\n\n📱 WhatsApp: +91 90199 33097\n⏰ Available 6 AM – 10 PM daily\n📍 Based in Kollam, Kerala\n\nTap the green button (bottom-right) to chat directly!'
  },
  'Services': {
    msg: '✨ DriveEase Services:\n\n🎉 Events & Weddings\n🏥 Hospital Visits\n🛣️ Long Distance Trips\n📅 Daily Personal Driver\n✈️ Airport Transfers\n🌙 Night Duty Drivers\n\nAll drivers are verified & background-checked!'
  }
};

function addMsg(text, type) {
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.innerHTML = text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function renderOptions(opts) {
  chatOptions.innerHTML = '';
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'chat-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      addMsg(opt, 'user');
      chatOptions.innerHTML = '';
      setTimeout(() => {
        const reply = chatReplies[opt];
        if (reply) {
          addMsg(reply.msg, 'bot');
          if (reply.action) {
            setTimeout(() => {
              reply.action();
              chatbotWindow.classList.remove('open');
            }, 1200);
          }
        }
        if (!reply || !reply.action) {
          setTimeout(() => {
            addMsg('Anything else I can help with? 😊', 'bot');
            renderOptions(['Book Driver', 'Pricing', 'Contact', 'Services']);
          }, 1800);
        }
      }, 400);
    });
    chatOptions.appendChild(btn);
  });
}

if (chatbotToggle) {
  chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('open');
    if (chatbotWindow.classList.contains('open') && chatMessages.children.length === 0) {
      setTimeout(() => addMsg('👋 Hi! I\'m your DriveEase assistant. How can I help you today?', 'bot'), 200);
      setTimeout(() => renderOptions(['Book Driver', 'Pricing', 'Contact', 'Services']), 700);
    }
  });
}

if (chatbotClose) {
  chatbotClose.addEventListener('click', () => chatbotWindow.classList.remove('open'));
}

// ─── INIT ──────────────────────────────────────────────────
showPage('page-home');
