// Detailed Project Modal Data
const projectsData = {
  1: {
    title: "EcoMiner: 2D Mining Simulation Engine",
    tech: "C++, OpenGL, GLUT, Object-Oriented Architecture",
    desc: "A collaborative university project where we created an interactive 2D mining game engine from the ground up using C++ and OpenGL. I focused on drawing 2D shapes, handling smooth player physics, and detecting collisions when interacting with the game map.",
    repo: "https://github.com/mol-sar/ecominer2d"
  },
  2: {
    title: "Sarawak Heritage Online Auction (SHAA)",
    tech: "PHP, MariaDB / MySQL, Schema Normalization (1NF–3NF)",
    desc: "A dynamic auction website for cultural items developed with PHP and MariaDB/MySQL. I structured the database using 3NF normalization rules to prevent duplicate data, keep transactions secure, and support multiple users bidding at the same time.",
    repo: "https://github.com/mol-sar/SHA"
  },
  3: {
    title: "ART Mobile Application Prototype",
    tech: "Figma UI/UX, Design Systems, Mobile Interaction Design",
    desc: "A clickable mobile prototype built in Figma for Sarawak's public transit system. The app lets passengers look up train schedules, view route maps, and purchase digital tickets. Designed following mobile usability guidelines and accessible color contrast.",
    repo: "https://www.figma.com/design/LQoZXhRaH7iUulW9eQFGgK/UiUx-project-protoype"
  },
  4: {
    title: "SDG Driver Safety",
    tech: "Java, Java Swing GUI, Event-Driven Architecture",
    desc: "Desktop evaluation software created in support of UN Sustainable Development Goal 11 (Sustainable Cities and Communities). Integrates an interactive Java Swing interface featuring custom progress tracking, badging mechanics, and safety metric evaluation logic.",
    repo: "https://github.com/mol-sar/thedesktopapplication"
  },
  5: {
    title: "Pet Hotel Hospitality Management System",
    tech: "C++, Abstract Base Classes, Virtual Functions, Pointers",
    desc: "A terminal-based management system written in C++. It manages pet reservations, room check-ins, and staff duties. The program uses object-oriented programming concepts like classes, inheritance, and pointers to keep the system organized and reliable.",
    repo: "https://github.com/mol-sar/Pet-Hotel-System"
  },
  6: {
    title: "Java String Cipher & Encoder",
    tech: "Java, Java Swing GUI, String Manipulation, Cipher Logic",
    desc: "A collaborative Java desktop tool developed for an assignment. It validates user text and applies a custom shift cipher across lowercase letters and numbers while preserving spaces. I implemented the core validation and encoding logic in Encoded.java, handling character parsing and dynamic key generation.",
    repo: "https://github.com/mol-sar/Encoded"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Dark / Light Theme Toggle with LocalStorage
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

  // 3. Mobile Hamburger Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // 4. Close Mobile Menu on Nav Click
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // 5. Sticky Navbar Shadow & Scroll-to-Top Button
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scroll-top-btn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
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

  // 6. Scroll to Top Action
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 7. Active Nav Link via IntersectionObserver
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
  }, { threshold: 0.3 });
  sections.forEach(sec => observer.observe(sec));

  // 8. Project Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  // Calculate and append counts automatically
  filterBtns.forEach(btn => {
    const filter = btn.getAttribute("data-filter");
    let count = 0;
    if (filter === "all") {
      count = portfolioCards.length;
    } else {
      portfolioCards.forEach(c => {
        if (c.getAttribute("data-category") === filter) count++;
      });
    }
    btn.innerHTML = `${btn.textContent} <span class="filter-count">${count}</span>`;
  });

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      portfolioCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
  
  // 9. Interactive Modal Dialog
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
      openModal(btn.getAttribute("data-id"));
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  // 10. Skills Carousel Navigation Buttons
  const skillsTrack = document.getElementById("skills-track");
  const skillPrev = document.getElementById("skill-prev");
  const skillNext = document.getElementById("skill-next");

  if (skillPrev && skillNext && skillsTrack) {
    skillPrev.addEventListener("click", () => {
      skillsTrack.scrollBy({ left: -240, behavior: "smooth" });
    });
    skillNext.addEventListener("click", () => {
      skillsTrack.scrollBy({ left: 240, behavior: "smooth" });
    });
  }

  // 11. Contact Form Character Counter & Validation
  const messageInput = document.getElementById("message");
  const charCount = document.getElementById("char-count");
  const contactForm = document.getElementById("contact-form");

  messageInput.addEventListener("input", () => {
    charCount.textContent = messageInput.value.length;
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const msgError = document.getElementById("msg-error");
    const feedback = document.getElementById("form-feedback");

    nameError.textContent = "";
    emailError.textContent = "";
    msgError.textContent = "";
    feedback.textContent = "";

    if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Please enter your name (min 2 characters).";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
      msgError.textContent = "Message must be at least 10 characters.";
      isValid = false;
    }

    if (isValid) {
      feedback.style.color = "var(--accent)";
      feedback.textContent = "Thank you! Your message has been sent successfully.";
      contactForm.reset();
      charCount.textContent = "0";
  
  });
});
    // 12. Dynamic Typewriter Effect for Hero
  const roles = [
    "Multimedia Computing Student",
    "C++ & OpenGL Engine Developer",
    "UI/UX Interaction Designer",
    "Relational Database Architect"
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeTarget = document.getElementById("typewriter-text");

  function typeEffect() {
    if (!typeTarget) return;
    const currentWord = roles[roleIdx];
    
    if (isDeleting) {
      typeTarget.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typeTarget.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 40 : 90;

    if (!isDeleting && charIdx === currentWord.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400; 
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect();
  });
});

// Native Vanilla 3D Mouse Tilt Effect
  const tiltCards = document.querySelectorAll(".tilt-element");

  tiltCards.forEach((card) => {
    const glare = card.querySelector(".glare-overlay");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X relative to card
      const y = e.clientY - rect.top;  // Mouse Y relative to card

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max tilt angle (degrees)
      const maxTilt = 14;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(224, 169, 109, 0.3) 0%, rgba(255, 255, 255, 0) 70%)`;
        glare.style.opacity = "1";
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      if (glare) glare.style.opacity = "0";
    });
  });
