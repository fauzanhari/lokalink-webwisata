/* State & Seed Data for LokaLink Application */

const experiences = [
  {
    id: "fullmoon",
    title: "Full Moon Festival at Sade Village",
    category: "Culture",
    location: "Sade Village",
    rating: "4.9",
    price: 460000,
    duration: "3 hours",
    image: "assets/img/baunyale.jpg",
    host: "Rafi Maulana, 22",
    hostEmail: "host@lokallink.id",
    story:
      "I grew up around Sade and want visitors to experience the village beyond taking photos. During this small-group evening, I introduce local stories, traditional spaces, food, and the people who keep the community alive.",
    avatar: "https://i.pravatar.cc/120?img=33",
  },
  {
    id: "weaving",
    title: "Traditional Sasak Weaving",
    category: "Culture",
    location: "Sukarara Village",
    rating: "4.8",
    price: 320000,
    duration: "2.5 hours",
    image:
      "https://images.unsplash.com/photo-1606913079621-e64bd7a9a9d3?auto=format&fit=crop&w=900&q=85",
    host: "Ayu Lestari, 28",
    hostEmail: "ayu@lokallink.id",
    story:
      "Learn the meaning behind traditional patterns and try weaving with a local craft family.",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    id: "sunrise",
    title: "Sunrise Fishing with Locals",
    category: "Nature",
    location: "Tanjung Aan",
    rating: "4.9",
    price: 390000,
    duration: "3 hours",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    host: "Fajar Hadi, 25",
    hostEmail: "fajar@lokallink.id",
    story:
      "Start before sunrise and learn how local fishers read the coast, prepare the boat, and share the morning catch.",
    avatar: "https://i.pravatar.cc/120?img=11",
  },
  {
    id: "cooking",
    title: "Sasak Home Cooking Class",
    category: "Food",
    location: "Kuta Mandalika",
    rating: "4.8",
    price: 280000,
    duration: "2 hours",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=85",
    host: "Nur Aini, 41",
    hostEmail: "nur@lokallink.id",
    story:
      "Cook a simple Sasak meal inside a local family home and hear the stories behind the ingredients.",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
  {
    id: "village",
    title: "A Day in Local Village Life",
    category: "Community",
    location: "Rembitan",
    rating: "4.7",
    price: 350000,
    duration: "4 hours",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    host: "Dimas Pratama, 24",
    hostEmail: "dimas@lokallink.id",
    story:
      "Walk through daily life, meet local families, visit small businesses, and discover how the community works together.",
    avatar: "https://i.pravatar.cc/120?img=14",
  },
  {
    id: "hidden",
    title: "Hidden Beach & Village Trail",
    category: "Nature",
    location: "South Lombok",
    rating: "4.9",
    price: 420000,
    duration: "5 hours",
    image:
      "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=900&q=85",
    host: "Rizal Akbar, 26",
    hostEmail: "rizal@lokallink.id",
    story:
      "A small-group route through a quieter coastal landscape, local paths, and a community-run lunch stop.",
    avatar: "https://i.pravatar.cc/120?img=68",
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
    avatar: "https://i.pravatar.cc/100?img=33",
  },
  connector: {
    name: "Ahmad Pratama",
    email: "connector@lokallink.id",
    avatar: "https://i.pravatar.cc/100?img=12",
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
    title: "Full Moon Festival at Sade Village",
    experienceId: "fullmoon",
    date: "12 Oct 2026",
    time: "06:00 PM",
    guests: 2,
    price: 460000,
    total: 920000,
    status: "Pending",
    hostName: "Rafi Maulana",
    hostEmail: "host@lokallink.id",
    hostAvatar: "https://i.pravatar.cc/100?img=33",
    category: "Culture",
    location: "Sade Village, Lombok",
    duration: "4 hours",
  },
  {
    id: "demo-book-2",
    travelerName: "Alex Morgan",
    travelerEmail: "alex@lokallink.id",
    title: "Sasak Home Cooking Class",
    experienceId: "cooking",
    date: "16 Oct 2026",
    time: "02:00 PM",
    guests: 2,
    price: 280000,
    total: 560000,
    status: "Confirmed",
    hostName: "Rafi Maulana",
    hostEmail: "host@lokallink.id",
    hostAvatar: "https://i.pravatar.cc/100?img=33",
    category: "Food",
    location: "Central Lombok",
    duration: "3 hours",
  },
  {
    id: "demo-book-3",
    travelerName: "Sarah Lee",
    travelerEmail: "sarah@example.com",
    title: "Village Walk",
    experienceId: "village",
    date: "14 Oct 2026",
    time: "09:00 AM",
    guests: 3,
    price: 350000,
    total: 1050000,
    status: "Pending",
    hostName: "Rafi Maulana",
    hostEmail: "host@lokallink.id",
    hostAvatar: "https://i.pravatar.cc/100?img=33",
    category: "Culture",
    location: "Lombok",
    duration: "4 hours",
  },
];

let bookings = [];
