# Issue: Fitur Tambahan Aplikasi Kalender

## Tujuan
Menambahkan fitur-fitur lanjutan ke aplikasi kalender yang sudah ada untuk meningkatkan pengalaman pengguna dan memperluas fungsionalitas.

## Prasyarat
Aplikasi kalender dasar sudah terimplementasi (index.html, style.css, app.js) dengan fitur tampilan bulanan, navigasi, dan manajemen event via localStorage.

## Fitur yang Akan Ditambahkan

### 1. Mode Gelap/Terang (Dark/Light Mode)
- Tombol toggle untuk beralih antara tema gelap dan terang
- Simpan preferensi tema di `localStorage`
- Transisi halus antar tema (CSS transition)
- Semua elemen UI menyesuaikan warna (kalender, sidebar, modal, form)

### 2. Highlight Hari Weekend
- Kolom Sabtu dan Minggu diberi warna background berbeda
- Tanggal di hari weekend punya styling khusus (misal: warna teks berbeda)
- Tetap terlihat jelas di mode gelap maupun terang

### 3. Export/Import Event (JSON)
- **Export:** Tombol untuk download semua event sebagai file `.json`
  - Format file: timestamp + data event (contoh: `calendar-events-2026-04-15.json`)
- **Import:** Tombol upload file JSON untuk restore event
  - Validasi format file sebelum import
  - Opsi: merge dengan data existing atau replace semua

### 4. Notifikasi Event Mendatang
- Tampilkan panel/banner untuk event dalam 7 hari ke depan
- Urutkan berdasarkan tanggal terdekat
- Indikator visual untuk event "hari ini" dan "besok"
- Opsional: browser notification API untuk reminder (dengan permission)

### 5. Kategori Event dengan Warna
- Dropdown kategori saat menambah event (contoh: Kerja, Pribadi, Penting, Lainnya)
- Setiap kategori punya warna khas (config warna di satu tempat)
- Indikator warna di tanggal sesuai kategori event
- Filter event berdasarkan kategori di sidebar

### 6. Search Event
- Input pencarian di sidebar atau header
- Cari berdasarkan judul dan deskripsi event
- Tampilkan hasil pencarian dengan tanggal event
- Klik hasil untuk langsung navigasi ke tanggal tersebut
- Real-time search (as-you-type)

## Teknologi
- Tetap vanilla JavaScript (ES6+), HTML5, CSS3
- Tidak menggunakan framework/library eksternal
- Gunakan CSS variables untuk theming
- Gunakan `localStorage` untuk preferensi dan data

## Acceptance Criteria
- [ ] Mode gelap/terang berfungsi dan preferensi tersimpan
- [ ] Weekend ter-highlight dengan jelas di kedua mode
- [ ] Export menghasilkan file JSON valid, import berhasil me-restore event
- [ ] Notifikasi event mendatang tampil dengan benar
- [ ] Kategori dengan warna tampil konsisten di kalender dan sidebar
- [ ] Search berfungsi real-time dan hasilnya clickable
- [ ] Semua fitur lama tetap berfungsi (tidak ada regresi)
- [ ] Responsive di mobile & desktop

## Catatan untuk Implementer
- Gunakan CSS variables (custom properties) untuk memudahkan theming
- Pisahkan logika tiap fitur ke fungsi-fungsi kecil yang jelas
- Update struktur data event jika perlu (tambah field `category`), dengan migrasi data lama
- Uji import dengan file JSON yang invalid untuk memastikan error handling
- Pastikan search case-insensitive
- Jaga UI tetap clean dan tidak terlalu padat meskipun fitur bertambah

## Nice to Have (Opsional)
- Animasi transisi antar bulan
- Keyboard shortcut (panah kiri/kanan untuk navigasi bulan)
- Drag & drop event antar tanggal
- Multi-select untuk hapus/pindah banyak event sekaligus
