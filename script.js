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

    // Handle package selection in form
    const packageSelect = document.querySelector('#package');
    if (packageSelect) {
        // Get package from URL parameter
        const urlParams = new URLSearchParams(window.location.hash.slice(1));
        const selectedPackage = urlParams.get('package');
        
        if (selectedPackage) {
            // Find and select the matching option
            const options = packageSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === selectedPackage.toLowerCase()) {
                    packageSelect.selectedIndex = i;
                    break;
                }
            }
            
            // Scroll to form
            document.querySelector('#book').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Popup handling
    const popup = document.getElementById('booking-popup');
    const closeBtn = popup.querySelector('.close-popup');
    
    // Function to open popup
    function openPopup() {
        popup.classList.add('active');
        document.body.classList.add('popup-open');
    }
    
    // Function to close popup
    function closePopup() {
        popup.classList.remove('active');
        document.body.classList.remove('popup-open');
    }
    
    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    // Close popup with close button
    closeBtn.addEventListener('click', closePopup);
    
    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
    
    // Open popup when clicking any Book Now button
    document.querySelectorAll('[href*="#book"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openPopup();
            
            // Handle package selection
            const params = new URLSearchParams(button.getAttribute('href').split('?')[1]);
            const selectedPackage = params.get('package');
            
            if (selectedPackage && packageSelect) {
                const options = packageSelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === selectedPackage.toLowerCase()) {
                        packageSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
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

    // Handle simple form submission
    const simpleForm = document.getElementById('inline-booking-form');
    const continueBtn = simpleForm.querySelector('.continue-btn');
    
    continueBtn.addEventListener('click', () => {
        // Get values from simple form
        const name = document.getElementById('inline-fullName').value;
        const email = document.getElementById('inline-email').value;
        const phone = document.getElementById('inline-phone').value;
        
        // Validate required fields
        if (!name || !email || !phone) {
            alert('Please fill in all fields to continue');
            return;
        }
        
        // Pre-fill popup form
        document.getElementById('fullName').value = name;
        document.getElementById('email').value = email;
        document.getElementById('phone').value = phone;
        
        // Trigger labels to move up
        document.getElementById('fullName').dispatchEvent(new Event('input'));
        document.getElementById('email').dispatchEvent(new Event('input'));
        document.getElementById('phone').dispatchEvent(new Event('input'));
        
        // Open popup
        popup.classList.add('active', 'from-simple-form');
        document.body.classList.add('popup-open');
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