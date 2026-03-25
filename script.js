document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  //  Mobile Navigation Toggle
  // ===============================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Close menu when link clicked
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // ===============================
  //  Smooth Scrolling
  // ===============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;

      const headerOffset = 70;
      const position =
        target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: position,
        behavior: "smooth"
      });
    });
  });

  // ==============================
  // Contact Form → MySQL (via Server)
  // ==============================

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = contactForm.querySelector("#name").value.trim();
      const email = contactForm.querySelector("#email").value.trim();
      const message = contactForm.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json" // 🔥 IMPORTANT
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message
          })
        });

        const data = await response.json();

        if (data.success) {
          alert("Message sent successfully! ✅");
          contactForm.reset();
        } else {
          alert("Something went wrong. Please try again ❌");
        }

      } catch (error) {
        console.error("Error:", error);
        alert("Server error ⚠️");
      }
    });
  }

  // ===============================
  //  Scroll Reveal Animation
  // ===============================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

});
