// ============================================
// DESA TANJUNGSARI - APP v7 (FINAL HIJAU PUTIH)
// ============================================

// ---------- AKUN ADMIN ----------
var ADMIN = { username: 'bx47z', password: 'bx47z' };

// ---------- NOMOR WA PEGAWAI DESA ----------
var WA_PEGAWAI = '6287890768114';

// ---------- DEFAULT DATA ----------
var DEFAULT_DATA = {
    profil: [
        { icon: 'fa-history', title: 'Sejarah', desc: 'Desa Tanjungsari dibentuk berdasarkan Perda Kab. Ciamis No. 13 Tahun 2012 sebagai pemekaran dari Desa Langkapsari. Terdiri dari 2 Dusun: Cikuya dan Tanjung, dengan luas 4.052,080 Ha.' },
        { icon: 'fa-mountain', title: 'Geografis', desc: 'Terletak di Kec. Banjarsari, Kab. Ciamis. Berbatasan dengan Desa Sukasari (Utara), Desa Pasawahan (Selatan), Desa Cikaso (Barat), Desa Cibadak & Kawasen (Timur).' },
        { icon: 'fa-users', title: 'Kependudukan', desc: 'Memiliki 3.571 jiwa penduduk dengan 1.152 Kepala Keluarga. Mayoritas berprofesi sebagai petani dan pembudidaya ikan gurame.' },
        { icon: 'fa-fish', title: 'Potensi Unggulan', desc: 'Dikenal sebagai "Kampung Gurame". Terdapat potensi wisata Curug Leuwi Pampiran dan Curug Panganten.' }
    ],
    layanan: [
        { id: 1, icon: 'fa-home', title: 'Surat Keterangan Domisili', desc: 'Untuk keperluan administrasi domisili' },
        { id: 2, icon: 'fa-store', title: 'Surat Keterangan Usaha', desc: 'Untuk keperluan izin usaha dan UMKM' },
        { id: 3, icon: 'fa-hand-holding-heart', title: 'Surat Keterangan Tidak Mampu', desc: 'Untuk keperluan bantuan sosial' },
        { id: 4, icon: 'fa-id-badge', title: 'Surat Pengantar SKCK', desc: 'Untuk keperluan pembuatan SKCK' },
        { id: 5, icon: 'fa-baby', title: 'Surat Keterangan Kelahiran', desc: 'Untuk keperluan akta kelahiran' },
        { id: 6, icon: 'fa-cross', title: 'Surat Keterangan Kematian', desc: 'Untuk keperluan administrasi kematian' },
        { id: 7, icon: 'fa-music', title: 'Surat Izin Keramaian', desc: 'Untuk keperluan acara dan hajatan' },
        { id: 8, icon: 'fa-heart', title: 'Surat Pengantar Nikah', desc: 'Untuk keperluan pernikahan (N1-N4)' }
    ],
    berita: [
        { id: 1, tanggal: '2026-03-05', judul: 'Safari Ramadhan di Desa Tanjungsari', konten: 'Polsek Banjarsari menghadiri Safari Ramadhan tingkat Kecamatan Banjaranyar di Aula Desa Tanjungsari.' },
        { id: 2, tanggal: '2026-01-23', judul: 'Penetapan KPM BLT Desa 2026', konten: 'Kepala Desa menetapkan 7 keluarga sebagai Penerima Manfaat BLT Desa Tahun Anggaran 2026 sebesar Rp 150.000/bulan.' },
        { id: 3, tanggal: '2023-12-17', judul: 'Expo Pembudidaya Perikanan ke-3', konten: 'Bupati Ciamis membuka Expo PPC ke-3 di Desa Tanjungsari, berharap desa ini menjadi "Kampung Gurame".' }
    ],
    aduan: [],
    profilDesa: {
        alamat: 'Jl. Desa Tanjungsari Kacamatan No.165, Banjaranyar, Cikaso, Kec. Banjarsari, Kab. Ciamis, Jawa Barat 46383',
        telepon: '(0265) 3183004',
        wa: '0878-9076-8114',
        email: 'tanjungsaricms@gmail.com',
        kadesNama: 'Kepala Desa Tanjungsari',
        kadesSambutan: 'Assalamualaikum warahmatullahi wabarakatuh. Selamat datang di website resmi Desa Tanjungsari. Semoga website ini dapat memberikan manfaat bagi seluruh masyarakat.',
        visi: 'Terwujudnya Desa Tanjungsari yang Maju, Mandiri, dan Sejahtera Melalui Pemerintahan yang Bersih dan Pelayanan Prima.',
        misi: [
            'Meningkatkan kualitas pelayanan publik kepada masyarakat',
            'Membangun infrastruktur desa yang merata dan berkualitas',
            'Mengembangkan potensi ekonomi lokal terutama budidaya ikan gurame',
            'Meningkatkan kualitas SDM melalui pendidikan dan kesehatan',
            'Melestarikan budaya dan kearifan lokal Desa Tanjungsari'
        ]
    }
};

