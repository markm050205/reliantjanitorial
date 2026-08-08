import { GA4_ID } from './data.js';

export function initAnalytics() {
  if (!GA4_ID || typeof window === 'undefined') return;
  const load = () => {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID);
    // Track every tel: click as a conversion-worthy event
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href^="tel:"]');
      if (a && window.gtag) window.gtag('event', 'tel_click', { link_url: a.getAttribute('href') });
    });
  };
  if (document.readyState === 'complete') load();
  else window.addEventListener('load', load);
}
