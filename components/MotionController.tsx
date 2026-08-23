'use client';

import { useEffect } from 'react';

export function MotionController() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    document.querySelectorAll<HTMLElement>('.reveal').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