// ---------- STATE ----------
var currentUser = null;
var map = null;

// ---------- HELPER ----------
function $(id) { return document.getElementById(id); }

function getData(key) {
    try {
        var stored = localStorage.getItem('tanjungsari_' + key);
        if (stored) return JSON.parse(stored);
        localStorage.setItem('tanjungsari_' + key, JSON.stringify(DEFAULT_DATA[key]));
        return DEFAULT_DATA[key];
    } catch(e) { return DEFAULT_DATA[key]; }
}

function setData(key, data) {
    try {
        localStorage.setItem('tanjungsari_' + key, JSON.stringify(data));
        renderPublic();
    } catch(e) { console.error(e); }
}

function formatTanggal(tgl) {
    if (!tgl) return '-';
    try {
        var d = new Date(tgl);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch(e) { return tgl; }
}

function hideForm(id) {
    var el = $(id);
    if (el) el.style.display = 'none';
}

// ---------- ROUTING ----------
function showPage(page) {
    $('page-public').classList.add('page-hidden');
    $('page-login').classList.add('page-hidden');
    $('page-admin').classList.add('page-hidden');

    if (page === 'public') {
        $('page-public').classList.remove('page-hidden');
    } else if (page === 'login') {
        $('page-login').classList.remove('page-hidden');
    } else if (page === 'admin') {
        if (!currentUser) { showPage('login'); return; }
        $('page-admin').classList.remove('page-hidden');
        $('adminGreeting').textContent = 'Halo, ' + currentUser.username;
        loadAdminPanel();
    }
    $('navMenu').classList.remove('open');
    window.scrollTo(0, 0);
}

// ---------- LOGIN ----------
function handleLogin(e) {
    e.preventDefault();
    var username = $('loginUsername').value.trim();
    var password = $('loginPassword').value;

    if (username !== ADMIN.username || password !== ADMIN.password) {
        showToast('Username atau password salah!', 'fa-exclamation-circle');
        return;
    }
    currentUser = { username: username };
    try { sessionStorage.setItem('tanjungsari_admin', username); } catch(e){}
    showToast('Login berhasil!', 'fa-check-circle');
    $('loginForm').reset();
    showPage('admin');
}

function handleLogout() {
    currentUser = null;
    try { sessionStorage.removeItem('tanjungsari_admin'); } catch(e){}
    showToast('Anda telah keluar', 'fa-sign-out-alt');
    showPage('public');
}

function checkSession() {
    try {
        var saved = sessionStorage.getItem('tanjungsari_admin');
        if (saved) currentUser = { username: saved };
    } catch(e) { currentUser = null; }
}

// ---------- RENDER PUBLIC ----------
function renderPublic() {
    try { renderProfil(); } catch(e) { console.error(e); }
    try { renderKadesVisiMisi(); } catch(e) { console.error(e); }
    try { renderLayanan(); } catch(e) { console.error(e); }
    try { renderBerita(); } catch(e) { console.error(e); }
    try { renderProfilDesa(); } catch(e) { console.error(e); }
}

function renderProfil() {
    var grid = $('profilGrid');
    if (!grid) return;
    var data = getData('profil');
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += '<div class="profil-card reveal">';
        html += '<div class="profil-icon"><i class="fas ' + data[i].icon + '"></i></div>';
        html += '<h3>' + data[i].title + '</h3>';
        html += '<p>' + data[i].desc + '</p>';
        html += '</div>';
    }
    grid.innerHTML = html;
}

