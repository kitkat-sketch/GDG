"use strict";

// 1. Mobile Navigation Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute(
      "aria-label",
      expanded ? "Open navigation" : "Close navigation"
    );
    navLinks.classList.toggle("active", !expanded);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// 2. Dark / Light Theme Switcher
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const rootElement = document.documentElement;

const savedTheme = localStorage.getItem("devconnect-theme");
if (savedTheme) {
  rootElement.setAttribute("data-theme", savedTheme);
  if (themeIcon) themeIcon.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = rootElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    rootElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("devconnect-theme", nextTheme);
    if (themeIcon) themeIcon.textContent = nextTheme === "dark" ? "☀️" : "🌙";
  });
}

// 3. Live Event Countdown Timer (Target: 21 Nov 2026, 09:30 AM IST)
const targetDate = new Date("2026-11-21T09:30:00+05:30").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// 4. Interactive Schedule Track Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const scheduleItems = document.querySelectorAll(".schedule-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const selectedTrack = btn.getAttribute("data-filter");

    scheduleItems.forEach((item) => {
      const itemTrack = item.getAttribute("data-track");
      if (selectedTrack === "all" || selectedTrack === itemTrack) {
        item.hidden = false;
      } else {
        item.hidden = true;
      }
    });
  });
});

// 5. Registration Form & Demo Pass Generator
const registrationForm = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");
const ticketCard = document.getElementById("ticketCard");

if (registrationForm && formMessage) {
  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!registrationForm.checkValidity()) {
      registrationForm.reportValidity();
      return;
    }

    const name = document.getElementById("fullName").value.trim();
    const role = document.getElementById("attendeeRole").value;
    const track = document.getElementById("preferredTrack").value;
    const randomId = "#DC-" + Math.floor(1000 + Math.random() * 9000);

    // Populate the virtual pass
    if (ticketCard) {
      document.getElementById("ticketName").textContent = name;
      document.getElementById("ticketRole").textContent = role;
      document.getElementById("ticketTrack").textContent = track;
      document.getElementById("ticketId").textContent = randomId;
      ticketCard.hidden = false;
    }

    formMessage.textContent =
      "🎉 Demo pass generated! Check out your virtual badge on the left.";

    registrationForm.reset();
  });
}