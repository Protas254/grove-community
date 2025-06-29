const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slider-wrapper img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.dots-container');

let currentIndex = 0;
const slideWidth = slides[0].clientWidth; // Get the width of a single slide

// Create navigation dots
for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.setAttribute('data-index', i);
  dotsContainer.appendChild(dot);
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateSlider();
  });
}

const dots = document.querySelectorAll('.dot');

function updateSlider() {
  sliderWrapper.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

  // Update active dot
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

prevBtn.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1; // Loop to the last slide
  }
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0; // Loop to the first slide
  }
  updateSlider();
});

// Initial update
updateSlider();

// Optional: Auto-slide
let slideInterval = setInterval(() => {
  nextBtn.click(); // Simulate a click on the next button
}, 5000); // Change slide every 5 seconds

// Pause auto-slide on hover
sliderWrapper.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

sliderWrapper.addEventListener('mouseleave', () => {
  slideInterval = setInterval(() => {
    nextBtn.click();
  }, 5000);
});