function renderKadesVisiMisi() {
    var data = getData('profilDesa');
    if ($('kadesNama')) $('kadesNama').textContent = data.kadesNama;
    if ($('kadesSambutan')) $('kadesSambutan').textContent = data.kadesSambutan;
    if ($('visiText')) $('visiText').textContent = data.visi;
    if ($('misiList')) {
        var html = '';
        for (var i = 0; i < data.misi.length; i++) {
            html += '<li>' + data.misi[i] + '</li>';
        }
        $('misiList').innerHTML = html;
    }
}

function renderLayanan() {
    var grid = $('layananGrid');
    if (!grid) return;
    var data = getData('layanan');
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += '<div class="layanan-card reveal" onclick="ajukanSurat(\'' + data[i].title.replace(/'/g, "\\'") + '\')">';
        html += '<div class="layanan-icon"><i class="fas ' + data[i].icon + '"></i></div>';
        html += '<h3>' + data[i].title + '</h3>';
        html += '<p>' + data[i].desc + '</p>';
        html += '</div>';
    }
    grid.innerHTML = html;
    var fl = $('footerLayanan');
    if (fl) {
        var fhtml = '';
        for (var j = 0; j < Math.min(4, data.length); j++) {
            fhtml += '<li><a href="#layanan">' + data[j].title + '</a></li>';
        }
        fl.innerHTML = fhtml;
    }
}

function renderBerita() {
    var grid = $('beritaGrid');
    if (!grid) return;
    var data = getData('berita');
    data.sort(function(a, b) { return new Date(b.tanggal) - new Date(a.tanggal); });
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += '<div class="berita-card reveal">';
        html += '<div class="berita-tanggal"><i class="fas fa-calendar"></i> ' + formatTanggal(data[i].tanggal) + '</div>';
        html += '<h3>' + data[i].judul + '</h3>';
        html += '<p>' + data[i].konten + '</p>';
        html += '</div>';
    }
    grid.innerHTML = html;
}

function renderProfilDesa() {
    var data = getData('profilDesa');
    if ($('infoAlamat')) $('infoAlamat').textContent = data.alamat;
    if ($('infoKontak')) {
        var html = '<p><i class="fas fa-phone"></i> ' + data.telepon + '</p>';
        html += '<p><i class="fab fa-whatsapp"></i> ' + data.wa + '</p>';
        html += '<p><i class="fas fa-envelope"></i> ' + data.email + '</p>';
        $('infoKontak').innerHTML = html;
    }
    if ($('btnGoogleMaps')) $('btnGoogleMaps').href = 'https://maps.google.com/?q=' + encodeURIComponent(data.alamat);
    if ($('footerKontak')) {
        var fhtml = '<li><i class="fas fa-phone"></i> ' + data.telepon + '</li>';
        fhtml += '<li><i class="fab fa-whatsapp"></i> ' + data.wa + '</li>';
        fhtml += '<li><i class="fas fa-envelope"></i> ' + data.email + '</li>';
        $('footerKontak').innerHTML = fhtml;
    }
}

