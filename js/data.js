/* State & Seed Data for LokaLink Application */

const experiences = [
  {
    id: "menenunsade",
    title: "Menenun Kain Songket Tradisional",
    category: "Pengalaman Lokal",
    type: "pengalaman",
    location: "Desa Adat Sade, Lombok Tengah",
    rating: "4.9",
    price: 320000,
    duration: "2.5 jam",
    image: "assets/img/desaadatsade.jpg",
    host: "Inaq Siti, 45 (Penun Sasak)",
    hostEmail: "host@lokallink.id",
    story:
      "Belajar seni menenun kain Songket Sasak yang diwariskan secara turun-temurun. Anda akan diajarkan langsung oleh ibu-ibu penenun wanita di Desa Sade dari menggulung benang hingga membentuk motif tenun tradisional.",
    avatar: "assets/img/host_rafi_maulana.png",
    highlights: [
      "Mencoba alat tenun kayu tradisional",
      "Membuat motif songket Sasak",
      "Oleh-oleh hasil karya sendiri",
    ],
  },
  {
    id: "baunyale",
    title: "Pengalaman Nelayan & Tradisi Bau Nyale",
    category: "Pengalaman Lokal",
    type: "pengalaman",
    location: "Pantai Seger, Kuta Lombok",
    rating: "4.9",
    price: 460000,
    duration: "4 jam",
    image: "assets/img/baunyale.jpg",
    host: "Pak Kamaruddin, 48 (Nelayan Lokal)",
    hostEmail: "baiq@lokallink.id",
    story:
      "Bergabung bersama nelayan lokal melaut di subuh hari dan merasakan kehangatan tradisi Bau Nyale. Dipandu warga pesisir yang memahami pasang surut laut dan kisah legenda Putri Mandalika.",
    avatar: "assets/img/host_baiq_erwina.png",
    highlights: [
      "Melaut dengan perahu kayu nelayan",
      "Belajar teknik menjala Nyale",
      "Menikmati hasil tangkapan laut segar",
    ],
  },
  {
    id: "bertaniende",
    title: "Bertani & Olah Tani Tradisional",
    category: "Pengalaman Lokal",
    type: "pengalaman",
    location: "Desa Ende, Lombok Tengah",
    rating: "4.8",
    price: 280000,
    duration: "3 jam",
    image: "assets/img/desaadatende.jpg",
    host: "Pak Nur Aini, 52 (Petani Sasak)",
    hostEmail: "nur@lokallink.id",
    story:
      "Rasakan kehidupan agraris masyarakat lokal Lombok. Ikut turun ke sawah bertani secara tradisional, memetik hasil perkebunan warga, serta memasak hidangan lokal bersama keluarga petani.",
    avatar: "assets/img/host_nur_aini.png",
    highlights: [
      "Turun ke sawah bertani tradisional",
      "Memetik rempah & sayur lokal",
      "Memasak makanan Sasak autentik",
    ],
  },
  {
    id: "gendangbeleq",
    title: "Belajar Musik Gendang Beleq & Nyongkolan",
    category: "Pengalaman Lokal",
    type: "pengalaman",
    location: "Desa Adat Rembitan, Lombok",
    rating: "4.8",
    price: 300000,
    duration: "3 jam",
    image: "assets/img/nyongkolan.webp",
    host: "Ayu Lestari, 28 (Pegiat Budaya)",
    hostEmail: "ayu@lokallink.id",
    story:
      "Mengenal instrumen musik perkusi raksasa Sasak 'Gendang Beleq'. Anda akan belajar memainkan ritme musik adat Sasak dan mengenakan pakaian adat Lambung/Tegodek khas Lombok.",
    avatar: "assets/img/host_ayu_lestari.png",
    highlights: [
      "Latihan memukul Gendang Beleq",
      "Mencoba pakaian adat Sasak",
      "Foto sesi di rumah adat",
    ],
  },
  {
    id: "pantaiseger",
    title: "Pantai Seger Mandalika",
    category: "Destinasi Wisata",
    type: "wisata",
    location: "Pantai Seger, Mandalika, Lombok Tengah",
    rating: "4.9",
    price: 0,
    duration: "Bebas berkunjung",
    image: "assets/img/pantaiseger.jpeg",
    host: "Destinasi Wisata Alam",
    story:
      "Pantai Seger terkenal dengan hamparan pasir putih bertekstur merica, air laut jernih, dan patung ikonik Putri Mandalika. Pengunjung dapat menikmati keindahan pantai ini kapan saja tanpa perlu membooking host.",
    avatar: "assets/img/pantaiseger.jpeg",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Pantai+Seger+Mandalika+Lombok",
    highlights: [
      "Patung Ikonik Putri Mandalika",
      "Pasir Merica Khas Mandalika",
      "Spot Sunset & Bukit Karang",
    ],
  },
  {
    id: "bukitmerese",
    title: "Bukit Merese Sunset Spot",
    category: "Destinasi Wisata",
    type: "wisata",
    location: "Bukit Merese, Mandalika, Lombok Tengah",
    rating: "4.9",
    price: 0,
    duration: "Bebas berkunjung",
    image: "assets/img/bukitmerese.jpg",
    host: "Destinasi Wisata Alam",
    story:
      "Bukit Merese menyuguhkan pemandangan sunset panorama 360 derajat terbaik di Lombok. Nikmati pemandangan tebing samudera dan bukit rumput hijau nan megah tanpa pemesanan host.",
    avatar: "assets/img/bukitmerese.jpg",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bukit+Merese+Mandalika+Lombok",
    highlights: [
      "Sunset Panorama 360°",
      "Trekking Ringan 10 Menit",
      "Spot Foto Tebing Laut",
    ],
  },
  {
    id: "kutamandalika",
    title: "Pantai Kuta Mandalika",
    category: "Destinasi Wisata",
    type: "wisata",
    location: "Kuta Beach, Mandalika, Lombok Tengah",
    rating: "4.8",
    price: 0,
    duration: "Bebas berkunjung",
    image: "assets/img/kutamandalika.jpg",
    host: "Destinasi Wisata Pantai",
    story:
      "Pusat pantai Mandalika dengan pedestrian modern, pesisir pasir putih merica yang terbentang luas, serta dekat dengan beragam pusat kuliner lokal.",
    avatar: "assets/img/kutamandalika.jpg",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Pantai+Kuta+Mandalika+Lombok",
    highlights: [
      "Pedestrian & Promenade Pantai",
      "Pasir Merica Mandalika",
      "Dekat Sirkuit Mandalika",
    ],
  },
  {
    id: "bukitseger",
    title: "Bukit Seger & View Sirkuit Mandalika",
    category: "Destinasi Wisata",
    type: "wisata",
    location: "Bukit Seger, Mandalika, Lombok Tengah",
    rating: "4.7",
    price: 0,
    duration: "Bebas berkunjung",
    image: "assets/img/bukitseger.jpg",
    host: "Destinasi Wisata Alam",
    story:
      "Bukit Seger berada persis di depan tikungan Sirkuit Internasional Mandalika. Tempat sempurna untuk menikmati pemandangan laut sekaligus lintasan balap dari atas bukit.",
    avatar: "assets/img/bukitseger.jpg",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bukit+Seger+Mandalika+Lombok",
    highlights: [
      "View Tikungan Sirkuit Mandalika",
      "Pemandangan Laut Seger",
      "Trekking Perbukitan",
    ],
  },
];

