document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const container = document.querySelector('.deck-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    
    let currentSlideIndex = 0;

    // Intersection Observer to trigger animations when slides come into view
    const observerOptions = {
        root: container,
        threshold: 0.5 // Trigger when 50% of the slide is visible
    };

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class for CSS animations
                entry.target.classList.add('active');
                
                // Update progress bar
                const index = Array.from(slides).indexOf(entry.target);
                currentSlideIndex = index;
                updateProgress(index);
                updateButtons(index);
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        slideObserver.observe(slide);
    });

    // Navigation functions
    function scrollToSlide(index) {
        if (index >= 0 && index < slides.length) {
            slides[index].scrollIntoView({ behavior: 'smooth' });
        }
    }

    function updateProgress(index) {
        const percentage = ((index + 1) / slides.length) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function updateButtons(index) {
        prevBtn.style.opacity = index === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = index === 0 ? 'none' : 'auto';
        
        nextBtn.style.opacity = index === slides.length - 1 ? '0.3' : '1';
        nextBtn.style.pointerEvents = index === slides.length - 1 ? 'none' : 'auto';
    }

    // Event Listeners for buttons
    prevBtn.addEventListener('click', () => {
        scrollToSlide(currentSlideIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        scrollToSlide(currentSlideIndex + 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            scrollToSlide(currentSlideIndex + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            scrollToSlide(currentSlideIndex - 1);
        }
    });

    // Initialize first slide state
    updateButtons(0);
    // Force active on first slide immediately so it doesn't wait for scroll event
    slides[0].classList.add('active');
});
