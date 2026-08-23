import type { Content } from "./en";

export const id: Content = {
  ui: {
    eyebrow: "Portofolio",
    language: "Bahasa",
    languageName: "Bahasa Indonesia",
    theme: {
      system: "Ikuti tema sistem",
      light: "Tema terang",
      dark: "Tema gelap",
    },
    nav: {
      about: "Tentang",
      work: "Pengalaman",
      stack: "Teknologi",
      education: "Pendidikan",
      portfolio: "Karya",
    },
    sections: "Bagian",
    backToWork: "Karya",
    resetPrototype: "Setel ulang prototipe",
    buildNotes: "Catatan pengerjaan",
  },

  profile: {
    title: "Senior Back-end Engineer",
    location: "Jakarta, APAC",
    availability: "Terbuka untuk kerja remote",
    lede: "Saya membangun dan merawat layanan REST dan GraphQL untuk perusahaan yang memindahkan uang, data, dan kepatuhan lintas negara — merancang arsitektur layanannya, lalu memegang infrastruktur tempat layanan itu berjalan.",
    paragraphs: [
      "Tujuh tahun di fintech, e-commerce, dan layanan bisnis di Singapura, Hong Kong, dan Indonesia. Pekerjaan saya berada di titik temu antara desain API dan operasional: memecah monolit menjadi microservice yang terpisah per domain, memperkuat integrasi bank dengan penandatanganan request dan kriptografi, serta mengganti rilis manual dengan CI/CD yang mengirim dalam hitungan menit, bukan hari.",
      "Full-stack bila memang membantu — TypeScript, Node.js, dan Go di sisi server, React dan React Native di sisi klien, dengan AWS, Azure, dan CDK di bawahnya.",
    ],
  },

  headings: {
    about: { title: "Tentang", meta: "2019 — sekarang" },
    work: { title: "Pengalaman", meta: (count: number) => `${count} posisi` },
    stack: { title: "Teknologi", meta: "Yang biasa saya pakai" },
    education: { title: "Pendidikan", meta: "2014 — 2019" },
  },

  stats: [
    { label: "Pengalaman", value: "7", unit: " thn" },
    { label: "Trafik puncak", value: "+200", unit: "%" },
    { label: "Waktu rilis", value: "Hari", unit: " → menit" },
    { label: "Pasar", value: "SG · HK", unit: " · GB · US · ID" },
  ],

  workTeaser: {
    label: "Karya pilihan",
    text: "Empat prototipe interaktif, dibangun ulang dari desain statis",
  },

  modes: { Remote: "Remote", Hybrid: "Hibrida", "On-site": "Di kantor" },

  roles: {
    osome: {
      title: "Senior Back-end Engineer",
      location: "Singapura",
      period: "Mei 2025 — Sekarang",
      brief:
        "Layanan bisnis digital — pendirian perusahaan, pembukuan, akuntansi, dan kepatuhan untuk wirausaha di Singapura, Hong Kong, dan Inggris.",
      highlights: [
        {
          lead: "Meluncurkan pendirian perusahaan Hong Kong.",
          detail:
            "Membangun dukungan penuh pendirian perusahaan untuk wilayah HK beserta aturan dan validasi yang dibutuhkan agar pelaporan berbasis HK berjalan mulus — sebelumnya platform hanya melayani Inggris Raya dan Singapura.",
        },
        {
          lead: "Menutup celah logging data sensitif.",
          detail:
            "Memperbaiki logging di produksi yang tidak menyamarkan field sensitif dengan benar, sehingga perlindungan data dan kepatuhan menjadi lebih kuat.",
        },
        {
          lead: "Menjaga pelaporan Singapura tetap sesuai ACRA.",
          detail: "Menambahkan field alamat kontak yang diwajibkan agar memenuhi regulasi ACRA.",
        },
        {
          lead: "Memasukkan AI ke dalam alur review.",
          detail:
            "Memakai AI untuk menyusun implementasi awal dengan cepat, lalu meninjau kebenaran dan keamanannya serta memperbaiki hal-hal yang terlewat.",
        },
      ],
    },
    necto: {
      title: "Senior Back-end Engineer",
      location: "Singapura",
      period: "Des 2022 — Mei 2025",
      brief:
        "Agregasi API bank korporat untuk tim treasury, enterprise, dan keuangan perusahaan.",
      highlights: [
        {
          lead: "Memegang API inti integrasi bank.",
          detail:
            "Merawat REST API Node.js yang dipakai klien untuk menghubungkan sistem mereka ke lapisan agregasi.",
        },
        {
          lead: "Merapikan layanan inti warisan.",
          detail:
            "Menyusun ulang API internal Node.js agar memproses banyak entri layanan secara paralel, bukan berurutan.",
        },
        {
          lead: "Mengintegrasikan banyak bank.",
          detail: "Menghubungkan beberapa bank dan sebelas layanan ke lapisan API perusahaan.",
        },
        {
          lead: "Memenuhi standar keamanan perbankan.",
          detail:
            "Menerapkan penandatanganan request, enkripsi, dan dekripsi respons dengan teknik sertifikat dan kriptografi untuk melindungi data keuangan.",
        },
        {
          lead: "Memangkas rilis dari hari menjadi menit.",
          detail:
            "Membangun pipeline rilis sekali klik dan otomatisasi deployment lingkungan uji per PR, sehingga laju iterasi meningkat.",
        },
        {
          lead: "Memimpin keputusan teknis penting.",
          detail:
            "Membawa engineer baru sampai produktif dan menelusuri masalah yang diangkat tim.",
        },
      ],
    },
    pawjourr: {
      title: "Senior Back-end Engineer",
      location: "Singapura",
      period: "Nov 2021 — Des 2022",
      brief: "Platform outsourcing pekerja lepas khusus hewan peliharaan di AS dan Singapura.",
      highlights: [
        {
          lead: "Membangun API GraphQL.",
          detail: "Menyiapkan lapisan GraphQL di atas Nest.js dan Node.js untuk seluruh situs.",
        },
        {
          lead: "Memecah monolit.",
          detail:
            "Memisahkan API menjadi microservice per domain dengan TypeScript, Nest.js, dan NATS, masing-masing dideploy terpisah demi ketersediaan dan ketahanan domain yang lebih baik.",
        },
        {
          lead: "Menyiapkan infrastruktur auto-scaling.",
          detail:
            "Menurunkan jumlah instance server dari ribuan menjadi ratusan sekaligus menaikkan kapasitas trafik puncak sebesar 200%.",
        },
        {
          lead: "Memperkenalkan CI/CD.",
          detail:
            "GitHub Actions, AWS CodeDeploy, dan Azure Pipelines — waktu rilis turun dari hitungan jam dan hari menjadi menit.",
        },
        {
          lead: "Menetapkan standar dasar engineering.",
          detail:
            "Perkakas proyek, format kode, konvensi commit, dan linting; memperkenalkan agile dan scrum; menjalankan seleksi teknis untuk rekrutmen.",
        },
      ],
    },
    "kaddra-lead": {
      title: "Lead Back-end Engineer",
      location: "Singapura",
      period: "Apr 2021 — Sep 2021",
      brief:
        "Platform e-commerce dan ritel mobile; memimpin tim backend dalam perpindahan ke serverless.",
      highlights: [
        {
          lead: "Merancang API serverless.",
          detail: "Menerapkan layanan serverless agar platform lebih gesit dan responsif.",
        },
        {
          lead: "Merawat inti REST.",
          detail:
            "Menjaga layanan Node.js dan Express tetap berjalan, menambah fitur, dan menuntaskan bug.",
        },
        {
          lead: "Memperluas alur CI/CD.",
          detail: "CircleCI dan AWS CodeDeploy untuk pengembangan sampai deployment.",
        },
        {
          lead: "Menyeragamkan akses data.",
          detail: "Memperkenalkan perkakas ORM agar interaksi basis data konsisten.",
        },
        {
          lead: "Memimpin engineer dan QA.",
          detail: "Mengelola tim dan menjaga standar kualitas kode.",
        },
      ],
    },
    "kaddra-fullstack": {
      title: "Full-stack Software Engineer",
      location: "Singapura",
      period: "Agu 2020 — Mar 2021",
      brief: "Layanan backend dan aplikasi mobile untuk platform ritel terkemuka di Singapura.",
      highlights: [
        {
          lead: "Merawat aplikasi full-stack.",
          detail:
            "Aplikasi mobile React Native di atas REST API Node.js dan Express — perbaikan bug dan penambahan fitur.",
        },
        {
          lead: "Dipromosikan menjadi Lead.",
          detail: "Diakui atas pekerjaan di atas dan dipercaya memimpin tim backend.",
        },
      ],
    },
    "soyaka-fullstack": {
      title: "Full-stack Software Engineer",
      location: "Jakarta",
      period: "Jan 2020 — Mei 2020",
      brief: "Platform social-commerce fashion mobile; memimpin produk baru dari nol.",
      highlights: [
        {
          lead: "Merilis aplikasi mobile lintas platform.",
          detail: "Menyiapkan aplikasi Android dan iOS dengan Flutter.",
        },
        {
          lead: "Membangun API produk.",
          detail:
            "Layanan backend dengan Node.js dan Express yang menghubungkan front-end dan back-end secara rapi.",
        },
        {
          lead: "Mengelola tim outsourcing.",
          detail:
            "Mengoordinasikan engineer vendor dan tim internal agar tonggak proyek tercapai.",
        },
      ],
    },
    "soyaka-frontend": {
      title: "Front-end Engineer",
      location: "Jakarta",
      period: "Mar 2019 — Des 2019",
      brief: "Aplikasi web frontend dan perkakas internal yang dipakai perusahaan sehari-hari.",
      highlights: [
        {
          lead: "Merawat aplikasi web React.js",
          detail: "beserta perkakas internalnya, dan menuntaskan masalah dengan cepat.",
        },
        {
          lead: "Memimpin desain ulang perkakas internal,",
          detail: "memperbaiki tampilan antarmuka dan kemudahan pakainya secara keseluruhan.",
        },
        {
          lead: "Memigrasikan ke React Hooks,",
          detail: "sehingga kode lebih mudah dirawat dengan fitur React terbaru.",
        },
        {
          lead: "Membuat produk bisa dipasang.",
          detail:
            "Membangun Progressive Web App sehingga produk lebih mudah diakses dari perangkat.",
        },
      ],
    },
  },

  stack: [
    {
      area: "Bahasa",
      lead: "TypeScript, Node.js, Go.",
      detail: "JavaScript, dan Dart untuk mobile.",
    },
    {
      area: "API",
      lead: "REST, GraphQL.",
      detail:
        "Nest.js, Express, penandatanganan request, enkripsi, dan autentikasi berbasis sertifikat untuk integrasi bank.",
    },
    {
      area: "Arsitektur",
      lead: "Microservice, serverless, monolit.",
      detail:
        "Pemisahan domain, pesan lewat NATS, deployment mandiri, dan pemrosesan paralel.",
    },
    {
      area: "Cloud",
      lead: "AWS, Azure, CDK.",
      detail: "Infrastruktur auto-scaling, ketersediaan tinggi, dan penghematan biaya.",
    },
    {
      area: "Rilis",
      lead: "CI/CD dari hulu ke hilir.",
      detail:
        "GitHub Actions, CircleCI, AWS CodeDeploy, Azure Pipelines, dan lingkungan pratinjau per PR.",
    },
    {
      area: "Front-end",
      lead: "React, React Native, Flutter.",
      detail: "PWA, perkakas internal, dan penerjemahan desain menjadi antarmuka.",
    },
    {
      area: "Praktik kerja",
      lead: "Memimpin tim.",
      detail:
        "Onboarding, agile dan scrum, seleksi teknis, linting dan konvensi commit, serta pengembangan berbantuan AI dengan tinjauan manusia.",
    },
  ],

  education: {
    degree: "S1 Teknik Informatika",
    place: "Bandung, Indonesia",
    period: "Juli 2014 — Maret 2019",
    note: "Setara Ilmu Komputer, dengan fokus rekayasa perangkat lunak. IPK 3,72 / 4,00.",
  },

  portfolio: {
    title: "Karya",
    meta: (count: number) => (count === 1 ? "1 proyek" : `${count} proyek`),
    intro: {
      before:
        "Hal-hal yang bisa Anda buka dan pakai. Pekerjaan backend yang saya pegang di produksi diuraikan di bagian ",
      link: "Pengalaman",
      after: ".",
    },
    kind: "Prototipe interaktif",
    role: "Alih desain, front-end",
    items: "item",
  },

  projects: {
    "task-manager": {
      name: "Manajer tugas",
      summary:
        "Aplikasi tugas mobile yang dibangun dari desain statis: perencana mingguan, detail tugas beserta subtugas, dan lembar tugas baru. Setiap layar terhubung ke state sungguhan — buat satu tugas dan ia muncul di daftar, papan, serta lini masa aktivitas.",
      thumbnailAlt:
        "Layar utama prototipe pada ponsel: perencana mingguan dengan hari Kamis terpilih dan satu kartu tugas prioritas tinggi.",
      lede: "Desain mobile tiga layar, dibangun ulang menjadi sesuatu yang benar-benar bisa dipakai. Pilih hari, buka tugas, centang subtugas, atau tambahkan tugas dan lihat ia muncul di semua tempat semestinya.",
      sub: "Tidak ada tangkapan layar di sini — ponsel di bawah adalah state React. Semuanya berjalan di peramban, jadi memuat ulang halaman akan mengembalikan pekan awalnya.",
      notes: [
        {
          title: "Satu reducer, empat layar",
          body: "Tugas, aktivitas, hari yang dipilih, dan lembar mana yang terbuka semuanya tinggal di satu reducer. Setiap layar membaca state yang sama, sehingga membuat tugas memperbarui perencana, papan, dan catatan aktivitas sekaligus.",
        },
        {
          title: "Alur desainnya, tanpa mengarang",
          body: "Tiga layar pada desain aslinya adalah daftar, tampilan detail, dan lembar pembuatan. Bilah tabnya menyiratkan dua layar lagi, jadi papan dan aktivitas diturunkan dari data yang sama, bukan dipalsukan dengan gambar tempelan.",
        },
        {
          title: "Interaktif berarti bisa dioperasikan",
          body: "Cip hari, tab, segmen prioritas, dan baris subtugas adalah tombol sungguhan dengan status tertekan; lembarnya berupa dialog berlabel yang tertutup dengan Escape dan menolak menyimpan tugas tanpa judul.",
        },
      ],
      attribution:
        "Desain asli: konsep aplikasi manajer tugas. Dibangun ulang sebagai latihan — tidak berafiliasi dengan pembuatnya.",
    },
    wallet: {
      name: "Dompet",
      summary:
        "Dompet digital yang dibangun ulang dari desain dua layar: kartu yang benar-benar bisa dilunasi, rekening yang menyaring lini masa aktivitas, grafik pertumbuhan portofolio dengan rentang yang bisa diganti, dan daftar pantauan. Saldonya konsisten — melunasi kartu mendebit rekening di belakangnya.",
      thumbnailAlt:
        "Prototipe dompet pada ponsel: saldo, kartu pembayaran hijau limau, dan daftar rekening.",
      lede: "Desain dompet dua layar, dibangun ulang agar angkanya konsisten. Lunasi kartu dan uangnya keluar dari rekening; bekukan kartunya dan pembayaran ditolak; sembunyikan saldo dan seluruh aplikasi ikut senyap.",
      sub: "Cangkang perangkat yang sama dengan manajer tugas — bedanya hanya palet dan datanya. Semuanya berjalan di peramban, jadi memuat ulang akan mengembalikan saldo awal.",
      notes: [
        {
          title: "Uang yang benar-benar berpindah",
          body: "Melunasi kartu mendebit rekening giro, menulis entri ke aktivitas terkini, dan mengubah tombolnya menjadi Lunas. Saldo di bagian atas adalah jumlah seluruh rekening, jadi setiap tindakan benar-benar dihitung, bukan sekadar hiasan.",
        },
        {
          title: "Satu sakelar, terasa di mana-mana",
          body: "Nyalakan sembunyikan saldo di Pengaturan dan setiap angka di aplikasi tersamarkan — saldo, kartu, rekening, aktivitas, harga. Cara paling murah untuk menunjukkan bahwa semua layar membaca satu sumber state, bukan salinannya sendiri.",
        },
        {
          title: "Grafik yang bisa ditanya",
          body: "Cip rentang menyusun ulang datanya, persentase pertumbuhan diturunkan dari saldo di belakangnya, dan menyentuh sebuah batang menukar angka utama dengan perubahan hari itu.",
        },
      ],
      attribution:
        "Desain asli: konsep aplikasi dompet. Dibangun ulang sebagai latihan — tidak berafiliasi dengan pembuatnya. Saldo, harga, dan kepemilikan adalah rekaan.",
    },
    finance: {
      name: "Keuangan",
      summary:
        "Aplikasi keuangan pribadi yang dibangun ulang dari desain empat layar: grafik pengeluaran yang bisa dipilih per bulan, langganan yang bisa dijeda, transaksi yang tersaring per rekening, dan target tabungan yang menanggapi semuanya. Menjeda satu langganan menggeser angka di tiga layar lain.",
      thumbnailAlt:
        "Prototipe keuangan pada ponsel: kartu total pengeluaran dengan grafik dua garis, serta petak pemasukan dan pengeluaran.",
      lede: "Desain keuangan empat layar, dibangun ulang agar angkanya saling menanggapi. Pilih bulan pada grafik, jeda satu langganan, atau sisihkan uang ke target tabungan lalu lihat bagian lain aplikasi ikut bergerak.",
      sub: "Alih desain ketiga di cangkang perangkat yang sama — hanya palet dan datanya yang berbeda. Semuanya berjalan di peramban, jadi memuat ulang akan mengembalikan bulan awalnya.",
      notes: [
        {
          title: "Grafiknya adalah kendali, bukan gambar",
          body: "Empat bulan, dua deret data, digambar sebagai SVG langsung di halaman. Menyentuh sebuah bulan memindahkan penanda sekaligus menulis ulang angka Total Pengeluaran, petak pemasukan, dan petak pengeluaran di bawahnya.",
        },
        {
          title: "Menjeda langganan terasa tiga layar jauhnya",
          body: "Langganan ditambahkan di atas angka dasar tiap bulan, jadi menjeda Adobe menurunkan total pengeluaran dan beban di Beranda, memangkas tagihan mendatang, lalu muncul sebagai penghematan tertunda pada statistik Target.",
        },
        {
          title: "Target yang benar-benar bisa dicapai",
          body: "Menambah tabungan menggeser sisa persentase, titik tonggak, angka per hari, dan spanduk rentetan sekaligus, serta menuliskan transfernya ke daftar transaksi.",
        },
      ],
      attribution:
        "Desain asli: konsep aplikasi keuangan pribadi. Dibangun ulang sebagai latihan — tidak berafiliasi dengan pembuatnya. Saldo, merchant, dan paket langganan adalah rekaan.",
    },
    shop: {
      name: "Toko",
      summary:
        "Etalase fashion yang dibangun ulang dari desain tiga layar: korsel sorotan, kategori dan pencarian yang menyaring satu katalog, halaman produk dengan pilihan ukuran dan warna, serta keranjang yang bisa menambah, mengurangi, menghapus, dan menuntaskan pesanan. Foto produk diganti dengan ilustrasi SVG.",
      thumbnailAlt:
        "Prototipe toko pada ponsel: kartu sorotan Winter Deal di atas cip kategori dan deretan sepatu.",
      lede: "Etalase tiga layar, dibangun ulang menjadi toko yang benar-benar bisa dijalani dari awal sampai akhir: menjelajah atau mencari, memilih ukuran dan warna, memasukkan ke keranjang, berubah pikiran, lalu menuntaskan pesanan.",
      sub: "Alih desain keempat di cangkang perangkat yang sama. Foto produk diganti dengan ilustrasi SVG — lihat catatan terakhir di bawah.",
      notes: [
        {
          title: "Keranjang yang bisa salah",
          body: "Menambah ke keranjang akan ditolak bila ukuran belum dipilih, dan alasannya disebut; baris dengan jumlah satu mengubah tombol kurang menjadi hapus; menuntaskan pesanan mengosongkan keranjang dan melaporkan jumlah yang ditagih. Lencana di kepala halaman menghitung unit, bukan baris.",
        },
        {
          title: "Pencarian dan kategori saling menumpuk",
          body: "Cip kategori dan kolom pencarian menyaring daftar yang sama, bukan daftar masing-masing, jadi mencari di dalam Sepatu tetap menyempit di Sepatu dan pesan kosongnya menyebut keduanya.",
        },
        {
          title: "Digambar, bukan dipinjam",
          body: "Desain aslinya bersandar pada foto produk yang tidak saya punya lisensinya. Setiap busana di sini adalah ilustrasi SVG datar yang diwarnai mengikuti pilihan warna, jadi memilih warna langsung mengubah tampilan produk, gambar kecil di keranjang, dan cip kategorinya dari satu nilai yang sama.",
        },
      ],
      attribution:
        "Desain asli: konsep aplikasi belanja fashion. Dibangun ulang sebagai latihan — tidak berafiliasi dengan pembuatnya. Merek, produk, dan harga adalah rekaan.",
    },
  },

  meta: {
    home: {
      title: "Abdul Ghani — Back-end Engineer",
      description:
        "Portofolio Abdul Ghani, senior back-end engineer di Jakarta, APAC, yang membangun layanan REST dan GraphQL, infrastruktur cloud, dan CI/CD.",
    },
    portfolio: {
      title: "Karya — Abdul Ghani",
      description:
        "Karya interaktif Abdul Ghani: desain mobile yang dibangun ulang menjadi prototipe yang berfungsi.",
    },
  },

  errors: {
    notFound: "Halaman tidak ditemukan",
    notFoundDetail: "Halaman itu tidak ada di sini.",
    generic: "Terjadi kesalahan",
    genericDetail: "Ada kesalahan yang tidak terduga.",
    label: "Kesalahan",
    back: "← Kembali ke portofolio",
  },
};
