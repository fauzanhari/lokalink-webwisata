/* Booking Management & Reservation System */

function getBookingRecords() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(bookingStoreKey) || 'null');
  } catch (e) {
    data = null;
  }
  if (!Array.isArray(data)) {
    data = bookingSeed.map(b => ({ ...b }));
    localStorage.setItem(bookingStoreKey, JSON.stringify(data));
  }
  return data;
}

function saveBookingRecords(data) {
  localStorage.setItem(bookingStoreKey, JSON.stringify(data));
  bookings = data.filter(b => b.travelerEmail === getUser().email);
}

function syncBookingRecords() {
  const data = getBookingRecords();
  bookings = data.filter(b => b.travelerEmail === getUser().email);
  return data;
}

function bookingStatusClass(status) {
  return String(status || 'Pending').toLowerCase().replace(/\s+/g, '-');
}

function bookingStatusLabel(status) {
  const labels = {
    Pending: 'Menunggu konfirmasi',
    Confirmed: 'Dikonfirmasi',
    Rejected: 'Ditolak',
    Completed: 'Selesai',
    Cancelled: 'Dibatalkan'
  };
  return uiLanguage === 'id' ? (labels[status] || status) : status;
}

function openBooking(title, price) {
  pendingBooking = { title, price };
  guestCount = 2;
  const gc = document.getElementById('guestCount');
  const be = document.getElementById('bookingExperience');
  const sn = document.getElementById('sumName');
  const sp = document.getElementById('sumPrice');
  const sg = document.getElementById('sumGuests');
  const st = document.getElementById('sumTotal');
  const bd = document.getElementById('bookingDate');

  if (gc) gc.textContent = guestCount;
  if (be) be.textContent = title;
  if (sn) sn.textContent = title;
  if (sp) sp.textContent = money(price);
  if (sg) sg.textContent = guestCount;
  if (st) st.textContent = money(price * guestCount);
  if (bd) bd.value = new Date().toISOString().slice(0, 10);

  const bf = document.getElementById('bookingForm');
  const bs = document.getElementById('bookingSuccess');
  const bm = document.getElementById('bookingModal');

  if (bf) bf.style.display = 'block';
  if (bs) bs.style.display = 'none';
  if (bm) bm.classList.add('open');

  const btn = document.querySelector('#bookingForm button[onclick="confirmBooking()"]');
  if (btn) btn.textContent = uiLanguage === 'id' ? 'Kirim Permintaan Booking' : 'Send Booking Request';
}

function openBookingFromDetail() {
  openBooking(currentExperience.title, currentExperience.price);
}

function closeBooking() {
  const bm = document.getElementById('bookingModal');
  if (bm) bm.classList.remove('open');
}

function changeGuests(delta) {
  guestCount = Math.max(1, Math.min(6, guestCount + delta));
  const gc = document.getElementById('guestCount');
  const sg = document.getElementById('sumGuests');
  const st = document.getElementById('sumTotal');

  if (gc) gc.textContent = guestCount;
  if (sg) sg.textContent = guestCount;
  if (st && pendingBooking) st.textContent = money(pendingBooking.price * guestCount);
}

function confirmBooking() {
  const dateInput = document.getElementById('bookingDate');
  const dateValue = dateInput ? dateInput.value : '';
  if (!dateValue) {
    showToast('Please choose a date first.');
    return;
  }

  const d = new Date(dateValue + 'T00:00:00');
  const pretty = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const hostInfo = {
    hostName: currentExperience.host || 'Local Host',
    hostEmail: currentExperience.hostEmail || 'host@lokallink.id',
    hostAvatar: currentExperience.avatar || 'assets/img/host_rafi_maulana.png'
  };

  const data = getBookingRecords();
  const record = {
    id: 'booking-' + Date.now(),
    travelerName: getUser().name,
    travelerEmail: getUser().email,
    title: currentExperience.title,
    experienceId: currentExperience.id,
    date: pretty,
    time: document.getElementById('bookingTime')?.value || '08:00 AM',
    guests: guestCount,
    price: Number(currentExperience.price),
    total: Number(currentExperience.price) * guestCount,
    status: 'Pending',
    hostName: hostInfo.hostName,
    hostEmail: hostInfo.hostEmail,
    hostAvatar: hostInfo.hostAvatar,
    category: currentExperience.category,
    location: currentExperience.location,
    duration: currentExperience.duration
  };

  data.unshift(record);
  saveBookingRecords(data);

  const successText = document.getElementById('successText');
  const successHeading = document.querySelector('#bookingSuccess h2');
  if (successText) successText.textContent = `${currentExperience.title} has been sent to the host for confirmation. You can check the status in My Bookings.`;
  if (successHeading) successHeading.textContent = 'Booking Request Sent';

  const bf = document.getElementById('bookingForm');
  const bs = document.getElementById('bookingSuccess');
  if (bf) bf.style.display = 'none';
  if (bs) bs.style.display = 'block';
}

