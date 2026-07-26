const CACHE_NAME = 'ppmu-yahyawiyyah-v1';
const urlsToCache = [
  './',
  './index.html',
  './dashboard.html',
  './Aduan-santri.html',
  './absen-guru.html',
  './absen-ustadz-manual.html',
  './bahsumasail.html',
  './barcode.html',
  './daftarwajah.html',
  './detail-santri.html',
  './dispensasi-khusus.html',
  './evaluasi-sistem.html',
  './izin.html',
  './jadwal-oprak.html',
  './jadwal-piket.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
