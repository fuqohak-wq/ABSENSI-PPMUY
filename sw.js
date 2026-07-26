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
