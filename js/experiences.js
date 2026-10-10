/* Experiences Catalog, Detail & Saved Logic */

function renderTrending() {
  const input = document.getElementById("homeSearch");
  const q = (input?.value || "").trim().toLowerCase();
  const list = experiences
    .filter((e) => {
      const catMatch =
        activeCategory === "All" || e.category === activeCategory;
      const qMatch =
        !q ||
        `${e.title} ${e.location} ${e.category}`.toLowerCase().includes(q);
      return catMatch && qMatch;
    })
    .slice(0, 6);

  const container = document.getElementById("trendingList");
  if (!container) return;

  container.innerHTML = list.length
    ? list
        .map((e) => {
          const priceText =
            e.type === "wisata"
              ? "<strong>Destinasi Wisata</strong><span>Gratis / Bebas</span>"
              : `<strong>${money(e.price)}</strong><span>/ person</span>`;
          const tagClass =
            e.type === "wisata"
              ? "background:#eef7f1;color:#2f7d55"
              : "background:#fff5e9;color:#a76015";
          const tagLabel = e.type === "wisata" ? "Wisata" : "Booking Host";
          return `
      <article class="experience-card" onclick="openDetail('${e.id}')">
        <div class="experience-img"><img src="${e.image}" alt="${escapeHtml(
            e.title
          )}"></div>
        <div>
          <span style="font-size:9px;font-weight:600;padding:2px 6px;border-radius:4px;${tagClass}">${tagLabel}</span>
          <h3 style="margin-top:4px">${escapeHtml(e.title)}</h3>
          <div class="experience-location">${escapeHtml(e.location)}</div>
          <div class="rating"><span class="star">★</span>${
            e.rating
          } <span style="color:#aaa">· ${escapeHtml(e.duration)}</span></div>
        </div>
        <div class="price">${priceText}</div>
      </article>
    `;
        })
        .join("")
    : `<div style="padding:20px;text-align:center;color:var(--muted);font-size:11px">No experience found.</div>`;
}

function filterHome() {
  renderTrending();
}

function setCategory(cat) {
  activeCategory = cat;
  document
    .querySelectorAll("#homeChips .chip")
    .forEach((c) => c.classList.toggle("active", c.dataset.cat === cat));
  renderTrending();
}

