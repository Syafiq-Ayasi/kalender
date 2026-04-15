# Issue: Membuat Aplikasi Kalender dengan JavaScript

## Tujuan
Membuat aplikasi kalender sederhana berbasis web menggunakan JavaScript (vanilla JS, tanpa framework berat) yang dapat menampilkan kalender bulanan dan mendukung fitur dasar manajemen event.

## Scope / Lingkup
Aplikasi web statis (HTML + CSS + JS) yang bisa dibuka langsung di browser tanpa backend.

## Struktur Project (High Level)
- `index.html` — entry point halaman
- `style.css` — styling kalender
- `app.js` — logika utama kalender
- `README.md` — dokumentasi singkat cara menjalankan

## Fitur Utama
1. **Tampilan Kalender Bulanan**
   - Menampilkan grid tanggal untuk bulan berjalan
   - Menandai tanggal hari ini dengan jelas
   - Menampilkan nama bulan dan tahun di header

2. **Navigasi Bulan**
   - Tombol "Previous" dan "Next" untuk berpindah bulan
   - Tombol "Today" untuk kembali ke bulan ini

3. **Manajemen Event (Sederhana)**
   - User dapat klik tanggal untuk menambah event (judul + deskripsi)
   - Tanggal yang memiliki event diberi indikator visual (misal: titik/warna)
   - Event disimpan di `localStorage` agar persist setelah refresh
   - User dapat melihat daftar event pada tanggal tertentu
   - User dapat menghapus event

4. **Responsive Design**
   - Tampilan menyesuaikan di desktop dan mobile

## Teknologi
- HTML5, CSS3, JavaScript (ES6+)
- Tidak menggunakan framework (React/Vue/dll)
- Tidak menggunakan library eksternal — gunakan `Date` bawaan JavaScript
- Storage: `localStorage` browser

## Acceptance Criteria
- [ ] Kalender tampil dengan benar untuk bulan manapun (termasuk penanganan tahun kabisat)
- [ ] Hari pertama setiap bulan jatuh di kolom hari yang benar
- [ ] Navigasi antar bulan berfungsi tanpa bug
- [ ] Event yang ditambahkan tetap ada setelah halaman di-refresh
- [ ] UI bersih dan mudah dipahami
- [ ] Kode terorganisir, tidak semua ditumpuk dalam satu function besar

## Catatan untuk Implementer
- Fokus pada kesederhanaan dan keterbacaan kode
- Pisahkan logika (manipulasi tanggal, storage, rendering) menjadi fungsi-fungsi kecil
- Uji manual dengan berpindah ke bulan Februari (termasuk tahun kabisat) dan bulan dengan 31 hari
- Tidak perlu membuat build system — cukup file statis yang langsung bisa dibuka di browser

## Nice to Have (Opsional)
- Pilihan mode gelap/terang
- Highlight hari weekend dengan warna berbeda
- Export/import event dalam format JSON
