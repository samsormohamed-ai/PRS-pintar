// Service worker ringkas — membolehkan "Tambah ke Skrin Utama" sebagai aplikasi
const CACHE = "prs-skjawi-v1";
const FAIL = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FAIL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((k) => Promise.all(k.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // Apps Script sentiasa terus ke Google
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
