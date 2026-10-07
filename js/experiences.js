/* Experiences Catalog, Detail & Saved Logic */

function renderTrending() {
  const input = document.getElementById('homeSearch');
  const q = (input?.value || '').trim().toLowerCase();
  const list = experiences.filter(e => {
    const catMatch = activeCategory === 'All' || e.category === activeCategory;
    const qMatch = !q || `${e.title} ${e.location} ${e.category}`.toLowerCase().includes(q);
    return catMatch && qMatch;
  }).slice(0, 5);

  const container = document.getElementById('trendingList');
  if (!container) return;

  container.innerHTML = list.length ? list.map(e => `
    <article class="experience-card" onclick="openDetail('${e.id}')">
      <div class="experience-img"><img src="${e.image}" alt="${escapeHtml(e.title)}"></div>
      <div>
        <h3>${escapeHtml(e.title)}</h3>
        <div class="experience-location">${escapeHtml(e.category)} · ${escapeHtml(e.location)}</div>
        <div class="rating"><span class="star">★</span>${e.rating} <span style="color:#aaa">· ${escapeHtml(e.duration)}</span></div>
      </div>
      <div class="price"><strong>${money(e.price)}</strong><span>/ person</span></div>
    </article>
  `).join('') : `<div style="padding:20px;text-align:center;color:var(--muted);font-size:11px">No experience found.</div>`;
}

function filterHome() {
  renderTrending();
}

function setCategory(cat) {
  activeCategory = cat;
  document.querySelectorAll('#homeChips .chip').forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
  renderTrending();
}

function renderDiscover() {
  const input = document.getElementById('discoverSearch');
  const q = (input?.value || '').trim().toLowerCase();
  const list = experiences.filter(e => {
    const catMatch = discoverCategory === 'All' || e.category === discoverCategory;
    const qMatch = !q || `${e.title} ${e.location} ${e.category}`.toLowerCase().includes(q);
    return catMatch && qMatch;
  });

  const container = document.getElementById('discoverGrid');
  if (!container) return;

  container.innerHTML = list.map(e => `
    <article class="discover-card" onclick="openDetail('${e.id}')">
      <img src="${e.image}" alt="${escapeHtml(e.title)}">
      <div class="discover-body">
        <h3>${escapeHtml(e.title)}</h3>
        <p>${escapeHtml(e.location)} · ★ ${e.rating}</p>
        <div class="discover-bottom">
          <strong>${money(e.price)}</strong>
          <span class="mini-tag">Small group</span>
        </div>
      </div>
    </article>
  `).join('');
}

function setDiscoverCategory(cat) {
  discoverCategory = cat;
  document.querySelectorAll('#discoverChips .chip').forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
  renderDiscover();
}

function openDetail(id) {
  const e = experiences.find(x => x.id === id) || experiences[0];
  currentExperience = e;
  currentDetailId = id;

  const detailImage = document.getElementById('detailImage');
  const detailTitle = document.getElementById('detailTitle');
  const detailCategory = document.getElementById('detailCategory');
  const detailRating = document.getElementById('detailRating');
  const detailDuration = document.getElementById('detailDuration');
  const detailPrice = document.getElementById('detailPrice');
  const hostName = document.getElementById('hostName');
  const hostAvatar = document.getElementById('hostAvatar');
  const detailStory = document.getElementById('detailStory');
  const detailScreen = document.getElementById('detail');
  const bottomNav = document.getElementById('bottomNav');

  if (detailImage) detailImage.src = e.image;
  if (detailTitle) detailTitle.textContent = e.title;
  if (detailCategory) detailCategory.textContent = `${e.category} · ${e.location}`;
  if (detailRating) detailRating.textContent = e.rating;
  if (detailDuration) detailDuration.textContent = e.duration;
  if (detailPrice) detailPrice.innerHTML = `${money(e.price)} <small style="font-size:9px;color:#7C7772;font-weight:500">/ person</small>`;
  if (hostName) hostName.textContent = e.host;
  if (hostAvatar) hostAvatar.src = e.avatar;
  if (detailStory) detailStory.textContent = e.story;

  if (detailScreen) {
    detailScreen.style.display = 'block';
    detailScreen.scrollTop = 0;
  }
  if (bottomNav) bottomNav.style.display = 'none';

  addSaveButtonToDetail();
  updateSaveButton(id);
}

function closeDetail() {
  const detailScreen = document.getElementById('detail');
  const bottomNav = document.getElementById('bottomNav');
  if (detailScreen) detailScreen.style.display = 'none';
  if (bottomNav) bottomNav.style.display = 'grid';
}

function renderSaved() {
  const grid = document.getElementById('savedGrid');
  if (!grid) return;
  if (!savedExperiences.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><strong>No saved experiences yet</strong>Tap the heart on an experience to keep it here.</div>`;
    return;
  }
  grid.innerHTML = savedExperiences
    .map(id => experiences.find(e => e.id === id))
    .filter(Boolean)
    .map(e => `
      <article class="saved-card" onclick="openDetail('${e.id}')">
        <img src="${e.image}" alt="${escapeHtml(e.title)}">
        <div class="saved-card-body">
          <h3>${escapeHtml(e.title)}</h3>
          <p>${escapeHtml(e.category)} · ${escapeHtml(e.location)} · ★ ${e.rating}</p>
          <div class="saved-card-foot">
            <strong>${formatIDR(e.price)}</strong>
            <button class="remove-save" onclick="event.stopPropagation();toggleSaved('${e.id}')">Remove</button>
          </div>
        </div>
      </article>
    `).join('');
}

function toggleSaved(id) {
  if (savedExperiences.includes(id)) {
    savedExperiences = savedExperiences.filter(x => x !== id);
  } else {
    savedExperiences.push(id);
  }
  localStorage.setItem(savedKey, JSON.stringify(savedExperiences));
  renderSaved();
  renderProfile();
  updateSaveButton(id);
  showToast(savedExperiences.includes(id) ? 'Experience saved.' : 'Removed from saved experiences.');
}

function updateSaveButton(id) {
  const b = document.getElementById('saveDetailBtn');
  if (b) b.textContent = savedExperiences.includes(id) ? '♥ Saved' : '♡ Save';
}

function addSaveButtonToDetail() {
  const title = document.getElementById('detailTitle');
  if (!title || document.getElementById('saveDetailBtn')) return;
  const b = document.createElement('button');
  b.id = 'saveDetailBtn';
  b.className = 'btn btn-light';
  b.style.cssText = 'margin-top:10px;font-size:10px;min-height:34px';
  b.onclick = () => toggleSaved(currentDetailId);
  b.textContent = '♡ Save';
  title.insertAdjacentElement('afterend', b);
}
