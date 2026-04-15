# Issue: Navigasi Cepat & Perbaikan Bug Export Tanggal

## Tujuan
Menambahkan fitur navigasi cepat untuk memilih tahun/bulan/tanggal secara langsung (tidak harus geser kiri-kanan), serta memperbaiki bug pada export/import event yang menyebabkan tanggal bergeser mundur satu hari.

## Prasyarat
Aplikasi kalender sudah terimplementasi dengan fitur v2.0 (dark mode, kategori, search, export/import, dll).

## Fitur yang Akan Ditambahkan

### 1. Navigasi Cepat (Date Picker)
Saat ini navigasi hanya bisa geser kiri/kanan satu bulan — tidak efisien untuk pindah ke tahun/bulan yang jauh.

**Kebutuhan:**
- **Dropdown/selector Tahun** — pilih tahun langsung (range wajar, misal 1990–2100)
- **Dropdown/selector Bulan** — pilih bulan langsung (Januari–Desember)
- **Input tanggal langsung** — kalau user mau langsung lompat ke tanggal spesifik
- Tombol "Go" atau langsung update kalender saat dropdown berubah
- Letakkan di header kalender agar mudah diakses
- Tetap jaga UI clean, jangan ramai

**Alternative UI:**
- Klik pada judul "Januari 2026" di header → buka popup/modal picker
- Atau tampilkan dropdown inline di header

### 2. Perbaikan Bug Export Tanggal (Timezone Issue)
**Masalah saat ini:**
Event yang dibuat pada tanggal 25 bisa terbaca menjadi tanggal 24 (atau hari sebelumnya) saat di-export, karena `toISOString()` mengubah ke UTC sementara user berada di timezone positif (WIB/UTC+7 dll).

**Root cause:**
Fungsi `getDateKey()` menggunakan `date.toISOString()` yang mengkonversi ke UTC. Untuk timezone WIB (UTC+7), tanggal 25 jam 00:00 WIB = tanggal 24 jam 17:00 UTC, sehingga toISOString menghasilkan string "2026-04-24" bukan "2026-04-25".

**Solusi:**
- Gunakan local date components (getFullYear, getMonth, getDate) untuk membuat date key
- Format: `YYYY-MM-DD` berdasarkan waktu lokal, bukan UTC
- Pastikan semua fungsi yang membuat/membaca date key konsisten
- Uji di berbagai timezone (WIB, WITA, WIT)

**Dampak:**
- Fungsi `getDateKey()` perlu diperbaiki
- Semua event yang tersimpan dengan key salah mungkin perlu migrasi (opsional, atau clear ulang)
- Export dan import harus menghasilkan tanggal yang konsisten dengan display

## Acceptance Criteria
- [ ] Tahun dapat dipilih langsung lewat dropdown/input
- [ ] Bulan dapat dipilih langsung lewat dropdown
- [ ] User dapat lompat ke tanggal manapun tanpa geser berkali-kali
- [ ] Event yang dibuat tanggal 25 tetap tersimpan & ter-export sebagai tanggal 25
- [ ] Export/import tidak mengubah tanggal event
- [ ] Testing di timezone Indonesia (WIB/WITA/WIT) menunjukkan tanggal konsisten
- [ ] UI tetap clean dan mobile-friendly
- [ ] Tidak ada regresi di fitur existing

## Catatan untuk Implementer

### Untuk Navigasi Cepat:
- Gunakan `<select>` HTML native untuk dropdown (lebih simple & accessible)
- Update kalender otomatis saat dropdown berubah (event listener `change`)
- Tambahkan ke CSS variables yang sudah ada untuk konsistensi theme
- Responsive di mobile (jangan sampai dropdown kepotong)

### Untuk Bug Export:
- Ganti `date.toISOString().split('T')[0]` dengan format manual:
  ```
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  ```
- Atau gunakan helper function yang konsisten di seluruh kode
- Cek fungsi `isToday`, `isSameDate`, dan rendering kalender juga — pastikan semua pakai local date
- Saat parse kembali dari date key (import atau click), hati-hati dengan `new Date('2026-04-25')` karena ini diparse sebagai UTC midnight, bukan local — gunakan split manual atau `new Date(year, month-1, day)`

### UX Considerations:
- Saat user pilih tahun/bulan tapi belum pilih tanggal, default ke tanggal 1
- Jika user pilih tanggal > jumlah hari di bulan itu, fallback ke tanggal akhir bulan
- Tombol "Hari Ini" tetap harus berfungsi sebagai shortcut

## Nice to Have (Opsional)
- Keyboard shortcut untuk buka date picker (misal: `Ctrl+G` untuk "Go to date")
- Animasi smooth saat berpindah jauh antar bulan/tahun
- History navigasi (back/forward seperti browser)
- Highlight tanggal-tanggal dengan banyak event saat scroll tahun
