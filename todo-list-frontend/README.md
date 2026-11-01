# To Do List Mahasiswa

Aplikasi React untuk menambah, mengedit, menghapus, dan menandai tugas selesai.
Tanggal dibuat dicatat otomatis; deadline dan tanggal dibuat ditampilkan DD-MM-YYYY.
Data disimpan pada localStorage dengan key `todo-list-mahasiswa`.

## Menjalankan

```powershell
cd todo-list-frontend
npm install
npm run dev
```

`npm run build` membuat versi produksi, `npm run lint` memeriksa kode.

## Tugas 6

Komponen: Header, TaskForm, TaskSummary, TaskList, dan TaskItem.
Input form memakai state React; daftar memakai `.map()` dan key ID unik.
Deadline baru tidak boleh sebelum hari ini; saat edit tidak boleh sebelum tanggal dibuat.
Ringkasan menampilkan total, belum selesai, dan selesai. Daftar kosong menampilkan
"Belum ada data tugas". Data dibaca saat inisialisasi dan disimpan saat tugas berubah.

Pemeriksaan manual: tambah tugas, edit nama/deadline, tandai selesai dan batalkan,
refresh untuk memeriksa penyimpanan, lalu hapus semua tugas untuk melihat kondisi kosong.
Ambil screenshot kondisi kosong, berisi tugas, struktur komponen, dan terminal localhost.

Implementasi Tugas 6 sudah tercatat pada commit c24d9c9; commit dokumentasi ini
menjadi penanda tahap Tugas 6 sebelum integrasi Daily Quote.

## Tugas 7: Daily Quote

DailyQuote mengambil `https://dummyjson.com/quotes?limit=0` melalui `fetch()`.
Respons HTTP dan struktur data diperiksa sebelum kutipan disimpan. Daftar diurutkan
berdasarkan ID, lalu satu kutipan dipilih menggunakan nomor hari dari tanggal lokal.
Kutipan tetap sama selama tanggal dan daftar API sama. Buka atau muat ulang halaman
pada hari berikutnya untuk mendapatkan pilihan baru.

Status loading menampilkan pesan memuat; success menampilkan kutipan melalui
`quotes.map()` dengan `key={item.id}`. Blok catch mengubah status menjadi error
dan menampilkan pesan. Tombol Coba Lagi atau Muat ulang meningkatkan requestNumber
agar effect menjalankan fetch lagi. Permintaan dibatalkan ketika komponen dilepas,
dan timeout 20 detik mencegah loading tanpa batas.

Untuk screenshot loading, aktifkan throttling pada DevTools Network dan muat ulang
kutipan. Untuk success, pilih No throttling. Untuk error, pilih Offline lalu klik
Muat ulang tanpa refresh halaman. Kembalikan ke No throttling dan klik Coba Lagi
untuk memeriksa pemulihan. Fitur tugas pribadi tetap dapat digunakan ketika API gagal.
