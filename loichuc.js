document.addEventListener('DOMContentLoaded', () => {
    const messageHeading = document.getElementById('messageHeading');
    const messageContent = document.getElementById('messageContent');
    const pageTitle = document.getElementById('pageTitle');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    // Các nút homeButton và podcastButton đã được loại bỏ khỏi loichuc.html,
    // nên không cần lấy tham chiếu ở đây nếu chúng không còn được sử dụng.
    // Nếu bạn muốn giữ lại chúng (nhưng ẩn/hiện) thì cần thêm lại vào HTML và JS.
    const body = document.body;

    const messages = [
        {
            title: "Lời Chúc 1",
            content: "Sinh nhật vui vẻ! Cuộc đời là một cuốn sách, và mỗi năm là một chương mới.\nChúc bạn sẽ viết lên những câu chuyện tuyệt vời và mở ra những chương mới đầy thú vị.",
            bodyClass: "loichuc-1",
            nextButtonText: "Kế tiếp"
        },
        {
            title: "Lời Chúc Thật Lòng!",
            content: "Chúc mừng sinh nhật! Đừng đếm năm tháng, hãy đếm những kỷ niệm và trải nghiệm đáng nhớ.\nCuộc đời là một cuộc hành trình, chúc cho cuộc hành trình của bạn đầy màu sắc và tràn ngập niềm vui!",
            bodyClass: "loichuc-2",
            nextButtonText: "Kế tiếp"
        },
        {
            title: "Lời Chúc Cuối Cùng!",
            content: "Sinh nhật hạnh phúc! Trong cuộc đời này, chúng ta giống như những chiếc đèn giữa đêm tối,\nChúc bạn sẽ tạo ra bãi biển ánh sáng riêng biệt giữa sóng to gió lớn của cuộc đời.",
            bodyClass: "loichuc-3",
            nextButtonText: "Xem tiếp=>"
        }
    ];

    let currentMessageIndex = 0;

    const params = new URLSearchParams(window.location.search);
    const indexParam = params.get('msg');
    if (indexParam !== null && !isNaN(parseInt(indexParam))) {
        const parsedIndex = parseInt(indexParam);
        if (parsedIndex >= 0 && parsedIndex < messages.length) {
            currentMessageIndex = parsedIndex;
        }
    }

    function updateMessage(index) {
        const message = messages[index];
        
        pageTitle.textContent = message.title;
        messageHeading.textContent = message.title;
        messageContent.textContent = message.content;

        body.className = '';
        body.classList.add('loichuc-body', message.bodyClass);

        // Hiển thị nút "Quay lại" và "Kế tiếp" mặc định là block
        prevButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';

        // Cập nhật văn bản cho nút "Kế tiếp"
        nextButton.textContent = message.nextButtonText;

        // Xử lý đường dẫn và hiển thị/ẩn các nút dựa trên chỉ mục
        if (index === 0) {
            // Lời Chúc 1: "Quay lại" về podcast.html
            prevButton.href = 'podcast.html'; 
        } else {
            // Lời Chúc 2 & 3: "Quay lại" lời chúc trước đó
            prevButton.href = `${window.location.pathname}?msg=${index - 1}`;
        }

        if (index < messages.length - 1) {
            // Lời Chúc 1 & 2: "Kế tiếp" lời chúc tiếp theo
            nextButton.href = `${window.location.pathname}?msg=${index + 1}`;
        } else {
            // Lời Chúc 3: "Xem tiếp=>" về trang chính (hbbd.html)
           nextButton.href = "hinhanh.html";
        }
    }

    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = prevButton.href;
    });

    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = nextButton.href;
    });

    window.addEventListener('popstate', (event) => {
        const stateIndex = event.state ? event.state.index : 0;
        if (stateIndex !== undefined && stateIndex !== currentMessageIndex) {
            currentMessageIndex = stateIndex;
            updateMessage(currentMessageIndex);
        }
    });

    updateMessage(currentMessageIndex);
});

particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }
}
createConfetti();

function createFallingElement() {
    const container = document.getElementById('falling-elements-container');
    if (!container) return;
    const element = document.createElement('div');
    element.className = 'falling-element';
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDuration = Math.random() * 5 + 5 + 's';
    container.appendChild(element);
    element.addEventListener('animationend', () => element.remove());
}
setInterval(createFallingElement, 500);

document.addEventListener('mousemove', (e) => {
    const sparklesContainer = document.getElementById('cursor-sparkles');
    if (!sparklesContainer) return;
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparklesContainer.appendChild(sparkle);
    sparkle.addEventListener('animationend', () => sparkle.remove());
});