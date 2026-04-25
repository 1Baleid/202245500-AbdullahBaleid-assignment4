# Abdullah Baleid - Portfolio Website

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript, featuring API integration, advanced state management, interactive animations, and innovative features.

## Project Overview

This portfolio showcases my professional profile as a Software Engineering student at KFUPM, including my education, work experience, projects, certifications, and contact information. This is my final portfolio project for SWE363 Web Engineering.

### Key Features

**Core Functionality**
- Responsive design (desktop, tablet, mobile)
- Smooth GSAP animations and scroll effects
- Interactive modals for projects and experience
- Contact form with validation and user feedback
- Dark/Light theme toggle with localStorage persistence

**API Integration**
- GitHub API integration with live repository data
- Error handling with retry functionality
- Loading states and user-friendly error messages

**Complex Logic**
- Combined project filtering AND sorting
- Multi-step form validation
- Animated transitions when filtering/sorting

**State Management**
- Session timer tracking time on site
- Login/logout simulation with personalization
- Visit counter and theme persistence

**Innovation Features**
- Particle trail cursor effect
- Confetti celebration on form submit
- Konami code easter egg
- Magnetic button effects
- Scroll reveal animations

## Live Demo

[View Live Site](https://abdullah-baleid-portfolio.vercel.app/)

## Video Presentation

[Watch on YouTube](https://youtu.be/meaGmbhjwwM)

## Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, Grid, Flexbox, CSS Variables
- **JavaScript (ES6+)** - Async/await, localStorage, sessionStorage, Fetch API
- **GSAP 3.12** - Animations and transitions
- **GitHub API** - External data integration

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Live Server VS Code extension

### Installation

1. Clone the repository:
```bash
git clone https://github.com/1Baleid/202245500-AbdullahBaleid-assignment4.git
```

2. Navigate to project folder:
```bash
cd 202245500-AbdullahBaleid-assignment4
```

3. Open in browser:
```bash
# Option 1: Direct open
open index.html

# Option 2: Using Live Server (VS Code)
# Right-click index.html > "Open with Live Server"

# Option 3: Using Python
python -m http.server 8000
# Then visit http://localhost:8000
```

## Project Structure

```
202245500-AbdullahBaleid-assignment4/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Styles (3800+ lines)
├── js/
│   └── script.js           # JavaScript (2700+ lines)
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

## Sections

1. **Hero** - Introduction with animated typing effect
2. **About** - Bio, stats, and profile image
3. **Journey** - Education and work experience timeline
4. **Projects** - Featured projects with filtering and sorting
5. **GitHub** - Live repository data from GitHub API
6. **Certifications** - Technical and academic achievements
7. **Contact** - Contact form and social links

## New Features Guide

### Using the GitHub Section
- Scroll to the "GitHub Repositories" section
- View live data from my GitHub profile
- Click "View Repository" to open in new tab
- If loading fails, click "Retry" to try again

### Using Project Filter + Sort
1. Click filter buttons (All, AI/ML, Web Dev, Research) to filter projects
2. Use the "Sort by" dropdown to sort (A-Z, Z-A, Category)
3. Combine both for precise control

### Using Session Features
- **Session Timer**: See time spent at bottom-left corner
- **Login**: Click "Login" in navbar, enter your name
- **Logout**: Click the logout icon next to your name
- Your name persists across page refreshes

## AI Usage Summary

This project utilized AI tools (Claude, GitHub Copilot) for:
- API integration implementation and error handling
- State management patterns and localStorage usage
- CSS styling for new components
- JavaScript feature development and debugging
- Documentation writing and code comments

All AI-generated code was reviewed, understood, and modified to fit project requirements. See `docs/ai-usage-report.md` for detailed documentation.

## Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Save and wait for deployment

### Other Options
- Netlify: Drag & drop the project folder
- Vercel: Connect GitHub repository
- Firebase Hosting: Use Firebase CLI

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 120+ |
| Firefox | 121+ |
| Safari | 17+ |
| Edge | 120+ |

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion preference support

## Author

**Abdullah Baleid**
- Email: a.baleid@outlook.com
- LinkedIn: [linkedin.com/in/abdullah-baleid-a35a67265](https://www.linkedin.com/in/abdullah-baleid-a35a67265/)
- GitHub: [github.com/1Baleid](https://github.com/1Baleid)

## Course

SWE363 - Web Engineering
King Fahd University of Petroleum & Minerals (KFUPM)
Assignment 4 - Final Portfolio

## License

This project is created for educational purposes as part of coursework.

---

*Built with HTML, CSS, JavaScript, GSAP, and GitHub API*
