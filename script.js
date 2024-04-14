document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerOffset = document.querySelector('nav').offsetHeight;
            let elementPosition = target.getBoundingClientRect().top + window.scrollY;
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

function navigateTo(url) {
    // Checking if the URL is on the same page with a hash
    if (url.includes('#') && window.location.pathname === url.split('#')[0]) {
        const section = document.querySelector(url.substring(url.indexOf('#')));
        if (section) {
            window.scrollTo({
                top: section.offsetTop - document.querySelector('nav').offsetHeight,
                behavior: 'smooth'
            });
        }
    } else {
        // For different pages or when no hash is involved
        window.location.href = url;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const pdfButtons = document.querySelectorAll('.pdf-view');
    
    pdfButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            window.open(url, '_blank');
        });
    });
});
