// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Matrix characters (mix of Katakana and Latin)
const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charArray = chars.split('');

const fontSize = 14;
const columns = width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0F0'; // Matrix Green
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Randomly choose between green and cyan for a "glitch" effect
        if (Math.random() > 0.98) {
             ctx.fillStyle = '#00f3ff'; // Cyan
        } else {
             ctx.fillStyle = '#0F0'; // Green
        }
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Resize handler
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Animation Loop
setInterval(drawMatrix, 33);


// Smooth Scrolling for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Custom Audio Player Logic
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const visualizerBars = document.querySelectorAll('.visualizer .bar');

if (audioPlayer) {
    playBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            startVisualizer();
        } else {
            audioPlayer.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            stopVisualizer();
        }
    });

    audioPlayer.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.innerText = formatTime(audioPlayer.duration);
    });
    
    // Check if metadata is already loaded
    if (audioPlayer.readyState >= 1) {
        durationEl.innerText = formatTime(audioPlayer.duration);
    }
    audioPlayer.addEventListener('ended', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        progressBar.style.width = '0%';
        stopVisualizer();
    });

    // Support clicking Listen button in hero to start playback directly
    const heroListenBtn = document.getElementById('hero-listen-btn');
    if (heroListenBtn) {
        heroListenBtn.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                startVisualizer();
            }
        });
    }
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeEl.innerText = formatTime(currentTime);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

let visualizerInterval;
function startVisualizer() {
    visualizerInterval = setInterval(() => {
        visualizerBars.forEach(bar => {
            const height = Math.random() * 100;
            bar.style.height = `${height}%`;
        });
    }, 100);
}

function stopVisualizer() {
    clearInterval(visualizerInterval);
    visualizerBars.forEach(bar => {
        bar.style.height = '5px';
    });
}

