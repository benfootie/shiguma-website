// Smooth scrolling for navbar links
document.querySelectorAll('.nav-center a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Remove the '#' from href
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 60, // Adjust for fixed navbar height
            behavior: 'smooth'
        });
    });
});

// Horizontal scrolling for images
const imageScrollSection = document.querySelector('.image-scroll-section');
const imageScrollContainer = document.querySelector('.image-scroll-container');
const images = document.querySelectorAll('.scroll-image');
const aboutSection = document.getElementById('about');
const faqSection = document.getElementById('faq');

// Calculate the width of each image (including margin)
const imageWidth = images[0].offsetWidth + 20; // Include margin-right
const totalImages = images.length;
const viewportWidth = window.innerWidth;

// The maximum distance the container can move (to show the last image)
const maxTranslateX = (totalImages - 1) * imageWidth;

// Track the last scroll position to determine scroll direction
let lastScrollPosition = window.scrollY;
let isAutoScrolling = false; // Flag to prevent interference during auto-scroll

window.addEventListener('scroll', () => {
    if (isAutoScrolling) return; // Skip if auto-scrolling is in progress

    const sectionTop = imageScrollSection.offsetTop;
    const sectionHeight = imageScrollSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight / 2; // Use the middle of the viewport
    const currentScrollPosition = window.scrollY;

    // Determine scroll direction
    const isScrollingDown = currentScrollPosition > lastScrollPosition;

    // Check if the section is in view
    if (scrollPosition > sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Calculate how far we are into the section (0 to 1)
        const scrollFraction = (scrollPosition - sectionTop) / sectionHeight;

        // Calculate the current image index (0 to 3 for 4 images)
        const currentImageIndex = Math.min(
            Math.floor(scrollFraction * totalImages),
            totalImages - 1
        );

        // Calculate the translation distance based on the current image index
        let translateX = -currentImageIndex * imageWidth;

        // Apply the translation
        imageScrollContainer.style.transform = `translateX(${translateX}px) translateY(-50%)`;

        // Check for auto-scroll conditions
        if (isScrollingDown && currentImageIndex === totalImages - 1) {
            // Last image is in view while scrolling down, auto-scroll to FAQ section
            isAutoScrolling = true;
            window.scrollTo({
                top: faqSection.offsetTop - 60, // Adjust for fixed navbar
                behavior: 'smooth'
            });
            setTimeout(() => {
                isAutoScrolling = false;
            }, 1000); // Reset flag after auto-scroll
        } else if (!isScrollingDown && currentImageIndex === 0) {
            // First image is in view while scrolling up, auto-scroll to About section
            isAutoScrolling = true;
            window.scrollTo({
                top: aboutSection.offsetTop - 60, // Adjust for fixed navbar
                behavior: 'smooth'
            });
            setTimeout(() => {
                isAutoScrolling = false;
            }, 1000); // Reset flag after auto-scroll
        }
    }

    // Update the last scroll position
    lastScrollPosition = currentScrollPosition;
});

// FAQ Dropdown Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling; // Get the corresponding answer
        const arrow = question.querySelector('.faq-arrow');

        // Toggle the answer visibility
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            arrow.classList.remove('open');
        } else {
            answer.style.display = 'block';
            arrow.classList.add('open');
        }
    });
});