function finishBooking() {
  closeBooking();
  closeDetail();
  goTo('bookings');
  showToast(uiLanguage === 'id' ? 'Permintaan booking berhasil dikirim.' : 'Booking request sent successfully.');
}

function renderTravelerBookingsV2() {
  const el = document.getElementById('bookingList');
  if (!el) return;
  const email = getUser().email;
  const list = getBookingRecords().filter(b => b.travelerEmail === email);
  if (!list.length) {
    el.innerHTML = `<div style="text-align:center;padding:30px;color:var(--muted);font-size:11px">Belum ada booking.</div>`;
    return;
  }
  el.innerHTML = list.map(b => `
    <article class="booking-card-v2">
      <div class="booking-top">
        <h3>${escapeHtml(b.title)}</h3>
        <span class="booking-status ${bookingStatusClass(b.status)}">${escapeHtml(bookingStatusLabel(b.status))}</span>
      </div>
      <p>${escapeHtml(b.hostName || 'Local Host')} · ${escapeHtml(b.location || 'Lombok')}</p>
      <div class="booking-meta-v2">
        <span>📅 ${escapeHtml(b.date)}</span>
        <span>◷ ${escapeHtml(b.time)}</span>
        <span>👥 ${b.guests}</span>
        <span>${formatIDR(b.total)}</span>
      </div>
      <div class="booking-actions-v2">
        <button class="btn btn-light" onclick="openBookingDetail('${escapeAttr(b.id)}')">Lihat Rincian</button>
        <button class="btn btn-primary" onclick="openBookingDetail('${escapeAttr(b.id)}')">Hubungi Host</button>
      </div>
    </article>
  `).join('');
}

function renderHostBookingsV2() {
  const root = document.getElementById('hostBookings');
  if (!root) return;
  const hostEmail = getUser().email;
  const list = getBookingRecords().filter(b => !b.hostEmail || b.hostEmail === hostEmail);
  root.innerHTML = `
    <div class="page-title">
      <h1>Booking Management</h1>
      <p>Review guest requests and update each booking status.</p>
    </div>
    <div class="booking-list" id="hostBookingListV2">
      ${list.length ? list.map(b => `
        <article class="booking-card-v2">
          <div class="booking-top">
            <h3>${escapeHtml(b.travelerName)} · ${escapeHtml(b.title)}</h3>
            <span class="booking-status ${bookingStatusClass(b.status)}">${escapeHtml(bookingStatusLabel(b.status))}</span>
          </div>
          <p>${escapeHtml(b.date)} · ${escapeHtml(b.time)} · ${b.guests} guests</p>
          <div class="booking-meta-v2">
            <span>${formatIDR(b.total)}</span>
            <span>Host: ${escapeHtml(b.hostName || 'You')}</span>
            <span>${escapeHtml(b.travelerEmail || '')}</span>
          </div>
          <div class="booking-actions-v2">
            <select class="host-status-select" aria-label="Change booking status" onchange="updateBookingStatus('${escapeAttr(b.id)}',this.value)">
              ${['Pending', 'Confirmed', 'Rejected', 'Completed', 'Cancelled'].map(st => `<option value="${st}" ${b.status === st ? 'selected' : ''}>${bookingStatusLabel(st)}</option>`).join('')}
            </select>
            <button class="btn btn-light" onclick="showBookingHostDetail('${escapeAttr(b.id)}')">View Details</button>
          </div>
        </article>
      `).join('') : `<div style="text-align:center;padding:30px;color:var(--muted);font-size:11px">No booking requests yet.</div>`}
    </div>
  `;
}

