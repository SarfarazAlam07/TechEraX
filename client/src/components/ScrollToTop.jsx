// components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Ye hook current route (pathname) ko track karega
  const { pathname } = useLocation();

  useEffect(() => {
    // Jab bhi pathname change hoga, ye window ko (0, 0) par bhej dega
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Iska UI mein koi kaam nahi hai, bas logic run karna hai
};

export default ScrollToTop;