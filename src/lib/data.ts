// Semua teks undangan dikumpulkan di sini biar gampang diubah tanpa
// bongkar komponen. Isi mengikuti undangan referensi invi.leafitation.com/fahmi-ade.

export const couple = {
  // Teks pembuka di section Bride & Groom (mengikuti frame Figma "Layout Web").
  intro:
    "Assalamualaikum Wr. Wb. Dengan memohon Rahmat & Ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan putra-putri kami:",
  // Urutan penyebutan mengikuti referensi: Fahmi lebih dulu, baru Ade.
  groom: {
    name: "Fahmi Muzakky",
    shortName: "Fahmi",
    order: "Putra Kedua dari",
    parents: "Bapak H. Ramli & Ibu Hj. Murtining",
    // TODO: isi username Instagram (tanpa @). Kosongkan kalau tak ada tombol.
    instagram: "fahmimuzakky",
  },
  bride: {
    name: "Ade Fitri Kurniasih",
    shortName: "Ade",
    order: "Putri Bungsu dari",
    parents: "Bapak H. Anda & Ibu Hj. Zubaidah",
    instagram: "",
  },
  /** Dipakai di judul & penutup. */
  pairName: "Fahmi & Ade",
};

export const event = {
  intro:
    "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i, untuk menghadiri acara pernikahan kami:",
  akad: {
    label: "Akad Nikah",
    day: "Sabtu",
    date: "12.09.2026",
    time: "Pukul 09.00 WIB",
  },
  resepsi: {
    label: "Resepsi",
    day: "Sabtu",
    date: "12.09.2026",
    time: "Pukul 12.30 WIB",
  },
  dateLabel: "12 September 2026",
  location: {
    name: "Kediaman Mempelai Wanita",
    address:
      "Jalan H. Maat, RT.2/RW.3, Duren Seribu Sawangan, Kota Depok, Jawa Barat, Id 16518",
    mapsUrl:
      "https://www.google.com/maps/place/6%C2%B025'45.4%22S+106%C2%B044'38.3%22E/@-6.4292684,106.7413902,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-6.4292684!4d106.7439651?entry=tts&g_ep=EgoyMDI2MDcyOS4wIPu8ASoASAFQAw%3D%3D&skid=b83f9302-961a-4213-9005-017c6d657a61",
  },
  // Dipakai untuk hitung mundur — disamakan dengan jam akad (09.00 WIB).
  isoDateTime: "2026-09-12T09:00:00+07:00",
};

export const quranQuote = {
  heading: "We Found Love",
  arabic:
    "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
  translation:
    "Dan diantara tanda-tanda kekuasaanNya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikanNya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.",
  source: "Qs. Ar. Rum (30) : 21",
};

/**
 * ⚠️ NOMOR REKENING — VERIFIKASI SEBELUM DISEBAR KE TAMU.
 *
 * Angka di bawah diambil dari undangan referensi, bukan dikonfirmasi
 * langsung oleh mempelai. Salah satu digit saja berarti tamu mentransfer
 * ke rekening orang lain, dan uangnya tidak bisa ditarik kembali.
 * Cocokkan dulu dengan Fahmi/Ade sebelum link undangan dibagikan.
 */
export const gift = {
  heading: "Wedding Gift",
  intro:
    "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.",
  accounts: [
    {
      bank: "Bank BCA",
      number: "6365185909",
      holder: "Ade Fitri Kurniasih",
    },
    {
      bank: "Bank Mandiri",
      number: "1330033238577",
      holder: "Fahmi Muzakky",
    },
  ],
  shipping: {
    heading: "Kirim Kado",
    address:
      "Jalan H. Maat, RT.2/RW.3, Duren Seribu Sawangan, Kota Depok, Jawa Barat, Id 16518",
    recipient: "a.n Ade Fitri Kurniasih",
  },
};

export const closing = {
  text: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restunya untuk pernikahan kami. Atas do'a & restunya, kami ucapkan terima kasih.",
  signature: "Fahmi & Ade",
};

// Ganti/isi file mp3 di public/music/song.mp3, tombol musik otomatis aktif.
export const musicSrc = "/music/song.mp3";
