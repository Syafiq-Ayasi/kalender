"# Kalender JavaScript

Aplikasi kalender sederhana yang dibuat dengan vanilla JavaScript, HTML5, dan CSS3. Mendukung tampilan bulanan, navigasi antar bulan, dan manajemen event dengan penyimpanan data lokal.

## Fitur

✅ **Tampilan Kalender Bulanan**
- Menampilkan grid tanggal untuk bulan berjalan
- Menandai tanggal hari ini dengan jelas
- Menampilkan nama bulan dan tahun di header

✅ **Navigasi Bulan**
- Tombol "Sebelumnya" dan "Selanjutnya" untuk berpindah bulan
- Tombol "Hari Ini" untuk kembali ke bulan saat ini

✅ **Manajemen Event**
- Klik tanggal untuk menambah event (judul + deskripsi)
- Tanggal yang memiliki event diberi indikator visual (titik merah)
- Event disimpan di `localStorage` — tetap ada setelah refresh
- Lihat daftar event untuk tanggal terpilih
- Hapus event dengan konfirmasi

✅ **Responsive Design**
- Tampilan menyesuaikan di desktop, tablet, dan mobile
- Intuitif di semua ukuran layar

✨ **Mode Gelap/Terang**
- Toggle button (🌙/☀️) di top bar untuk beralih tema
- Preferensi tema tersimpan otomatis di localStorage
- Transisi warna yang smooth dan nyaman di mata

✨ **Highlight Hari Weekend**
- Kolom Sabtu dan Minggu memiliki styling berbeda
- Mudah membedakan hari kerja dan weekend
- Konsisten di light mode dan dark mode

✨ **Export/Import Event**
- Tombol 📥 untuk download semua event sebagai file JSON
- Tombol 📤 untuk upload/restore event dari file JSON
- Opsi merge dengan data existing atau replace semuanya
- Validasi format file otomatis

✨ **Notifikasi Event Mendatang**
- Panel menampilkan event dalam 7 hari ke depan
- Indikator visual untuk event "Hari ini" dan "Besok"
- List terurut berdasarkan tanggal terdekat
- Clickable untuk navigasi ke tanggal event

✨ **Kategori Event dengan Warna**
- Pilih kategori saat menambah event: Kerja, Pribadi, Penting, Lainnya
- Setiap kategori memiliki warna unik untuk identifikasi visual
- Indikator warna di tanggal kalender
- Filter event berdasarkan kategori di sidebar

✨ **Search Event**
- Input pencarian real-time di top bar
- Cari berdasarkan judul dan deskripsi event
- Dropdown hasil dengan tanggal event
- Klik hasil untuk langsung navigasi ke tanggal

✨ **Navigasi Cepat (Date Picker)**
- Dropdown tahun (2000-2100) — pilih tahun langsung
- Dropdown bulan (Januari-Desember) — pilih bulan langsung
- Dropdown tanggal (1-31, auto-adjust sesuai bulan)
- Lompat langsung ke tanggal tertentu tanpa geser berkali-kali
- Dropdowns auto-populate saat tahun/bulan berubah

🔧 **Bug Fix: Timezone Export**
- Memperbaiki bug tanggal yang bergeser 1 hari saat export
- Ganti dari `toISOString()` (UTC) ke local date components
- Event tanggal 25 sekarang tetap ter-export sebagai 25
- Konsisten di semua timezone (WIB, WITA, WIT)

## Cara Menggunakan

1. **Buka file `index.html` di browser** (double-click atau drag ke browser)
   - Tidak perlu server atau build process apapun

2. **Navigasi Kalender**
   - Klik "Sebelumnya" atau "Selanjutnya" untuk berpindah bulan
   - Klik "Hari Ini" untuk kembali ke bulan sekarang

3. **Menambah Event**
   - Klik tanggal manapun di kalender
   - Isi judul event (wajib) dan deskripsi (opsional)
   - Klik "Tambah" atau tekan Enter
   - Event akan tampil di sidebar dengan titik merah pada tanggal

4. **Melihat Event**
   - Pilih tanggal dengan event untuk melihat daftar event
   - Preview judul event juga tampil langsung di tanggal

5. **Menghapus Event**
   - Klik tombol "Hapus" pada event yang ingin dihapus
   - Konfirmasi penghapusan di modal dialog

6. **Mode Gelap/Terang**
   - Klik tombol 🌙 (light mode) atau ☀️ (dark mode) di top bar
   - Tema akan berubah dan preferensi tersimpan otomatis

7. **Search Event**
   - Ketik di input pencarian "Cari event..." di top bar
   - Dropdown hasil akan muncul otomatis saat mengetik
   - Klik hasil untuk navigasi ke tanggal event tersebut

8. **Export/Import Event**
   - Klik 📥 untuk download semua event ke file JSON
   - Klik 📤 untuk upload file JSON (pilih merge atau replace)
   - Sangat berguna untuk backup atau transfer ke perangkat lain

9. **Kategori Event**
   - Saat menambah event, pilih kategori dari dropdown
   - Setiap kategori punya warna berbeda untuk identifikasi mudah
   - Gunakan filter kategori di sidebar untuk melihat event tertentu saja

10. **Lihat Event Mendatang**
    - Panel di atas kalender menampilkan event 7 hari ke depan
    - Event "Hari ini" ditampilkan dengan indikator khusus
    - Klik event untuk navigasi langsung ke tanggal tersebut