let activeCategory = "All";
let discoverCategory = "All";
let currentExperience = experiences[0];
let currentDetailId = experiences[0].id;
let guestCount = 2;
let pendingBooking = null;

let authRole = "traveler";
let currentUser = {
  traveler: {
    name: "Fauzan Hari",
    email: "alex@lokallink.id",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  host: {
    name: "Rafi Maulana",
    email: "host@lokallink.id",
    avatar: "assets/img/host_rafi_maulana.png",
  },
};

const travelerNav = [
  [
    "home",
    "Home",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"/></svg>',
  ],
  [
    "discover",
    "Explore",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4M11 8v6M8 11h6"/></svg>',
  ],
  [
    "bookings",
    "Bookings",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',
  ],
  [
    "impact",
    "Impact",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="9"/><path d="M8 14c1.2 1.2 2.4 1.8 4 1.8 1.7 0 3-.7 4-2M9 9h.01M15 9h.01"/></svg>',
  ],
  [
    "profile",
    "Profile",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4.2 3.2-6.3 8-6.3s7.3 2.1 8 6.3"/></svg>',
  ],
];

const hostNav = [
  [
    "hostDashboard",
    "Dashboard",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
  ],
  [
    "hostExperiences",
    "Experiences",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 19V5M4 19h16"/><path d="m7 15 4-5 3 3 5-7"/></svg>',
  ],
  [
    "hostBookings",
    "Bookings",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',
  ],
  [
    "hostImpact",
    "Impact",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="9"/><path d="M7 15h10M9 12h6M11 9h2"/></svg>',
  ],
  [
    "profile",
    "Profile",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4.2 3.2-6.3 8-6.3s7.3 2.1 8 6.3"/></svg>',
  ],
];

const connectorNav = [
  [
    "connectorDashboard",
    "Dashboard",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
  ],
  [
    "connectorRequests",
    "Requests",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 5h16v12H7l-3 3V5Z"/><path d="M8 9h8M8 13h5"/></svg>',
  ],
  [
    "connectorConnections",
    "Connections",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="16" r="3"/><path d="m10.5 10.5 3 3M16 5v4M12 7h8"/></svg>',
  ],
  [
    "connectorHosts",
    "Local Hosts",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="8" r="3"/><path d="M5 20c.8-4 3.1-6 7-6s6.2 2 7 6"/><path d="M19 4v4M17 6h4"/></svg>',
  ],
  [
    "connectorImpact",
    "Impact",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 19V5M4 19h16"/><path d="m7 15 3-4 3 2 5-6"/></svg>',
  ],
  [
    "profile",
    "Profile",
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4.2 3.2-6.3 8-6.3s7.3 2.1 8 6.3"/></svg>',
  ],
];

const savedKey = "lokallink_saved_experiences";
const profileKey = "lokallink_profiles";
const expKey = "lokallink_host_experiences";
const bookingStoreKey = "lokallink_booking_records_v2";
const connectorProfileKey = "lokallink_connector_profile";
const connectorRequestsKey = "lokallink_connector_requests";
const assistedHostsKey = "lokallink_assisted_hosts";

let uiLanguage = localStorage.getItem("lokallink_language") || "en";
let savedExperiences = JSON.parse(localStorage.getItem(savedKey) || "[]");
let hostExperiences = JSON.parse(localStorage.getItem(expKey) || "[]");

const translations = {
  en: {
    home: "Home",
    explore: "Explore",
    bookings: "Bookings",
    impact: "Impact",
    profile: "Profile",
    dashboard: "Dashboard",
    experiences: "Experiences",
    saved: "Saved Experiences",
    savedSub: "Your collection of experiences you want to revisit.",
    language: "Language",
    logout: "Log out",
    edit: "Edit Profile",
    myExperiences: "My Experiences",
    viewAll: "View all",
    manage: "Manage",
    seeAll: "See all",
    addExperience: "Add Experience",
  },
  id: {
    home: "Beranda",
    explore: "Jelajahi",
    bookings: "Pesanan",
    impact: "Dampak",
    profile: "Profil",
    dashboard: "Dashboard",
    experiences: "Pengalaman",
    saved: "Pengalaman Tersimpan",
    savedSub: "Kumpulan pengalaman yang ingin kamu kunjungi kembali.",
    language: "Bahasa",
    logout: "Keluar",
    edit: "Edit Profil",
    myExperiences: "Pengalaman Saya",
    viewAll: "Lihat semua",
    manage: "Kelola",
    seeAll: "Lihat semua",
    addExperience: "Tambah Pengalaman",
  },
};

const bookingSeed = [
  {
    id: "demo-book-1",
    travelerName: "Fauzan Hari",
    travelerEmail: "alex@lokallink.id",
    title: "Bau Nyale Festival",
    experienceId: "baunyale",
    date: "12 Oct 2026",
    time: "06:00 PM",
    guests: 2,
    price: 460000,
    total: 920000,
    status: "Pending",
    hostName: "Baiq Erwina",
    hostEmail: "baiq@lokallink.id",
    hostAvatar: "assets/img/host_baiq_erwina.png",
    category: "Culture",
    location: "Pantai Seger, Kuta Lombok",
    duration: "4 hours",
  },
  {
    id: "demo-book-2",
    travelerName: "Fauzan Hari",
    travelerEmail: "alex@lokallink.id",
    title: "Desa Adat Sade Village Walk",
    experienceId: "desasade",
    date: "16 Oct 2026",
    time: "09:00 AM",
    guests: 2,
    price: 320000,
    total: 640000,
    status: "Confirmed",
    hostName: "Rafi Maulana",
    hostEmail: "host@lokallink.id",
    hostAvatar: "assets/img/host_rafi_maulana.png",
    category: "Culture",
    location: "Desa Sade, Rembitan, Lombok Tengah",
    duration: "2.5 hours",
  },
  {
    id: "demo-book-3",
    travelerName: "Sarah Lee",
    travelerEmail: "sarah@example.com",
    title: "Bukit Merese Sunset Hike",
    experienceId: "bukitmerese",
    date: "14 Oct 2026",
    time: "04:30 PM",
    guests: 3,
    price: 390000,
    total: 1170000,
    status: "Pending",
    hostName: "Rizal Akbar",
    hostEmail: "rizal@lokallink.id",
    hostAvatar: "assets/img/host_rizal_akbar.png",
    category: "Nature",
    location: "Bukit Merese, Mandalika",
    duration: "2.5 hours",
  },
];

let bookings = [];
