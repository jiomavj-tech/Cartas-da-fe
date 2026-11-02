/* Cartas da Fé — cache offline e atualização segura. */
const VERSION = 'cartas-fe-2026.11.01.2';
const APP_CACHE = VERSION + '-app';
const APP_ASSETS = [
  './', './index.html', './manifest.webmanifest', './icon.svg',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(APP_CACHE).then(cache => cache.addAll(APP_ASSETS)));
  // Não ativar uma atualização silenciosamente no meio de uma partida.
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('cartas-fe-') && key !== APP_CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  const inScope = url.pathname.startsWith(new URL(self.registration.scope).pathname);
  if (!inScope) return;
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(event.request);
        if (response.ok) {
          const cache = await caches.open(APP_CACHE);
          await cache.put('./index.html', response.clone());
        }
        return response;
      } catch (e) {
        return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(event.request, {ignoreSearch:true});
    if (cached) return cached;
    const response = await fetch(event.request);
    if (response.ok && response.type === 'basic') {
      const cache = await caches.open(APP_CACHE);
      await cache.put(event.request, response.clone());
    }
    return response;
  })());
});