// ---------- AJUKAN SURAT (via WA Pegawai) ----------
function ajukanSurat(jenis) {
    var pesan = encodeURIComponent(
        '*PENGAJUAN SURAT - DESA TANJUNGSARI*\n\n' +
        'Assalamualaikum, saya ingin mengajukan:\n\n' +
        'Jenis Surat: ' + jenis + '\n\n' +
        'Mohon informasi persyaratan selanjutnya. Terima kasih!'
    );
    window.open('https://wa.me/' + WA_PEGAWAI + '?text=' + pesan, '_blank');
    showToast('Pengajuan ' + jenis + ' dikirim ke WhatsApp', 'fa-file-alt');
}

// ---------- KIRIM ADUAN ----------
function kirimAduan(e) {
    e.preventDefault();
    var nama = $('aduanNama').value.trim();
    var wa = $('aduanWA').value.trim();
    var jenis = $('aduanJenis').value;
    var pesan = $('aduanPesan').value.trim();

    if (!nama || !wa || !jenis || !pesan) {
        showToast('Lengkapi semua data!', 'fa-exclamation-circle');
        return;
    }

    // Simpan aduan ke localStorage
    var aduanList = getData('aduan');
    var newId = 1;
    for (var j = 0; j < aduanList.length; j++) if (aduanList[j].id >= newId) newId = aduanList[j].id + 1;
    aduanList.push({
        id: newId,
        nama: nama,
        wa: wa,
        jenis: jenis,
        pesan: pesan,
        tanggal: new Date().toISOString(),
        status: 'Terkirim'
    });
    setData('aduan', aduanList);

    // Buat pesan WhatsApp
    var waPesan = encodeURIComponent(
        '*ADUAN / KONSULTASI DESA TANJUNGSARI*\n\n' +
        'Nama: ' + nama + '\n' +
        'WhatsApp: ' + wa + '\n' +
        'Jenis: ' + jenis + '\n\n' +
        'Pesan:\n' + pesan + '\n\n' +
        '— Dikirim dari Website Desa Tanjungsari'
    );

    window.open('https://wa.me/' + WA_PEGAWAI + '?text=' + waPesan, '_blank');
    showToast('Aduan berhasil dikirim!', 'fa-paper-plane');
    $('aduanForm').reset();
}

