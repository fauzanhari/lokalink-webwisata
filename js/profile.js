/* Profile Management & Preferences */

function renderProfile() {
  const p = document.getElementById('profile');
  if (!p) return;
  const u = getUser();

  const roleText = authRole === 'host' ? 'Local Host · Community' : 'Traveler · Exploring Lombok since 2026';
  p.innerHTML = `
    <div class="profile">
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
        ` : `
          <div class="menu-item" onclick="goTo('hostExperiences')">
            <div class="mi">⌁</div><strong>${tr('myExperiences')}</strong><span>${hostExperiences.length} experiences ›</span>
          </div>
        `}
        <div class="menu-item" onclick="openLanguage()">
          <div class="mi">Aa</div><strong>${tr('language')}</strong><span>${uiLanguage === 'en' ? 'English' : 'Bahasa Indonesia'} ›</span>
        </div>
        ${authRole === 'host' ? `
          <div class="menu-item" onclick="openExperienceForm()">
            <div class="mi">＋</div><strong>${tr('addExperience')}</strong><span>Create a new experience ›</span>
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
