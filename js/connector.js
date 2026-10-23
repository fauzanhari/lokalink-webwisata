/* Youth Local Connector Ecosystem & Multi-Account Management */

function getAssistedHosts() {
  const stored = localStorage.getItem(assistedHostsKey);
  if (!stored) {
    const defaultHosts = [
      {
        id: "host-inaq-siti",
        name: "Inaq Siti",
        age: 45,
        phone: "0878-1122-3344",
        village: "Desa Adat Sade, Lombok Tengah",
        occupation: "Penenun Songket Sasak",
        avatar: "assets/img/host_baiq_erwina.png",
        experienceId: "menenunsade",
        experienceTitle: "Menenun Kain Songket Tradisional",
        price: 320000,
        duration: "2.5 jam",
        bookingsCount: 12,
        totalRevenue: 3840000,
        hostShare: 3264000, // 85%
        connectorShare: 576000, // 15%
        cashStatus: "Disalurkan Tunai",
        status: "Aktif Terverifikasi",
        mandateSigned: true,
        connector: "Ahmad Pratama",
        createdAt: "2026-09-01T08:00:00Z"
      },
      {
        id: "host-kamaruddin",
        name: "Pak Kamaruddin",
        age: 48,
        phone: "0852-9988-7766",
        village: "Pantai Seger, Kuta Lombok",
        occupation: "Nelayan Tradisi Bau Nyale",
        avatar: "assets/img/host_fajar_hadi.png",
        experienceId: "baunyale",
        experienceTitle: "Pengalaman Nelayan & Tradisi Bau Nyale",
        price: 460000,
        duration: "4 jam",
        bookingsCount: 18,
        totalRevenue: 8280000,
        hostShare: 7038000, // 85%
        connectorShare: 1242000, // 15%
        cashStatus: "Disalurkan Tunai",
        status: "Aktif Terverifikasi",
        mandateSigned: true,
        connector: "Ahmad Pratama",
        createdAt: "2026-09-05T09:30:00Z"
      },
      {
        id: "host-nur-aini",
        name: "Nur Aini",
        age: 52,
        phone: "0813-4455-6677",
        village: "Desa Ende, Lombok Tengah",
        occupation: "Petani Sasak & Olah Pangan Lokal",
        avatar: "assets/img/host_nur_aini.png",
        experienceId: "bertaniende",
        experienceTitle: "Bertani & Olah Tani Tradisional",
        price: 280000,
        duration: "3 jam",
        bookingsCount: 9,
        totalRevenue: 2520000,
        hostShare: 2142000, // 85%
        connectorShare: 378000, // 15%
        cashStatus: "Menunggu Penyaluran",
        status: "Aktif Terverifikasi",
        mandateSigned: true,
        connector: "Ahmad Pratama",
        createdAt: "2026-09-12T14:15:00Z"
      }
    ];
    localStorage.setItem(assistedHostsKey, JSON.stringify(defaultHosts));
    return defaultHosts;
  }
  return JSON.parse(stored);
}

function saveAssistedHosts(list) {
  localStorage.setItem(assistedHostsKey, JSON.stringify(list));
}

function connectorUser() {
  return currentUser.connector;
}

/* ── Multi-Account Delegation: Switch Account & Impersonation ── */

function switchAccountToHost(hostId) {
  const hosts = getAssistedHosts();
  const targetHost = hosts.find(h => h.id === hostId);
  if (!targetHost) {
    showToast('Data host tidak ditemukan.');
    return;
  }

  // Simpan data impersonasi di localStorage
  localStorage.setItem('lokallink_impersonating_host', JSON.stringify(targetHost));
  authRole = 'host';
  localStorage.setItem('lokallink_role', 'host');

  applyRoleUI();
  updateImpersonationBanner();
  goTo('hostDashboard');

  showToast(`Beralih ke akun ${targetHost.name}. Anda bertindak atas nama host.`);
}

