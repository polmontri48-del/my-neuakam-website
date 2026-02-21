// Page loading
window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 500);
});

// Scroll progress bar
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});

// FAQ toggle function
function toggleFAQ(id) {
    const content = document.getElementById(`faq-content-${id}`);
    const icon = document.getElementById(`faq-icon-${id}`);
    
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}

// Mobile menu toggle
function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('hidden');
}

// Chatbot functions
function toggleChatbot() {
    document.getElementById('chatbotWindow').classList.toggle('active');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (message) {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML += `
            <div class="bg-amber-100 rounded-lg p-3 mb-3 ml-12">
                <p class="text-sm">${message}</p>
            </div>
            <div class="bg-gray-100 rounded-lg p-3 mb-3 mr-12">
                <p class="text-sm">ขอบคุณสำหรับข้อความค่ะ ทีมงานจะติดต่อกลับเร็วๆ นี้</p>
                <p class="text-sm mt-1">Thank you for your message. We'll get back to you soon!</p>
            </div>
        `;
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function quickReply(topic) {
    const responses = {
        'แนะนำที่เที่ยว': 'เนินขามมีสถานที่ท่องเที่ยวน่าสนใจมากมาย เช่น วัดเนินขาม ตลาดน้ำ และแม่น้ำเจ้าพระยา คุณสนใจสถานที่ไหนเป็นพิเศษคะ?',
        'แนะนำร้านอาหาร': 'เรามีร้านอาหารพื้นบ้านมากมาย แนะนำ ร้านป้าสมหมูย่าง และส้มตำป้าจันทร์เป็นพิเศษค่ะ อร่อยมากเลยค่ะ!',
        'จองที่พัก': 'เรามีโฮมสเตย์ให้เลือกหลายแห่งค่ะ ราคาตั้งแต่ 750-1,200 บาทต่อคืน คุณสามารถกดปุ่ม "จองเลย" ในหน้าที่พักได้เลยค่ะ',
        'ถามเส้นทาง': 'จากกรุงเทพฯ ใช้เส้นทางหลวงหมายเลข 32 ประมาณ 2 ชั่วโมง หรือคุณสามารถคลิกดูแผนที่ใน Google Maps ได้เลยค่ะ'
    };
    
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML += `
        <div class="bg-amber-100 rounded-lg p-3 mb-3 ml-12">
            <p class="text-sm">${topic}</p>
        </div>
        <div class="bg-gray-100 rounded-lg p-3 mb-3 mr-12">
            <p class="text-sm">${responses[topic]}</p>
        </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Booking functions
function openBooking(name, price) {
    document.getElementById('homestayName').value = name + ' - ฿' + price + '/คืน';
    document.getElementById('bookingModal').classList.add('active');
}

function closeBooking() {
    document.getElementById('bookingModal').classList.remove('active');
}

function submitBooking(e) {
    e.preventDefault();
    alert('ขอบคุณสำหรับการจอง! เราจะติดต่อกลับเร็วๆ นี้\n\nThank you for your booking! We will contact you soon.');
    closeBooking();
}

// Contact form
function handleContactForm(e) {
    e.preventDefault();
    alert('ขอบคุณสำหรับข้อความ! เราจะติดต่อกลับเร็วๆ นี้\n\nThank you for your message! We will get back to you soon.');
    e.target.reset();
}

// Newsletter subscription
function subscribeNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`ขอบคุณที่สมัครรับข่าวสาร!\nเราได้ส่งอีเมลยืนยันไปที่ ${email} แล้ว\n\nThank you for subscribing!\nWe've sent a confirmation email to ${email}`);
    e.target.reset();
}

// Language switcher
let currentLang = 'th';
function switchLanguage(lang) {
    currentLang = lang;
    document.getElementById('lang-th').className = lang === 'th' 
        ? 'px-4 py-2 bg-amber-600 rounded-l-lg text-white font-medium'
        : 'px-4 py-2 bg-white rounded-l-lg border border-amber-600 text-amber-600 font-medium';
    document.getElementById('lang-en').className = lang === 'en'
        ? 'px-4 py-2 bg-amber-600 rounded-r-lg text-white font-medium'
        : 'px-4 py-2 bg-white rounded-r-lg border border-amber-600 text-amber-600 font-medium';
    
    // Update all elements with data-th and data-en attributes
    document.querySelectorAll('[data-th][data-en]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            document.getElementById('mobileMenu').classList.add('hidden');
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Show/hide back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.classList.remove('hidden');
    } else {
        backToTop.classList.add('hidden');
    }
});

// Back to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
