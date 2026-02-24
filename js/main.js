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

// Language Toggle & i18n Logic
const translations = {
    en: {
        pageTitle: "Agentic Software Engineering - The Future of Code",
        pageDesc: "A comprehensive guide to Agentic Software Engineering. Learn how AI agents are transforming the software development lifecycle.",
        heroTitle: "Agentic Software Engineering",
        heroSubtitle: "Discover how autonomous AI agents are revolutionizing the way we build, test, and deploy software. The definitive guide to the next era of engineering.",
        readOnline: "Read Online",
        downloadPdf: "Download PDF",
        listenBtn: "Listen",
        listenOnTheGo: "Listen on the Go",
        audioDesc: "Experience a 37-minute deep dive into <em>Agentic Software Engineering</em>. This AI-generated audio summary explores the core concepts, the shift from coding to architecture, and the future of software development.",
        whatYoullLearn: "What You'll Learn",
        feat1Title: "The Real Bottleneck",
        feat1Desc: "Code production isn't the bottleneck. The real challenge is complexity, communication, and maintaining system integrity over time.",
        feat2Title: "The Discipline",
        feat2Desc: "Agentic Software Engineering is the discipline of ensuring reliability and trust from stochastic AI and human contributors.",
        feat3Title: "The New Winners",
        feat3Desc: "Success belongs to teams who set clear intent, manage risk boundaries, and demand evidence—not just those who type fastest.",
        readTheBook: "Read the Book",
        pdfFail: "Unable to display PDF directly.",
        mobilePreviewFail: "PDF preview is not supported on mobile browsers.",
        downloadLocalPdf: "Download / View PDF",
        copyright: "Copyright &copy; 2026 by Ahmed E. Hassan. All rights reserved.",
        openSource: "This website is open source."
    },
    zh: {
        pageTitle: "智能体软件工程 - 代码的未来",
        pageDesc: "智能体软件工程权威指南。了解 AI 智能体如何重塑软件开发生命周期。",
        heroTitle: "智能体\n软件工程",
        heroSubtitle: "探索自主 AI 智能体如何彻底改变我们构建、测试和部署软件的方式。下一代工程的权威指南。",
        readOnline: "在线阅读",
        downloadPdf: "下载 PDF",
        listenBtn: "收听",
        listenOnTheGo: "随时随地收听",
        audioDesc: "体验 41 分钟的<em>智能体软件工程</em>深度解析。这份由 AI 生成的音频摘要探讨了核心概念、从编码到架构的转变，以及软件开发的未来。",
        whatYoullLearn: "核心概览",
        feat1Title: "真正的瓶颈",
        feat1Desc: "代码生产已不再是瓶颈。真正的挑战在于复杂性、沟通以及长期维持系统的完整性。",
        feat2Title: "核心准则",
        feat2Desc: "智能体软件工程是一门确保从随机的 AI 和人类贡献者那里获得可靠性和信任的学科。",
        feat3Title: "未来的赢家",
        feat3Desc: "成功属于那些设定明确意图、管理风险边界并要求提供证据的团队——而不仅仅是敲代码最快的团队。",
        readTheBook: "阅读本书",
        pdfFail: "无法直接显示 PDF。",
        mobilePreviewFail: "移动端浏览器不支持直接预览 PDF。",
        downloadLocalPdf: "下载 / 浏览 PDF",
        copyright: "版权所有 &copy; 2026 Ahmed E. Hassan。保留所有权利。",
        openSource: "本网站开源。"
    }
};

const langSwitchBadge = document.getElementById('lang-switch-badge');
const langBadgeText = document.getElementById('lang-badge-text');

const bookCover = document.querySelector('.book-cover');
const pdfBtns = document.querySelectorAll('.btn-read-pdf');
const pdfViewer = document.querySelector('.pdf-viewer-container object');
const trackName = document.querySelector('.track-name');

if (langSwitchBadge) {
    langSwitchBadge.addEventListener('click', (e) => { 
        e.preventDefault(); 
        const currentUrl = new URL(window.location);
        const currentLang = currentUrl.searchParams.get('lang') || 'en';
        setLanguage(currentLang === 'en' ? 'zh' : 'en'); 
    });
}

function setLanguage(lang) {
    // Update URL if needed
    const currentUrl = new URL(window.location);
    if (currentUrl.searchParams.get('lang') !== lang && lang) {
        currentUrl.searchParams.set('lang', lang);
        window.history.pushState({}, '', currentUrl);
    }

    // Determine play state
    let wasPlaying = audioPlayer && !audioPlayer.paused;

    // Apply translations
    document.title = translations[lang].pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = translations[lang].pageDesc;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    if (lang === 'en') {
        if (langBadgeText) langBadgeText.innerText = '阅读中文版 (Read in Chinese)';
        if (langSwitchBadge) langSwitchBadge.href = '?lang=zh';
        
        // English Assets
        if (bookCover) bookCover.src = 'images/book_cover.jpg';
        pdfBtns.forEach(btn => btn.href = 'pdf/AgenticSE_Book.pdf');
        if (pdfViewer) pdfViewer.data = 'pdf/AgenticSE_Book.pdf';
        
        if (audioPlayer) {
            audioPlayer.src = 'audio/AgenticSE_Audio.m4a?v=2';
            if (trackName) trackName.innerText = 'AGENTIC_SE_AUDIO.M4A';
        }
    } else {
        if (langBadgeText) langBadgeText.innerText = 'Read in English (阅读英文版)';
        if (langSwitchBadge) langSwitchBadge.href = '?lang=en';
        
        // Chinese Assets
        if (bookCover) bookCover.src = 'images/book_cover_cn.jpg';
        pdfBtns.forEach(btn => btn.href = 'pdf/AgenticSE_Book_CN.pdf');
        if (pdfViewer) pdfViewer.data = 'pdf/AgenticSE_Book_CN.pdf';
        
        if (audioPlayer) {
            audioPlayer.src = 'audio/AgenticSE_Audio_CN.m4a';
            if (trackName) trackName.innerText = 'AGENTIC_SE_AUDIO_CN.M4A';
        }
    }

    // Reload and retain playback state
    if (audioPlayer) {
        audioPlayer.load();
        if (wasPlaying) {
            audioPlayer.play().catch(e => console.log('Autoplay prevented', e));
        }
    }
}

// Initialize language from URL
const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');
if (langParam === 'zh') {
    setLanguage('zh');
}
