/* Authentication & Role Management */

function getUser() {
  const u = currentUser[authRole] || currentUser.traveler;
  const stored = JSON.parse(localStorage.getItem(profileKey) || '{}');
  return { ...u, ...(stored[authRole] || {}) };
}

function saveUserData(data) {
  const stored = JSON.parse(localStorage.getItem(profileKey) || '{}');
  stored[authRole] = { ...(stored[authRole] || {}), ...data };
  localStorage.setItem(profileKey, JSON.stringify(stored));
  currentUser[authRole] = { ...currentUser[authRole], ...data };
}

function selectAuthRole(role) {
  if (role !== 'traveler' && role !== 'host') role = 'traveler';
  authRole = role;
  ['travelerTab', 'hostTab'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', id.toLowerCase().startsWith(role));
  });

  const label = document.getElementById('loginRoleLabel');
  if (label) label.textContent = role === 'traveler' ? 'Traveler' : 'Local Host';

  const email = document.getElementById('loginEmail');
  if (email) {
    if (role === 'traveler') email.value = 'alex@lokallink.id';
    else email.value = 'host@lokallink.id';
  }
}

function fillDemo(role) {
  selectAuthRole(role);
  const passwordInput = document.getElementById('loginPassword');
  if (passwordInput) passwordInput.value = '12345678';
}

function loginUser() {
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';

  if (!email || password.length < 6) {
    alert('Masukkan email dan password minimal 6 karakter.');
    return;
  }

  localStorage.setItem('lokallink_logged_in', 'true');
  localStorage.setItem('lokallink_role', authRole);
  localStorage.setItem('lokallink_email', email);

  const authGate = document.getElementById('authGate');
  if (authGate) authGate.style.display = 'none';

  const splash = document.getElementById('splash');
  if (splash) splash.style.display = 'none';

  applyRoleUI();

  if (authRole === 'traveler') {
    goTo('home');
    if (splash) {
      splash.style.display = 'flex';
      setTimeout(() => splash.style.display = 'none', 3000);
    }
  } else {
    goTo('hostDashboard');
  }
}

function logoutUser() {
  localStorage.removeItem('lokallink_logged_in');
  localStorage.removeItem('lokallink_role');
  localStorage.removeItem('lokallink_email');

  const authGate = document.getElementById('authGate');
  const splash = document.getElementById('splash');
  if (authGate) authGate.style.display = 'flex';
  if (splash) splash.style.display = 'none';

  selectAuthRole('traveler');
  showToast('Success.');
}

function switchRole() {
  const next = authRole === 'traveler' ? 'host' : 'traveler';
  authRole = next;
  localStorage.setItem('lokallink_role', next);
  applyRoleUI();
  goTo(next === 'traveler' ? 'home' : 'hostDashboard');
  showToast(`Switched to ${next === 'traveler' ? 'Traveler' : 'Local Host'} mode.`);
}

function applyRoleUI() {
  const user = getUser();
  const roleText = authRole === 'host' ? 'Local Host' : 'Traveler';

  const desktopName = document.getElementById('desktopName');
  const desktopRole = document.getElementById('desktopRole');
  const desktopAvatar = document.getElementById('desktopAvatar');

  if (desktopName) desktopName.textContent = user.name;
  if (desktopRole) desktopRole.textContent = roleText;
  if (desktopAvatar) desktopAvatar.src = user.avatar;

  renderNavigation();
  renderProfile();
  if (authRole === 'host') {
    renderHostExperiences();
    patchHostButtons();
  }
  syncBookingRecords();
  if (authRole === 'traveler') renderTravelerBookingsV2();
  if (authRole === 'host') renderHostBookingsV2();
  updateStaticLanguage();
}

