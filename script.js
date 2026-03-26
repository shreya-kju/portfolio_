console.log("JS is connected");

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
      if (hamburger && navLinks) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
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
  // Contact Form → Backend (Render)
  // ==============================

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      console.log("Form submitted");

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
      }
      try {
        const response = await fetch("https://portfolio-1-vs9s.onrender.com/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, message })
        });

        console.log("Response status:", response.status);

        const text = await response.text(); // 🔥 IMPORTANT
        console.log("Raw response:", text);

        alert("Message sent successfully! ✅");

        contactForm.reset();

      } catch (error) {
        console.error("Fetch error:", error);
        alert("Error sending message ❌");
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