function openBookingDetail(id) {
  const b = getBookingRecords().find(x => x.id === id);
  if (!b) return;
  const content = document.getElementById('bookingDetailContent');
  if (!content) return;
  const canContact = !!b.hostEmail;
  content.innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
      <div>
        <h3 style="font-size:15px;margin:0 0 5px">${escapeHtml(b.title)}</h3>
        <p style="font-size:10px;color:var(--muted);margin:0">${escapeHtml(b.category || 'Local Experience')} · ${escapeHtml(b.location || 'Lombok')}</p>
      </div>
      <span class="booking-status ${bookingStatusClass(b.status)}">${escapeHtml(bookingStatusLabel(b.status))}</span>
    </div>
    <div class="booking-detail-grid">
      <div class="booking-detail-item"><small>Date</small><strong>${escapeHtml(b.date)}</strong></div>
      <div class="booking-detail-item"><small>Meeting time</small><strong>${escapeHtml(b.time)}</strong></div>
      <div class="booking-detail-item"><small>Guests</small><strong>${b.guests} ${b.guests === 1 ? 'guest' : 'guests'}</strong></div>
      <div class="booking-detail-item"><small>Duration</small><strong>${escapeHtml(b.duration || 'As scheduled')}</strong></div>
      <div class="booking-detail-item"><small>Price / person</small><strong>${formatIDR(b.price)}</strong></div>
      <div class="booking-detail-item"><small>Total</small><strong>${formatIDR(b.total)}</strong></div>
    </div>
    <div class="contact-host-box">
      <h3>Local Host</h3>
      <p><strong>${escapeHtml(b.hostName || 'Local Host')}</strong><br>${escapeHtml(b.hostEmail || 'Contact information is not available yet.')}</p>
      ${canContact ? `<button class="btn btn-primary btn-block" style="margin-top:10px" onclick="contactHost('${escapeAttr(b.id)}')">Hubungi Host</button>` : ''}
    </div>
    ${b.status === 'Pending' ? `<p style="font-size:9px;color:#8C857F;margin-top:12px">Booking ini masih menunggu konfirmasi dari host. Status akan berubah setelah host memproses permintaan.</p>` : ''}
  `;

  if (authRole === 'traveler') {
    const box = document.createElement('div');
    box.className = 'connector-card';
    box.style.marginTop = '12px';
    box.innerHTML = `
      <h3>Need local assistance?</h3>
      <p>A Youth Local Connector can help you find the location, communicate with your host, or accompany you locally.</p>
      <button class="btn btn-primary btn-block" style="margin-top:10px" onclick='openConnectorRequest(${JSON.stringify({ bookingId: b.id, title: b.title, date: b.date, time: b.time, location: b.location })})'>Find a Connector</button>
    `;
    content.appendChild(box);
  }

  const modal = document.getElementById('bookingDetailModal');
  if (modal) modal.classList.add('open');
}

function closeBookingDetail() {
  const modal = document.getElementById('bookingDetailModal');
  if (modal) modal.classList.remove('open');
}

function contactHost(id) {
  const b = getBookingRecords().find(x => x.id === id);
  if (!b) return;
  const email = b.hostEmail || '';
  if (email) {
    const subject = encodeURIComponent(`LokaLink Booking - ${b.title}`);
    const body = encodeURIComponent(`Halo ${b.hostName || 'Host'}, saya ${b.travelerName || 'Traveler'} ingin menghubungi Anda terkait booking ${b.title} pada ${b.date} pukul ${b.time}.`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  } else {
    showToast('Kontak host belum tersedia.');
  }
}

function showBookingHostDetail(id) {
  const b = getBookingRecords().find(x => x.id === id);
  if (!b) return;
  const content = document.getElementById('bookingDetailContent');
  if (!content) return;
  content.innerHTML = `
    <div>
      <h3 style="font-size:15px;margin:0 0 5px">${escapeHtml(b.title)}</h3>
      <p style="font-size:10px;color:var(--muted);margin:0">Guest: ${escapeHtml(b.travelerName)}</p>
    </div>
    <div class="booking-detail-grid">
      <div class="booking-detail-item"><small>Date</small><strong>${escapeHtml(b.date)}</strong></div>
      <div class="booking-detail-item"><small>Time</small><strong>${escapeHtml(b.time)}</strong></div>
      <div class="booking-detail-item"><small>Guests</small><strong>${b.guests}</strong></div>
      <div class="booking-detail-item"><small>Total</small><strong>${formatIDR(b.total)}</strong></div>
      <div class="booking-detail-item"><small>Traveler email</small><strong>${escapeHtml(b.travelerEmail || '-')}</strong></div>
      <div class="booking-detail-item"><small>Status</small><strong>${escapeHtml(bookingStatusLabel(b.status))}</strong></div>
    </div>
    <div class="form-group">
      <label>UPDATE STATUS</label>
      <select class="field" onchange="updateBookingStatus('${escapeAttr(b.id)}',this.value)">
        ${['Pending', 'Confirmed', 'Rejected', 'Completed', 'Cancelled'].map(st => `<option value="${st}" ${b.status === st ? 'selected' : ''}>${bookingStatusLabel(st)}</option>`).join('')}
      </select>
    </div>
  `;
  const modal = document.getElementById('bookingDetailModal');
  if (modal) modal.classList.add('open');
}

function updateBookingStatus(id, status) {
  const data = getBookingRecords();
  const item = data.find(b => b.id === id);
  if (!item) return;
  item.status = status;
  item.updatedAt = new Date().toISOString();
  saveBookingRecords(data);
  renderHostBookingsV2();
  renderTravelerBookingsV2();
  showToast(`Booking status updated to ${bookingStatusLabel(status)}.`);
}
