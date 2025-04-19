const faqData = [
    {
        question: "What type of events are good for a foam party?",
        answer: "Birthdays, gender reveals, block parties, family reunions, day camp, day care, schools, field days, end of season events, season kick-off events, graduation parties, corporate functions, campus parties, tailgates, customer appreciation, customer acquisition, community celebrations, splashpads, festivals, markets, churches, libraries, campgrounds, live music, holiday parties, pet parties, and more! Foam parties are great for kids, teens, and adults!"
    },
    {
        question: "Is the foam safe for kids and pets?",
        answer: "Yes! We use Foam Daddy's hypo-allergenic, dye-free, non-toxic, biodegradable solution that is safe for kids, pets, and the environment."
    },
    {
        question: "Will we get wet in the foam?",
        answer: "The foam may leave you damp after a few minutes and you can easily dry off in the sun. The longer you stay in the foam, the more you get wet."
    },
    {
        question: "What should I wear to a foam party?",
        answer: "Lightweight, athletic style clothes are advisable. Swimsuits are recommended for kids who will play in the foam for longer periods of time."
    },
    {
        question: "Where should I have my foam party?",
        answer: "Foam parties typically take place outdoors in a clear, open, flat area. We request an area of at least 20x20 feet free of holes or obstructions."
    },
    {
        question: "How does clean up work after a foam party?",
        answer: "There is ZERO clean up for you! Most of the foam evaporates within a few minutes or hours. We can hose down the area before leaving to help the foam evaporate more quickly."
    },
    {
        question: "What areas do you travel to?",
        answer: "We serve Muncie and the surrounding areas including Selma, Daleville, Eaton, and Anderson. We can bring the foam to surrounding counties including Delaware, Grant, Blackford, Jay, Randolph, Henry, Madison, Tipton, Hamilton, Marion, and more. Depending on your location, we will adjust our travel fees accordingly."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const faqGrid = document.querySelector('.faq-grid');
    
    faqData.forEach(item => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');
        faqItem.innerHTML = `
            <h3>${item.question}</h3>
            <div class="faq-answer">${item.answer}</div>
        `;
        
        // Add click handler for FAQ items
        const question = faqItem.querySelector('h3');
        question.addEventListener('click', () => {
            const isActive = faqItem.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
        
        faqGrid.appendChild(faqItem);
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    body.appendChild(overlay);
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }
    
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Add smooth scrolling for book now links
    document.querySelectorAll('a[href="#book"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const bookSection = document.getElementById('book');
            if (bookSection) {
                bookSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add bubble animation to the background
function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Random size between 10px and 30px
    const size = Math.random() * 20 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Random position from left
    bubble.style.left = `${Math.random() * 100}vw`;
    
    document.body.appendChild(bubble);
    
    // Remove bubble after animation completes
    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });
}

// Create bubbles periodically
setInterval(createBubble, 3000); 