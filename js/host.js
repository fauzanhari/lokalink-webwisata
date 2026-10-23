/* Local Host Operations & Dashboard Management */

let currentAddCategory = 'pengalaman';

function openHost() {
  const modal = document.getElementById('hostModal');
  if (modal) modal.classList.add('open');
}

function closeHost() {
  const modal = document.getElementById('hostModal');
  if (modal) modal.classList.remove('open');
}

function submitHost() {
  closeHost();
  showToast('Pendaftaran Local Host berhasil dimulai.');
}

function openExperienceForm(initialCategory) {
  const modal = document.getElementById('experienceModal');
  if (modal) {
    modal.classList.add('open');
    selectAddCategory(initialCategory || currentAddCategory || 'pengalaman');
  }
}

function closeExperienceForm() {
  const modal = document.getElementById('experienceModal');
  if (modal) modal.classList.remove('open');
}

function selectAddCategory(type) {
  currentAddCategory = type || 'pengalaman';

  // Update button active state
  document.querySelectorAll('.cat-picker-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.catType === currentAddCategory);
  });

  const hiddenType = document.getElementById('expCategoryType');
  if (hiddenType) hiddenType.value = currentAddCategory;

  const banner = document.getElementById('catInfoBanner');
  const lblTitle = document.getElementById('lblExpTitle');
  const txtTitle = document.getElementById('expTitle');
  const lblLocation = document.getElementById('lblExpLocation');
  const txtLocation = document.getElementById('expLocation');
  const lblPrice = document.getElementById('lblExpPrice');
  const txtPrice = document.getElementById('expPrice');
  const hintPrice = document.getElementById('hintExpPrice');
  const lblDuration = document.getElementById('lblExpDuration');
  const txtDuration = document.getElementById('expDuration');
  const grpMaps = document.getElementById('grpExpMaps');
  const grpHighlights = document.getElementById('grpExpHighlights');
  const lblHighlights = document.getElementById('lblExpHighlights');
  const txtHighlights = document.getElementById('expHighlights');
  const grpMenu = document.getElementById('grpExpMenu');
  const grpProducts = document.getElementById('grpExpProducts');
  const lblStory = document.getElementById('lblExpStory');
  const txtStory = document.getElementById('expStory');
  const btnSubmit = document.getElementById('btnSubmitExp');
  const catSelect = document.getElementById('expCategory');

  if (currentAddCategory === 'pengalaman') {
    if (banner) banner.innerHTML = `<span>🤝</span><div><strong>Pengalaman Lokal:</strong> Aktivitas berbayar yang dipandu langsung oleh host lokal dan dapat dibooking oleh wisatawan.</div>`;
    if (lblTitle) lblTitle.textContent = 'NAMA PENGALAMAN / TUR';
    if (txtTitle) txtTitle.placeholder = 'e.g. Menenun Kain Songket Sasak Tradisional';
    if (lblLocation) lblLocation.textContent = 'LOKASI / DESA';
    if (txtLocation) txtLocation.placeholder = 'e.g. Desa Adat Sade, Lombok Tengah';
    if (lblPrice) lblPrice.textContent = 'HARGA / ORANG (RP)';
    if (txtPrice) { txtPrice.placeholder = '320000'; if (txtPrice.value === '0') txtPrice.value = ''; }
    if (hintPrice) hintPrice.textContent = 'Tarif per wisatawan untuk booking langsung';
    if (lblDuration) lblDuration.textContent = 'DURASI AKTIVITAS';
    if (txtDuration) txtDuration.placeholder = 'e.g. 2.5 jam';
    if (grpMaps) grpMaps.style.display = 'none';
    if (grpHighlights) grpHighlights.style.display = 'block';
    if (lblHighlights) lblHighlights.textContent = 'HIGHLIGHT AKTIVITAS (PISAHKAN KOMA / ENTER)';
    if (txtHighlights) txtHighlights.placeholder = 'e.g. Mencoba alat tenun kayu tradisional, Membuat motif Sasak, Bawa pulang hasil karya';
    if (grpMenu) grpMenu.style.display = 'none';
    if (grpProducts) grpProducts.style.display = 'none';
    if (lblStory) lblStory.textContent = 'KISAH & PENGALAMAN HOST';
    if (txtStory) txtStory.placeholder = 'Ceritakan keunikan aktivitas, latar belakang tradisi, dan apa yang akan dipelajari wisatawan bersama Anda...';
    if (btnSubmit) btnSubmit.textContent = 'Publikasikan Pengalaman';
    if (catSelect) catSelect.value = 'Local Experience';
  } else if (currentAddCategory === 'wisata') {
    if (banner) banner.innerHTML = `<span>📍</span><div><strong>Destinasi Wisata:</strong> Objek wisata alam, pantai, bukit, atau desa adat yang bebas dikunjungi wisatawan dengan petunjuk Google Maps.</div>`;
    if (lblTitle) lblTitle.textContent = 'NAMA DESTINASI WISATA';
    if (txtTitle) txtTitle.placeholder = 'e.g. Bukit Merese Sunset Panorama';
    if (lblLocation) lblLocation.textContent = 'LOKASI / KAWASAN';
    if (txtLocation) txtLocation.placeholder = 'e.g. Mandalika, Lombok Tengah';
    if (lblPrice) lblPrice.textContent = 'TIKET MASUK (RP)';
    if (txtPrice) { txtPrice.placeholder = '0 (Bebas / Gratis)'; if (!txtPrice.value) txtPrice.value = '0'; }
    if (hintPrice) hintPrice.textContent = 'Isi 0 jika gratis atau bebas dikunjungi';
    if (lblDuration) lblDuration.textContent = 'WAKTU KUNJUNGAN';
    if (txtDuration) txtDuration.placeholder = 'e.g. Bebas berkunjung / 06.00 – 18.00';
    if (grpMaps) grpMaps.style.display = 'block';
    if (grpHighlights) grpHighlights.style.display = 'block';
    if (lblHighlights) lblHighlights.textContent = 'DAYA TARIK UTAMA (PISAHKAN KOMA / ENTER)';
    if (txtHighlights) txtHighlights.placeholder = 'e.g. Sunset Panorama 360°, Trekking Ringan 10 Menit, Spot Foto Tebing Laut';
    if (grpMenu) grpMenu.style.display = 'none';
    if (grpProducts) grpProducts.style.display = 'none';
    if (lblStory) lblStory.textContent = 'RINCIAN & DESKRIPSI DESTINASI';
    if (txtStory) txtStory.placeholder = 'Jelaskan keindahan tempat, rute akses ke lokasi, serta tips terbaik bagi wisatawan saat berkunjung...';
    if (btnSubmit) btnSubmit.textContent = 'Publikasikan Destinasi Wisata';
    if (catSelect) catSelect.value = 'Destination';
  } else if (currentAddCategory === 'kuliner') {
    if (banner) banner.innerHTML = `<span>🍽️</span><div><strong>Kuliner Khas:</strong> Usaha warung makan, kafe, atau jajanan khas Lombok. Wisatawan dapat melihat menu, jam buka, dan navigasi lokasi.</div>`;
    if (lblTitle) lblTitle.textContent = 'NAMA WARUNG / USAHA KULINER';
    if (txtTitle) txtTitle.placeholder = 'e.g. Ayam Taliwang & Plecing Pak Udin';
    if (lblLocation) lblLocation.textContent = 'ALAMAT LENGKAP WARUNG';
    if (txtLocation) txtLocation.placeholder = 'e.g. Jl. Raya Kuta No. 12, Mandalika';
    if (lblPrice) lblPrice.textContent = 'HARGA MULAI DARI (RP)';
    if (txtPrice) { txtPrice.placeholder = 'e.g. 25000'; if (txtPrice.value === '0') txtPrice.value = ''; }
    if (hintPrice) hintPrice.textContent = 'Estimasi harga mulai per menu';
    if (lblDuration) lblDuration.textContent = 'JAM BUKA / OPERASIONAL';
    if (txtDuration) txtDuration.placeholder = 'e.g. Buka 10.00 – 21.00';
    if (grpMaps) grpMaps.style.display = 'block';
    if (grpHighlights) grpHighlights.style.display = 'block';
    if (lblHighlights) lblHighlights.textContent = 'CIRI KHAS & MENU ANDALAN (PISAHKAN KOMA / ENTER)';
    if (txtHighlights) txtHighlights.placeholder = 'e.g. Ayam kampung bakar rempah, Sambal beberuk pedas segar, Kangkung kebun sendiri';
    if (grpMenu) grpMenu.style.display = 'block';
    if (grpProducts) grpProducts.style.display = 'none';
    if (lblStory) lblStory.textContent = 'TENTANG UMKM KULINER INI';
    if (txtStory) txtStory.placeholder = 'Ceritakan sejarah warung kuliner Anda, keunikan resep tradisi, dan hidangan favorit para pelanggan...';
    if (btnSubmit) btnSubmit.textContent = 'Publikasikan Kuliner UMKM';
    if (catSelect) catSelect.value = 'Kuliner Khas';
  } else if (currentAddCategory === 'usaha') {
    if (banner) banner.innerHTML = `<span>🏠</span><div><strong>Usaha Lokal:</strong> Sentra kerajinan tangan, gerai oleh-oleh, atau workshop UMKM lokal Lombok dengan katalog produk dan jam buka.</div>`;
    if (lblTitle) lblTitle.textContent = 'NAMA TOKO / USAHA UMKM';
    if (txtTitle) txtTitle.placeholder = 'e.g. Sentra Tenun Tradisional Desa Sade';
    if (lblLocation) lblLocation.textContent = 'ALAMAT TOKO / WORKSHOP';
    if (txtLocation) txtLocation.placeholder = 'e.g. Desa Adat Sade, Rembitan, Lombok Tengah';
    if (lblPrice) lblPrice.textContent = 'HARGA PRODUK MULAI (RP)';
    if (txtPrice) { txtPrice.placeholder = 'e.g. 35000'; if (txtPrice.value === '0') txtPrice.value = ''; }
    if (hintPrice) hintPrice.textContent = 'Estimasi harga produk mulai dari';
    if (lblDuration) lblDuration.textContent = 'JAM OPERASIONAL TOKO';
    if (txtDuration) txtDuration.placeholder = 'e.g. Buka 08.00 – 17.00';
    if (grpMaps) grpMaps.style.display = 'block';
    if (grpHighlights) grpHighlights.style.display = 'block';
    if (lblHighlights) lblHighlights.textContent = 'KEUNGGULAN PRODUK & LAYANAN (PISAHKAN KOMA / ENTER)';
    if (txtHighlights) txtHighlights.placeholder = 'e.g. Tenun 100% handmade ATBM, Sutra alam asli, Langsung dari pengrajin lokal';
    if (grpMenu) grpMenu.style.display = 'none';
    if (grpProducts) grpProducts.style.display = 'block';
    if (lblStory) lblStory.textContent = 'TENTANG USAHA & PROFIL PENGRAJIN';
    if (txtStory) txtStory.placeholder = 'Jelaskan karya kerajinan yang dihasilkan, tradisi di balik produk, dan profil pengrajin lokal...';
    if (btnSubmit) btnSubmit.textContent = 'Publikasikan Usaha Lokal';
    if (catSelect) catSelect.value = 'Usaha Lokal';
  }
}

