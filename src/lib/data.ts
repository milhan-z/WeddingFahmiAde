// Semua data undangan dikumpulkan di sini biar gampang diubah tanpa
// bongkar komponen. Ganti teks/tanggal/lokasi di bawah sesuai kebutuhan.

export const couple = {
  groom: {
    name: "Fahmi Muzakky",
    shortName: "Fahmi",
    parents: "Putra dari Bapak ... & Ibu ...",
  },
  bride: {
    name: "Ade Fitri Kurniasih",
    shortName: "Ade",
    parents: "Putri dari Bapak ... & Ibu ...",
  },
};

export const event = {
  akad: {
    label: "Akad Nikah",
    day: "Sabtu",
    date: "12 September 2026",
    time: "08.00 WIB \u2013 selesai",
  },
  resepsi: {
    label: "Resepsi",
    day: "Sabtu",
    date: "12 September 2026",
    time: "11.00 WIB \u2013 selesai",
  },
  location: {
    name: "Bojongsari, Depok",
    address: "Alamat lengkap menyusul di undangan cetak / konfirmasi WA.",
    mapsUrl: "https://maps.google.com/?q=Bojongsari,Depok",
  },
  // Dipakai untuk hitung mundur. Format ISO, sesuaikan jam mulai akad.
  isoDateTime: "2026-09-12T08:00:00+07:00",
};

export const quranQuote = {
  arabic:
    "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
  translation:
    "\u201cDan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.\u201d",
  source: "QS. Ar-Rum: 21",
};

// Ganti/isi file mp3 di public/music/song.mp3, tombol musik otomatis aktif.
export const musicSrc = "/music/song.mp3";
