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
