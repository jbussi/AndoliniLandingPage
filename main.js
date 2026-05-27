document.addEventListener('DOMContentLoaded', () => {
    // 1. Subtle 3D tilt effect on desktop mousemove
    const wrapper = document.querySelector('.newspaper-wrapper');
    
    if (wrapper && window.innerWidth > 900) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.clientX) / 85; // subtle tilt angle
            const yAxis = (window.innerHeight / 2 - e.clientY) / 85;
            wrapper.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Reset transformation when mouse leaves the document
        document.addEventListener('mouseleave', () => {
            wrapper.style.transform = 'rotateY(0deg) rotateX(0deg)';
            wrapper.style.transition = 'transform 0.5s ease';
        });

        document.addEventListener('mouseenter', () => {
            wrapper.style.transition = 'none';
        });
    }

    // 2. Entrance Animation
    if (wrapper) {
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'translateY(30px) scale(0.98)';
        wrapper.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        
        setTimeout(() => {
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'translateY(0) scale(1)';
        }, 100);
    }

    // 3. Photo Gallery Lightbox Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxCaption) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgPath = item.getAttribute('data-image');
                const captionText = item.getAttribute('data-caption');

                lightboxImg.src = imgPath;
                lightboxImg.alt = item.querySelector('img').alt;
                lightboxCaption.textContent = captionText;

                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Disable page scrolling
            });
        });

        // Close Lightbox on Close Button click
        lightboxClose.addEventListener('click', closeLightbox);

        // Close Lightbox on clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close Lightbox on pressing Esc key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable page scrolling
    }
});
