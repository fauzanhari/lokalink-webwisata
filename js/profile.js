/* Profile Management & Preferences */

function renderProfile() {
  const p = document.getElementById('profile');
  if (!p) return;
  const u = getUser();
  const imp = typeof getImpersonatedHost === 'function' ? getImpersonatedHost() : null;

  let roleText = 'Traveler · Exploring Lombok since 2026';
  if (authRole === 'host') {
    roleText = imp ? `Host Binaan (Dikelola oleh ${imp.connector || 'Connector'})` : 'Local Host · Sasak Community';
  } else if (authRole === 'connector') {
    roleText = 'Youth Local Connector · Pendamping Digital Komunitas Lombok';
  }

  const assistedCount = typeof getAssistedHosts === 'function' ? getAssistedHosts().length : 3;

  p.innerHTML = `
    <div class="profile">
      ${imp ? `
        <div class="impersonation-banner" style="margin-bottom:14px">
          <div class="impersonation-inner">
            <div class="impersonation-meta">
              <span class="impersonation-tag">⚡ MODE PENDAMPING AKTIF</span>
              <p>Anda sedang mengelola akun <strong>${escapeHtml(imp.name)}</strong></p>
            </div>
            <button class="btn-return-connector" onclick="exitHostImpersonation()">
              Kembali ke Connector ➔
            </button>
          </div>
        </div>
      ` : ''}

      <div class="profile-card">
        <img class="profile-avatar" src="${u.avatar}" alt="Profile">
        <h1>${escapeHtml(u.name)}</h1>
        <p>${roleText}</p>
        <div class="profile-actions">
          <button class="btn btn-primary btn-block" onclick="openEditProfile()">${tr('edit')}</button>
        </div>
      </div>

      <div class="profile-menu">
        ${authRole === 'traveler' ? `
          <div class="menu-item" onclick="goTo('saved')">
            <div class="mi">♡</div><strong>${tr('saved')}</strong><span>${savedExperiences.length} saved ›</span>
          </div>
        ` : authRole === 'host' ? `
          <div class="menu-item" onclick="goTo('hostExperiences')">
            <div class="mi">⌁</div><strong>${tr('myExperiences')}</strong><span>${hostExperiences.length} experiences ›</span>
          </div>
        ` : `
          <div class="menu-item" onclick="goTo('connectorHosts')">
            <div class="mi">👥</div><strong>Host Binaan</strong><span>${assistedCount} host aktif didampingi ›</span>
          </div>
          <div class="menu-item" onclick="goTo('connectorEarnings')">
            <div class="mi">Rp</div><strong>Bagi Hasil (15%)</strong><span>Laporan komisi & penyaluran ›</span>
          </div>
          <div class="menu-item" onclick="openRegisterHostModal()">
            <div class="mi">＋</div><strong>Daftarkan Host Baru</strong><span>Bantu host gaptek mendaftar ›</span>
          </div>
        `}

        <div class="menu-item" onclick="openHowToUse()">
          <div class="mi">📖</div><strong>Cara Pakai Aplikasi</strong><span>Panduan penggunaan LokaLink ›</span>
        </div>

        <div class="menu-item" onclick="openLanguage()">
          <div class="mi">Aa</div><strong>${tr('language')}</strong><span>${uiLanguage === 'en' ? 'English' : 'Bahasa Indonesia'} ›</span>
        </div>

        ${authRole === 'host' ? `
          <div class="menu-item" onclick="openExperienceForm()">
            <div class="mi">＋</div><strong>${tr('addExperience')}</strong><span>Tambah pengalaman, wisata, kuliner, atau usaha ›</span>
          </div>
        ` : ''}

        ${imp ? `
          <div class="menu-item" onclick="exitHostImpersonation()">
            <div class="mi">↩</div><strong>Kembali ke Akun Connector</strong><span>Keluar dari mode kelola host ›</span>
          </div>
        ` : ''}

        <div class="menu-item" onclick="logoutUser()">
          <div class="mi">↪</div><strong>${tr('logout')}</strong><span>Sign out of LokaLink ›</span>
        </div>
      </div>
    </div>
  `;
}

function openEditProfile() {
  const u = getUser();
  const nameInput = document.getElementById('editName');
  const emailInput = document.getElementById('editEmail');
  const bioInput = document.getElementById('editBio');
  const avatarInput = document.getElementById('editAvatar');

  if (nameInput) nameInput.value = u.name || '';
  if (emailInput) emailInput.value = u.email || '';
  if (bioInput) bioInput.value = u.bio || '';
  if (avatarInput) avatarInput.value = u.avatar || '';

  const modal = document.getElementById('editProfileModal');
  if (modal) modal.classList.add('open');
}

function closeEditProfile() {
  const modal = document.getElementById('editProfileModal');
  if (modal) modal.classList.remove('open');
}

function saveProfile() {
  const name = document.getElementById('editName')?.value.trim();
  const email = document.getElementById('editEmail')?.value.trim();

  if (!name || !email) {
    showToast(uiLanguage === 'id' ? 'Nama dan email wajib diisi.' : 'Name and email are required.');
    return;
  }

  saveUserData({
    name,
    email,
    bio: document.getElementById('editBio')?.value.trim() || '',
    avatar: document.getElementById('editAvatar')?.value.trim() || currentUser[authRole].avatar
  });

  applyRoleUI();
  renderProfile();
  closeEditProfile();
  showToast(uiLanguage === 'id' ? 'Profil berhasil diperbarui.' : 'Profile updated successfully.');
}

function openLanguage() {
  const modal = document.getElementById('languageModal');
  if (modal) modal.classList.add('open');

  const langEN = document.getElementById('langEN');
  const langID = document.getElementById('langID');
  if (langEN) langEN.classList.toggle('active', uiLanguage === 'en');
  if (langID) langID.classList.toggle('active', uiLanguage === 'id');
}

function closeLanguage() {
  const modal = document.getElementById('languageModal');
  if (modal) modal.classList.remove('open');
}

function setLanguage(lang) {
  uiLanguage = lang;
  localStorage.setItem('lokallink_language', lang);
  renderNavigation();
  renderProfile();
  updateStaticLanguage();
  closeLanguage();
  showToast(lang === 'id' ? 'Bahasa diubah ke Bahasa Indonesia.' : 'Language changed to English.');
}

function openHowToUse() {
  const modal = document.getElementById('howToUseModal');
  if (modal) modal.classList.add('open');
}

function closeHowToUse() {
  const modal = document.getElementById('howToUseModal');
  if (modal) modal.classList.remove('open');
}