// ---------- MAPS ----------
function initMap() {
    var el = $('map');
    if (!el || map || typeof L === 'undefined') return;
    try {
        map = L.map('map', { scrollWheelZoom: false }).setView([-7.3264, 108.3536], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 18
        }).addTo(map);
        var icon = L.divIcon({
            html: '<div style="background:#2E7D32;width:24px;height:24px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,0.3);"></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        L.marker([-7.3264, 108.3536], { icon: icon }).addTo(map).bindPopup('<strong>Kantor Desa Tanjungsari</strong>').openPopup();
    } catch(e) { console.error(e); }
}

// ---------- ADMIN PANEL ----------
function loadAdminPanel() {
    try { renderDashboardStats(); } catch(e) { console.error(e); }
    try { renderAdminLayananList(); } catch(e) { console.error(e); }
    try { renderAdminBeritaList(); } catch(e) { console.error(e); }
    try { renderAdminAduanList(); } catch(e) { console.error(e); }
    try { loadProfilForm(); } catch(e) { console.error(e); }
}

function renderDashboardStats() {
    var el = $('dashStats');
    if (!el) return;
    var layanan = getData('layanan');
    var berita = getData('berita');
    var aduan = getData('aduan');
    var html = '';
    html += '<div class="dash-stat"><div class="icon"><i class="fas fa-file-alt"></i></div><div class="value">' + layanan.length + '</div><div class="label">Layanan</div></div>';
    html += '<div class="dash-stat"><div class="icon"><i class="fas fa-newspaper"></i></div><div class="value">' + berita.length + '</div><div class="label">Berita</div></div>';
    html += '<div class="dash-stat"><div class="icon"><i class="fas fa-inbox"></i></div><div class="value">' + aduan.length + '</div><div class="label">Aduan</div></div>';
    el.innerHTML = html;
}

// LAYANAN ADMIN
function renderAdminLayananList() {
    var list = $('adminLayananList');
    if (!list) return;
    var data = getData('layanan');
    if (data.length === 0) { list.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px;">Belum ada layanan.</p>'; return; }
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += '<div class="admin-item">';
        html += '<div class="admin-item-info"><h4><i class="fas ' + data[i].icon + '" style="color:var(--primary);margin-right:6px;"></i> ' + data[i].title + '</h4><p>' + data[i].desc + '</p></div>';
        html += '<div class="admin-item-actions">';
        html += '<button class="btn-edit" onclick="editLayanan(' + data[i].id + ')"><i class="fas fa-edit"></i></button>';
        html += '<button class="btn-delete" onclick="deleteLayanan(' + data[i].id + ')"><i class="fas fa-trash"></i></button>';
        html += '</div></div>';
    }
    list.innerHTML = html;
}

function showLayananForm() {
    $('layananForm').style.display = 'block';
    $('layananId').value = '';
    $('layananIcon').value = '';
    $('layananNama').value = '';
    $('layananDesc').value = '';
}

function saveLayanan() {
    var id = $('layananId').value;
    var icon = $('layananIcon').value.trim();
    var nama = $('layananNama').value.trim();
    var desc = $('layananDesc').value.trim();
    if (!icon || !nama || !desc) { showToast('Lengkapi data!', 'fa-exclamation-circle'); return; }
    var data = getData('layanan');
    if (id) {
        for (var i = 0; i < data.length; i++) if (data[i].id == id) data[i] = { id: parseInt(id), icon: icon, title: nama, desc: desc };
    } else {
        var newId = 1;
        for (var j = 0; j < data.length; j++) if (data[j].id >= newId) newId = data[j].id + 1;
        data.push({ id: newId, icon: icon, title: nama, desc: desc });
    }
    setData('layanan', data);
    hideForm('layananForm');
    renderAdminLayananList();
    renderDashboardStats();
    showToast('Layanan disimpan!', 'fa-check-circle');
}

function editLayanan(id) {
    var data = getData('layanan');
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            $('layananForm').style.display = 'block';
            $('layananId').value = data[i].id;
            $('layananIcon').value = data[i].icon;
            $('layananNama').value = data[i].title;
            $('layananDesc').value = data[i].desc;
            return;
        }
    }
}

function deleteLayanan(id) {
    if (!confirm('Yakin ingin menghapus?')) return;
    var data = getData('layanan');
    var newData = [];
    for (var i = 0; i < data.length; i++) if (data[i].id !== id) newData.push(data[i]);
    setData('layanan', newData);
    renderAdminLayananList();
    renderDashboardStats();
    showToast('Layanan dihapus!', 'fa-trash');
}

// BERITA ADMIN
function renderAdminBeritaList() {
    var list = $('adminBeritaList');
    if (!list) return;
    var data = getData('berita');
    data.sort(function(a, b) { return new Date(b.tanggal) - new Date(a.tanggal); });
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += '<div class="admin-item">';
        html += '<div class="admin-item-info"><h4>' + data[i].judul + '</h4><p>' + formatTanggal(data[i].tanggal) + '</p></div>';
        html += '<div class="admin-item-actions">';
        html += '<button class="btn-edit" onclick="editBerita(' + data[i].id + ')"><i class="fas fa-edit"></i></button>';
        html += '<button class="btn-delete" onclick="deleteBerita(' + data[i].id + ')"><i class="fas fa-trash"></i></button>';
        html += '</div></div>';
    }
    list.innerHTML = html || '<p style="text-align:center;color:var(--text-muted);">Belum ada berita.</p>';
}

function showBeritaForm() {
    $('beritaForm').style.display = 'block';
    $('beritaId').value = '';
    $('beritaJudul').value = '';
    $('beritaTanggal').value = '';
    $('beritaKonten').value = '';
}