11. **Navigasi Cepat (Date Picker)**
    - Gunakan dropdown tahun, bulan, dan tanggal di bawah header kalender
    - Pilih tahun (2000-2100) dari dropdown pertama
    - Pilih bulan (Januari-Desember) dari dropdown kedua
    - Pilih tanggal (1-31) dari dropdown ketiga
    - Kalender akan langsung navigate ke tanggal pilihan
    - Dropdowns otomatis ter-reset setelah navigasi

## Struktur File

```
kalender/
├── index.html          # Struktur HTML
├── style.css           # Styling dan responsive layout
├── app.js              # Logika kalender dan event
└── README.md           # Dokumentasi ini
```

## Teknologi

- **HTML5** — struktur halaman
- **CSS3** — styling dan responsive design (flexbox + grid)
- **JavaScript (ES6+)** — logika dan interaksi
- **localStorage** — penyimpanan data lokal browser

Tidak menggunakan framework atau library eksternal apapun.

## Catatan Teknis

- Data event disimpan di `localStorage` dengan key `calendarEvents`
- Preferensi tema disimpan dengan key `calendarTheme`
- **Format tanggal lokal** (`YYYY-MM-DD`) — menggunakan local date components bukan UTC
- **Timezone handling**: `getDateKey()` menggunakan `getFullYear()`, `getMonth()`, `getDate()` untuk avoid UTC conversion
- **Date parsing**: `parseDateKey()` function untuk parse date string dengan benar (tidak menggunakan `new Date('YYYY-MM-DD')` yang parse sebagai UTC)
- Penanganan tahun kabisat otomatis (menggunakan API `Date` bawaan JavaScript)
- XSS protection: semua user input di-escape sebelum ditampilkan di HTML
- **CSS Variables** untuk theming: semua warna dapat dikontrol melalui `:root` dan `body.dark-mode`
- **Event Structure**: `{ title: string, desc: string, category: string }`
- **Search**: case-insensitive, mencari di title dan description
- **Export Format**: File JSON valid dengan struktur event yang sama
- **Category Colors**:
  - Kerja: Biru (#3b82f6)
  - Pribadi: Pink (#ec4899)
  - Penting: Amber (#f59e0b)
  - Lainnya: Purple (#667eea)
- **Date Picker**: Dropdowns populate otomatis berdasarkan tahun/bulan (handle leap years, varying month lengths)

## Browser Support

Bekerja di semua browser modern yang support:
- ES6 JavaScript
- CSS Grid
- localStorage

Tested di:
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Tips Penggunaan

- **Bulan dengan 31 hari**: Sistem otomatis menangani
- **Tahun kabisat**: Februari akan menampilkan 29 hari
- **Hari pertama bulan**: Otomatis sesuai dengan hari yang benar (Minggu-Sabtu)
- **Backup event**: Export data dari localStorage ke file JSON jika perlu backup

## Fitur yang Sudah Diimplementasikan (v2.0)

Semua fitur core sudah lengkap:
- ✅ Mode gelap/terang dengan CSS variables
- ✅ Highlight hari weekend
- ✅ Export/import event dalam format JSON
- ✅ Notifikasi untuk event mendatang (7 hari)
- ✅ Kategori event dengan warna berbeda
- ✅ Search event real-time

## Pengembangan Selanjutnya (Optional)

Fitur lanjutan yang bisa ditambahkan di masa depan:
- Animasi transisi antar bulan
- Keyboard shortcuts (arrow keys untuk navigasi bulan)
- Drag & drop event antar tanggal
- Multi-select untuk hapus/pindah banyak event sekaligus
- Notifikasi browser native (dengan permission)
- Recurring events (event yang berulang)
- Reminder notifications sebelum event dimulai
- Export ke format iCal (.ics)
- Sync dengan Google Calendar
- Kolaborasi real-time

## Troubleshooting

### Data event hilang setelah refresh browser
- Pastikan localStorage tidak di-clear
- Coba export data sebelum clear browser cache
- Gunakan fitur import untuk restore dari file JSON

### Dark mode tidak tersimpan
- Pastikan browser support localStorage
- Check apakah localStorage tidak full
- Coba clear browser cache dan reload

### Import file gagal
- Pastikan format JSON valid (gunakan file dari export)
- Hindari mengedit file JSON secara manual
- Cek ukuran file (tidak boleh terlalu besar)

## Keyboard Shortcuts

Saat ini belum ada shortcuts, namun dapat ditambahkan di masa depan:
- `←/→` : Navigasi bulan sebelumnya/selanjutnya
- `T` : Go to Today
- `Ctrl+E` : Export events
- `Ctrl+I` : Import events
- `Escape` : Close search/modals

## Kontribusi

Untuk saran atau bug report, silakan buat issue di GitHub repository.

## License

Bebas digunakan dan dimodifikasi. Tidak ada lisensi khusus.

## Version History

### v3.0 (Latest)
- ✅ Perbaiki timezone bug export (tanggal tidak bergeser)
- ✅ Tambah navigasi cepat dengan date picker (tahun/bulan/tanggal)
- ✅ Automatic date components calculation untuk timezone consistency
- ✅ Auto-populate date dropdown sesuai bulan yang dipilih

### v2.0
- Tambah mode gelap/terang
- Tambah highlight weekend
- Tambah export/import JSON
- Tambah upcoming events panel
- Tambah kategori event dengan warna
- Tambah search event real-time

### v1.0
- Kalender bulanan dasar
- Manajemen event sederhana
- Responsive design" 
