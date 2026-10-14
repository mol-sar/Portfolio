// Detailed project modal data dictionary
const projectsData = {
  1: {
    title: "EcoMiner 2D Game Engine",
    tech: "C++, OpenGL, GLUT, Object-Oriented Programming",
    desc: "A standalone 2D interactive game engine built from scratch. Implements real-time primitive rendering pipelines, collision checks, and clean class inheritance hierarchy.",
    repo: "https://github.com/mol-sar/ecominer2d"
  },
  2: {
    title: "Sarawak Heritage Online Auction (SHAA)",
    tech: "PHP, MariaDB / MySQL, SQL Schema Normalization",
    desc: "A complete cultural asset auction portal normalized through 3NF to maintain data integrity, multi-user bidding logic, and real-time inventory transactions.",
    repo: "https://github.com/mol-sar/SHA"
  },
  3: {
    title: "ART Mobile Application Prototype",
    tech: "Figma UI/UX, Design Systems, Human-Computer Interaction",
    desc: "Interactive mobile wireframes and high-fidelity prototype simulating digital ticketing, live schedule tracking, and accessible navigation for Autonomous Rapid Transit.",
    repo: "https://www.figma.com/design/LQoZXhRaH7iUulW9eQFGgK/UiUx-project-protoype"
  },
  4: {
    title: "SDG Driver Safety & Rewards Application",
    tech: "Java, Java Swing, OOD",
    desc: "Desktop application aligned with UN SDG 11 (Sustainable Cities) evaluating driver safety scores, milestone achievements, and GUI progress indicators.",
    repo: "https://github.com/mol-sar"
  },
  5: {
    title: "Pet Hotel Management System",
    tech: "C++, Abstract Base Classes, Virtual Functions",
    desc: "Comprehensive terminal application utilizing pure virtual functions, polymorphism, and dynamic memory references across Pet Owner and Staff management portals.",
    repo: "https://github.com/mol-sar"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Copyright Year
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Dark / Light Theme Toggle with LocalStorage Persistence
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("site-theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("site-theme", nextTheme);
    themeToggle.textContent = nextTheme === "dark" ? "☀️" : "🌙";
  });

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // 4. Auto-Close Mobile Menu on Link Click
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // 5. Sticky Navbar Shadow & Scroll-to-Top Button Visibility
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scroll-top-btn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  // 6. Scroll-to-Top Action
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 7. Active Nav Link on Scroll via IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        document.querySelectorAll(".nav-link").forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));

  // 8. Project Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 9. Interactive Project Modal Dialog
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalTech = document.getElementById("modal-tech");
  const modalDesc = document.getElementById("modal-desc");
  const modalLinks = document.getElementById("modal-links");
  const modalClose = document.getElementById("modal-close");
  const modalBackdrop = document.getElementById("modal-backdrop");

  const openModal = (id) => {
    const data = projectsData[id];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalTech.textContent = data.tech;
    modalDesc.textContent = data.desc;
    modalLinks.innerHTML = `<a href="${data.repo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View Project Source</a>`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  document.querySelectorAll(".view-details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      openModal(id);
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  // 10. Live Character Counter for Contact Form Textarea
  const messageInput = document.getElementById("message");
  const charCount = document.getElementById("char-count");

  messageInput.addEventListener("input", () => {
    charCount.textContent = messageInput.value.length;
  });

  // 11. Front-end Contact Form Validation & Simulated Submission
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const msgError = document.getElementById("msg-error");
  const feedback = document.getElementById("form-feedback");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    nameError.textContent = "";
    emailError.textContent = "";
    msgError.textContent = "";
    feedback.textContent = "";

    // Name Validation
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Please enter a valid name (at least 2 characters).";
      isValid = false;
    }

    // Email Validation (Regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // Message Validation
    if (messageInput.value.trim().length < 10) {
      msgError.textContent = "Message must be at least 10 characters long.";
      isValid = false;
    }

    if (isValid) {
      feedback.style.color = "var(--success)";
      feedback.textContent = "Message received! Thank you for getting in touch.";
      contactForm.reset();
      charCount.textContent = "0";
    }
  });
});
