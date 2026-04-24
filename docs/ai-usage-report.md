# AI Usage Report

## Assignment 4 - Final Portfolio

**Student:** Abdullah Baleid
**Course:** SWE363 - Web Engineering
**Date:** April 2026

---

## 1. Tools Used & Use Cases

### Claude (Anthropic)
- **Primary Use:** Code generation, debugging, API integration, state management implementation
- **Specific Tasks:**
  - Implemented GitHub API integration with fetch, error handling, and retry functionality
  - Created session timer using sessionStorage for tracking time on site
  - Developed login/logout simulation with localStorage persistence
  - Built project sorting functionality combined with existing filters
  - Fixed bugs from Assignment 2 (cursor visibility, filter logic, email validation, nav expansion)
  - Generated CSS for new components (repo cards, login modal, session timer)
  - Assisted with responsive design for new features
  - Updated documentation for Assignment 3 requirements

### GitHub Copilot
- **Primary Use:** Code completion and inline suggestions
- **Specific Tasks:**
  - Auto-completed async/await patterns for API calls
  - Suggested error handling patterns for fetch requests
  - Provided localStorage/sessionStorage API usage
  - Assisted with DOM manipulation for dynamic content
  - Helped with CSS styling patterns

---

## 2. Benefits & Challenges

### Benefits
1. **API Integration Made Easy:** AI tools helped implement the GitHub API integration efficiently, including proper error handling and loading states.

2. **State Management Patterns:** Learned effective patterns for:
   - Using sessionStorage for session-specific data
   - Using localStorage for persistent user preferences
   - Managing UI state based on stored data

3. **Complex Logic Implementation:** AI assisted in combining filtering and sorting functionality with smooth animations.

4. **Bug Fixing:** AI helped identify and fix issues from Assignment 2 feedback efficiently.

5. **Documentation:** AI significantly improved the quality and comprehensiveness of project documentation.

### Challenges
1. **API Rate Limits:** Initial implementation didn't consider GitHub API rate limits; had to add error handling for this.

2. **State Synchronization:** Keeping UI in sync with stored state required careful attention to initialization order.

3. **CSS Cursor Compatibility:** The custom cursor feature required multiple iterations to work reliably across browsers.

4. **Mobile Considerations:** Some features needed adjustment for mobile (hiding user session controls, repositioning timer).

---

## 3. Learning Outcomes

### Technical Skills Gained
- **Fetch API:** Mastered async/await patterns for API calls with error handling
- **GitHub API:** Learned to work with public API endpoints and parse JSON responses
- **sessionStorage vs localStorage:** Understood when to use each for appropriate data persistence
- **State Management:** Implemented patterns for managing application state across page loads
- **Complex Event Handling:** Combined multiple user interactions (filter + sort) seamlessly
- **Dynamic DOM Updates:** Created and manipulated DOM elements based on API data
- **CSS Custom Cursors:** Learned CSS-only custom cursor implementation

### Workflow Improvements
- Using API documentation effectively alongside AI assistance
- Testing features across different browsers and devices
- Iterative development with frequent commits
- Writing comprehensive documentation as part of development

### Conceptual Understanding
- REST API consumption patterns
- Client-side state management strategies
- Performance considerations for dynamic content
- Graceful degradation and error recovery

---

## 4. Responsible Use & Modifications

### Review Process
Every AI-generated code segment was:
1. **Read and understood** before integration
2. **Tested with edge cases** (API failures, empty states, invalid inputs)
3. **Modified for project requirements** (styling, error messages, UX)
4. **Documented with comments** for future maintenance

### Modifications Made
1. **Error Handling Enhancement:** Added more user-friendly error messages and retry functionality
2. **Animation Optimization:** Simplified GSAP animations for better performance
3. **Mobile Responsiveness:** Added specific mobile styles not in AI suggestions
4. **Accessibility:** Added ARIA labels and keyboard support to new features
5. **Code Organization:** Restructured code to follow existing project patterns

### Academic Integrity Statement
I confirm that:
- All AI-generated code was reviewed, understood, and modified by me
- I can explain every line of code in this project
- AI tools were used as learning aids, not as a substitute for understanding
- The final implementation reflects my own design decisions and learning
- I understand the API integration, state management, and all JavaScript logic

---

## Code Attribution

| Feature | AI Assistance Level | My Modifications |
|---------|---------------------|------------------|
| GitHub API Integration | High | Added retry functionality, customized card design |
| Project Sorting | Medium | Combined with existing filter logic |
| Session Timer | Medium | Customized display format, positioning |
| Login/Logout Simulation | High | Added notification system, styled UI |
| Bug Fixes (Assignment 2) | High | Validated all fixes with testing |
| CSS for New Components | Medium | Adjusted for consistency with existing styles |
| Documentation Updates | Medium | Added project-specific details |

---

## Assignment 3 Specific Additions

### API Integration Details
- **Endpoint Used:** `https://api.github.com/users/1Baleid/repos`
- **Data Displayed:** Repository name, description, language, stars, forks
- **Error Handling:** Loading state, error state with retry button, empty state

### State Management Implementation
| Feature | Storage Type | Data Stored |
|---------|--------------|-------------|
| Session Timer | sessionStorage | Session start timestamp |
| User Login | localStorage | Guest user name |
| Visit Counter | localStorage | Total visit count |
| Theme Preference | localStorage | Dark/Light mode |

### Complex Logic Flow
1. User clicks filter button → Filter projects by category
2. User selects sort option → Sort filtered projects
3. Both work together with animated transitions
4. State persists across page interactions

---

---

## Assignment 4 Additions

### Claude Code (CLI Tool)
- **Primary Use:** Project organization, documentation updates, feature implementation
- **Specific Tasks:**
  - Updated all documentation from Assignment 3 to Assignment 4 format
  - Created presentation folder structure
  - Implemented innovative features (particle trail cursor, confetti effect, Konami code easter egg)
  - Code review and quality improvements
  - Technical documentation enhancements

### New Features Implemented with AI Assistance

| Feature | Description | AI Contribution |
|---------|-------------|-----------------|
| Particle Trail Cursor | Colorful particles follow mouse movement | Full implementation with physics |
| Confetti Effect | Celebration animation on form submit | Animation logic and styling |
| Konami Code Easter Egg | Secret key sequence triggers surprise | Event handling and animation |

### Learning Outcomes (Assignment 4)
- Using AI CLI tools for efficient development workflow
- Canvas API for particle effects
- Complex event handling for keyboard sequences
- Animation timing and performance optimization

---

*This report documents my responsible use of AI tools in completing Assignment 4.*
