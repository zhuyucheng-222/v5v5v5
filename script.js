// 初始化粒子效果
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成，开始初始化...');
    
    // 初始化粒子背景
    particlesJS('particle-background', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#e94560'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#e94560',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // 初始化武术流派数据
    const styles = [
        {
            name: '太极拳',
            description: '以柔克刚，以静制动',
            icon: 'fa-yin-yang'
        },
        {
            name: '少林功夫',
            description: '刚猛有力，内外兼修',
            icon: 'fa-fist-raised'
        },
        {
            name: '咏春拳',
            description: '短桥寸劲，以快制快',
            icon: 'fa-hand-rock'
        },
        {
            name: '形意拳',
            description: '形随意动，意随形走',
            icon: 'fa-dragon'
        }
    ];

    // 渲染武术流派卡片
    const stylesGrid = document.querySelector('.styles-grid');
    styles.forEach(style => {
        const card = document.createElement('div');
        card.className = 'style-card animate-float';
        card.innerHTML = `
            <i class="fas ${style.icon} fa-3x"></i>
            <h3>${style.name}</h3>
            <p>${style.description}</p>
        `;
        stylesGrid.appendChild(card);
    });

    // 视频分类切换
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // 这里可以添加视频筛选逻辑
        });
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 导航栏滚动效果
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // 搜索框动画
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.width = '300px';
    });
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.style.width = '200px';
    });

    // 初始化GSAP动画
    gsap.from('.hero-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.style-card', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // AI助手功能
    // 等待页面加载完成
    window.onload = function() {
        console.log('页面加载完成');

        // 获取所有需要的元素
        const aiButton = document.getElementById('aiButton');
        const aiChat = document.getElementById('aiChat');
        const closeButton = document.getElementById('closeButton');
        const aiInput = document.getElementById('aiInput');
        const sendButton = document.getElementById('sendButton');
        const aiMessages = document.getElementById('aiMessages');

        // 检查元素是否存在
        if (!aiButton || !aiChat || !closeButton || !aiInput || !sendButton || !aiMessages) {
            console.error('未找到必要的元素');
            return;
        }

        // 切换聊天窗口显示状态
        function toggleChat() {
            console.log('切换聊天窗口');
            aiChat.classList.toggle('active');
            if (aiChat.classList.contains('active')) {
                aiInput.focus();
            }
        }

        // 发送消息
        function sendMessage() {
            const message = aiInput.value.trim();
            if (!message) return;

            console.log('发送消息:', message);

            // 添加用户消息
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.innerHTML = `
                <i class="fas fa-user"></i>
                <div class="message-content">${message}</div>
            `;
            aiMessages.appendChild(userMessage);

            // 清空输入框
            aiInput.value = '';

            // 模拟AI响应
            setTimeout(() => {
                const aiResponse = getAIResponse(message);
                const aiMessage = document.createElement('div');
                aiMessage.className = 'message ai-message';
                aiMessage.innerHTML = `
                    <i class="fas fa-robot"></i>
                    <div class="message-content">${aiResponse}</div>
                `;
                aiMessages.appendChild(aiMessage);
                aiMessages.scrollTop = aiMessages.scrollHeight;
            }, 1000);
        }

        // 获取AI响应
        function getAIResponse(message) {
            const responses = {
                '你好': '您好！我是V5数字武馆的AI助手，很高兴为您服务。',
                '武术': '我们提供多种武术流派的教学，包括太极拳、少林功夫、咏春拳等。您想了解哪个流派呢？',
                '课程': '我们的课程分为初级、中级和高级三个等级，每个等级都有相应的教学内容。',
                '价格': '具体价格请查看我们的课程详情页面，或者联系我们的客服人员。',
                '联系方式': '您可以通过网站底部的社交媒体链接或联系我们页面获取更多信息。'
            };

            for (let key in responses) {
                if (message.includes(key)) {
                    return responses[key];
                }
            }

            return '抱歉，我暂时无法理解您的问题。您可以尝试询问关于武术流派、课程安排、价格等方面的问题。';
        }

        // 绑定事件
        aiButton.onclick = toggleChat;
        closeButton.onclick = toggleChat;
        sendButton.onclick = sendMessage;
        aiInput.onkeypress = function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        };

        console.log('AI助手初始化完成');
    };
}); 