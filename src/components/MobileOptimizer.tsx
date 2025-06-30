
import { useEffect } from 'react';

const MobileOptimizer = () => {
  useEffect(() => {
    // Prevent zoom on input focus for iOS
    const addMaximumScaleToMetaViewport = () => {
      const el = document.querySelector('meta[name=viewport]');
      if (el !== null) {
        let content = el.getAttribute('content');
        let re = /maximum-scale=[0-9.]+/g;
        if (re.test(content)) {
          content = content.replace(re, 'maximum-scale=1.0');
        } else {
          content = [content, 'maximum-scale=1.0'].join(', ');
        }
        el.setAttribute('content', content);
      }
    };

    addMaximumScaleToMetaViewport();

    // Add mobile-specific CSS
    const style = document.createElement('style');
    style.innerHTML = `
      /* Prevent text selection on mobile */
      .voting-card {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Improve touch targets */
      .mobile-touch-target {
        min-height: 44px;
        min-width: 44px;
      }
      
      /* Smooth scrolling */
      html {
        -webkit-overflow-scrolling: touch;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default MobileOptimizer;
