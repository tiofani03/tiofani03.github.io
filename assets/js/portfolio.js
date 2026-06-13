(() => {
  "use strict";

  const DATA_URL = "assets/data/portfolio.json";
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const padNumber = (index) => String(index + 1).padStart(2, "0");

  const calculateExperience = (careerStart) => {
    const start = new Date(careerStart);
    return Math.max(
      1,
      Math.floor((Date.now() - start.getTime()) / 31557600000),
    );
  };

  const iconPaths = {
    architecture: '<path d="M8 40V19l16-11 16 11v21M17 40V27h14v13" />',
    empathy:
      '<path d="M24 42S7 32 7 18a9 9 0 0 1 17-4 9 9 0 0 1 17 4c0 14-17 24-17 24Z" />',
    performance:
      '<path d="M24 5v8M10.6 10.6l5.7 5.7M5 24h8M38 10l-15 18-6-6M8 39h32" />',
    collaboration:
      '<circle cx="17" cy="17" r="7" /><circle cx="34" cy="19" r="5" /><path d="M5 41c1-9 6-14 12-14s11 5 12 14M29 30c7 0 11 4 12 11" />',
  };

  const arrowIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>';

  const renderProfile = (profile) => {
    const experienceYears = calculateExperience(profile.careerStart);

    document.querySelectorAll("[data-profile-name]").forEach((element) => {
      element.textContent = profile.name;
    });
    document.querySelectorAll("[data-profile-role]").forEach((element) => {
      element.textContent = profile.role;
    });
    document.querySelectorAll("[data-profile-location]").forEach((element) => {
      element.textContent = profile.location;
    });
    document.querySelectorAll("[data-experience-years]").forEach((element) => {
      element.textContent = String(experienceYears);
    });
    document.querySelectorAll("[data-profile-resume]").forEach((element) => {
      element.href = profile.resume;
    });
    document.querySelectorAll("[data-profile-github]").forEach((element) => {
      element.href = profile.github;
    });
    document.querySelectorAll("[data-profile-linkedin]").forEach((element) => {
      element.href = profile.linkedin;
    });
    document.querySelectorAll("[data-profile-whatsapp]").forEach((element) => {
      element.href = profile.whatsapp;
    });
    document.querySelectorAll("[data-profile-email]").forEach((element) => {
      element.href = `mailto:${profile.email}`;
      element.textContent = profile.email;
    });
    document.querySelectorAll("[data-profile-email-link]").forEach((element) => {
      element.href = `mailto:${profile.email}`;
    });

    return experienceYears;
  };

  const renderMetrics = (metrics, experienceYears) => {
    const container = document.querySelector("[data-metrics]");
    if (!container) return;

    const cards = metrics
      .map((metric) => {
        const value =
          metric.value === "experience" ? experienceYears : metric.value;
        return `
          <article class="metric-card reveal">
            <strong>${escapeHtml(value)}${escapeHtml(metric.suffix || "")}</strong>
            <span>${escapeHtml(metric.label)}</span>
          </article>
        `;
      })
      .join("");

    container.innerHTML = `${cards}
      <article class="metric-card metric-card-accent reveal">
        <span class="metric-symbol">↗</span>
        <span>Always optimizing for the next release</span>
      </article>`;
  };

  const renderTechnologies = (technologies) => {
    const container = document.querySelector("[data-technologies]");
    if (!container) return;

    const repeated = [...technologies, ...technologies];
    container.innerHTML = repeated
      .map((technology) => `<span>${escapeHtml(technology)}</span><i></i>`)
      .join("");
  };

  const renderProjects = (projects) => {
    const container = document.querySelector("[data-projects]");
    if (!container) return;

    container.innerHTML = projects
      .map(
        (project, index) => `
          <article
            class="project-card ${project.featured ? "project-featured" : ""} reveal"
            data-category="${escapeHtml(project.category)}">
            <a
              class="project-visual project-${escapeHtml(project.accent)}"
              href="${escapeHtml(project.url)}"
              target="_blank"
              rel="noreferrer"
              aria-label="View ${escapeHtml(project.title)}">
              <div class="project-visual-grid" aria-hidden="true"></div>
              <div class="project-visual-copy">
                <span>${escapeHtml(project.visual.eyebrow)}</span>
                <strong>${escapeHtml(project.visual.headline)}</strong>
              </div>
              <div class="project-visual-metric">
                <strong>${escapeHtml(project.visual.metric)}</strong>
                <span>${escapeHtml(project.visual.metricLabel)}</span>
              </div>
              ${project.category === 'web' ? `
              <div class="project-device device-web" aria-hidden="true">
                <div class="device-bar"><i></i><i></i><i></i></div>
                <div class="device-content">
                  <span></span>
                  <div class="web-layout"><span></span><span></span></div>
                </div>
              </div>` : project.category === 'backend' ? `
              <div class="project-device device-backend" aria-hidden="true">
                <div class="server-unit"><i></i><i></i><span></span></div>
                <div class="server-unit"><i></i><i></i><span></span></div>
                <div class="server-unit"><i></i><i></i><span></span></div>
              </div>` : `
              <div class="project-device device-mobile" aria-hidden="true">
                <div class="device-bar"><i></i><i></i><i></i></div>
                <div class="device-content">
                  <span></span><span></span><span></span>
                  <div><i></i><i></i></div>
                </div>
              </div>`}
              <span class="project-arrow">${arrowIcon}</span>
            </a>
            <div class="project-meta">
              <div>
                <span class="project-number">${padNumber(index)}</span>
                <h3>${escapeHtml(project.title)}</h3>
              </div>
              <p>${escapeHtml(project.description)}</p>
              <div class="tag-list">
                ${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
              </div>
            </div>
          </article>
        `,
      )
      .join("");
  };

  const renderExperience = (experience) => {
    const container = document.querySelector("[data-experience]");
    if (!container) return;

    container.innerHTML = experience
      .map(
        (item, index) => `
          <article class="experience-item reveal">
            <div class="experience-date">${escapeHtml(item.period)}</div>
            <div class="experience-role">
              <h3>${escapeHtml(item.role)}</h3>
              <span>${escapeHtml(item.company)}</span>
            </div>
            <p>${escapeHtml(item.description)}</p>
            <span class="experience-mark">${padNumber(index)}</span>
          </article>
        `,
      )
      .join("");
  };

  const renderPrinciples = (principles) => {
    const container = document.querySelector("[data-principles]");
    if (!container) return;

    container.innerHTML = principles
      .map(
        (principle, index) => `
          <article class="principle-card reveal">
            <span>${padNumber(index)}</span>
            <div>
              <h3>${escapeHtml(principle.title)}</h3>
              <p>${escapeHtml(principle.description)}</p>
            </div>
            <svg viewBox="0 0 48 48" aria-hidden="true">
              ${iconPaths[principle.icon] || iconPaths.architecture}
            </svg>
          </article>
        `,
      )
      .join("");
  };

  const renderToolkit = (toolkit) => {
    const container = document.querySelector("[data-toolkit]");
    if (!container) return;
    container.innerHTML = toolkit
      .map((tool) => `<span>${escapeHtml(tool)}</span>`)
      .join("");
  };

  const renderCertificates = (certificates) => {
    const container = document.querySelector("[data-certificates]");
    if (!container) return;

    container.innerHTML = certificates
      .map(
        (certificate, index) => `
          <a
            class="certificate-item"
            href="${escapeHtml(certificate.url)}"
            target="_blank"
            rel="noreferrer">
            <span class="certificate-number">${padNumber(index)}</span>
            <span class="certificate-name">${escapeHtml(certificate.title)}</span>
            <span class="certificate-meta">
              ${escapeHtml(certificate.issuer)} · ${escapeHtml(certificate.year)}
            </span>
            <span class="certificate-arrow">${arrowIcon}</span>
          </a>
        `,
      )
      .join("");
  };

  const setupReveal = () => {
    const revealItems = document.querySelectorAll(".reveal");
    if (reducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
  };

  const setupFilters = () => {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const projectCards = document.querySelectorAll("[data-category]");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        filterButtons.forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");

        projectCards.forEach((card) => {
          const shouldShow =
            filter === "all" || card.dataset.category === filter;
          card.classList.toggle("is-hidden", !shouldShow);
        });
      });
    });
  };

  const setupNavigation = () => {
    const header = document.querySelector("[data-header]");
    const progress = document.querySelector(".scroll-progress");
    const menuButton = document.querySelector("[data-menu-button]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");

    const updateScrollUI = () => {
      const scrollTop = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? scrollTop / scrollable : 0;

      header?.classList.toggle("is-scrolled", scrollTop > 24);
      if (progress) progress.style.transform = `scaleX(${ratio})`;
    };

    const closeMenu = () => {
      document.body.classList.remove("menu-open");
      mobileMenu?.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
      menuButton?.setAttribute("aria-label", "Open navigation");
    };

    updateScrollUI();
    window.addEventListener("scroll", updateScrollUI, { passive: true });

    menuButton?.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      document.body.classList.toggle("menu-open", !isOpen);
      mobileMenu?.classList.toggle("is-open", !isOpen);
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Open navigation" : "Close navigation",
      );
    });

    mobileMenu?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  };

  const setupPointerEffects = () => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const glow = document.querySelector(".cursor-glow");
    window.addEventListener(
      "pointermove",
      (event) => {
        if (!glow) return;
        glow.style.opacity = "1";
        glow.style.transform = `translate3d(${event.clientX - 170}px, ${event.clientY - 170}px, 0)`;
      },
      { passive: true },
    );

    document.querySelectorAll(".magnetic").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
      });
      element.addEventListener("pointerleave", () => {
        element.style.transform = "";
      });
    });
  };

  const initialize = async () => {
    try {
      let data = null;

      const response = await fetch(DATA_URL);
      if (response.ok) {
        data = await response.json();
      } else {
        throw new Error(`Failed to fetch ${DATA_URL}: ${response.status}`);
      }

      const experienceYears = renderProfile(data.profile);
      renderMetrics(data.metrics, experienceYears);
      renderTechnologies(data.technologies);
      renderProjects(data.projects);
      renderExperience(data.experience);
      renderPrinciples(data.principles);
      renderToolkit(data.toolkit);
      renderCertificates(data.certificates);

      setupReveal();
      setupFilters();
      setupNavigation();
      setupPointerEffects();

      if (window.location.hash) {
        const target = document.getElementById(window.location.hash.slice(1));
        window.requestAnimationFrame(() => target?.scrollIntoView());
      }
    } catch (error) {
      console.error(error);
      document.body.classList.add("data-load-error");
      document.querySelectorAll(".reveal").forEach((element) => {
        element.classList.add("is-visible");
      });
    }
  };

  initialize();
})();
