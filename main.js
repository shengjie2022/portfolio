/* ========================================
   Portfolio Interactive Features
   Author: 盛洁
   ======================================== */

(function () {
  'use strict';

  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });
  }

  // --- Navigation Scroll Effect ---
  const siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        siteNav.classList.add('scrolled');
      } else {
        siteNav.classList.remove('scrolled');
      }
    });
  }

  // --- Reading Progress Bar (Article Pages) ---
  const articleContainer = document.querySelector('.article-container');
  if (articleContainer) {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  // --- Back to Top Button ---
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', '返回顶部');
  backToTop.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // --- Scroll-triggered Animations ---
  var animElements = document.querySelectorAll(
    '.card, .info-box, .insight-block, .table-wrapper, .user-story, ' +
    '.flow-diagram, .arch-diagram, .comparison, .stats-grid, .stat-card, ' +
    '.diagram-block, .code-block, .monitor-tree'
  );

  if ('IntersectionObserver' in window && animElements.length > 0) {
    animElements.forEach(function (el) {
      el.classList.add('scroll-reveal');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    animElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- TOC Active Highlighting ---
  var toc = document.querySelector('.toc');
  if (toc) {
    var tocLinks = toc.querySelectorAll('a[href^="#"]');
    var sections = [];

    tocLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) {
        sections.push({ el: section, link: link });
      }
    });

    if (sections.length > 0) {
      window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY + 120;
        var current = null;

        sections.forEach(function (s) {
          if (s.el.offsetTop <= scrollPos) {
            current = s;
          }
        });

        tocLinks.forEach(function (l) { l.classList.remove('toc-active'); });
        if (current) {
          current.link.classList.add('toc-active');
        }
      });
    }
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Hero Tags Stagger Animation ---
  var heroTags = document.querySelectorAll('.hero-tags span');
  heroTags.forEach(function (tag, i) {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(10px)';
    tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    tag.style.transitionDelay = (0.1 + i * 0.08) + 's';

    requestAnimationFrame(function () {
      tag.style.opacity = '1';
      tag.style.transform = 'translateY(0)';
    });
  });

  // --- Article Meta Stagger ---
  var metaSpans = document.querySelectorAll('.article-hero .meta span');
  metaSpans.forEach(function (span, i) {
    span.style.opacity = '0';
    span.style.transform = 'translateY(8px)';
    span.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    span.style.transitionDelay = (0.2 + i * 0.1) + 's';

    requestAnimationFrame(function () {
      span.style.opacity = '1';
      span.style.transform = 'translateY(0)';
    });
  });

})();