function exitHostImpersonation() {
  localStorage.removeItem('lokallink_impersonating_host');
  authRole = 'connector';
  localStorage.setItem('lokallink_role', 'connector');

  applyRoleUI();
  updateImpersonationBanner();
  goTo('connectorDashboard');

  showToast('Kembali ke akun Youth Local Connector.');
}

function updateImpersonationBanner() {
  const imp = typeof getImpersonatedHost === 'function' ? getImpersonatedHost() : null;
  const banner = document.getElementById('impersonationBanner');
  const nameEl = document.getElementById('impersonationHostName');
  const welcomeEl = document.querySelector('#hostDashboard .welcome-row h1');

  if (banner) {
    if (imp) {
      banner.style.display = 'block';
      if (nameEl) nameEl.textContent = imp.name;
    } else {
      banner.style.display = 'none';
    }
  }

  if (welcomeEl) {
    if (imp) {
      welcomeEl.textContent = `Good Day, Ahmad Pratama 👋 (Mewakili ${imp.name})`;
    } else {
      welcomeEl.textContent = 'Good Morning, Mr Host 👋';
    }
  }
}

/* ── Modal Registration for New Host by Connector ── */

function openRegisterHostModal() {
  const modal = document.getElementById('connectorRegisterHostModal');
  if (modal) modal.classList.add('open');
}

function closeRegisterHostModal() {
  const modal = document.getElementById('connectorRegisterHostModal');
  if (modal) modal.classList.remove('open');
}

function submitRegisterHostByConnector() {
  const name = document.getElementById('regHostName')?.value.trim();
  const age = document.getElementById('regHostAge')?.value.trim();
  const phone = document.getElementById('regHostPhone')?.value.trim();
  const village = document.getElementById('regHostVillage')?.value.trim();
  const occupation = document.getElementById('regHostOccupation')?.value.trim();
  const expTitle = document.getElementById('regHostExpTitle')?.value.trim();
  const expCategory = document.getElementById('regHostExpCategory')?.value || 'Pengalaman Lokal';
  const expPrice = Number(document.getElementById('regHostExpPrice')?.value);
  const expDuration = document.getElementById('regHostExpDuration')?.value.trim() || '2.5 jam';
  const expStory = document.getElementById('regHostExpStory')?.value.trim();
  const consent = document.getElementById('regHostConsent')?.checked;

  if (!name || !age || !phone || !village || !occupation || !expTitle || !expPrice || !expStory) {
    showToast('Lengkapi semua kolom formulir pendaftaran host.');
    return;
  }

  if (!consent) {
    showToast('Harap centang konfirmasi persetujuan lisan pendampingan host.');
    return;
  }

  const hostId = 'host-' + Date.now();
  const expId = 'exp-' + Date.now();
  const avatarList = [
    'assets/img/host_dimas_pratama.png',
    'assets/img/host_rizal_akbar.png',
    'assets/img/host_ayu_lestari.png',
    'assets/img/host_baiq_erwina.png'
  ];
  const chosenAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];

  // 1. Buat object host binaan baru
  const newHost = {
    id: hostId,
    name: name,
    age: Number(age),
    phone: phone,
    village: village,
    occupation: occupation,
    avatar: chosenAvatar,
    experienceId: expId,
    experienceTitle: expTitle,
    price: expPrice,
    duration: expDuration,
    bookingsCount: 0,
    totalRevenue: 0,
    hostShare: 0,
    connectorShare: 0,
    cashStatus: "Belum Ada Transaksi",
    status: "Aktif Terverifikasi",
    mandateSigned: true,
    connector: currentUser.connector.name,
    createdAt: new Date().toISOString()
  };

  const hosts = getAssistedHosts();
  hosts.unshift(newHost);
  saveAssistedHosts(hosts);

  // 2. Buat listing pengalaman baru agar langsung muncul dan bisa dibooking oleh traveler
  const newExp = {
    id: expId,
    title: expTitle,
    category: expCategory,
    type: expCategory === 'Destinasi Wisata' ? 'wisata' : 'pengalaman',
    location: village,
    rating: 'Baru',
    price: expCategory === 'Destinasi Wisata' ? 0 : expPrice,
    duration: expDuration,
    image: 'assets/img/desaadatende.jpg',
    host: `${name}, ${age} (${occupation})`,
    hostEmail: `${hostId}@lokallink.id`,
    story: expStory,
    avatar: chosenAvatar,
    highlights: [
      'Didampingi langsung oleh pengrajin/tetua lokal',
      'Pengalaman autentik berbasis kearifan lokal',
      '100% mendukung ekonomi warga desa'
    ]
  };

  experiences.push(newExp);
  hostExperiences.push(newExp);
  localStorage.setItem(expKey, JSON.stringify(hostExperiences));

  // Reset formulir
  [
    'regHostName', 'regHostAge', 'regHostPhone', 'regHostVillage',
    'regHostOccupation', 'regHostExpTitle', 'regHostExpPrice',
    'regHostExpDuration', 'regHostExpStory'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const consentBox = document.getElementById('regHostConsent');
  if (consentBox) consentBox.checked = false;

  closeRegisterHostModal();

  renderConnectorDashboard();
  renderConnectorHosts();
  renderConnectorEarnings();

  showToast(`Host ${name} berhasil didaftarkan! Akun siap dikelola.`);
}