function parseItemsWithPrice(text) {
  if (!text || !text.trim()) return [];
  const lines = text.split('\n');
  const items = [];
  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const sepMatch = trimmed.match(/^(.+?)(?::|-|Rp)\s*([0-9.,]+)$/i);
    if (sepMatch) {
      const name = sepMatch[1].trim();
      const numStr = sepMatch[2].replace(/[.,]/g, '');
      const price = Number(numStr) || 0;
      items.push({ name, price });
    } else {
      items.push({ name: trimmed, price: 0 });
    }
  });
  return items;
}

function resetExperienceForm() {
  const ids = [
    'expTitle', 'expPrice', 'expLocation', 'expDuration',
    'expImage', 'expStory', 'expMapsUrl', 'expHighlights',
    'expMenu', 'expProducts'
  ];
  ids.forEach(id => {
    const field = document.getElementById(id);
    if (field) field.value = '';
  });
  selectAddCategory('pengalaman');
}

function createExperience() {
  if (authRole !== 'host') {
    showToast('Hanya Local Host yang dapat menambahkan listing.');
    return;
  }

  const categoryType = currentAddCategory || 'pengalaman';
  const title = document.getElementById('expTitle')?.value.trim();
  const location = document.getElementById('expLocation')?.value.trim();
  const rawPrice = document.getElementById('expPrice')?.value;
  const price = Number(rawPrice) || 0;

  if (!title) {
    showToast('Silakan isi nama listing terlebih dahulu.');
    document.getElementById('expTitle')?.focus();
    return;
  }

  if (!location) {
    showToast('Silakan isi lokasi / alamat terlebih dahulu.');
    document.getElementById('expLocation')?.focus();
    return;
  }

  if (categoryType === 'pengalaman' && price <= 0) {
    showToast('Mohon masukkan harga per orang untuk pengalaman ini.');
    document.getElementById('expPrice')?.focus();
    return;
  }

  // Parse highlights
  const rawHighlights = document.getElementById('expHighlights')?.value || '';
  const highlights = rawHighlights
    .split(/[\n,]+/)
    .map(s => s.trim())
    .filter(Boolean);

  let categoryLabel = 'Pengalaman Lokal';
  let defaultImg = 'assets/img/desaadatsade.jpg';

  if (categoryType === 'wisata') {
    categoryLabel = 'Destinasi Wisata';
    defaultImg = 'assets/img/bukitmerese.jpg';
  } else if (categoryType === 'kuliner') {
    categoryLabel = 'Kuliner Khas';
    defaultImg = 'assets/img/baunyale.jpg';
  } else if (categoryType === 'usaha') {
    categoryLabel = 'Usaha Lokal';
    defaultImg = 'assets/img/desaadatende.jpg';
  }

  const durationVal = document.getElementById('expDuration')?.value.trim();
  const defaultDuration =
    categoryType === 'pengalaman' ? '3 jam' :
    categoryType === 'wisata' ? 'Bebas berkunjung' :
    categoryType === 'kuliner' ? 'Buka 10.00 – 21.00' :
    'Buka 08.00 – 17.00';

  const imp = typeof getImpersonatedHost === 'function' ? getImpersonatedHost() : null;
  const user = getUser();
  const hostName = imp ? imp.name : (user.name || 'Local Host');
  const hostEmail = imp ? imp.email : (user.email || 'host@lokallink.id');
  const avatar = imp ? (imp.avatar || user.avatar) : user.avatar;

  const e = {
    id: 'host-' + Date.now(),
    title,
    category: categoryLabel,
    type: categoryType,
    location,
    price: categoryType === 'wisata' ? 0 : price,
    duration: durationVal || defaultDuration,
    image: document.getElementById('expImage')?.value.trim() || defaultImg,
    host: hostName,
    hostEmail: hostEmail,
    story: document.getElementById('expStory')?.value.trim() || `Listing ${categoryLabel} autentik yang dipublikasikan melalui platform LokaLink.`,
    avatar: avatar || 'assets/img/host_baiq_erwina.png',
    rating: 'New',
    highlights: highlights.length ? highlights : [
      'Autentik khas kearifan lokal Lombok',
      'Mendukung perekonomian masyarakat sekitar',
      'Terverifikasi resmi platform LokaLink'
    ]
  };

  // Google Maps link
  if (categoryType === 'wisata' || categoryType === 'kuliner' || categoryType === 'usaha') {
    const mapsVal = document.getElementById('expMapsUrl')?.value.trim();
    e.mapsUrl = mapsVal || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title + ' ' + location)}`;
  }

  // Kuliner menu
  if (categoryType === 'kuliner') {
    const rawMenu = document.getElementById('expMenu')?.value || '';
    const parsedMenu = parseItemsWithPrice(rawMenu);
    e.menu = parsedMenu.length ? parsedMenu : [
      { name: 'Menu Spesial ' + title, price: price || 25000 }
    ];
  }

  // Usaha products
  if (categoryType === 'usaha') {
    const rawProducts = document.getElementById('expProducts')?.value || '';
    const parsedProducts = parseItemsWithPrice(rawProducts);
    e.products = parsedProducts.length ? parsedProducts : [
      { name: 'Produk Unggulan ' + title, price: price || 35000 }
    ];
  }

  hostExperiences.push(e);
  localStorage.setItem(expKey, JSON.stringify(hostExperiences));

  // Add to active experiences in-memory
  experiences.push(e);

  resetExperienceForm();
  closeExperienceForm();

  renderHostExperiences();
  renderProfile();

  // Refresh traveler feeds
  if (typeof renderTrending === 'function') renderTrending();
  if (typeof renderDiscover === 'function') renderDiscover();

  showToast(`${categoryLabel} "${title}" berhasil ditambahkan!`);
  goTo('hostExperiences');
}

function renderHostExperiences() {
  const root = document.getElementById('hostExperiences');
  if (!root) return;
  const imp = typeof getImpersonatedHost === 'function' ? getImpersonatedHost() : null;

  const all = [
    ...hostExperiences.map(e => ({ ...e, custom: true })),
    ...experiences.slice(0, 3).map(e => ({ ...e, custom: false }))
  ];

  root.innerHTML = `
    <div class="dashboard-wrap">
      ${imp ? `
        <div class="impersonation-banner" style="margin-bottom:14px">
          <div class="impersonation-inner">
            <div class="impersonation-meta">
              <span class="impersonation-tag">⚡ MODE PENDAMPING (YOUTH CONNECTOR)</span>
              <p>Mengelola pengalaman milik host: <strong>${escapeHtml(imp.name)}</strong></p>
            </div>
            <button class="btn-return-connector" onclick="exitHostImpersonation()">
              Kembali ke Connector ➔
            </button>
          </div>
        </div>
      ` : ''}

      <div class="page-title" style="padding:0;margin-bottom:16px">
        <h1>${tr('myExperiences')}</h1>
        <p>${imp ? `Daftar aktivitas & listing lokal yang dipublikasikan atas nama ${escapeHtml(imp.name)}.` : 'Kelola, terbitkan, dan pantau listing pengalaman, destinasi wisata, kuliner, dan usaha lokal Anda.'}</p>
      </div>

      <div class="dashboard-card">
        <div class="section-head" style="padding:0;margin:0 0 12px">
          <h3 style="margin:0">Published Listings</h3>
          <button class="btn btn-primary" style="min-height:35px;font-size:9px" onclick="openExperienceForm()">+ ${tr('addExperience')}</button>
        </div>
        ${all.map(e => {
          const isWisata = e.type === 'wisata';
          const isKuliner = e.type === 'kuliner';
          const isUsaha = e.type === 'usaha';

          const priceLabel = isWisata
            ? 'Gratis / Bebas'
            : (isKuliner || isUsaha)
            ? `Mulai ${formatIDR(e.price)}`
            : formatIDR(e.price);

          const tagBadge = isWisata
            ? '<span style="font-size:8px;font-weight:700;padding:2px 6px;border-radius:4px;background:#eef7f1;color:#2f7d55">Wisata</span>'
            : isKuliner
            ? '<span style="font-size:8px;font-weight:700;padding:2px 6px;border-radius:4px;background:#fff3e0;color:#e07a1e">Kuliner</span>'
            : isUsaha
            ? '<span style="font-size:8px;font-weight:700;padding:2px 6px;border-radius:4px;background:#f0eaff;color:#6b21c8">Usaha</span>'
            : '<span style="font-size:8px;font-weight:700;padding:2px 6px;border-radius:4px;background:#fff5e9;color:#a76015">Pengalaman</span>';

          return `
            <div class="host-row">
              <img src="${e.image}" alt="Listing" style="cursor:pointer" onclick="openDetail('${e.id}')">
              <div class="host-row-main" style="cursor:pointer" onclick="openDetail('${e.id}')">
                <div style="display:flex;align-items:center;gap:6px">
                  ${tagBadge}
                  <strong>${escapeHtml(e.title)}</strong>
                </div>
                <span>${e.category} · ${e.rating === 'New' ? 'New' : e.rating + ' ★'} · ${e.custom ? 'Dibuat oleh Anda' : 'Demo listing'}</span>
              </div>
              <div style="display:flex;align-items:center;gap:6px">
                <div class="host-row-price">${priceLabel}</div>
                ${e.custom ? `<button class="remove-save" onclick="deleteHostExperience('${e.id}')">Hapus</button>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function deleteHostExperience(id) {
  hostExperiences = hostExperiences.filter(e => e.id !== id);
  localStorage.setItem(expKey, JSON.stringify(hostExperiences));

  // Also remove from global experiences array in-memory
  const expIdx = experiences.findIndex(e => e.id === id);
  if (expIdx !== -1) {
    experiences.splice(expIdx, 1);
  }

  renderHostExperiences();
  renderProfile();
  if (typeof renderTrending === 'function') renderTrending();
  if (typeof renderDiscover === 'function') renderDiscover();
  showToast('Listing berhasil dihapus.');
}

function hostViewAllBookings() {
  goTo('hostBookings');
}

function hostManageExperiences() {
  goTo('hostExperiences');
}

function patchHostButtons() {
  const heads = document.querySelectorAll('#hostDashboard .section-head .see-all');
  if (heads[0]) heads[0].onclick = hostViewAllBookings;
  if (heads[1]) heads[1].onclick = hostManageExperiences;

  const actionTiles = document.querySelectorAll('#hostDashboard .action-tile');
  if (actionTiles[0]) actionTiles[0].onclick = openExperienceForm;
  if (actionTiles[1]) actionTiles[1].onclick = hostViewAllBookings;
  if (actionTiles[2]) actionTiles[2].onclick = () => goTo('hostImpact');
}
