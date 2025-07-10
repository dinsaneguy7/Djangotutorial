document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const tocLinks = document.querySelectorAll('.toc-navigation a');

    // Toggle sidebar visibility
    hamburgerBtn.addEventListener('click', function() {
        sidebar.classList.add('active');
    });

    closeSidebarBtn.addEventListener('click', function() {
        sidebar.classList.remove('active');
    });

    // Close sidebar when a navigation link is clicked (for mobile)
    tocLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Smooth scroll to section
            event.preventDefault(); // Prevent default jump
            const targetId = this.getAttribute('href').substring(1); // Get target ID
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close sidebar after clicking a link on mobile
            if (window.innerWidth <= 992) { // Adjust breakpoint as per your CSS
                sidebar.classList.remove('active');
            }
        });
    });

    // Highlight active link in sidebar based on scroll position
    const sections = document.querySelectorAll('.guide-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Highlight when 30% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                tocLinks.forEach(link => link.classList.remove('active'));

                // Add active class to the current section's link
                const currentLink = document.querySelector(`.toc-navigation a[href="#${entry.target.id}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Initial highlight for the first section on page load
    if (sections.length > 0) {
        const firstSectionLink = document.querySelector(`.toc-navigation a[href="#${sections[0].id}"]`);
        if (firstSectionLink) {
            firstSectionLink.classList.add('active');
        }
    }
});