/* ── Render Screens for Youth Local Connector ── */

function renderConnectorDashboard() {
  const root = document.getElementById('connectorDashboard');
  if (!root) return;

  const hosts = getAssistedHosts();
  const totalBookings = hosts.reduce((acc, h) => acc + (h.bookingsCount || 0), 0);
  const totalRev = hosts.reduce((acc, h) => acc + (h.totalRevenue || 0), 0);
  const totalConnCommission = hosts.reduce((acc, h) => acc + (h.connectorShare || 0), 0);

  root.innerHTML = `
    <div class="dashboard-wrap">
      <div class="welcome-row">
        <div>
          <span style="font-size:9.5px;color:var(--accent);font-weight:800;letter-spacing:0.08em;text-transform:uppercase;">
            Youth Local Connector Hub
          </span>
          <h1 style="margin-top:4px">Halo, ${escapeHtml(currentUser.connector.name)} 👋</h1>
          <p>Mendampingi & mengelola akun host lokal Lombok yang membutuhkan dukungan digital.</p>
        </div>
        <button class="icon-btn" onclick="showToast('Sistem sinkronisasi akun host aktif.')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/>
            <path d="M10 21h4"/>
          </svg>
        </button>
      </div>

      <div class="connector-stat-grid">
        <div class="connector-stat">
          <span>Host Binaan</span>
          <strong>${hosts.length} Host</strong>
          <small>Didampingi penuh</small>
        </div>
        <div class="connector-stat">
          <span>Total Pemesanan</span>
          <strong>${totalBookings} Booking</strong>
          <small>Dikelola atas nama host</small>
        </div>
        <div class="connector-stat">
          <span>Omset Dihasilkan</span>
          <strong>${formatIDR(totalRev)}</strong>
          <small>85% disalurkan ke host</small>
        </div>
        <div class="connector-stat">
          <span>Komisi Pendamping (15%)</span>
          <strong style="color:var(--accent)">${formatIDR(totalConnCommission)}</strong>
          <small>Insentif digitalisasi pemuda</small>
        </div>
      </div>

      <div class="dashboard-card" style="margin-top:16px">
        <div class="section-head" style="padding:0;margin:0 0 12px">
          <div>
            <h3 style="margin:0">Aksi Cepat Multi-Akun</h3>
            <p style="font-size:10px;color:var(--muted);margin:3px 0 0">Kelola akun binaan atau daftarkan warga baru.</p>
          </div>
          <button class="btn btn-primary" style="font-size:10px;min-height:34px;padding:6px 14px" onclick="openRegisterHostModal()">
            + Daftarkan Host Baru
          </button>
        </div>

        <div class="host-action-grid">
          <button class="action-tile" onclick="openRegisterHostModal()">
            <div class="tile-icon">＋</div>
            <strong>Daftarkan Host</strong>
            <span>Bantu host gaptek mendaftar.</span>
          </button>
          <button class="action-tile" onclick="goTo('connectorHosts')">
            <div class="tile-icon">👥</div>
            <strong>Host Binaan</strong>
            <span>Pilih akun host untuk dikelola.</span>
          </button>
          <button class="action-tile" onclick="goTo('connectorEarnings')">
            <div class="tile-icon">Rp</div>
            <strong>Bagi Hasil 15%</strong>
            <span>Pantau komisi & penyaluran.</span>
          </button>
          <button class="action-tile" onclick="switchAccountToHost('${hosts[0]?.id || ''}')">
            <div class="tile-icon">⚡</div>
            <strong>Kelola Inaq Siti</strong>
            <span>Switch langsung ke akun host.</span>
          </button>
        </div>
      </div>

      <div class="dashboard-card" style="margin-top:16px">
        <div class="section-head" style="padding:0;margin:0 0 12px">
          <h3 style="margin:0">Host Binaan Anda (Multi-Account Switch)</h3>
          <button class="see-all" onclick="goTo('connectorHosts')">Lihat Semua</button>
        </div>
        <p style="font-size:10.5px;color:var(--muted);margin-bottom:12px;line-height:1.5">
          Klik tombol <strong>"Kelola Akun Host"</strong> untuk bertindak sebagai host tersebut (menerima pesanan, mengatur listing, dan merespon jadwal).
        </p>

        <div id="connectorRecentHostsList">
          ${hosts.slice(0, 3).map(h => `
            <div class="connector-host-card">
              <div class="connector-host-header">
                <img src="${escapeAttr(h.avatar)}" alt="${escapeAttr(h.name)}" class="connector-host-avatar" />
                <div class="connector-host-info">
                  <div class="connector-host-title-row">
                    <h3>${escapeHtml(h.name)} (${h.age} th)</h3>
                    <span class="connector-status">${escapeHtml(h.status)}</span>
                  </div>
                  <p>${escapeHtml(h.occupation)} · ${escapeHtml(h.village)}</p>
                  <p style="margin-top:2px"><strong>${escapeHtml(h.experienceTitle)}</strong> (${formatIDR(h.price)})</p>
                </div>
              </div>

              <div class="connector-host-stats">
                <div class="connector-mini-stat">
                  <span>Pemesanan</span>
                  <strong>${h.bookingsCount || 0} Booking</strong>
                </div>
                <div class="connector-mini-stat">
                  <span>Hak Host (85%)</span>
                  <strong style="color:#2F7D55">${formatIDR(h.hostShare || 0)}</strong>
                </div>
                <div class="connector-mini-stat stat-highlight">
                  <span>Komisi Anda (15%)</span>
                  <strong style="color:var(--accent)">${formatIDR(h.connectorShare || 0)}</strong>
                </div>
              </div>

              <div class="connector-host-actions">
                <button class="btn-manage-host" onclick="switchAccountToHost('${escapeAttr(h.id)}')">
                  ⚡ Masuk & Kelola Akun Host Ini
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="mission-card">
        <h4>💡 Peran Solutif Youth Local Connector</h4>
        <p>
          Banyak tetua adat, ibu-ibu penenun, dan nelayan tradisional di Lombok memiliki keahlian budaya yang luar biasa namun memiliki keterbatasan literasi digital atau ketiadaan smartphone.
          <strong>Youth Local Connector</strong> hadir sebagai jembatan: mendaftarkan host, mengelola listing pengalaman, memproses pemesanan, dan menyalurkan hasil pembayaran secara tunai kepada host.
        </p>
      </div>
    </div>
  `;
}

function renderConnectorHosts() {
  const root = document.getElementById('connectorHosts');
  if (!root) return;

  const hosts = getAssistedHosts();

  root.innerHTML = `
    <div class="dashboard-wrap">
      <div class="welcome-row">
        <div>
          <h1 style="margin-top:6px">Daftar Host Binaan</h1>
          <p>Kelola banyak akun host lokal dalam satu kendali terpusat.</p>
        </div>
        <button class="btn btn-primary" style="font-size:10px;min-height:36px;padding:6px 14px" onclick="openRegisterHostModal()">
          + Daftarkan Host Baru
        </button>
      </div>

      <div style="margin-top:14px">
        ${hosts.length ? hosts.map(h => `
          <div class="connector-host-card">
            <div class="connector-host-header">
              <img src="${escapeAttr(h.avatar)}" alt="${escapeAttr(h.name)}" class="connector-host-avatar" />
              <div class="connector-host-info">
                <div class="connector-host-title-row">
                  <h3 style="font-size:15px;margin:0">${escapeHtml(h.name)} (${h.age} th)</h3>
                  <span class="connector-status">${escapeHtml(h.status)}</span>
                </div>
                <p>${escapeHtml(h.occupation)} · ${escapeHtml(h.village)}</p>
              </div>
            </div>

            <div style="background:#FAF7F4;border-radius:12px;padding:10px 12px;margin:8px 0">
              <span style="font-size:8px;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em">Pengalaman yang Ditawarkan</span>
              <h4 style="font-size:12.5px;margin:3px 0 2px">${escapeHtml(h.experienceTitle)}</h4>
              <p style="font-size:10.5px;color:var(--muted);margin:0">Tarif: <strong>${formatIDR(h.price)}</strong> / orang · Durasi: ${escapeHtml(h.duration || '2-3 jam')}</p>
            </div>

            <div class="connector-host-stats">
              <div class="connector-mini-stat">
                <span>Total Booking</span>
                <strong>${h.bookingsCount || 0} Tamu</strong>
              </div>
              <div class="connector-mini-stat">
                <span>Omset Host (85%)</span>
                <strong style="color:#2F7D55">${formatIDR(h.hostShare || 0)}</strong>
              </div>
              <div class="connector-mini-stat stat-highlight">
                <span>Komisi Connector (15%)</span>
                <strong style="color:var(--accent)">${formatIDR(h.connectorShare || 0)}</strong>
              </div>
            </div>

            <div class="connector-host-actions">
              <button class="btn-manage-host" onclick="switchAccountToHost('${escapeAttr(h.id)}')">
                ⚡ Masuk & Kelola Akun Host Ini
              </button>
            </div>
          </div>
        `).join('') : `
          <div class="dashboard-card" style="text-align:center;padding:30px">
            <p style="color:var(--muted);font-size:12px">Belum ada host yang didaftarkan.</p>
            <button class="btn btn-primary" style="margin-top:10px" onclick="openRegisterHostModal()">+ Daftarkan Host Pertama</button>
          </div>
        `}
      </div>
    </div>
  `;
}

function renderConnectorEarnings() {
  const root = document.getElementById('connectorEarnings');
  if (!root) return;

  const hosts = getAssistedHosts();
  const totalRev = hosts.reduce((acc, h) => acc + (h.totalRevenue || 0), 0);
  const totalHostShare = hosts.reduce((acc, h) => acc + (h.hostShare || 0), 0);
  const totalCommission = hosts.reduce((acc, h) => acc + (h.connectorShare || 0), 0);

  root.innerHTML = `
    <div class="dashboard-wrap">
      <div class="page-title" style="padding:0;margin-bottom:14px">
        <h1>Transparansi Bagi Hasil (15%)</h1>
        <p>Laporan komisi pendampingan digital & pelacakan penyaluran tunai ke host lokal.</p>
      </div>

      <div class="earnings-split-card">
        <h3 style="font-family:'Playfair Display',serif;font-size:17px;margin-bottom:3px">Model Distribusi Finansial LokaLink</h3>
        <p style="font-size:10.5px;color:var(--muted);margin-bottom:10px">
          Sistem pembagian otomatis untuk menjamin keadilan ekonomi komunitas:
        </p>

        <div class="split-bar-wrap">
          <div class="split-bar-track">
            <div class="split-host-fill" style="width: 85%"></div>
            <div class="split-connector-fill" style="width: 15%"></div>
          </div>
          <div class="split-legend">
            <div class="legend-item">
              <span class="legend-dot host"></span>
              <strong>85% Hak Bersih Host</strong>
            </div>
            <div class="legend-item">
              <span class="legend-dot connector"></span>
              <strong>15% Komisi Youth Connector</strong>
            </div>
          </div>
        </div>

        <div class="connector-stat-grid" style="margin-top:12px">
          <div class="connector-stat">
            <span>Total Omset Host</span>
            <strong style="color:var(--text)">${formatIDR(totalRev)}</strong>
            <small>Nilai Transaksi</small>
          </div>
          <div class="connector-stat">
            <span>Hak Bersih Host (85%)</span>
            <strong style="color:#2F7D55">${formatIDR(totalHostShare)}</strong>
            <small>Pendapatan warga</small>
          </div>
          <div class="connector-stat">
            <span>Komisi Anda (15%)</span>
            <strong style="color:var(--accent)">${formatIDR(totalCommission)}</strong>
            <small>Insentif digital</small>
          </div>
          <div class="connector-stat">
            <span>Host Terbantu</span>
            <strong>${hosts.length} Warga</strong>
            <small>Didampingi penuh</small>
          </div>
        </div>
      </div>

      <div class="dashboard-card" style="margin-top:14px">
        <h3 style="margin:0 0 10px;font-size:16px">Rincian Penyaluran per Host Binaan</h3>
        <p style="font-size:10.5px;color:var(--muted);margin-bottom:12px;line-height:1.5">
          Sebagai Youth Connector, Anda menyalurkan dana tunai kepada para tetua dan pengrajin yang belum memiliki rekening bank (*unbanked*).
        </p>

        <div>
          ${hosts.map(h => `
            <div class="earnings-host-card">
              <div class="earnings-host-head">
                <div>
                  <h4>${escapeHtml(h.name)}</h4>
                  <p>${escapeHtml(h.village)} · ${escapeHtml(h.occupation)}</p>
                </div>
                <span class="connector-status ${h.cashStatus === 'Disalurkan Tunai' ? '' : 'status-orange'}">
                  ${escapeHtml(h.cashStatus || 'Aktif')}
                </span>
              </div>

              <div class="earnings-host-split">
                <div>
                  <small>Hak Host (85%)</small>
                  <strong style="color:#2F7D55">${formatIDR(h.hostShare || 0)}</strong>
                </div>
                <div>
                  <small>Komisi Connector (15%)</small>
                  <strong style="color:var(--accent)">${formatIDR(h.connectorShare || 0)}</strong>
                </div>
              </div>

              <div class="earnings-host-foot">
                <span>Total Booking: <strong>${h.bookingsCount || 0}</strong> transaksi</span>
                <button class="btn btn-light btn-cash-dist" onclick="toggleCashDistribution('${escapeAttr(h.id)}')">
                  ${h.cashStatus === 'Disalurkan Tunai' ? '✓ Telah Disalurkan Tunai' : 'Tandai Disalurkan Tunai'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function toggleCashDistribution(hostId) {
  const hosts = getAssistedHosts();
  const h = hosts.find(x => x.id === hostId);
  if (!h) return;
  h.cashStatus = h.cashStatus === 'Disalurkan Tunai' ? 'Menunggu Penyaluran' : 'Disalurkan Tunai';
  saveAssistedHosts(hosts);
  renderConnectorEarnings();
  showToast(`Status penyaluran dana untuk ${h.name} diperbarui.`);
}