function saveBerita() {
    var id = $('beritaId').value;
    var judul = $('beritaJudul').value.trim();
    var tanggal = $('beritaTanggal').value;
    var konten = $('beritaKonten').value.trim();
    if (!judul || !tanggal || !konten) { showToast('Lengkapi data!', 'fa-exclamation-circle'); return; }
    var data = getData('berita');
    if (id) {
        for (var i = 0; i < data.length; i++) if (data[i].id == id) data[i] = { id: parseInt(id), judul: judul, tanggal: tanggal, konten: konten };
    } else {
        var newId = 1;
        for (var j = 0; j < data.length; j++) if (data[j].id >= newId) newId = data[j].id + 1;
        data.push({ id: newId, judul: judul, tanggal: tanggal, konten: konten });
    }
    setData('berita', data);
    hideForm('beritaForm');
    renderAdminBeritaList();
    renderDashboardStats();
    showToast('Berita disimpan!', 'fa-check-circle');
}

function editBerita(id) {
    var data = getData('berita');
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            $('beritaForm').style.display = 'block';
            $('beritaId').value = data[i].id;
            $('beritaJudul').value = data[i].judul;
            $('beritaTanggal').value = data[i].tanggal;
            $('beritaKonten').value = data[i].konten;
            return;
        }
    }
}

function deleteBerita(id) {
    if (!confirm('Yakin ingin menghapus?')) return;
    var data = getData('berita');
    var newData = [];
    for (var i = 0; i < data.length; i++) if (data[i].id !== id) newData.push(data[i]);
    setData('berita', newData);
    renderAdminBeritaList();
    renderDashboardStats();
    showToast('Berita dihapus!', 'fa-trash');
}

// ADUAN ADMIN
function renderAdminAduanList() {
    var list = $('adminAduanList');
    if (!list) return;
    var data = getData('aduan');
    if (data.length === 0) { list.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px;">Belum ada aduan masuk.</p>'; return; }
    data.sort(function(a, b) { return new Date(b.tanggal) - new Date(a.tanggal); });
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += '<div class="admin-item">';
        html += '<div class="admin-item-info"><h4>' + data[i].nama + ' — ' + data[i].jenis + '</h4>';
        html += '<p><i class="fab fa-whatsapp"></i> ' + data[i].wa + ' • ' + formatTanggal(data[i].tanggal) + '</p>';
        html += '<p style="margin-top:6px;color:var(--text);font-size:0.82rem;">' + data[i].pesan + '</p></div>';
        html += '<div class="admin-item-actions">';
        html += '<button class="btn-delete" onclick="deleteAduan(' + data[i].id + ')"><i class="fas fa-trash"></i></button>';
        html += '</div></div>';
    }
    list.innerHTML = html;
}

function deleteAduan(id) {
    if (!confirm('Yakin ingin menghapus aduan ini?')) return;
    var data = getData('aduan');
    var newData = [];
    for (var i = 0; i < data.length; i++) if (data[i].id !== id) newData.push(data[i]);
    setData('aduan', newData);
    renderAdminAduanList();
    renderDashboardStats();
    showToast('Aduan dihapus!', 'fa-trash');
}

function clearAduan() {
    if (!confirm('Yakin ingin menghapus SEMUA aduan?')) return;
    setData('aduan', []);
    renderAdminAduanList();
    renderDashboardStats();
    showToast('Semua aduan dihapus!', 'fa-trash');
}

// PROFIL ADMIN
function loadProfilForm() {
    var data = getData('profilDesa');
    if ($('editKadesNama')) $('editKadesNama').value = data.kadesNama;
    if ($('editKadesSambutan')) $('editKadesSambutan').value = data.kadesSambutan;
    if ($('editVisi')) $('editVisi').value = data.visi;
    if ($('editMisi')) $('editMisi').value = data.misi.join('\n');
    if ($('editAlamat')) $('editAlamat').value = data.alamat;
    if ($('editTelepon')) $('editTelepon').value = data.telepon;
    if ($('editWA')) $('editWA').value = data.wa;
    if ($('editEmail')) $('editEmail').value = data.email;
}

