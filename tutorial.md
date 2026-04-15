# Tutorial: Cara Menjalankan Aplikasi Kalender

Panduan lengkap untuk menjalankan dan menggunakan aplikasi Kalender JavaScript.

## 📋 Daftar Isi

1. [Persyaratan](#persyaratan)
2. [Instalasi & Setup](#instalasi--setup)
3. [Menjalankan Aplikasi](#menjalankan-aplikasi)
4. [Navigasi Dasar](#navigasi-dasar)
5. [Membuat Event](#membuat-event)
6. [Fitur Lanjutan](#fitur-lanjutan)
7. [Tips & Trik](#tips--trik)
8. [Troubleshooting](#troubleshooting)

---

## Persyaratan

Untuk menjalankan aplikasi ini, Anda hanya perlu:

- ✅ **Web Browser** (Chrome, Firefox, Safari, Edge - versi terbaru)
- ✅ **File Manager** (untuk membuka folder)
- ❌ **Tidak perlu** instalasi tambahan, framework, atau backend server

Aplikasi ini 100% berjalan di browser (client-side) tanpa memerlukan koneksi internet.

---

## Instalasi & Setup

### Cara 1: Download dari GitHub

1. Kunjungi [repository GitHub](https://github.com/Syafiq-Ayasi/kalender)
2. Klik tombol hijau **"Code"** → pilih **"Download ZIP"**
3. Extract folder ZIP ke lokasi yang diinginkan
4. Selesai! Tidak perlu setup atau instalasi lebih lanjut

### Cara 2: Clone dengan Git

```bash
git clone https://github.com/Syafiq-Ayasi/kalender.git
cd kalender
```

### Cara 3: Copy Manual

Salin 3 file berikut ke satu folder:
- `index.html`
- `style.css`
- `app.js`

---

## Menjalankan Aplikasi

### Opsi 1: Double-click File HTML (Paling Mudah)

1. Buka folder tempat Anda menyimpan file
2. **Double-click file `index.html`**
3. Aplikasi akan otomatis terbuka di browser default Anda
4. ✅ Selesai!

**Kelebihan:**
- Paling mudah dan cepat
- Tidak perlu membuka terminal/command prompt
- Langsung bisa digunakan

**Kekurangan:**
- Beberapa fitur browser notification mungkin tidak bekerja

### Opsi 2: Drag File ke Browser

1. Buka web browser favorit Anda (Chrome, Firefox, dll)
2. Drag-and-drop file `index.html` ke jendela browser
3. ✅ Aplikasi siap digunakan!

### Opsi 3: Gunakan Local Server (Recommended)

Jika ingin semua fitur berfungsi sempurna (terutama fitur browser notification di masa depan):

#### Dengan Python 3:
```bash
cd /path/to/kalender
python -m http.server 8000
```

Kemudian buka browser: `http://localhost:8000`

#### Dengan Node.js:
```bash
cd /path/to/kalender
npx http-server
```

Kemudian buka browser: `http://localhost:8080`

#### Dengan PHP (jika tersedia):
```bash
cd /path/to/kalender
php -S localhost:8000
```

Kemudian buka browser: `http://localhost:8000`

---

## Navigasi Dasar

### 1️⃣ Memahami Tampilan Utama

Saat pertama kali membuka aplikasi, Anda akan melihat:

```
┌─────────────────────────────────┐
│ 🌙 [Search bar]                 │  ← Top bar: Theme toggle & Search
├─────────────────────────────────┤
│ ← Sebelumnya | Januari 2026 | Selanjutnya →  ← Month navigation
│ [Year] [Month] [Date] Dropdowns  ← Quick date picker
│ 📅 Event Mendatang (7 hari)      ← Upcoming events panel
│
│  Sun  Mon  Tue  Wed  Thu  Fri  Sat
│  [1]  [2]  [3]  [4]  [5]  [6]  [7]
│  ...                           ...
│  [29] [30] [31]
└─────────────────────────────────┘
               │
               ├─ Event list
               ├─ Search results
               └─ Category filter
```

### 2️⃣ Navigasi Bulan

**Cara geser per bulan:**
- Klik tombol **"← Sebelumnya"** untuk bulan sebelumnya
- Klik tombol **"Selanjutnya →"** untuk bulan berikutnya
- Klik tombol **"Hari Ini"** untuk kembali ke hari ini

**Cara cepat melompat:**
1. Pilih tahun dari dropdown pertama (2000-2100)
2. Pilih bulan dari dropdown kedua (Januari-Desember)
3. Pilih tanggal dari dropdown ketiga (1-31)
4. Kalender langsung navigate ke tanggal tersebut
5. Dropdowns otomatis ter-reset

### 3️⃣ Ganti Tema (Light/Dark Mode)

Klik tombol **🌙 atau ☀️** di kanan atas (top bar):
- 🌙 = Sedang dalam light mode (putih)
- ☀️ = Sedang dalam dark mode (gelap)
- Preferensi Anda otomatis tersimpan

---

## Membuat Event

### Langkah 1: Pilih Tanggal

1. Klik salah satu tanggal di kalender
2. Tanggal akan ter-highlight dengan warna biru
3. Sidebar di sebelah kanan akan menampilkan "Buat Event"

### Langkah 2: Isi Detail Event

Di sidebar, isi formulir event:

```
┌────────────────────────┐
│ Judul Event (Wajib)    │ ← Harus diisi, max 50 karakter
│                        │
│ Deskripsi (Opsional)   │ ← Boleh kosong, max 200 karakter
│ (3 baris)              │
│                        │
│ [Kategori Pilihan]     │ ← Kerja/Pribadi/Penting/Lainnya
│                        │
│ [Tambah]  [Batal]      │
└────────────────────────┘
```

### Langkah 3: Pilih Kategori

Dropdown kategori tersedia:
- 🔵 **Kerja** — untuk event pekerjaan (warna biru)
- 💗 **Pribadi** — untuk event pribadi (warna pink)
- ⭐ **Penting** — untuk event penting (warna amber/kuning)
- 💜 **Lainnya** — kategori default (warna purple)

Setiap kategori memiliki warna unik untuk mudah diidentifikasi.

### Langkah 4: Simpan Event

1. Klik tombol **"Tambah"** atau tekan **Enter**
2. Event akan langsung tersimpan
3. Tanggal akan mendapat indikator warna (sesuai kategori)
4. Daftar event akan menampilkan event baru

**Contoh:**
```
25 April 2026
┌──────────────────────┐
│ ● Meeting dengan Klien
│   Membahas proposal baru
│   [Hapus]             │
│
│ ● Deadline Laporan
│   Submit ke manager
│   [Hapus]             │
└──────────────────────┘
```

---

## Fitur Lanjutan

### 🔍 Search Event

**Cara menggunakan:**

1. Ketik di input pencarian di top bar: **"Cari event..."**
2. Dropdown akan otomatis menampilkan hasil yang cocok
3. Cari berdasarkan:
   - Judul event
   - Deskripsi event
   - Case-insensitive (besar/kecil huruf sama)

4. Klik hasil yang Anda inginkan → kalender langsung navigate ke tanggal tersebut

**Contoh:**
```
Input: "meeting"
↓
Hasil:
┌──────────────────────────┐
│ Meeting dengan Klien     │
│ 25 April 2026            │
│                          │
│ Meeting Rutin Tim        │
│ 10 May 2026              │
└──────────────────────────┘
```

### 📥 Export Event ke JSON

**Untuk Backup atau Transfer:**

1. Klik tombol **📥** di sidebar (Export)
2. File akan di-download dengan nama: `calendar-events-YYYY-MM-DD.json`
3. Simpan file ini di lokasi aman
4. Anda bisa restore kapan saja dengan fitur Import

**Contoh file yang di-download:**
```json
{
  "2026-04-25": [
    {
      "title": "Meeting dengan Klien",
      "desc": "Membahas proposal baru",
      "category": "Kerja"
    }
  ],
  "2026-05-10": [
    {
      "title": "Meeting Rutin Tim",
      "desc": "",
      "category": "Kerja"
    }
  ]
}
```

### 📤 Import Event dari JSON

**Untuk Restore atau Merge Data:**

1. Klik tombol **📤** di sidebar (Import)
2. Pilih file JSON (dari export sebelumnya)
3. Dialog akan bertanya: **"Merge dengan data existing?"**
   - **OK** = Gabung dengan event yang sudah ada (jika ada tanggal sama, keduanya disimpan)
   - **Cancel** = Replace semua event dengan data dari file
4. ✅ Event berhasil di-import!

**Catatan:**
- File harus dalam format JSON valid (gunakan file dari export)
- Jangan mengedit file JSON secara manual
- Berguna untuk restore atau transfer antar perangkat

### 🏷️ Filter Event berdasarkan Kategori

**Di Sidebar:**

1. Di atas daftar event, ada dropdown **"Semua Kategori"**
2. Pilih kategori yang ingin dilihat:
   - **Semua Kategori** — tampilkan semua event
   - **Kerja** — hanya event kategori Kerja
   - **Pribadi** — hanya event kategori Pribadi
   - **Penting** — hanya event kategori Penting
   - **Lainnya** — hanya event kategori Lainnya
3. Daftar event di bawah akan otomatis ter-filter

### 📅 Upcoming Events Panel

**Lihat 7 hari ke depan:**

1. Panel di atas kalender menampilkan **"📅 Event Mendatang (7 hari)"**
2. Event diurutkan dari tanggal terdekat
3. Indikator khusus:
   - 🟢 **Hari ini** — event hari ini (highlight hijau)
   - Event-event lainnya dengan tanggal masing-masing
4. Klik event di panel → kalender navigate ke tanggal tersebut

**Berguna untuk:**
- Quick overview agenda seminggu ke depan
- Tidak perlu scroll kalender untuk lihat event mendatang
- Reminder event yang akan datang

---

## Tips & Trik

### 💡 Tip 1: Backup Data Rutin

Lakukan export event setiap minggu:
1. Klik tombol **📥 Export**
2. Simpan file di lokasi aman (cloud, USB, dll)
3. Jika terjadi hal tidak terduga, Anda bisa restore dengan Import

### 💡 Tip 2: Gunakan Kategori untuk Organisasi

- **Kerja** — Meeting, deadline, project
- **Pribadi** — Birthday, anniversary, hobby
- **Penting** — Crisis, urgent task, deadline kritis
- **Lainnya** — Misc activity

Dengan kategori, Anda bisa filter dan quick overview berdasarkan tipe event.

### 💡 Tip 3: Dark Mode untuk Mata yang Nyaman

Jika menggunakan aplikasi malam hari:
1. Klik tombol 🌙 untuk ganti ke dark mode
2. Warna akan otomatis adjust untuk nyaman di mata
3. Preferensi otomatis tersimpan

### 💡 Tip 4: Gunakan Search untuk Event yang Lupa Tanggalnya

Kalau Anda lupa event "Wedding" itu kapan:
1. Ketik "wedding" di search bar
2. Langsung keluar hasil dengan tanggalnya
3. Klik untuk navigate langsung

### 💡 Tip 5: Dropdown Date Picker untuk Bulan Jauh

Bukannya klik "Sebelumnya" 12 kali untuk ke tahun lalu:
1. Pakai dropdown tahun → pilih 2025
2. Pakai dropdown bulan → pilih Januari
3. Pakai dropdown tanggal → pilih tanggal
4. Selesai dalam 3 klik!

---

## Troubleshooting

### ❓ Data Event Hilang Setelah Refresh Browser

**Masalah:**
Anda buat event, refresh browser, tapi event hilang.

**Solusi:**
1. Pastikan **localStorage tidak di-clear**
   - Buka Developer Tools (F12)
   - Tab Application → Local Storage
   - Pastikan ada `calendarEvents`

2. Coba **export data sebelum clear cache:**
   - Klik 📥 Export
   - Simpan file
   - Jika perlu, import kembali dengan 📤 Import

3. Check browser settings:
   - Some browsers clear localStorage saat close browser
   - Cek settings "Clear browsing data on exit"

### ❓ Export Menunjukkan Tanggal Hari Sebelumnya

**Masalah:**
Event tanggal 25 ter-export jadi tanggal 24.

**Solusi:**
Ini adalah bug timezone yang sudah diperbaiki di v3.0. Pastikan Anda menggunakan versi terbaru:
- Update ke versi terbaru dari GitHub
- Atau buka `http://localhost:8000` (jika pakai server)

### ❓ Dark Mode Tidak Tersimpan

**Masalah:**
Pilih dark mode, tapi saat refresh kembali ke light mode.

**Solusi:**
1. Pastikan browser support **localStorage**
   - Cek browser settings: Privacy & Security
   - Pastikan localStorage tidak disabled

2. Coba clear cache:
   - Ctrl+Shift+Delete (Chrome)
   - Refresh browser
   - Coba ganti tema lagi

### ❓ Import File Gagal

**Masalah:**
Upload file JSON tapi error "Format file tidak valid".

**Solusi:**
1. Pastikan file adalah **hasil export dari aplikasi ini**
   - Jangan edit manual file JSON
   - File harus format JSON yang valid

2. Cek ukuran file:
   - File tidak boleh terlalu besar (> 10MB)
   - Hapus event yang tidak perlu sebelum export

3. Coba dengan file yang berbeda:
   - Jika file rusak, export ulang dari backup

### ❓ Aplikasi Lambat atau Lag

**Masalah:**
Aplikasi jadi lambat kalau banyak event (ratusan event).

**Solusi:**
1. **Hapus event lama:**
   - Event yang sudah lewat 6 bulan bisa dihapus
   - Sebelumnya export untuk backup

2. **Gunakan kategori filter:**
   - Filter hanya kategori yang Anda butuhkan
   - Jangan tampilkan semua event

3. **Refresh browser:**
   - Kadang browser perlu di-refresh setelah lama
   - Keyboard: Ctrl+R atau Cmd+R

---

## FAQ (Frequently Asked Questions)

### Q: Apakah data saya aman?
**A:** Ya! Aplikasi ini tidak mengirim data ke server apapun. Semua data tersimpan di browser Anda (localStorage). Hanya Anda yang bisa akses.

### Q: Bisa sync dengan Google Calendar?
**A:** Belum untuk sekarang. Ini adalah aplikasi standalone. Tapi Anda bisa export dan import data.

### Q: Bisa akses dari HP?
**A:** Ya! Aplikasi ini responsive dan bisa diakses dari HP. Download folder, atau buka via server di network yang sama.

### Q: Bisa share calendar dengan teman?
**A:** Belum ada fitur sharing built-in. Tapi Anda bisa export event dan teman import ke device mereka.

### Q: Bisa set reminder/notification?
**A:** Belum untuk sekarang. Feature ini direncanakan untuk versi mendatang.

### Q: Bahasa apa yang digunakan aplikasi ini?
**A:** Bahasa Indonesia untuk UI, dengan dokumentasi dalam Bahasa Indonesia dan English comments di code.

---

## Bantuan Lebih Lanjut

### 📖 Dokumentasi Lengkap
Lihat [README.md](README.md) untuk dokumentasi teknis dan feature list.

### 🐛 Laporkan Bug
Jika menemukan bug, buat issue di [GitHub Issues](https://github.com/Syafiq-Ayasi/kalender/issues).

### 💡 Saran Fitur Baru
Punya ide fitur baru? Silakan create issue dengan label "enhancement".

---

## Changelog

**v3.0 (Latest)**
- ✅ Tambah Date Picker (tahun/bulan/tanggal)
- ✅ Perbaiki timezone bug export
- ✅ Improve date handling consistency

**v2.0**
- ✅ Dark/Light mode
- ✅ Weekend highlight
- ✅ Export/import JSON
- ✅ Upcoming events panel
- ✅ Event categories
- ✅ Search functionality

**v1.0**
- ✅ Kalender bulanan dasar
- ✅ Event management
- ✅ Responsive design

---

**Enjoy your calendar app! 🎉**
