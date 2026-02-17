function navigateTo(url, newTab = false) {
    // Check if URL includes a hash, indicating internal navigation on the current page
    if (url.includes('#') && window.location.pathname === url.split('#')[0]) {
        const sectionId = url.substring(url.indexOf('#') + 1);
        const section = document.querySelector('#' + sectionId);
        
        if (section) {
            // If the section exists, scroll to it
            window.scrollTo({
                top: section.offsetTop - document.querySelector('nav').offsetHeight,
                behavior: 'smooth'
            });
        }
    } else {
        // For external links or different pages, check if it should open in a new tab
        if (newTab) {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
    }
}


document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetUrl = this.getAttribute('href');
        navigateTo(targetUrl);
        
        if (targetUrl) {
            const headerOffset = document.querySelector('nav').offsetHeight;
            let elementPosition = targetUrl.getBoundingClientRect().top + window.scrollY;
            let offsetPosition = elementPosition - headerOffset;

            // Check if the element position is beyond the maximum scrollable area of the document
            const maxScrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (offsetPosition > maxScrollable) {
                offsetPosition = maxScrollable; // Adjust to max scrollable if it's exceeded
            }

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// Ensure the nav bar fixes itself after scrolling past the header
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const fromTop = window.scrollY;
    
    if (fromTop > document.querySelector('header').offsetHeight) {
        nav.classList.add('fixed-nav');
    } else {
        nav.classList.remove('fixed-nav');
    }
});




document.addEventListener('DOMContentLoaded', function() {
    const pdfButtons = document.querySelectorAll('.pdf-view');
    
    pdfButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            window.open(url, '_blank');
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {

    const images = document.querySelectorAll('main img'); 
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');

    images.forEach(img => {

        img.style.cursor = "pointer";

        img.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;

            // Use alt text as caption
            caption.textContent = this.alt || "";
        });

    });

    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

});