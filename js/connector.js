/* Youth Local Connector Ecosystem */

function getConnectorRequests() {
  return JSON.parse(localStorage.getItem(connectorRequestsKey) || '[]');
}

function saveConnectorRequests(a) {
  localStorage.setItem(connectorRequestsKey, JSON.stringify(a));
}

function getAssistedHosts() {
  return JSON.parse(localStorage.getItem(assistedHostsKey) || '[]');
}

function saveAssistedHosts(a) {
  localStorage.setItem(assistedHostsKey, JSON.stringify(a));
}

// Seed initial demo request if not present
if (!localStorage.getItem(connectorRequestsKey)) {
  saveConnectorRequests([{
    id: 'connect-demo-1',
    travelerName: 'Andi Pratama',
    travelerEmail: 'alex@lokallink.id',
    experienceTitle: 'Traditional Sasak Weaving',
    date: '12 Oct 2026',
    time: '10:00 AM',
    location: 'Sukarara',
    needs: ['Getting to the location', 'Communication with Host'],
    message: 'I am visiting Sukarara for the first time.',
    status: 'Pending',
    createdAt: new Date().toISOString()
  }]);
}

function openConnectorRegistration() {
  const modal = document.getElementById('connectorRegisterModal');
  if (modal) modal.classList.add('open');
}

function closeConnectorRegistration() {
  const modal = document.getElementById('connectorRegisterModal');
  if (modal) modal.classList.remove('open');
}

function submitConnectorRegistration() {
  const name = document.getElementById('conRegName')?.value.trim();
  const age = document.getElementById('conRegAge')?.value.trim();
  const phone = document.getElementById('conRegPhone')?.value.trim();
  const email = document.getElementById('conRegEmail')?.value.trim();
  const password = document.getElementById('conRegPassword')?.value.trim();
  const village = document.getElementById('conRegVillage')?.value.trim();
  const district = document.getElementById('conRegDistrict')?.value.trim();
  const languages = document.getElementById('conRegLanguages')?.value.trim();
  const area = document.getElementById('conRegArea')?.value.trim();
  const skills = [...document.querySelectorAll('input[name="connectorSkill"]:checked')].map(x => x.value);
  const consent = document.getElementById('conRegConsent')?.checked;

  if (!name || !age || !phone || !email || !password || password.length < 6 || !village || !district || !languages || !area) {
    showToast('Please complete all connector registration fields.');
    return;
  }
  if (!consent) {
    showToast('Please confirm the connector agreement.');
    return;
  }

  const p = {
    name, age, phone, email, languages, village, district, area, skills,
    status: 'Active', registeredAt: new Date().toISOString(), avatar: 'https://i.pravatar.cc/100?img=12'
  };

  saveConnectorProfile(p);
  localStorage.setItem('lokallink_connector_password', password);
  localStorage.setItem('lokallink_logged_in', 'true');
  localStorage.setItem('lokallink_role', 'connector');
  localStorage.setItem('lokallink_email', email);

  closeConnectorRegistration();

  const authGate = document.getElementById('authGate');
  const splash = document.getElementById('splash');
  if (authGate) authGate.style.display = 'none';
  if (splash) splash.style.display = 'none';

  applyRoleUI();
  goTo('connectorDashboard');
  showToast('Connector registration completed. Welcome to LokaLink.');
}

function openHostAssist() {
  if (authRole !== 'connector') {
    showToast('Only a Local Connector can register an assisted host.');
    return;
  }
  const modal = document.getElementById('hostAssistModal');
  if (modal) modal.classList.add('open');
}

function closeHostAssist() {
  const modal = document.getElementById('hostAssistModal');
  if (modal) modal.classList.remove('open');
}

function submitHostAssist() {
  const name = document.getElementById('assistName')?.value.trim();
  const age = document.getElementById('assistAge')?.value.trim();
  const phone = document.getElementById('assistPhone')?.value.trim();
  const village = document.getElementById('assistVillage')?.value.trim();
  const occupation = document.getElementById('assistOccupation')?.value.trim();
  const experience = document.getElementById('assistExperience')?.value.trim();
  const price = Number(document.getElementById('assistPrice')?.value);
  const duration = document.getElementById('assistDuration')?.value.trim();
  const description = document.getElementById('assistDescription')?.value.trim();
  const relation = document.getElementById('assistRelation')?.value;
  const consent = document.getElementById('assistConsent')?.checked;

  if (!name || !age || !phone || !village || !occupation || !experience || !price || !duration || !description) {
    showToast('Please complete the host registration fields.');
    return;
  }
  if (!consent) {
    showToast('Host consent is required before registration.');
    return;
  }

  const list = getAssistedHosts();
  list.unshift({
    id: 'assisted-' + Date.now(),
    name, age, phone, village, occupation, experience, price, duration, description, relation,
    connector: connectorUser().name, status: 'Awaiting Host Confirmation', createdAt: new Date().toISOString()
  });
  saveAssistedHosts(list);

  document.querySelectorAll('#hostAssistModal input, #hostAssistModal textarea').forEach(el => {
    if (el.type !== 'checkbox') el.value = '';
  });
  const consentCheckbox = document.getElementById('assistConsent');
  if (consentCheckbox) consentCheckbox.checked = false;

  closeHostAssist();
  renderConnectorHosts();
  renderConnectorDashboard();
  showToast('Local host registration submitted for confirmation.');
  goTo('connectorHosts');
}

