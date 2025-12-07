import React, { useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ContactPage from './pages/ContactPage';
import { Toaster } from 'react-hot-toast';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Custom Cursor Component
const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (dotRef.current) {
        dotRef.current.style.left = `${clientX}px`;
        dotRef.current.style.top = `${clientY}px`;
      }
      if (outlineRef.current) {
        outlineRef.current.animate({
          left: `${clientX}px`,
          top: `${clientY}px`
        }, { duration: 500, fill: "forwards" });
      }
    };

    const onMouseDown = () => {
      if (outlineRef.current) {
        outlineRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
      }
    };

    const onMouseUp = () => {
      if (outlineRef.current) {
        outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    // Add hover effect for links and buttons
    const addHoverEffect = () => {
      if (outlineRef.current) {
        outlineRef.current.style.width = '60px';
        outlineRef.current.style.height = '60px';
        outlineRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        outlineRef.current.style.borderColor = 'transparent';
      }
    };

    const removeHoverEffect = () => {
      if (outlineRef.current) {
        outlineRef.current.style.width = '40px';
        outlineRef.current.style.height = '40px';
        outlineRef.current.style.backgroundColor = 'transparent';
        outlineRef.current.style.borderColor = 'rgba(255, 255, 255, 0.5)';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', addHoverEffect);
      el.addEventListener('mouseleave', removeHoverEffect);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addHoverEffect);
        el.removeEventListener('mouseleave', removeHoverEffect);
      });
    };
  }); // Re-run frequently to catch new elements or optimize with MutationObserver for better performance

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={outlineRef} className="cursor-outline hidden md:block" />
    </>
  );
};

export default function App() {
  return (
    <HashRouter>
      <CustomCursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:id" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#1a1a1a',
          color: '#00fff2',
          border: '1px solid #333',
          fontFamily: 'monospace'
        }
      }} />
    </HashRouter>
  );
}