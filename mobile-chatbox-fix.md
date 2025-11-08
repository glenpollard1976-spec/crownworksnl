# Mobile Chatbox Jumping Fix

## Common Causes & Solutions

### 1. Viewport Height Issue (Most Common)
When the mobile keyboard appears, `100vh` doesn't account for the keyboard, causing the chatbox to jump.

**Fix: Use CSS custom properties for dynamic viewport height**

```css
/* Add to your global CSS or component styles */
:root {
  --vh: 1vh;
}

/* Update your chatbox container */
.chatbox-container {
  height: calc(var(--vh, 1vh) * 100);
  /* OR if you need a specific height */
  max-height: calc(var(--vh, 1vh) * 100);
}

/* JavaScript to set the viewport height */
```

**JavaScript fix:**
```javascript
// Add this to your component or app initialization
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Call on mount and resize
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);
```

### 2. Fixed Positioning Issue
Fixed bottom positioning can cause jumping when keyboard appears.

**Fix: Use position: fixed with proper bottom calculation**

```css
.chatbox-input-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* Add this to prevent jumping */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  /* Prevent layout shifts */
  will-change: transform;
}

/* Alternative: Use position: sticky */
.chatbox-input-container {
  position: sticky;
  bottom: 0;
  /* Better for mobile */
  z-index: 1000;
}
```

### 3. Input Focus Scroll Issue
When input is focused, mobile browsers try to scroll it into view.

**Fix: Prevent automatic scrolling**

```css
/* Prevent scroll on focus */
.chatbox-input:focus {
  scroll-margin: 0;
  scroll-padding: 0;
}

/* Or prevent scroll on the container */
.chatbox-container {
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}
```

**JavaScript fix:**
```javascript
// Prevent scroll when input is focused
const input = document.querySelector('.chatbox-input');
input.addEventListener('focus', (e) => {
  // Prevent default scroll behavior
  setTimeout(() => {
    window.scrollTo(0, window.scrollY);
  }, 0);
});

// Or use scrollIntoView with preventScroll
input.addEventListener('focus', (e) => {
  e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
});
```

### 4. Complete Mobile Chatbox Fix (Recommended)

**CSS:**
```css
.chatbox-container {
  /* Use flexbox for better mobile handling */
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.chatbox-messages {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  /* Prevent jumping */
  padding-bottom: env(safe-area-inset-bottom);
}

.chatbox-input-container {
  position: sticky;
  bottom: 0;
  background: white;
  padding: 1rem;
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  border-top: 1px solid #e5e5e5;
  /* Prevent layout shift */
  flex-shrink: 0;
  z-index: 1000;
}

.chatbox-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 16px; /* Prevents zoom on iOS */
  /* Prevent jumping */
  resize: none;
  overflow: hidden;
}

/* Prevent iOS zoom on input focus */
@media screen and (max-width: 768px) {
  input, textarea, select {
    font-size: 16px !important;
  }
}
```

**JavaScript:**
```javascript
// Set viewport height
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initialize
setViewportHeight();

// Update on resize and orientation change
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(setViewportHeight, 100);
});

window.addEventListener('orientationchange', () => {
  setTimeout(setViewportHeight, 500);
});

// Prevent scroll jump on input focus
const chatInput = document.querySelector('.chatbox-input');
if (chatInput) {
  chatInput.addEventListener('focus', () => {
    // Small delay to let keyboard appear
    setTimeout(() => {
      const activeElement = document.activeElement;
      if (activeElement === chatInput) {
        // Scroll to keep input visible but prevent jumping
        activeElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      }
    }, 300);
  });
}
```

### 5. React/Next.js Specific Fix

If you're using React:

```tsx
import { useEffect, useState } from 'react';

export function Chatbox() {
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      setVh(vh);
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setViewportHeight, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 500);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return (
    <div 
      className="chatbox-container"
      style={{ height: vh ? `calc(var(--vh, 1vh) * 100)` : '100vh' }}
    >
      {/* Your chatbox content */}
    </div>
  );
}
```

## Quick Fix Checklist

1. ✅ Add viewport height JavaScript fix
2. ✅ Change `height: 100vh` to `height: calc(var(--vh, 1vh) * 100)`
3. ✅ Set input `font-size: 16px` to prevent iOS zoom
4. ✅ Use `position: sticky` instead of `position: fixed` for input
5. ✅ Add `overscroll-behavior: contain` to prevent scroll jumping
6. ✅ Handle `orientationchange` event
7. ✅ Add safe area insets for notched devices
