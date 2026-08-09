const CACHE_NAME = 'ppmu-yahyawiyyah-v2';
const urlsToCache = [
  './',
  './index.html',
  './Aduan-santri.html',
  './absen-guru.html',
  './absen-ustadz-manual.html',
  './bahsumasail.html',
  './barcode.html',
  './daftarwajah.html',
  './dashboard.html',
  './detail-santri.html',
  './dispensasi-khusus.html',
  './evaluasi-sistem.html',
  './izin.html',
  './jadwal-oprak.html',
  './jadwal-piket.html',
  './keuangan.html',
  './medsos.html',
  './mp3.html',
  './pelanggaran-santri.html',
  './pendaftaran.html',
  './perizinan-santri.html',
  './perpustakaan.html',
  './rekap-absensi.html',
  './scan-wajah.html',
  './tabungan.html',
  './tfwalsan.html',
  './ujicoba.html',
  './video.html',
  './manifest.json'
];

// Install Service Worker & Simpan Cache
self.addEventListener('install', event => {
  self.skipWaiting(); // Langsung aktifkan SW baru tanpa menunggu
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Bersihkan Cache Lama jika CACHE_NAME diubah (misal jadi v3, v4, dst)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Request dari Cache dulu, jika tidak ada baru ambil dari Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Menerima Pesan Manual dari Web untuk Hapus Seluruh Cache Storage
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'clearCache') {
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      self.skipWaiting();
    });
  }
});
