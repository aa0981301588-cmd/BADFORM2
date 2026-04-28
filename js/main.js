document.addEventListener('DOMContentLoaded', () => {
    // 1. Horizontal Scroll Button Logic for 03_SUBJECT ARCHIVE
    const slider = document.getElementById('horizontal-wrapper');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn && nextBtn) {
        const getCardStep = () => {
            const card = slider.querySelector('.subject-card');
            if (!card) return 300;
            const style = window.getComputedStyle(card);
            return card.offsetWidth + (parseFloat(style.marginRight) || 0);
        };

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: getCardStep(), behavior: 'smooth' });
        });
    }

    
    // 2. D_v (dwell time) Logic: Typographical Deformation
    let D_v = 0;
    setInterval(() => {
        D_v += 1;
        // Increase letter-spacing subtly over time to represent slow deformation.
        // Cap it at a reasonable limit so it doesn't break layout completely.
        const deformationFactor = Math.min(D_v * 0.02, 15);
        document.body.style.setProperty('--deformation-spacing', `${deformationFactor}px`);
        
        const deformTargets = document.querySelectorAll('.en-name, .section-title, .hero-title');
        deformTargets.forEach(el => {
            if(!el.classList.contains('hero-title')) {
                el.style.letterSpacing = `calc(0.05em + ${deformationFactor}px)`;
            }
        });
    }, 1000);
    
    // 3. Scroll Logic (Hero Title Stretch & Horizontal Translate)
    const deformTitle = document.getElementById('deform-title');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Hero Stretch Logic
        // Stretches text vertically as the user scrolls down
        const stretchAmount = 1 + (scrollY * 0.005);
        // Add a dampening factor so it doesn't get too tall
        const clampedStretch = Math.min(Math.max(stretchAmount, 1), 6);
        deformTitle.style.transform = `scaleY(${clampedStretch})`;
        deformTitle.style.letterSpacing = `calc(${Math.min(scrollY * 0.05, 50)}px)`;
        
        // Horizontal Scroll Logic has been replaced with native drag events.
    });

    // 4. Behavior Interference: 300s Idle Warning
    let idleTime = 0;
    const idleWarning = document.getElementById('idle-warning');
    
    const resetIdleTime = () => {
        if (!idleWarning.classList.contains('hidden')) {
            idleWarning.classList.add('hidden');
        }
        idleTime = 0;
    };
    
    window.addEventListener('mousemove', resetIdleTime);
    window.addEventListener('scroll', resetIdleTime);
    window.addEventListener('keypress', resetIdleTime);
    window.addEventListener('click', resetIdleTime);
    
    setInterval(() => {
        idleTime += 1;
        // 300 seconds (5 minutes) limit
        if (idleTime >= 300) { 
            idleWarning.classList.remove('hidden');
        }
    }, 1000);
});
