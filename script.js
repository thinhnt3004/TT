// Mảng lời chúc
const messages = [
    "Chúc em một mùa Trung thu thật ấm áp!",
    "Mong em luôn hạnh phúc như ánh trăng rằm!",
    "Hãy luôn vui vẻ và rạng rỡ như đèn lồng nhé!",
    "Chúc em có những khoảnh khắc ngọt ngào bên gia đình!",
    "Trung thu này, anh chỉ muốn em cười thật tươi!",
    "Mong em luôn tỏa sáng như những vì sao đêm!",
    "Chúc em luôn mạnh khỏe và hạnh phúc!",
    "Hãy để ánh trăng dẫn lối cho những ước mơ của em!",
    "Chúc em một mùa Trung thu tràn đầy yêu thương!",
    "Chúc em có một đêm Trung thu thật vui vẻ và ý nghĩa!",
    "Hãy để những chiếc đèn lồng thắp sáng con đường em đi!",
];

// Mảng ảnh ngẫu nhiên
const randomImages = [
    "e1.png",
    "e2.png",
    "e3.png",
    "e4.png",

];

// Biến trạng thái
let messageIndex = 0;
let displayedMessage = '';
let showFireworks = false;
let randomImageUrl = '';
let showRandomImage = false;

// DOM elements
const messageElement = document.getElementById('message');
const nextMessageBtn = document.getElementById('nextMessageBtn');
const fireworksBtn = document.getElementById('fireworksBtn');
const randomImageBtn = document.getElementById('randomImageBtn');
const fireworksContainer = document.getElementById('fireworks');
const randomImageContainer = document.getElementById('randomImageContainer');
const lanternsContainer = document.querySelector('.lanterns-container');
const shootingStarsContainer = document.querySelector('.shooting-stars');
const floatingHeartsContainer = document.querySelector('.floating-hearts');

// Hiệu ứng typewriter
function typeWriter() {
    let currentIndex = 0;
    const message = messages[messageIndex];
    const interval = setInterval(() => {
        if (currentIndex <= message.length) {
            displayedMessage = message.substring(0, currentIndex);
            messageElement.textContent = displayedMessage;
            currentIndex++;
        } else {
            clearInterval(interval);
        }
    }, 100);
}

// Chuyển lời chúc tiếp theo
function handleNextMessage() {
    messageIndex = (messageIndex + 1) % messages.length;
    displayedMessage = '';
    messageElement.textContent = '';
    typeWriter();
}

// Bắn pháo hoa
function triggerFireworks() {
    if (showFireworks) return;
    showFireworks = true;
    fireworksContainer.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 50 + '%';
        firework.style.animationDelay = (i * 0.1) + 's';
        fireworksContainer.appendChild(firework);
        
        // Xóa firework sau animation
        setTimeout(() => firework.remove(), 1000);
    }
    
    setTimeout(() => {
        showFireworks = false;
        fireworksContainer.innerHTML = '';
    }, 3000);
}

// Hiển thị ảnh ngẫu nhiên
function showRandomImageHandler() {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    randomImageUrl = randomImages[randomIndex];
    showRandomImage = true;
    
    randomImageContainer.innerHTML = `
        <div class="random-image">
            <img src="${randomImageUrl}" alt="Ảnh Trung Thu ngẫu nhiên" />
            
        </div>
    `;
    
   
}

// Tạo đèn lồng bay
function createLanterns() {
    if (!lanternsContainer) return;
    
    // Xóa cũ trước khi tạo mới (để tránh tích tụ)
    lanternsContainer.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const lantern = document.createElement('div');
        lantern.className = 'lantern';
        const left = Math.random() * 100;
        const duration = 15 + Math.random() * 15;
        const delay = Math.random() * 5;
        lantern.style.left = left + '%';
        lantern.style.animationDuration = duration + 's';
        lantern.style.animationDelay = delay + 's';
        lanternsContainer.appendChild(lantern);
        
        // Xóa sau animation để recreate
        setTimeout(() => {
            lantern.remove();
            // Recreate một số lanterns ngẫu nhiên để liên tục
            if (Math.random() > 0.5) {
                createLanterns();
            }
        }, (duration + delay) * 1000 + 1000); // +1s buffer
    }
}

// Tạo sao băng
function createShootingStars() {
    if (!shootingStarsContainer) return;
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            const startX = Math.random() * 100;
            const startY = Math.random() * 30;
            star.style.left = startX + '%';
            star.style.top = startY + '%';
            shootingStarsContainer.appendChild(star);
            
            setTimeout(() => star.remove(), 2000);
        }
    }, 3000);
}

// Tạo trái tim bay
function createFloatingHearts() {
    if (!floatingHeartsContainer) return;
    
    // Xóa cũ trước khi tạo mới
    floatingHeartsContainer.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 7;
        const delay = Math.random() * 6;
        const fontSize = 16 + Math.random() * 16;
        
        heart.style.left = left + '%';
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = delay + 's';
        heart.style.fontSize = fontSize + 'px';
        
        floatingHeartsContainer.appendChild(heart);
        
        // Xóa sau animation và recreate để liên tục
        setTimeout(() => {
            heart.remove();
            // Recreate ngẫu nhiên
            if (Math.random() > 0.6) {
                createFloatingHearts();
            }
        }, (duration + delay) * 1000 + 1000);
    }
}

// Khởi tạo khi DOM load
document.addEventListener('DOMContentLoaded', () => {
    if (!messageElement || !nextMessageBtn || !fireworksBtn || !randomImageBtn) {
        console.error('Không tìm thấy elements cần thiết!');
        return;
    }
    
    // Event listeners
    nextMessageBtn.addEventListener('click', handleNextMessage);
    fireworksBtn.addEventListener('click', triggerFireworks);
    randomImageBtn.addEventListener('click', showRandomImageHandler);
    
    // Khởi tạo hiệu ứng
    typeWriter(); // Bắt đầu lời chúc đầu tiên
    createLanterns();
    createShootingStars();
    createFloatingHearts();
    
    console.log('Trang web Trung Thu đã sẵn sàng! 🌕');
});