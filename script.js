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
  
  //----------------------------------------------------------------------------------------------------------------------------
  // 2. Dark / Light Theme Toggle 
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
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
  }
  
  //----------------------------------------------------------------------------------------------------------------------------
  // 3. Mobile Hamburger Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }
  
  //----------------------------------------------------------------------------------------------------------------------------
  // 4. Close Mobile Menu on Nav Click (Fixed Selector)
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks) navLinks.classList.remove("open");
    });
  });
  
  //----------------------------------------------------------------------------------------------------------------------------
  // 5. Sticky Navbar Shadow & Scroll-to-Top Button
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scroll-top-btn");

  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }
  });

  // 6. Scroll to Top Action
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  
  //----------------------------------------------------------------------------------------------------------------------------
  // 7. Active Nav Link
  const sections = document.querySelectorAll("section[id]");
  if (sections.length > 0 && "IntersectionObserver" in window) {
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
  }
  
  //----------------------------------------------------------------------------------------------------------------------------
  // 8. Project Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

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
  
  //----------------------------------------------------------------------------------------------------------------------------
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
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalTech) modalTech.textContent = data.tech;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalLinks) {
      modalLinks.innerHTML = `<a href="${data.repo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View Project Source</a>`;
    }
    if (modal) {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  };

  
  document.querySelectorAll(".view-details-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-id");
      openModal(id);
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) closeModal();
  });
  
  //----------------------------------------------------------------------------------------------------------------------------
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
  //----------------------------------------------------------------------------------------------------------------------------
  // 11. Contact Form Character Counter & Validation
  const messageInput = document.getElementById("message");
  const charCount = document.getElementById("char-count");
  const contactForm = document.getElementById("contact-form");

  if (messageInput && charCount) {
    messageInput.addEventListener("input", () => {
      charCount.textContent = messageInput.value.length;
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const nameError = document.getElementById("name-error");
      const emailError = document.getElementById("email-error");
      const msgError = document.getElementById("msg-error");
      const feedback = document.getElementById("form-feedback");

      if (nameError) nameError.textContent = "";
      if (emailError) emailError.textContent = "";
      if (msgError) msgError.textContent = "";
      if (feedback) feedback.textContent = "";

      if (nameInput && nameInput.value.trim().length < 2) {
        if (nameError) nameError.textContent = "Please enter your name (min 2 characters).";
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && !emailPattern.test(emailInput.value.trim())) {
        if (emailError) emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      if (messageInput && messageInput.value.trim().length < 10) {
        if (msgError) msgError.textContent = "Message must be at least 10 characters.";
        isValid = false;
      }

      if (isValid && feedback) {
        feedback.style.color = "var(--accent)";
        feedback.textContent = "Thank you! Your message has been sent successfully.";
        contactForm.reset();
        if (charCount) charCount.textContent = "0";
      }
    });
  }
});
