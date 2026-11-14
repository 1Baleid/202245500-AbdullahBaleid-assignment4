/* ==========================================================================
   Abdullah Baleid — Portfolio
   Small, dependency-free enhancements. The page is fully readable without JS:
   if this file fails to load or boot, the inline head script removes the
   `js` class after 3 s so nothing stays hidden.
   ========================================================================== */
(function () {
    'use strict';

    var root = document.documentElement;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // If the head failsafe already fired (very slow load), skip reveal animations.
    var lateBoot = !root.classList.contains('js');
    root.classList.add('js');

    function safeGet(storage, key) {
        try { return window[storage].getItem(key); } catch (e) { return null; }
    }
    function safeSet(storage, key, value) {
        try { window[storage].setItem(key, value); } catch (e) { /* storage unavailable */ }
    }
    // MediaQueryList change listener with a fallback for Safari < 14
    function onMediaChange(mql, fn) {
        if (mql.addEventListener) mql.addEventListener('change', fn);
        else if (mql.addListener) mql.addListener(fn);
    }

    // Re-anchors a #hash deep link after late layout shifts (fonts, GitHub cards)
    var realignHash = function () {};

    /* ------------------------------------------------------------------
       Theme toggle (light / dark, follows the OS until the visitor picks)
       ------------------------------------------------------------------ */
    function initTheme() {
        var btn = document.getElementById('themeToggle');
        if (!btn) return;
        var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
        var metas = Array.prototype.slice.call(document.querySelectorAll('meta[name="theme-color"]'));

        function current() {
            var set = root.getAttribute('data-theme');
            if (set === 'light' || set === 'dark') return set;
            return systemDark.matches ? 'dark' : 'light';
        }
        function syncMeta() {
            var set = root.getAttribute('data-theme');
            if (set !== 'light' && set !== 'dark') return;
            metas.forEach(function (m) { m.setAttribute('content', set === 'dark' ? '#0c0c0d' : '#f5f3ef'); });
        }
        function sync() {
            var next = current() === 'dark' ? 'light' : 'dark';
            btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
        }

        btn.addEventListener('click', function () {
            var next = current() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            safeSet('localStorage', 'theme', next);
            syncMeta();
            sync();
        });
        onMediaChange(systemDark, sync);
        sync();
        syncMeta();
    }

    /* ------------------------------------------------------------------
       Header: scrolled state, mobile menu, active section link
       ------------------------------------------------------------------ */
    function initHeader() {
        var header = document.getElementById('siteHeader');
        var nav = document.getElementById('siteNav');
        var toggle = document.getElementById('menuToggle');
        if (!header) return;

        var ticking = false;
        function onScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                header.classList.toggle('is-scrolled', window.scrollY > 8);
                ticking = false;
            });
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        if (toggle && nav) {
            var setOpen = function (open, moveFocus) {
                nav.classList.toggle('is-open', open);
                header.classList.toggle('menu-open', open);
                toggle.setAttribute('aria-expanded', String(open));
                toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
                if (open && moveFocus) {
                    var first = nav.querySelector('a');
                    if (first) first.focus();
                }
            };
            toggle.addEventListener('click', function () {
                setOpen(toggle.getAttribute('aria-expanded') !== 'true', true);
            });
            // Any link in the header (nav items or the brand) closes the menu
            header.addEventListener('click', function (e) {
                if (e.target.closest('a')) setOpen(false);
            });
            // Close when keyboard focus leaves the header
            header.addEventListener('focusout', function (e) {
                if (nav.classList.contains('is-open') && e.relatedTarget && !header.contains(e.relatedTarget)) setOpen(false);
            });
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                    setOpen(false);
                    toggle.focus();
                }
            });
            document.addEventListener('click', function (e) {
                if (nav.classList.contains('is-open') && !header.contains(e.target)) setOpen(false);
            });
            onMediaChange(window.matchMedia('(min-width: 961px)'), function (mq) {
                if (mq.matches) setOpen(false);
            });
        }

        // Highlight the nav link for the section currently in view
        var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav__link'));
        if (!('IntersectionObserver' in window) || !links.length) return;
        var byId = {};
        links.forEach(function (link) {
            var id = link.getAttribute('href').slice(1);
            if (document.getElementById(id)) byId[id] = link;
        });
        // Sections without their own nav link map to the closest one
        var alias = { github: 'awards' };
        var observed = Object.keys(byId).concat(Object.keys(alias));
        var visible = {};

        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
            });
            var best = null, bestRatio = 0;
            observed.forEach(function (id) {
                if ((visible[id] || 0) > bestRatio) { bestRatio = visible[id]; best = id; }
            });
            var activeId = best ? (alias[best] || best) : null;
            links.forEach(function (link) {
                var on = activeId && link === byId[activeId];
                link.classList.toggle('is-active', !!on);
                if (on) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] });

        observed.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) spy.observe(el);
        });
    }

    /* ------------------------------------------------------------------
       Deep links: keep #section targets aligned after late layout shifts
       ------------------------------------------------------------------ */
    function initHashFix() {
        var id = '';
        try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) { id = ''; }
        var target = id && document.getElementById(id);
        if (!target) return;
        var userMoved = false;
        ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (t) {
            window.addEventListener(t, function () { userMoved = true; }, { once: true, passive: true });
        });
        realignHash = function () {
            if (!userMoved) target.scrollIntoView({ block: 'start' });
        };
        window.addEventListener('load', function () {
            var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
            ready.then(function () { realignHash(); });
        });
    }

    /* ------------------------------------------------------------------
       Reveal on scroll
       ------------------------------------------------------------------ */
    function initReveal() {
        var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
        if (!items.length) return;

        function settle(el) {
            // Once revealed, drop the reveal hooks so hover transitions behave normally
            el.removeAttribute('data-reveal');
            el.style.removeProperty('--reveal-delay');
        }
        function show(el) {
            el.classList.add('is-visible');
            var done = false;
            function finish() { if (!done) { done = true; settle(el); } }
            el.addEventListener('transitionend', function handler(e) {
                if (e.target !== el) return;
                el.removeEventListener('transitionend', handler);
                finish();
            });
            window.setTimeout(finish, 1600);
        }

        if (lateBoot || reduceMotion.matches || !('IntersectionObserver' in window)) {
            items.forEach(settle);
            return;
        }

        // Stagger siblings that enter together
        var io = new IntersectionObserver(function (entries) {
            var batch = entries.filter(function (e) { return e.isIntersecting; });
            batch.forEach(function (entry, i) {
                entry.target.style.setProperty('--reveal-delay', Math.min(i * 0.07, 0.35) + 's');
                show(entry.target);
                io.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        items.forEach(function (el) { io.observe(el); });
    }

    /* ------------------------------------------------------------------
       Pause / resume looping animations (WCAG 2.2.2)
       ------------------------------------------------------------------ */
    function initMotionToggle() {
        var btn = document.getElementById('motionToggle');
        if (!btn) return;
        if (safeGet('localStorage', 'motion') === 'paused') {
            root.classList.add('motion-paused');
            btn.setAttribute('aria-pressed', 'true');
            btn.setAttribute('aria-label', 'Play animations');
        }
        btn.addEventListener('click', function () {
            var paused = root.classList.toggle('motion-paused');
            btn.setAttribute('aria-pressed', String(paused));
            btn.setAttribute('aria-label', paused ? 'Play animations' : 'Pause animations');
            safeSet('localStorage', 'motion', paused ? 'paused' : 'playing');
        });
    }

    /* ------------------------------------------------------------------
       Project filter
       ------------------------------------------------------------------ */
    function initFilters() {
        var buttons = Array.prototype.slice.call(document.querySelectorAll('.filter'));
        var projects = Array.prototype.slice.call(document.querySelectorAll('#work .project'));
        var empty = document.getElementById('projectsEmpty');
        if (!buttons.length || !projects.length) return;

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var filter = btn.getAttribute('data-filter');
                buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });

                var shown = 0;
                projects.forEach(function (p) {
                    var tags = (p.getAttribute('data-tags') || '').split(/\s+/);
                    var match = filter === 'all' || tags.indexOf(filter) !== -1;
                    p.hidden = !match;
                    if (match) {
                        shown++;
                        // Filtered-in cards must be visible even if they never scrolled into view
                        p.classList.add('is-visible');
                        p.removeAttribute('data-reveal');
                    }
                });
                if (empty) empty.hidden = shown !== 0;
            });
        });
    }

    /* ------------------------------------------------------------------
       GitHub repositories (curated, with live metadata and offline fallback)
       ------------------------------------------------------------------ */
    function initRepos() {
        var grid = document.getElementById('repoGrid');
        if (!grid) return;
        grid.setAttribute('aria-busy', 'true');

        var USER = '1Baleid';
        var CACHE_KEY = 'gh-repos-v3';
        var CACHE_MS = 30 * 60 * 1000;

        // Curated selection, in display order. Live GitHub data (stars, last push,
        // and the repo's own description when it has one) is merged in; curated
        // languages win because GitHub's byte-count guess mislabels some repos.
        var FEATURED = [
            { name: 'ReqFlow-Frontend', language: 'JavaScript',
              description: 'React front end for ReqFlow: create, refine, review, approve and track software requirements with role-based workflows.' },
            { name: 'calibrated-location-tensors', language: 'Python',
              description: 'Research code for multi-camera pedestrian trajectory forecasting on the WNMF dataset: diagnoses and repairs a published LSTM encoder–decoder that forecasts camera ID and bounding box over 12 future steps.' },
            { name: 'ClutchTimes-SCAI', language: 'Jupyter Notebook',
              description: 'My AI League finalist project: YOLOv8 ball tracking, camera control from object coordinates, and face recognition for automated soccer broadcasts.' },
            { name: 'tuwaiq-agent-workshop', language: 'Python',
              description: 'Starter code for a 5-session Tuwaiq Club workshop: build an agent that answers from documents, cites sources, calls tools and says “I don’t know”. Plain Python, no frameworks.' },
            { name: '202245500-AbdullahBaleid-assignment4', language: 'HTML', label: 'This website',
              description: 'Source of this portfolio: semantic HTML, hand-written CSS and a small vanilla JS layer, deployed on Vercel.' }
        ];
        FEATURED.forEach(function (r) { r.html_url = 'https://github.com/' + USER + '/' + r.name; });

        var LANG_COLORS = {
            'JavaScript': '#f1e05a', 'TypeScript': '#3178c6', 'Python': '#3572A5', 'HTML': '#e34c26',
            'CSS': '#663399', 'Java': '#b07219', 'C++': '#f34b7d', 'C': '#555555', 'Go': '#00ADD8',
            'Jupyter Notebook': '#DA5B0B', 'Shell': '#89e051', 'Dart': '#00B4AB', 'Kotlin': '#A97BFF'
        };

        function esc(s) {
            return String(s).replace(/[&<>"']/g, function (c) {
                return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
            });
        }
        function safeUrl(u) {
            return /^https:\/\/github\.com\//.test(u) ? u : 'https://github.com/' + USER;
        }
        function relTime(iso) {
            if (!iso) return '';
            var diff = (Date.now() - new Date(iso).getTime()) / 1000;
            if (!isFinite(diff) || diff < 0) return '';
            var units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
            for (var i = 0; i < units.length; i++) {
                var n = Math.floor(diff / units[i][1]);
                if (n >= 1) return 'Updated ' + n + ' ' + units[i][0] + (n > 1 ? 's' : '') + ' ago';
            }
            return 'Updated just now';
        }

        function card(repo) {
            var lang = repo.language
                ? '<span><i class="repo__lang-dot" style="background:' + (LANG_COLORS[repo.language] || '#8b949e') + '"></i>' + esc(repo.language) + '</span>'
                : '';
            var stars = typeof repo.stargazers_count === 'number' && repo.stargazers_count > 0
                ? '<span><svg class="icon" aria-hidden="true"><use href="#i-star"/></svg>' + repo.stargazers_count + '<span class="visually-hidden"> stars</span></span>'
                : '';
            var forks = typeof repo.forks_count === 'number' && repo.forks_count > 0
                ? '<span><svg class="icon" aria-hidden="true"><use href="#i-fork"/></svg>' + repo.forks_count + '<span class="visually-hidden"> forks</span></span>'
                : '';
            var updated = repo.pushed_at ? '<span>' + esc(relTime(repo.pushed_at)) + '</span>' : '';
            var desc = repo.description
                ? '<p class="repo__desc">' + esc(repo.description) + '</p>'
                : '<p class="repo__desc repo__desc--empty">No description yet.</p>';
            var title = repo.label
                ? esc(repo.label) + '<span class="visually-hidden"> (' + esc(repo.name) + ')</span>'
                : esc(repo.name);

            return '<article class="repo">' +
                '<h3 class="repo__name"><a class="stretched" href="' + esc(safeUrl(repo.html_url)) + '" target="_blank" rel="noopener">' + title + '</a>' +
                '<svg class="icon" aria-hidden="true"><use href="#i-arrow-ur"/></svg></h3>' +
                desc +
                '<div class="repo__meta">' + lang + stars + forks + updated + '</div>' +
                '</article>';
        }

        function ctaCard() {
            return '<article class="repo repo--cta">' +
                '<h3 class="repo__name"><a class="stretched" href="https://github.com/' + USER + '?tab=repositories" target="_blank" rel="noopener">All repositories</a>' +
                '<svg class="icon" aria-hidden="true"><use href="#i-arrow-ur"/></svg></h3>' +
                '<p class="repo__desc">Coursework, experiments and workshop material on GitHub.</p>' +
                '</article>';
        }

        function render(repos) {
            grid.innerHTML = repos.map(card).join('') + ctaCard();
            grid.setAttribute('aria-busy', 'false');
            realignHash();
        }

        function merge(live) {
            var byName = {};
            (live || []).forEach(function (r) { if (r && r.name) byName[r.name.toLowerCase()] = r; });
            return FEATURED.map(function (f) {
                var r = byName[f.name.toLowerCase()];
                if (!r || r.private) return f;
                return {
                    name: r.name,
                    label: f.label,
                    html_url: r.html_url || f.html_url,
                    description: r.description || f.description,
                    language: f.language || r.language,
                    stargazers_count: r.stargazers_count,
                    forks_count: r.forks_count,
                    pushed_at: r.pushed_at
                };
            });
        }

        var cached = null;
        try { cached = JSON.parse(safeGet('sessionStorage', CACHE_KEY) || 'null'); } catch (e) { cached = null; }
        if (cached && cached.t && Date.now() - cached.t < CACHE_MS && Array.isArray(cached.repos) && cached.repos.length) {
            render(cached.repos);
            return;
        }

        var controller = 'AbortController' in window ? new AbortController() : null;
        var timer = window.setTimeout(function () { if (controller) controller.abort(); }, 8000);

        fetch('https://api.github.com/users/' + USER + '/repos?per_page=100&sort=pushed', {
            headers: { 'Accept': 'application/vnd.github+json' },
            signal: controller ? controller.signal : undefined
        })
            .then(function (res) {
                if (!res.ok) throw new Error('GitHub responded ' + res.status);
                return res.json();
            })
            .then(function (data) {
                if (!Array.isArray(data)) throw new Error('Unexpected response');
                var repos = merge(data);
                safeSet('sessionStorage', CACHE_KEY, JSON.stringify({ t: Date.now(), repos: repos }));
                render(repos);
            })
            .catch(function () {
                // Rate-limited or offline: the curated list still renders, just without live stats
                render(FEATURED);
            })
            .then(function () { window.clearTimeout(timer); });
    }

    /* ------------------------------------------------------------------
       Certificate viewer
       ------------------------------------------------------------------ */
    function initViewer() {
        var dialog = document.getElementById('certViewer');
        var img = document.getElementById('viewerImg');
        var title = document.getElementById('viewerTitle');
        var close = document.getElementById('viewerClose');
        var certs = document.querySelectorAll('.cert[data-full]');
        if (!dialog || !img || !certs.length) return;

        // Browsers without <dialog>: open the image directly instead
        var supported = typeof dialog.showModal === 'function';
        var opener = null;

        Array.prototype.forEach.call(certs, function (btn) {
            btn.addEventListener('click', function () {
                var src = btn.getAttribute('data-full');
                var label = (btn.querySelector('.cert__title') || {}).textContent || 'Certificate';
                if (!supported) { window.open(src, '_blank', 'noopener'); return; }
                opener = btn;
                img.src = src;
                img.alt = label;
                title.textContent = label;
                dialog.showModal();
                document.body.style.overflow = 'hidden';
            });
        });

        function shut() { if (dialog.open) dialog.close(); }
        if (close) close.addEventListener('click', shut);

        // Close on a genuine backdrop click only (not a drag that started inside the dialog)
        var downOnBackdrop = false;
        dialog.addEventListener('pointerdown', function (e) { downOnBackdrop = e.target === dialog; });
        dialog.addEventListener('click', function (e) {
            if (e.target === dialog && downOnBackdrop) shut();
            downOnBackdrop = false;
        });
        dialog.addEventListener('close', function () {
            document.body.style.overflow = '';
            img.removeAttribute('src');
            if (opener) opener.focus();
        });
    }

    /* ------------------------------------------------------------------
       Copy email
       ------------------------------------------------------------------ */
    function initCopyEmail() {
        var btn = document.getElementById('copyEmail');
        if (!btn) return;
        var label = btn.querySelector('.copy-label');
        var use = btn.querySelector('.copy-icon use');
        var status = document.getElementById('copyStatus');
        var email = btn.getAttribute('data-email');
        var resetTimer = null;

        function fallbackCopy(text) {
            var prev = document.activeElement;
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.top = '0';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            ta.setSelectionRange(0, text.length);
            var ok = false;
            try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
            document.body.removeChild(ta);
            if (prev && prev.focus) prev.focus();
            return ok ? Promise.resolve() : Promise.reject(new Error('copy failed'));
        }

        btn.addEventListener('click', function () {
            var p = navigator.clipboard && window.isSecureContext
                ? navigator.clipboard.writeText(email).catch(function () { return fallbackCopy(email); })
                : fallbackCopy(email);
            p.then(function () {
                btn.classList.add('is-copied');
                if (label) label.textContent = 'Copied!';
                if (use) use.setAttribute('href', '#i-check');
                if (status) status.textContent = 'Email address copied';
            }).catch(function () {
                if (label) label.textContent = email;
                if (status) status.textContent = 'Copy failed. The address is ' + email;
            }).then(function () {
                window.clearTimeout(resetTimer);
                resetTimer = window.setTimeout(function () {
                    btn.classList.remove('is-copied');
                    if (label) label.textContent = 'Copy email';
                    if (use) use.setAttribute('href', '#i-copy');
                    if (status) status.textContent = '';
                }, 2200);
            });
        });
    }

    function initYear() {
        var el = document.getElementById('year');
        if (el) el.textContent = String(new Date().getFullYear());
    }

    function boot() {
        // Reveal first, and isolate every module so one failure can't blank the page
        [initReveal, initTheme, initHeader, initHashFix, initMotionToggle, initFilters, initRepos, initViewer, initCopyEmail, initYear]
            .forEach(function (fn) {
                try { fn(); } catch (e) { if (window.console) console.error(e); }
            });
        window.__siteReady = true;
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