function renderDiscover() {
  const input = document.getElementById("discoverSearch");
  const q = (input?.value || "").trim().toLowerCase();
  const list = experiences.filter((e) => {
    const catMatch =
      discoverCategory === "All" || e.category === discoverCategory;
    const qMatch =
      !q || `${e.title} ${e.location} ${e.category}`.toLowerCase().includes(q);
    return catMatch && qMatch;
  });

  const container = document.getElementById("discoverGrid");
  if (!container) return;

  container.innerHTML = list
    .map((e) => {
      const priceText =
        e.type === "wisata" ? "Destinasi Wisata" : money(e.price);
      const tagLabel =
        e.type === "wisata" ? "📍 Google Maps" : "🤝 Booking Host";
      return `
      <article class="discover-card" onclick="openDetail('${e.id}')">
        <img src="${e.image}" alt="${escapeHtml(e.title)}">
        <div class="discover-body">
          <span style="font-size:9px;font-weight:600;color:var(--primary);text-transform:uppercase;letter-spacing:0.5px">${escapeHtml(
            e.category
          )}</span>
          <h3 style="margin-top:2px">${escapeHtml(e.title)}</h3>
          <p>${escapeHtml(e.location)} · ★ ${e.rating}</p>
          <div class="discover-bottom">
            <strong>${priceText}</strong>
            <span class="mini-tag">${tagLabel}</span>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

function setDiscoverCategory(cat) {
  discoverCategory = cat;
  document
    .querySelectorAll("#discoverChips .chip")
    .forEach((c) => c.classList.toggle("active", c.dataset.cat === cat));
  renderDiscover();
}

function openDetail(id) {
  const e = experiences.find((x) => x.id === id) || experiences[0];
  currentExperience = e;
  currentDetailId = id;

  const detailImage = document.getElementById("detailImage");
  const detailTitle = document.getElementById("detailTitle");
  const detailCategory = document.getElementById("detailCategory");
  const detailRating = document.getElementById("detailRating");
  const detailDuration = document.getElementById("detailDuration");
  const detailPrice = document.getElementById("detailPrice");
  const hostName = document.getElementById("hostName");
  const hostRoleText = document.getElementById("hostRoleText");
  const hostAvatar = document.getElementById("hostAvatar");
  const detailStoryHeader = document.getElementById("detailStoryHeader");
  const detailStory = document.getElementById("detailStory");
  const detailScreen = document.getElementById("detail");
  const bottomNav = document.getElementById("bottomNav");
  const mapsSection = document.getElementById("googleMapsSection");
  const detailMapsBtn = document.getElementById("detailMapsBtn");
  const stickyActionBtn = document.getElementById("stickyActionBtn");
  const stickyPriceContainer = document.getElementById("stickyPriceContainer");

  if (detailImage) detailImage.src = e.image;
  if (detailTitle) detailTitle.textContent = e.title;
  if (detailCategory)
    detailCategory.textContent = `${e.category.toUpperCase()} · ${e.location.toUpperCase()}`;
  if (detailRating) detailRating.textContent = e.rating;
  if (detailDuration) detailDuration.textContent = e.duration;
  if (hostName) hostName.textContent = e.host;
  if (hostRoleText)
    hostRoleText.textContent =
      e.type === "wisata"
        ? "Destinasi Wisata Terbuka Umum"
        : "Local Host · Terverifikasi";
  if (hostAvatar) hostAvatar.src = e.avatar;
  if (detailStoryHeader)
    detailStoryHeader.textContent =
      e.type === "wisata" ? "Rincian Destinasi" : "Kisah & Pengalaman Host";
  if (detailStory) detailStory.textContent = e.story;

  // Google Maps section display
  if (mapsSection) {
    mapsSection.style.display = e.type === "wisata" ? "block" : "none";
  }
  if (detailMapsBtn && e.mapsUrl) {
    detailMapsBtn.href = e.mapsUrl;
  }

  // Sticky bottom action bar logic
  if (e.type === "wisata") {
    // Sembunyikan sticky bar untuk destinasi wisata
    if (stickyPriceContainer) {
      stickyPriceContainer.innerHTML = "";
    }

    if (stickyActionBtn) {
      stickyActionBtn.outerHTML = '<span id="stickyActionBtn" hidden></span>';
    }

    const stickyBook = document.querySelector("#detail .sticky-book");
    if (stickyBook) {
      stickyBook.style.display = "none";
    }
  } else {
    // Tampilkan kembali sticky bar untuk pengalaman yang memerlukan booking
    const stickyBook = document.querySelector("#detail .sticky-book");
    if (stickyBook) {
      stickyBook.style.display = "";
    }

    if (stickyPriceContainer) {
      stickyPriceContainer.innerHTML = `
      <span>Mulai dari</span>
      <strong id="detailPrice">
        ${money(e.price)}
        <small style="font-size:9px;color:#7C7772;font-weight:500">
          / person
        </small>
      </strong>
    `;
    }

    if (stickyActionBtn) {
      stickyActionBtn.outerHTML = `
      <button id="stickyActionBtn"
              class="btn btn-primary"
              onclick="openBookingFromDetail()">
        Booking Host
      </button>
    `;
    }
  }

  if (detailScreen) {
    detailScreen.style.display = "block";
    detailScreen.scrollTop = 0;
  }
  if (bottomNav) bottomNav.style.display = "none";

  addSaveButtonToDetail();
  updateSaveButton(id);
}

function closeDetail() {
  const detailScreen = document.getElementById("detail");
  const bottomNav = document.getElementById("bottomNav");
  if (detailScreen) detailScreen.style.display = "none";
  if (bottomNav) bottomNav.style.display = "grid";
}

function renderSaved() {
  const grid = document.getElementById("savedGrid");
  if (!grid) return;
  if (!savedExperiences.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><strong>Belum ada pengalaman tersimpan</strong>Ketuk ikon hati pada pengalaman untuk menyimpannya di sini.</div>`;
    return;
  }
  grid.innerHTML = savedExperiences
    .map((id) => experiences.find((e) => e.id === id))
    .filter(Boolean)
    .map(
      (e) => `
      <article class="saved-card" onclick="openDetail('${e.id}')">
        <img src="${e.image}" alt="${escapeHtml(e.title)}">
        <div class="saved-card-body">
          <h3>${escapeHtml(e.title)}</h3>
          <p>${escapeHtml(e.category)} · ${escapeHtml(e.location)} · ★ ${
        e.rating
      }</p>
          <div class="saved-card-foot">
            <strong>${
              e.type === "wisata" ? "Wisata" : formatIDR(e.price)
            }</strong>
            <button class="remove-save" onclick="event.stopPropagation();toggleSaved('${
              e.id
            }')">Hapus</button>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

function toggleSaved(id) {
  if (savedExperiences.includes(id)) {
    savedExperiences = savedExperiences.filter((x) => x !== id);
  } else {
    savedExperiences.push(id);
  }
  localStorage.setItem(savedKey, JSON.stringify(savedExperiences));
  renderSaved();
  renderProfile();
  updateSaveButton(id);
  showToast(
    savedExperiences.includes(id)
      ? "Disimpan ke favorit."
      : "Dihapus dari favorit."
  );
}

function updateSaveButton(id) {
  const b = document.getElementById("saveDetailBtn");
  if (b) b.textContent = savedExperiences.includes(id) ? "♥ Saved" : "♡ Save";
}

function addSaveButtonToDetail() {
  const title = document.getElementById("detailTitle");
  if (!title || document.getElementById("saveDetailBtn")) return;
  const b = document.createElement("button");
  b.id = "saveDetailBtn";
  b.className = "btn btn-light";
  b.style.cssText = "margin-top:10px;font-size:10px;min-height:34px";
  b.onclick = () => toggleSaved(currentDetailId);
  b.textContent = "♡ Save";
  title.insertAdjacentElement("afterend", b);
}
