/* =========================
   1) Navigation helper
   - Internal hash navigation (smooth scroll with nav offset)
   - External links / other pages (same tab or new tab)
   ========================= */

function navigateTo(url, newTab = false) {
    // Internal navigation: "#section"
    if (url.startsWith('#')) {
        const sectionId = url.substring(1);
        const section = document.getElementById(sectionId);

        if (section) {
            const nav = document.querySelector('nav');
            const headerOffset = nav ? nav.offsetHeight : 0;

            window.scrollTo({
                top: section.offsetTop - headerOffset,
                behavior: 'smooth'
            });
        }
        return;
    }

    // Navigation to other pages with hashes (e.g., "index.html#about")
    // or plain external URLs
    if (newTab) {
        window.open(url, '_blank');
    } else {
        window.location.href = url;
    }
}


/* =========================
   2) Menu click handling
   - Uses navigateTo() so the same logic works everywhere
   ========================= */

function setupMenuNavigation() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');

            if (targetUrl) {
                navigateTo(targetUrl);
            }
        });
    });
}


/* =========================
   3) Sticky nav behaviour
   - Adds/removes .fixed-nav after passing the header
   ========================= */

function setupStickyNav() {
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        const header = document.querySelector('header');

        if (!nav || !header) return;

        const fromTop = window.scrollY;

        if (fromTop > header.offsetHeight) {
            nav.classList.add('fixed-nav');
        } else {
            nav.classList.remove('fixed-nav');
        }
    });
}


/* =========================
   4) PDF buttons
   - Opens PDFs in a new tab
   ========================= */

function setupPdfButtons() {
    const pdfButtons = document.querySelectorAll('.pdf-view');

    pdfButtons.forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
}


/* =========================
   5) Lightbox (all main images)
   - Click image => open overlay + caption (alt text)
   - Scrollable overlay, prevents background scroll
   ========================= */

function setupLightbox() {
    const images = document.querySelectorAll('main img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');

    if (!lightbox || !lightboxImg || !caption || !closeBtn) return;

    images.forEach(img => {
        img.style.cursor = "pointer";

        img.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
            caption.textContent = this.alt || "";

            document.body.style.overflow = "hidden"; // prevent background scroll
        });
    });

    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = "auto";
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = "auto";
        }
    });
}


/* =========================
   6) Initialise everything
   ========================= */

document.addEventListener('DOMContentLoaded', function() {
    setupMenuNavigation();
    setupStickyNav();
    setupPdfButtons();
    setupLightbox();
});