let connectorRequestContext = null;
function openConnectorRequest(context) {
  if (authRole !== 'traveler') {
    showToast('Connector requests are available for Travelers.');
    return;
  }
  connectorRequestContext = context || {};
  const c = document.getElementById('connectorRequestContext');
  if (c) c.textContent = `${connectorRequestContext.title || 'Your experience'}${connectorRequestContext.date ? ' · ' + connectorRequestContext.date : ''}. Tell a local connector what you need.`;

  document.querySelectorAll('input[name="connectorNeed"]').forEach(x => x.checked = false);
  const msgField = document.getElementById('connectorRequestMessage');
  if (msgField) msgField.value = '';

  const modal = document.getElementById('connectorRequestModal');
  if (modal) modal.classList.add('open');
}

function closeConnectorRequest() {
  const modal = document.getElementById('connectorRequestModal');
  if (modal) modal.classList.remove('open');
}

function submitConnectorRequest() {
  const needs = [...document.querySelectorAll('input[name="connectorNeed"]:checked')].map(x => x.value);
  const messageField = document.getElementById('connectorRequestMessage');
  const message = messageField ? messageField.value.trim() : '';

  if (!needs.length) {
    showToast('Choose at least one assistance need.');
    return;
  }

  const u = getUser();
  const list = getConnectorRequests();
  list.unshift({
    id: 'connect-' + Date.now(),
    travelerName: u.name,
    travelerEmail: u.email,
    experienceTitle: connectorRequestContext?.title || 'Local Experience',
    date: connectorRequestContext?.date || '',
    time: connectorRequestContext?.time || '',
    location: connectorRequestContext?.location || 'Lombok',
    bookingId: connectorRequestContext?.bookingId || '',
    needs,
    message,
    status: 'Pending',
    createdAt: new Date().toISOString()
  });

  saveConnectorRequests(list);
  closeConnectorRequest();
  showToast('Connector request sent.');
}

function renderConnectorDashboard() {
  const p = connectorUser();
  const req = getConnectorRequests();
  const hosts = getAssistedHosts();
  const accepted = req.filter(r => r.status === 'Accepted');

  const n = document.getElementById('connectorDashName');
  if (n) n.textContent = p.name.split(' ')[0];

  const a = document.getElementById('connectorReqCount');
  if (a) a.textContent = req.filter(r => r.status === 'Pending').length;

  const b = document.getElementById('connectorConnCount');
  if (b) b.textContent = accepted.length;

  const c = document.getElementById('connectorHostCount');
  if (c) c.textContent = hosts.length;

  const up = document.getElementById('connectorUpcoming');
  if (up) {
    up.innerHTML = accepted.length ? accepted.slice(0, 2).map(r => `
      <div class="connector-card">
        <div class="connector-card-top">
          <div>
            <h3>${escapeHtml(r.travelerName)}</h3>
            <p>${escapeHtml(r.experienceTitle)} · ${escapeHtml(r.location || 'Lombok')}<br>${escapeHtml(r.date || 'Date not set')} ${r.time ? '· ' + escapeHtml(r.time) : ''}</p>
          </div>
          <span class="connector-status">Accepted</span>
        </div>
        <button class="btn btn-light" style="margin-top:10px" onclick="goTo('connectorConnections')">View connection</button>
      </div>
    `).join('') : '<div class="connector-card"><p>No accepted connections yet. Check Requests for new traveler assistance.</p></div>';
  }
}

function renderConnectorRequests() {
  const root = document.getElementById('connectorRequestList');
  if (!root) return;
  const list = getConnectorRequests();
  root.innerHTML = list.length ? list.map(r => `
    <div class="connector-card">
      <div class="connector-card-top">
        <div>
          <h3>${escapeHtml(r.travelerName)}</h3>
          <p><strong>${escapeHtml(r.experienceTitle)}</strong><br>${escapeHtml(r.location || 'Lombok')} · ${escapeHtml(r.date || 'Date not set')} ${r.time ? '· ' + escapeHtml(r.time) : ''}</p>
        </div>
        <span class="connector-status" style="${r.status === 'Pending' ? 'background:#fff5e9;color:#a76015' : r.status === 'Declined' ? 'background:#fceeee;color:#a33' : 'background:#eef7f1;color:#2f7d55'}">${escapeHtml(r.status)}</span>
      </div>
      <p style="margin-top:8px">Needs: ${escapeHtml((r.needs || []).join(' · '))}</p>
      <p style="margin-top:5px">${escapeHtml(r.message || 'No additional message.')}</p>
      ${r.status === 'Pending' ? `
        <div style="display:flex;gap:8px;margin-top:12px">
          <button class="btn btn-primary" onclick="respondConnectorRequest('${escapeAttr(r.id)}','Accepted')">Accept</button>
          <button class="btn btn-light" onclick="respondConnectorRequest('${escapeAttr(r.id)}','Declined')">Decline</button>
        </div>
      ` : ''}
    </div>
  `).join('') : '<div class="connector-card"><p>No connector requests yet.</p></div>';
}

