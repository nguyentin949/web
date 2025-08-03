// podcast_script.js

// Hàm hiệu ứng gõ chữ (typing effect)
function typeWriterEffect(element, text, i = 0) {
    if (!element || !text) {
        return;
    }
    setTimeout(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            typeWriterEffect(element, text, i + 1);
        }
    }, 10); // Tốc độ gõ: 50ms mỗi ký tự
}

// Hàm khởi tạo hiệu ứng đồng bộ chữ với audio
function initializePodcastSync() {
    const mainAudio = document.getElementById('main-podcast-audio');
    const syncTextContainer = document.getElementById('podcast-lyrics-1'); 

    if (mainAudio && syncTextContainer) {
        const spans = syncTextContainer.querySelectorAll('span');
        let currentIndex = 0; // Theo dõi chỉ mục của span hiện tại

        // Hàm để ẩn tất cả các span và reset trạng thái
        const resetLyrics = () => {
            spans.forEach(span => span.classList.remove('visible'));
            currentIndex = 0;
            // Tùy chọn: gõ lại intro text mỗi khi reset lyrics
            const podcastIntroText = document.getElementById('podcastIntroText');
            if (podcastIntroText) {
                const introText = podcastIntroText.getAttribute('data-text');
                podcastIntroText.textContent = '';
                typeWriterEffect(podcastIntroText, introText);
            }
        };

        // Ẩn tất cả các span ban đầu khi trang tải
        resetLyrics();

        mainAudio.addEventListener('timeupdate', () => {
            const currentTime = mainAudio.currentTime;

            // Hiển thị các span dựa trên thời gian
            for (let i = currentIndex; i < spans.length; i++) {
                const span = spans[i];
                const startTime = parseFloat(span.getAttribute('data-start'));

                if (currentTime >= startTime) {
                    if (!span.classList.contains('visible')) {
                        span.classList.add('visible');
                    }
                } else {
                    // Nếu người dùng tua ngược (currentTime nhỏ hơn startTime của span đã hiển thị)
                    // thì ẩn các span đó đi.
                    if (span.classList.contains('visible')) { // Nếu nó đang visible
                        span.classList.remove('visible');
                    }
                }
            }

            // Cập nhật currentIndex để tối ưu hóa vòng lặp
            // Tìm chỉ mục của span đầu tiên chưa hiển thị
            for (let i = 0; i < spans.length; i++) {
                if (!spans[i].classList.contains('visible')) {
                    currentIndex = i;
                    break;
                }
                currentIndex = spans.length; // Tất cả đã hiển thị
            }
        });

        // Xử lý khi người dùng tua hoặc media reset
        mainAudio.addEventListener('seeking', () => {
            resetLyrics(); // Reset lyrics khi người dùng tua
        });

        // Xử lý khi audio kết thúc
        mainAudio.addEventListener('ended', () => {
            resetLyrics(); // Reset lyrics khi kết thúc
            // mainAudio.currentTime = 0; // Tùy chọn: tua về đầu
            // mainAudio.play(); // Tùy chọn: tự động phát lại
        });

        // Xử lý khi nhấn nút play (có thể là play lần đầu hoặc play sau khi reset)
        mainAudio.addEventListener('play', () => {
            // Nếu đang phát từ đầu (hoặc sau khi reset hoàn toàn)
            if (mainAudio.currentTime < 0.1 && currentIndex === 0) {
                resetLyrics(); // Đảm bảo reset lại lyrics để hiệu ứng bắt đầu lại
            }
        });
    }
}

// Chờ DOM tải xong rồi mới chạy hàm khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    // Chỉ khởi tạo chức năng này nếu đang ở trang podcast.html
    if (window.location.pathname.includes('podcast.html')) {
        initializePodcastSync();
    }
});