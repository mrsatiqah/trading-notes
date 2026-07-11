
// Load shared header/footer partials into placeholder divs
function loadPartial(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    fetch(url)
        .then(res => res.text())
        .then(html => { el.innerHTML = html; })
        .catch(err => console.error('Failed to load partial:', url, err));
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartial('site-header', 'partials/header.html');
    loadPartial('site-footer', 'partials/footer.html');
});

// Reading progress bar + back-to-top visibility
window.addEventListener('scroll', () => {
    const article = document.querySelector('.article-body');
    if (!article) return;
    const scrollTop = window.pageYOffset;
    const docHeight = article.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.style.width = Math.min(scrollPercent * 100, 100) + '%';

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (scrollTop > 300) backToTop.classList.add('visible'); else backToTop.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (!mobileNav) return;
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu(event) {
    const mobileNav = document.getElementById('mobileNav');
    if (!mobileNav) return;
    if (!event || event.target === mobileNav || event.target.classList.contains('mobile-nav-close')) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMobileMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMobileMenu(); });