function saveProfil() {
    var data = {
        kadesNama: $('editKadesNama').value.trim(),
        kadesSambutan: $('editKadesSambutan').value.trim(),
        visi: $('editVisi').value.trim(),
        misi: $('editMisi').value.split('\n').filter(function(m) { return m.trim(); }),
        alamat: $('editAlamat').value.trim(),
        telepon: $('editTelepon').value.trim(),
        wa: $('editWA').value.trim(),
        email: $('editEmail').value.trim()
    };
    setData('profilDesa', data);
    showToast('Profil diperbarui!', 'fa-check-circle');
}

// ---------- TOAST ----------
function showToast(msg, icon) {
    var toast = $('toast');
    if (!toast) return;
    toast.querySelector('i').className = 'fas ' + (icon || 'fa-check-circle');
    $('toastMessage').textContent = msg;
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, 3500);
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', function() {
    var keys = ['profil', 'layanan', 'berita', 'aduan', 'profilDesa'];
    for (var i = 0; i < keys.length; i++) getData(keys[i]);

    renderPublic();
    setTimeout(initMap, 500);

    // Navigation
    var mt = $('menuToggle');
    var nm = $('navMenu');
    if (mt && nm) {
        mt.addEventListener('click', function() { nm.classList.toggle('open'); });
        var links = nm.querySelectorAll('a');
        for (var j = 0; j < links.length; j++) {
            links[j].addEventListener('click', function() { nm.classList.remove('open'); });
        }
    }

    // Admin tabs
    var tabs = document.querySelectorAll('.admin-tab');
    for (var k = 0; k < tabs.length; k++) {
        tabs[k].addEventListener('click', function() {
            var allTabs = document.querySelectorAll('.admin-tab');
            var allPanels = document.querySelectorAll('.admin-panel');
            for (var m = 0; m < allTabs.length; m++) allTabs[m].classList.remove('active');
            for (var n = 0; n < allPanels.length; n++) allPanels[n].classList.remove('active');
            this.classList.add('active');
            var target = $(this.dataset.tab);
            if (target) target.classList.add('active');
        });
    }

    // Scroll reveal
    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
            obs.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
            el.classList.add('active');
        });
    }

    // Counter animation
    var counters = document.querySelectorAll('.stat-number');
    var done = false;
    function runCounters() {
        for (var c = 0; c < counters.length; c++) {
            (function(counter) {
                var target = parseInt(counter.getAttribute('data-target'));
                var current = 0;
                var inc = target / 60;
                var interval = setInterval(function() {
                    current += inc;
                    if (current >= target) { current = target; clearInterval(interval); }
                    counter.textContent = Math.floor(current).toLocaleString('id-ID');
                }, 30);
            })(counters[c]);
        }
    }
    setTimeout(function() { if (!done) { done = true; runCounters(); } }, 600);

    // Progress bar
    var pb = $('progressBar');
    if (pb) {
        window.addEventListener('scroll', function() {
            var st = window.scrollY;
            var dh = document.documentElement.scrollHeight - window.innerHeight;
            var p = (st / dh) * 100;
            pb.style.width = p + '%';
        });
    }

    // Navbar scrolled
    var nb = $('navbar');
    if (nb) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 30) nb.classList.add('scrolled');
            else nb.classList.remove('scrolled');
        });
    }

    // Active nav on scroll
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-menu a');
    window.addEventListener('scroll', function() {
        var current = '';
        sections.forEach(function(section) {
            var top = section.offsetTop - 120;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    });

    // Smooth scroll
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var a = 0; a < anchors.length; a++) {
        anchors[a].addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    checkSession();
});

console.log('%c✅ Desa Tanjungsari - v7 Loaded', 'color: #2E7D32; font-weight:bold; font-size:14px');
console.log('%c📋 AKUN ADMIN: bx47z / bx47z', 'color: #1B5E20; font-weight:bold');
console.log('%c📱 WA Pegawai: 6287890768114', 'color: #1B5E20; font-weight:bold');
