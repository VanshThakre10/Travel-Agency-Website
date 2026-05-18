// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Sticky Navbar Styling
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-md');
                navbar.classList.remove('py-2');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.add('py-2');
            }
        });
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation is handled by HTML5 'required' attributes
            const emailInput = document.getElementById('email');
            if (emailInput && emailInput.value) {
                // Simulate form submission
                contactForm.reset();
                formSuccess.classList.remove('hidden');
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 5000);
            }
        });
    }

    // Book Now Modal Logic
    const bookModal = document.getElementById('bookModal');
    const bookModalContent = document.getElementById('bookModalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalPackageName = document.getElementById('modalPackageName');
    const bookForm = document.getElementById('bookForm');
    const bookSuccessMessage = document.getElementById('bookSuccessMessage');
    
    // Select all 'Book Now' buttons across pages
    const bookNowButtons = document.querySelectorAll('button');
    bookNowButtons.forEach(btn => {
        if (btn.textContent.trim() === 'Book Now' && !btn.closest('#bookModalContent')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Find nearest package title if available
                const card = btn.closest('.group') || btn.closest('div.rounded-2xl');
                let pkgName = 'Your Selected Package';
                if (card) {
                    const titleEl = card.querySelector('h3');
                    if (titleEl) pkgName = titleEl.textContent;
                }
                
                if (bookModal && modalPackageName) {
                    modalPackageName.textContent = `Book: ${pkgName}`;
                    bookModal.classList.remove('hidden');
                    // Add slight delay for animation
                    setTimeout(() => {
                        bookModalContent.classList.remove('scale-95', 'opacity-0');
                        bookModalContent.classList.add('scale-100', 'opacity-100');
                    }, 10);
                }
            });
        }
    });

    if (closeModalBtn && bookModal) {
        closeModalBtn.addEventListener('click', () => {
            bookModalContent.classList.remove('scale-100', 'opacity-100');
            bookModalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                bookModal.classList.add('hidden');
                if (bookSuccessMessage) bookSuccessMessage.classList.add('hidden');
                if (bookForm) bookForm.reset();
            }, 300);
        });
        
        // Close on outside click
        bookModal.addEventListener('click', (e) => {
            if (e.target === bookModal) {
                closeModalBtn.click();
            }
        });
    }
    
    if (bookForm) {
        bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (bookSuccessMessage) {
                bookSuccessMessage.classList.remove('hidden');
                setTimeout(() => {
                    closeModalBtn.click();
                }, 2000);
            }
        });
    }

    // Dynamic Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');
    
    if (filterBtns.length > 0 && destinationCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white', 'shadow-sm');
                    b.classList.add('bg-gray-100', 'text-gray-600');
                });
                
                // Add active class to clicked button
                btn.classList.remove('bg-gray-100', 'text-gray-600');
                btn.classList.add('bg-primary', 'text-white', 'shadow-sm');
                
                const filterValue = btn.getAttribute('data-filter');
                
                destinationCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Add fade in animation
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.4s ease';
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Step 9: UI/UX Scroll Animations (Intersection Observer)
    // Add animate-on-scroll class to sections/elements
    const elementsToAnimate = document.querySelectorAll('section > div, .group, .destination-card, footer > div');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