function respondConnectorRequest(id, status) {
  const list = getConnectorRequests();
  const r = list.find(x => x.id === id);
  if (!r) return;
  r.status = status;
  r.connectorName = connectorUser().name;
  r.respondedAt = new Date().toISOString();
  saveConnectorRequests(list);
  renderConnectorRequests();
  renderConnectorDashboard();
  showToast(status === 'Accepted' ? 'Connection accepted.' : 'Request declined.');
}

function renderConnectorConnections() {
  const root = document.getElementById('connectorConnectionList');
  if (!root) return;
  const list = getConnectorRequests().filter(r => r.status === 'Accepted');
  root.innerHTML = list.length ? list.map(r => `
    <div class="connector-card">
      <div class="connector-card-top">
        <div>
          <h3>${escapeHtml(r.travelerName)}</h3>
          <p>${escapeHtml(r.experienceTitle)}<br>${escapeHtml(r.location || 'Lombok')} · ${escapeHtml(r.date || '')}</p>
        </div>
        <span class="connector-status">Active</span>
      </div>
      <p style="margin-top:8px">${escapeHtml((r.needs || []).join(' · '))}</p>
      <button class="btn btn-light" style="margin-top:10px" onclick="contactTraveler('${escapeAttr(r.id)}')">Contact Traveler</button>
    </div>
  `).join('') : '<div class="connector-card"><p>No active connections.</p></div>';
}

function contactTraveler(id) {
  const r = getConnectorRequests().find(x => x.id === id);
  if (!r) return;
  if (r.travelerEmail) {
    window.location.href = `mailto:${r.travelerEmail}?subject=${encodeURIComponent('LokaLink Connector - ' + r.experienceTitle)}&body=${encodeURIComponent('Halo ' + r.travelerName + ', saya ' + connectorUser().name + ' dari LokaLink. Saya menerima permintaan Connector Anda.')}`;
  } else {
    showToast('Traveler contact is not available.');
  }
}

function renderConnectorHosts() {
  const root = document.getElementById('assistedHostList');
  if (!root) return;
  const list = getAssistedHosts();
  root.innerHTML = list.length ? list.map(h => `
    <div class="connector-card">
      <div class="connector-card-top">
        <div>
          <h3>${escapeHtml(h.name)}</h3>
          <p>${escapeHtml(h.occupation)} · ${escapeHtml(h.village)}<br>${escapeHtml(h.experience)} · ${formatIDR(h.price)}</p>
        </div>
        <span class="connector-status" style="${h.status === 'Active' ? '' : 'background:#fff5e9;color:#a76015'}">${escapeHtml(h.status)}</span>
      </div>
      <p style="margin-top:8px">${escapeHtml(h.description)}</p>
      <small style="font-size:8px;color:var(--muted)">Assisted by ${escapeHtml(h.connector)}</small>
    </div>
  `).join('') : '<div class="connector-card"><p>You have not registered any local hosts yet.</p></div>';
}

function renderConnectorImpact() {
  const req = getConnectorRequests();
  const hosts = getAssistedHosts();
  const acc = req.filter(r => r.status === 'Accepted');

  const a = document.getElementById('impactConnections');
  if (a) a.textContent = acc.length;
  const b = document.getElementById('impactHosts');
  if (b) b.textContent = hosts.length;
  const c = document.getElementById('impactExperiences');
  if (c) c.textContent = hosts.length;
}

function openConnectorProfileEditor() {
  const p = connectorUser();
  const name = prompt('Connector name', p.name);
  if (name === null) return;
  const village = prompt('Village / Desa', p.village || '');
  if (village === null) return;
  const area = prompt('Service area', p.area || '');
  if (area === null) return;

  saveConnectorProfile({ ...p, name, village, area });
  applyRoleUI();
  showToast('Connector profile updated.');
}

function activateConnectorScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = '';
  });
  const t = document.getElementById(id);
  if (!t) return;
  t.classList.add('active');
  t.style.display = 'block';

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.target === id));
  document.querySelectorAll('.desktop-link').forEach(btn => btn.classList.toggle('active', btn.dataset.target === id));

  if (id === 'connectorDashboard') renderConnectorDashboard();
  if (id === 'connectorRequests') renderConnectorRequests();
  if (id === 'connectorConnections') renderConnectorConnections();
  if (id === 'connectorHosts') renderConnectorHosts();
  if (id === 'connectorImpact') renderConnectorImpact();
  if (id === 'profile') renderProfile();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
