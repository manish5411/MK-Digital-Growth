// script.js — hamburger, smooth nav, carousel, contact handling, reveal

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('site-nav') || document.querySelector('.nav');
  hamburger && hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', (!expanded).toString());
    nav.classList.toggle('show');
  });

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('show')) nav.classList.remove('show');
      hamburger && hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});


  // Testimonials carousel simple implementation
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.carousel .prev');
  const nextBtn = document.querySelector('.carousel .next');
  let index = 0;
  let width = track ? track.clientWidth : 0;
  function updateWidth(){ width = track.clientWidth; }
  window.addEventListener('resize', updateWidth);

  function goTo(i){
    if(!track) return;
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  prevBtn && prevBtn.addEventListener('click', ()=> goTo(index-1));
  nextBtn && nextBtn.addEventListener('click', ()=> goTo(index+1));

  // Auto-play
  let autoplay = setInterval(()=> goTo(index+1), 5000);
  track && track.addEventListener('mouseenter', ()=> clearInterval(autoplay));
  track && track.addEventListener('mouseleave', ()=> autoplay = setInterval(()=> goTo(index+1), 5000));

  // Scroll reveal (intersection observer)
  const reveals = document.querySelectorAll('.card, .work-item, .testimonial, .about-media img');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });
  reveals.forEach(r => obs.observe(r));

  // Contact form: basic validation + mailto fallback
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name')?.trim();
      const email = data.get('email')?.trim();
      const message = data.get('message')?.trim();
      if(!name || !email || !message){
        alert('Please fill name, email and message.');
        return;
      }

// =====================
// Reviews Section
// =====================


const reviewForm = document.getElementById('reviewForm');
const reviewList = document.getElementById('review-list');

// Load saved reviews from LocalStorage
window.addEventListener('DOMContentLoaded', () => {
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.forEach(r => addReviewToPage(r.text, r.name));
});

if (reviewForm) {
  reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let text = document.getElementById('reviewText').value.trim();
    let name = document.getElementById('reviewName').value.trim();

    if (!text || !name) {
      alert("Please enter both name and review.");
      return;
    }

    addReviewToPage(text, name);

    // Save review to LocalStorage
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push({ text, name });
    localStorage.setItem("reviews", JSON.stringify(reviews));

    reviewForm.reset();
  });
}

function addReviewToPage(text, name) {
  let newReview = document.createElement('div');
  newReview.classList.add('review');
  newReview.style.margin = "15px 0";
  newReview.style.padding = "15px";
  newReview.style.background = "#fff";
  newReview.style.borderRadius = "8px";
  newReview.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  newReview.innerHTML = `<p>"${text}"</p><strong>- ${name}</strong>`;
  reviewList && reviewList.appendChild(newReview);
}


      // Try to open mailto
      const subject = encodeURIComponent(`Website enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\nPhone: ${data.get('phone') || 'N/A'}\nEmail: ${email}`);
      window.location.href = `mailto:kumarmanish322251@gmail.com?subject=${subject}&body=${body}`;
      form.reset();
    });
  }
});
