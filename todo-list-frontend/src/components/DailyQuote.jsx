import { useEffect, useState } from "react";

const API_URL = "https://dummyjson.com/quotes?limit=0";

export default function DailyQuote() {
  const [quotes, setQuotes] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [requestNumber, setRequestNumber] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let timedOut = false;
    const timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 20000);

    async function ambilKutipan() {
      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Server mengembalikan HTTP ${response.status}.`);
        }

        const data = await response.json();

        if (
          !Array.isArray(data.quotes) ||
          data.quotes.length === 0 ||
          !data.quotes.every(
            (item) =>
              item !== null &&
              typeof item.id === "number" &&
              typeof item.quote === "string" &&
              typeof item.author === "string"
          )
        ) {
          throw new Error("Data kutipan tidak tersedia atau formatnya salah.");
        }

        // Urutkan agar pemilihan berdasarkan tanggal konsisten.
        const availableQuotes = [...data.quotes].sort(
          (a, b) => a.id - b.id
        );

        const today = new Date();

        // Nomor hari berdasarkan tanggal lokal, tanpa pengaruh jam.
        const dayNumber = Math.floor(
          Date.UTC(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          ) / 86400000
        );

        const index = dayNumber % availableQuotes.length;
        const dailyQuote = availableQuotes[index];

        if (!active) return;

        // Disimpan sebagai array agar ditampilkan melalui .map().
        setQuotes([dailyQuote]);
        setStatus("success");
      } catch (err) {
        if (!active) return;

        setError(
          timedOut
            ? "Waktu tunggu habis. Silakan coba lagi."
            : err instanceof TypeError
            ? "Tidak dapat terhubung ke API. Periksa koneksi internet."
            : err.message || "Terjadi kesalahan saat mengambil kutipan."
        );

        setStatus("error");
      } finally {
        clearTimeout(timeoutId);
      }
    }

    ambilKutipan();

    return () => {
      active = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [requestNumber]);

  function muatUlang() {
    setStatus("loading");
    setError("");
    setRequestNumber((previous) => previous + 1);
  }

  return (
    <section className="panel daily-quote">
      <span className="eyebrow">INSPIRASI HARI INI</span>
      <h2>Daily Quote</h2>

      <p className="quote-description">
        Luangkan waktu sejenak untuk membaca kutipan hari ini.
      </p>

      {status === "loading" && (
        <p className="quote-message" role="status">
          Memuat kutipan harian...
        </p>
      )}

      {status === "error" && (
        <div className="quote-error" role="alert">
          <p>Gagal mengambil kutipan: {error}</p>

          <button type="button" onClick={muatUlang}>
            Coba Lagi
          </button>
        </div>
      )}

      {status === "success" && (
        <>
          <p className="quote-success" role="status">
            Kutipan harian berhasil dimuat.
          </p>

          <ul className="quote-list">
            {quotes.map((item) => (
              <li key={item.id}>
                <blockquote>
                  <p>“{item.quote}”</p>
                  <footer>— {item.author}</footer>
                </blockquote>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="secondary"
            onClick={muatUlang}
          >
            Muat ulang
          </button>
        </>
      )}
    </section>
  );
}
