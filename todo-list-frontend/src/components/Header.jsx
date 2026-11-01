export default function Header({ title }) {
  return (
    <header className="header">
      <span className="eyebrow">CATATAN KEGIATAN</span>
      <h1>{title}</h1>
      <p>Atur tugas dan deadline agar kegiatanmu lebih terencana.</p>
    </header>
  );
}