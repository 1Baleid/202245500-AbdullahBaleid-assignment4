# Technical Documentation

## Portfolio Website - Assignment 4 (Final)

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [File Structure](#file-structure)
4. [Features Implementation](#features-implementation)
5. [API Integration](#api-integration)
6. [State Management](#state-management)
7. [Responsive Design](#responsive-design)
8. [Performance Considerations](#performance-considerations)
9. [Browser Compatibility](#browser-compatibility)

---

## 1. Project Overview

This portfolio website showcases Abdullah Baleid's professional profile, including education, work experience, projects, certifications, and contact information. This is the final portfolio assignment demonstrating mastery of web development concepts.

### Key Features
- Responsive single-page design
- Animated hero section with typing effect
- Interactive experience and project modals
- Contact form with enhanced validation
- Project filtering AND sorting (complex logic)
- Dark/Light theme toggle with persistence
- GitHub API integration
- Session tracking with timer
- Login/logout simulation
- GSAP-powered scroll animations
- CSS-only custom cursor

### Innovation Features (Assignment 4)
- **Particle Trail Cursor**: Colorful particles follow mouse movement
- **Confetti Effect**: Celebration animation on form submission
- **Konami Code Easter Egg**: Secret key sequence reveals surprise
- **Magnetic Buttons**: Interactive button effects
- **Scroll Reveal Animations**: Elements animate into view

---

## 2. Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling with custom properties |
| JavaScript (ES6+) | Interactivity, async/await |
| GSAP 3.12 | Animation library |
| Fetch API | HTTP requests to GitHub |

### External APIs
| API | Endpoint | Purpose |
|-----|----------|---------|
| GitHub API | api.github.com/users/{user}/repos | Fetch public repositories |

### Storage APIs
| API | Scope | Purpose |
|-----|-------|---------|
| localStorage | Persistent | Theme, user name, visit count |
| sessionStorage | Session | Session start time |

---

## 3. File Structure

```
202245500-AbdullahBaleid-assignment4/
├── index.html              # Main HTML file (800+ lines)
├── css/
│   └── styles.css          # All styles (3900+ lines)
├── js/
│   └── script.js           # All JavaScript (2700+ lines)
├── assets/
│   └── images/             # Project images
├── docs/
│   ├── ai-usage-report.md  # AI usage documentation
│   └── technical-documentation.md
├── presentation/
│   ├── README.md           # Presentation guidelines
│   ├── slides.pdf          # Presentation slides
│   └── demo-video.mp4      # Demo video
├── README.md
└── .gitignore
```

---

## 4. Features Implementation

### 4.1 Project Filtering + Sorting (Complex Logic)

Combined filter and sort functionality with GSAP animations.

**HTML:**
```html
<div class="projects__controls">
    <div class="projects__filter">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="AI/ML">AI/ML</button>
        <!-- ... -->
    </div>
    <div class="projects__sort">
        <select id="sortSelect" class="sort-select">
            <option value="default">Default</option>
            <option value="name-asc">Name (A-Z)</option>
            <!-- ... -->
        </select>
    </div>
</div>
```

**JavaScript Logic:**
```javascript
// Filter: Show/hide based on category
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        // Filter logic with animations
    });
});

// Sort: Reorder DOM elements
sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    const sorted = projects.sort((a, b) => {
        // Comparison logic
    });
    // Reorder with animations
});
```

### 4.2 User Session Simulation

**Login Flow:**
1. User clicks "Login" button
2. Modal appears with name input
3. User enters name and submits
4. Name stored in localStorage
5. UI updates to show logged-in state
6. Notification confirms login

**Logout Flow:**
1. User clicks logout icon
2. localStorage cleared
3. UI reverts to logged-out state
4. Notification confirms logout

### 4.3 Session Timer

Tracks time spent on the website using sessionStorage.

```javascript
// On page load
let sessionStart = sessionStorage.getItem('sessionStart');
if (!sessionStart) {
    sessionStart = Date.now();
    sessionStorage.setItem('sessionStart', sessionStart);
}

// Update every second
setInterval(() => {
    const elapsed = Date.now() - sessionStart;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    sessionTimeEl.textContent = `${minutes}:${seconds}`;
}, 1000);
```

---

## 5. API Integration

### GitHub API Implementation

**Endpoint:** `https://api.github.com/users/1Baleid/repos?sort=updated&per_page=6`

**Fetch Pattern:**
```javascript
async function fetchRepos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        const repos = await response.json();
        // Render repos
    } catch (err) {
        // Show error UI with retry button
    }
}
```

**Error Handling:**
- Loading state with spinner
- Error state with retry button
- Empty state for no repositories
- Network error handling

**Data Displayed:**
| Field | Source |
|-------|--------|
| Repository Name | repo.name |
| Description | repo.description |
| Language | repo.language |
| Stars | repo.stargazers_count |
| Forks | repo.forks_count |
| URL | repo.html_url |

### Language Color Mapping
```javascript
const colors = {
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'TypeScript': '#3178c6',
    // ...
};
```

---

## 6. State Management

### Storage Strategy

| Data | Storage | Persistence |
|------|---------|-------------|
| Theme preference | localStorage | Permanent |
| User name | localStorage | Permanent |
| Visit count | localStorage | Permanent |
| Session start | sessionStorage | Tab only |

### State Flow Diagram

```
┌─────────────────────────────────────────────────┐
│                  Page Load                       │
└─────────────────────┬───────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
┌───────────────────┐     ┌───────────────────┐
│ Check localStorage │     │ Check sessionStorage│
│   - theme          │     │   - sessionStart    │
│   - guestUser      │     │                     │
│   - visitCount     │     │                     │
└─────────┬─────────┘     └─────────┬───────────┘
          │                         │
          ▼                         ▼
┌───────────────────┐     ┌───────────────────┐
│ Apply saved state │     │ Start/resume timer │
└───────────────────┘     └───────────────────┘
```

### Visit Counter Implementation
```javascript
let visitCount = localStorage.getItem('visitCount');
visitCount = visitCount ? parseInt(visitCount) + 1 : 1;
localStorage.setItem('visitCount', visitCount);
```

---

## 7. Responsive Design

### Breakpoints
| Breakpoint | Target Devices |
|------------|----------------|
| > 1280px | Large desktop |
| 1024px - 1280px | Desktop |
| 768px - 1024px | Tablet |
| 640px - 768px | Large mobile |
| < 640px | Mobile |

### New Component Responsiveness

**User Session Controls:**
- Hidden on mobile (< 1024px)
- Full display on desktop

**Project Controls:**
- Stack vertically on mobile
- Horizontal layout on desktop

**GitHub Repos Grid:**
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop

**Session Timer:**
- Bottom-left on desktop
- Top-center on mobile

---

## 8. Performance Considerations

### Optimizations Applied

1. **CSS-Only Cursor:** No JavaScript tracking overhead
2. **Async API Calls:** Non-blocking data fetching
3. **Efficient DOM Updates:** Batch updates for sorting
4. **GSAP Optimization:** Efficient animation sequencing
5. **Event Delegation:** Single listeners where possible

### Lighthouse Targets
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

---

## 9. Browser Compatibility

### Tested Browsers
| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 120+ | Full Support |
| Firefox | 121+ | Full Support |
| Safari | 17+ | Full Support |
| Edge | 120+ | Full Support |

### Feature Support
| Feature | Fallback |
|---------|----------|
| Fetch API | Polyfill available |
| localStorage | Error handling |
| sessionStorage | Error handling |
| CSS Custom Cursor | Falls back to default |
| Backdrop Filter | Solid background |

---

## Development Notes

### Local Development
```bash
# Clone repository
git clone https://github.com/1Baleid/202245500-AbdullahBaleid-assignment4.git

# Navigate to project
cd 202245500-AbdullahBaleid-assignment4

# Open in browser
open index.html
# Or use Live Server in VS Code
```

### Testing API Integration
1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh page
4. Look for `api.github.com` request
5. Verify 200 status and JSON response

### Testing State Management
1. Open browser DevTools
2. Go to Application tab
3. Check localStorage and sessionStorage
4. Verify data persists across refreshes

---

*Last Updated: April 2026*
