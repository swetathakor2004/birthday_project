// --- Slideshow Functionality ---

let slideIndex = 0; // Current slide ka index (0 se shuru hota hai)
let slides = [];    // Saari slides (images aur message cards)
let dots = [];      // Navigation dots

// DOMContentLoaded event ensures the script runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    slides = document.querySelectorAll('.slide'); // Saari .slide classes ko select karega
    
    // Create dots for navigation
    // NextElementSibling se hum slideshow-container ke baad wale div ko pakad rahe hain jahan dots banenge.
    const dotsContainer = document.querySelector('.slideshow-container').nextElementSibling; 
    if (dotsContainer && dotsContainer.style.textAlign === 'center') { 
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => currentSlide(i + 1)); 
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }
    }

    showSlides(); // Pehli slide dikhao
    // Agar aap automatic slideshow chahte hain, toh neeche wali line uncomment kar sakte hain
    // setInterval(plusSlides, 5000, 1); // Har 5 seconds (5000 milliseconds) mein agle slide par jao
});

// Main function to display slides
function showSlides() {
    // Sabhi slides ko hide karo
    slides.forEach(slide => {
        slide.style.display = 'none';
        // Agar slide mein video hai, toh use pause kar do jab woh hide ho
        const video = slide.querySelector('video');
        if (video) {
            video.pause();
        }
    });
    
    // Sabhi dots se 'active' class hatao
    dots.forEach(dot => dot.classList.remove('active'));

    // SlideIndex ko adjust karo agar woh boundary ke bahar chala gaya hai
    if (slideIndex >= slides.length) { 
        slideIndex = 0; 
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1; 
    }

    // Current slide aur dot ko dikhao aur 'active' class do
    slides[slideIndex].style.display = 'block';
    if (dots.length > 0) { 
        dots[slideIndex].classList.add('active');
    }

    // Agar current slide mein video hai, toh use play kar do
    const currentVideo = slides[slideIndex].querySelector('video');
    if (currentVideo) {
        currentVideo.play().catch(error => {
            console.log("Video autoplay failed:", error);
            // Agar autoplay fail ho, toh user ko batayein ki play karne ke liye click karein
        });
    }
}

// Function to change slide manually (next/prev buttons)
function plusSlides(n) {
    slideIndex += n; 
    showSlides(); 
}

// Function to go to a specific slide (dots)
function currentSlide(n) {
    slideIndex = n - 1; 
    showSlides();
}


// --- Music Player Functionality ---

const backgroundMusic = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');

// Music play/pause toggle
playPauseBtn.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        playPauseBtn.textContent = 'Pause Music';
    } else {
        backgroundMusic.pause();
        playPauseBtn.textContent = 'Play Music';
    }
});

// Optional: Music ko tab play karo jab page load ho (kuch browsers isko block kar sakte hain)
// backgroundMusic.play().catch(error => {
//     console.log("Autoplay failed:", error);
//     // User interaction needed to play music
//     playPauseBtn.textContent = 'Play Music';
// });

// Music jab end ho, toh button text update karo (agar loop nahi hai)
// backgroundMusic.addEventListener('ended', () => {
//     playPauseBtn.textContent = 'Play Music';
// });