/* Authentication & Role Management */

function getConnectorProfile() {
  const p = JSON.parse(localStorage.getItem(connectorProfileKey) || 'null');
  return p || {
    name: 'Ahmad Pratama',
    email: 'connector@lokallink.id',
    phone: '081234567890',
    age: '22',
    village: 'Sukarara',
    district: 'Jonggat',
    languages: 'Sasak, Indonesian, English',
    skills: ['Local navigation', 'Communication', 'Local culture', 'Helping local hosts'],
    area: 'Sukarara, Sade, Kuta Mandalika',
    status: 'Active'
  };
}

function saveConnectorProfile(p) {
  localStorage.setItem(connectorProfileKey, JSON.stringify(p));
  currentUser.connector = { ...currentUser.connector, ...p };
}

function connectorUser() {
  const p = getConnectorProfile();
  return { ...currentUser.connector, ...p };
}

function getUser() {
  if (authRole === 'connector') return connectorUser();
  const u = currentUser[authRole];
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
  authRole = role;
  ['travelerTab', 'hostTab', 'connectorTab'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', id.toLowerCase().startsWith(role));
  });

  const label = document.getElementById('loginRoleLabel');
  if (label) label.textContent = role === 'traveler' ? 'Traveler' : role === 'host' ? 'Local Host' : 'Connector';

  const email = document.getElementById('loginEmail');
  if (email) {
    if (role === 'traveler') email.value = 'alex@lokallink.id';
    else if (role === 'host') email.value = 'host@lokallink.id';
    else email.value = getConnectorProfile().email || 'connector@lokallink.id';
  }
}

function fillDemo(role) {
  selectAuthRole(role);
  const passwordInput = document.getElementById('loginPassword');
  if (passwordInput) passwordInput.value = '12345678';
}

function fillConnectorDemo() {
  selectAuthRole('connector');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  if (emailInput) emailInput.value = 'connector@lokallink.id';
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

  if (authRole === 'connector') {
    const profile = getConnectorProfile();
    if (profile.email && email !== profile.email && email !== 'connector@lokallink.id') {
      showToast('Connector account not found. Please register first.');
      return;
    }
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
  } else if (authRole === 'host') {
    goTo('hostDashboard');
  } else {
    goTo('connectorDashboard');
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
  const order = ['traveler', 'host', 'connector'];
  const next = order[(order.indexOf(authRole) + 1) % order.length];
  authRole = next;
  localStorage.setItem('lokallink_role', next);
  applyRoleUI();
  goTo(next === 'traveler' ? 'home' : next === 'host' ? 'hostDashboard' : 'connectorDashboard');
  showToast(`Switched to ${next === 'traveler' ? 'Traveler' : next === 'host' ? 'Local Host' : 'Connector'} mode.`);
}

function applyRoleUI() {
  if (authRole === 'connector') {
    const u = connectorUser();
    currentUser.connector = { ...currentUser.connector, ...u };
  }

  const user = getUser();
  const roleText = authRole === 'connector' ? 'Youth Local Connector' : authRole === 'host' ? 'Local Host' : 'Traveler';

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
  if (authRole === 'connector') {
    renderConnectorDashboard();
  }
  syncBookingRecords();
  if (authRole === 'traveler') renderTravelerBookingsV2();
  if (authRole === 'host') renderHostBookingsV2();
  updateStaticLanguage();
}
