/* State & Seed Data for LokaLink Application */

const experiences = [
  {
    id: "baunyale",
    title: "Bau Nyale Festival",
    category: "Culture",
    location: "Pantai Seger, Kuta Lombok",
    rating: "4.9",
    price: 460000,
    duration: "4 hours",
    image: "assets/img/baunyale.jpg",
    host: "Baiq Erwina, 20",
    hostEmail: "baiq@lokallink.id",
    story:
      "Bau Nyale is our most sacred annual festival, rooted in the legend of Princess Mandalika who sacrificed herself into the sea to bring peace among warring princes. Every year around February or March, thousands gather at Seger Beach at dawn to catch the colorful Nyale sea worms — believed to be her reincarnation. Join us for traditional Presean stick fighting, Sasak poetry, and the magical moment when the Nyale appear from the coral reefs at first light.",
    avatar: "assets/img/host_baiq_erwina.png",
  },
  {
    id: "desasade",
    title: "Desa Adat Sade Village Walk",
    category: "Culture",
    location: "Desa Sade, Rembitan, Lombok Tengah",
    rating: "4.8",
    price: 320000,
    duration: "2.5 hours",
    image: "assets/img/desaadatsade.jpg",
    host: "Rafi Maulana, 22",
    hostEmail: "host@lokallink.id",
    story:
      "Sade is a living museum of the Sasak people where around 700 residents preserve ancestral traditions untouched by modernization. Walk among the iconic Bale Tani houses with mountain-shaped thatched roofs made from alang-alang grass and woven bamboo walls. Watch our women demonstrate the art of Songket weaving — a skill every girl must master before marriage. Learn about our unique Merariq elopement tradition and the philosophy behind our communal way of life.",
    avatar: "assets/img/host_rafi_maulana.png",
  },
  {
    id: "pantaiseger",
    title: "Pantai Seger Beach Experience",
    category: "Nature",
    location: "Pantai Seger, Mandalika",
    rating: "4.9",
    price: 350000,
    duration: "3 hours",
    image: "assets/img/pantaiseger.jpeg",
    host: "Fajar Hadi, 25",
    hostEmail: "fajar@lokallink.id",
    story:
      "Pantai Seger is where the legend of Princess Mandalika comes alive — the iconic statue of the princess stands near the shore where she leapt into the sea. This beach features pristine white sand with unique peppercorn-like texture, crystal-clear turquoise water, and dramatic green hills framing the coastline. It's also a world-class surfing spot with challenging waves, especially from July to August. Walk along the cliffs, discover the Mandalika Circuit views, and feel the mystical energy of this legendary shore.",
    avatar: "assets/img/host_fajar_hadi.png",
  },
  {
    id: "desaende",
    title: "Desa Adat Ende Cultural Tour",
    category: "Community",
    location: "Desa Ende, Sengkol, Lombok Tengah",
    rating: "4.7",
    price: 280000,
    duration: "2 hours",
    image: "assets/img/desaadatende.jpg",
    host: "Nur Aini, 41",
    hostEmail: "nur@lokallink.id",
    story:
      "Desa Ende is a quieter, more intimate alternative to Sade — home to about 30 families who preserve authentic Sasak daily life. Experience our traditional Bale Tani houses with their low doorways designed so visitors must bow upon entering as a sign of respect. Watch Peresean martial arts with rattan sticks and buffalo-hide shields, listen to the rhythms of Gendang Beleq drums, and see our women weave intricate Songket fabrics. The floors of our homes are made from a mixture of clay and cow dung — a tradition that naturally repels insects and keeps homes cool.",
    avatar: "assets/img/host_nur_aini.png",
  },
  {
    id: "bukitmerese",
    title: "Bukit Merese Sunset Hike",
    category: "Nature",
    location: "Bukit Merese, Mandalika",
    rating: "4.9",
    price: 390000,
    duration: "2.5 hours",
    image: "assets/img/bukitmerese.jpg",
    host: "Rizal Akbar, 26",
    hostEmail: "rizal@lokallink.id",
    story:
      "Bukit Merese is widely considered the best sunset viewpoint in all of Lombok. This grassy headland offers a breathtaking 360-degree panorama — Tanjung Aan's crescent white sands to the east, the surfing breaks of Seger and Serenting beaches to the west, and the vast Indian Ocean stretching to the south. The short 10-minute hike through rolling emerald-green hills — where local cattle and buffalo graze — leads to an unforgettable golden hour as the sky transforms into vivid hues of orange, pink, and red.",
    avatar: "assets/img/host_rizal_akbar.png",
  },
  {
    id: "kutamandalika",
    title: "Kuta Mandalika Beach Day",
    category: "Nature",
    location: "Kuta Beach, Mandalika",
    rating: "4.8",
    price: 420000,
    duration: "5 hours",
    image: "assets/img/kutamandalika.jpg",
    host: "Dimas Pratama, 24",
    hostEmail: "dimas@lokallink.id",
    story:
      "Kuta Mandalika was once a quiet fishing village, now the heart of Lombok's premier coastal tourism zone. Famous for its distinctive 'pepper sand' — creamy-brown, round grains that feel unique underfoot — this long stretch of coastline is framed by lush green rugged hills and turquoise waters. Experience world-class surfing at nearby Gerupuk and Tanjung Aan breaks, visit the Mandalika International Circuit that hosts MotoGP, explore traditional Sasak villages nearby, and soak in the laid-back, serene atmosphere that defines South Lombok.",
    avatar: "assets/img/host_dimas_pratama.png",
  },
  {
    id: "nyongkolan",
    title: "Nyongkolan Wedding Procession",
    category: "Culture",
    location: "Various Villages, Lombok",
    rating: "4.8",
    price: 300000,
    duration: "3 hours",
    image: "assets/img/nyongkolan.webp",
    host: "Ayu Lestari, 28",
    hostEmail: "ayu@lokallink.id",
    story:
      "Nyongkolan is the grand wedding procession of the Sasak people — a vibrant public celebration where the newlywed couple is paraded from the groom's home to the bride's family. The couple is treated like royalty (Datu and Putri), walking under ceremonial umbrellas while accompanied by the thunderous rhythm of Gendang Beleq large drums. Participants wear traditional Sasak clothing — women in Lambung kebaya with Songket sarongs, men in Tegodek jackets with Sapuk headpieces. It's a powerful symbol of unity that strengthens bonds between families and communities.",
    avatar: "assets/img/host_ayu_lestari.png",
  },
  {
    id: "bukitseger",
    title: "Bukit Seger Hilltop & Legend",
    category: "Community",
    location: "Bukit Seger, Mandalika",
    rating: "4.7",
    price: 350000,
    duration: "3 hours",
    image: "assets/img/bukitseger.jpg",
    host: "Ahmad Pratama, 23",
    hostEmail: "ahmad@lokallink.id",
    story:
      "Bukit Seger is the sacred hilltop where Princess Mandalika delivered her final message before sacrificing herself into the sea. This site offers stunning 360-degree panoramas of the ocean, white-sand beaches, and green rolling hills. From the top, you can also see the iconic turns of the Pertamina Mandalika International Street Circuit. Visit the statue of Princess Mandalika at nearby Pantai Seger, learn about the ancient legend that inspired the annual Bau Nyale tradition, and connect with the deep spiritual significance this place holds for the Sasak people.",
    avatar: "assets/img/connector_ahmad_pratama.png",
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
    name: "Alex Morgan",
    email: "alex@lokallink.id",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  host: {
    name: "Rafi Maulana",
    email: "host@lokallink.id",
    avatar: "assets/img/host_rafi_maulana.png",
  },
  connector: {
    name: "Ahmad Pratama",
    email: "connector@lokallink.id",
    avatar: "assets/img/connector_ahmad_pratama.png",
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
    travelerName: "Alex Morgan",
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
    travelerName: "Alex Morgan",
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
