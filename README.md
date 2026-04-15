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
- Format tanggal menggunakan ISO 8601 (`YYYY-MM-DD`)
- Penanganan tahun kabisat otomatis (menggunakan API `Date` bawaan JavaScript)
- XSS protection: semua user input di-escape sebelum ditampilkan di HTML

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

## Pengembangan Selanjutnya

Optional features yang bisa ditambahkan:
- Mode gelap/terang
- Highlight hari weekend dengan warna berbeda
- Export/import event dalam format JSON
- Notifikasi untuk event mendatang
- Kategori event dengan warna berbeda
- Search event

## License

Bebas digunakan dan dimodifikasi." 
