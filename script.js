// ===============================
// Firebase SDK Imports
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// ===============================
//  Firebase Configuration
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyD5VrJTj9bQk2AqMP_pYQSnEtnP9atv0jc",
  authDomain: "portfolio-website-52413.firebaseapp.com",
  projectId: "portfolio-website-52413",
  storageBucket: "portfolio-website-52413.firebasestorage.app",
  messagingSenderId: "279977113272",
  appId: "1:279977113272:web:4d616b15376ac1ccbda64d",
  measurementId: "G-B86B1W6DE0"
};

// ===============================
//  Initialize Firebase
// ===============================
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

console.log("Firebase connected successfully");

// ===============================
//  DOM Content Loaded
// ===============================
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

  // ===============================
  //  Contact Form → Firestore
  // ===============================
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = contactForm.querySelector("#name").value;
      const email = contactForm.querySelector("#email").value;
      const message = contactForm.querySelector("#message").value;

      try {
        await addDoc(collection(db, "contacts"), {
          name,
          email,
          message,
          timestamp: new Date()
        });

        alert("Message sent successfully!");
        contactForm.reset();

      } catch (error) {
        console.error("Error saving message:", error);
        alert("Something went wrong. Please try again.");
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
