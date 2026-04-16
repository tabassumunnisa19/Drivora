// ================= NAVIGATION =================
const links = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const target = link.getAttribute('data-page');

    pages.forEach(p => p.style.display = 'none');
    document.getElementById(target).style.display = 'block';

    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    window.scrollTo(0, 0);
  });
});

// Default show home
pages.forEach(p => p.style.display = 'none');
document.getElementById('page-home').style.display = 'block';


// ================= BOOKING FLOW =================
const findBtn = document.getElementById('find-driver-btn');
const loader = document.getElementById('loader-overlay');
const result = document.getElementById('driver-result');

findBtn.addEventListener('click', () => {

  loader.classList.add('show');
  result.classList.remove('show');

  setTimeout(() => {
    loader.classList.remove('show');
    result.classList.add('show');

    loadDriver();
  }, 3000);
});


// ================= DUMMY DRIVER =================
function loadDriver() {

  const drivers = [
    {
      name: "Rajan Kumar",
      exp: "8 Years Experience",
      languages: "Malayalam, English, Hindi",
      rating: "4.9",
      reviews: ["Very polite and professional", "On time and safe driving"],
    },
    {
      name: "Suresh Babu",
      exp: "6 Years Experience",
      languages: "Malayalam, Tamil",
      rating: "4.8",
      reviews: ["Good communication", "Smooth driving"],
    }
  ];

  const driver = drivers[Math.floor(Math.random() * drivers.length)];

  document.getElementById('d-name').innerText = driver.name;
  document.getElementById('d-exp').innerText = driver.exp;
  document.getElementById('d-languages').innerText = driver.languages;
  document.getElementById('d-rating').innerText = driver.rating;

  const reviewDiv = document.getElementById('d-reviews');
  reviewDiv.innerHTML = "";

  driver.reviews.forEach(r => {
    reviewDiv.innerHTML += `
      <div class="review">
        <strong>Customer</strong>
        <p>${r}</p>
      </div>
    `;
  });

  generateWhatsAppLink(driver);
}


// ================= WHATSAPP =================
function generateWhatsAppLink(driver) {

  const name = document.getElementById('cust-name').value;
  const pickup = document.getElementById('pickup').value;
  const drop = document.getElementById('drop').value;
  const datetime = document.getElementById('datetime').value;
  const duration = document.getElementById('duration').value;

  const message = `
Driver Booking Request

Name: ${name}
Pickup: ${pickup}
Drop: ${drop}
Date & Time: ${datetime}
Duration: ${duration}

Assigned Driver: ${driver.name}
`;

  const encoded = encodeURIComponent(message);

  document.getElementById('wa-confirm-btn').href =
    `https://wa.me/919019933097?text=${encoded}`;
}


// ================= RESET =================
document.getElementById('reset-booking').addEventListener('click', () => {
  result.classList.remove('show');
});


// ================= CHATBOT =================
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotWindow = document.querySelector('.chatbot-window');

chatbotToggle.addEventListener('click', () => {
  chatbotWindow.classList.toggle('open');
});

function sendBotMessage(msg) {
  const box = document.querySelector('.chatbot-messages');
  box.innerHTML += `<div class="chat-msg">${msg}</div>`;
}

// Example buttons
function chatbotReply(type) {
  if (type === 'booking') {
    sendBotMessage("Click on 'Book a Driver' to start booking.");
  } else if (type === 'pricing') {
    sendBotMessage("Pricing starts from ₹150/hr.");
  } else {
    sendBotMessage("Contact us on WhatsApp for quick help.");
  }
}
