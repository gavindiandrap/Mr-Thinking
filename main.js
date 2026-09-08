document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================
     1. HIGHLIGHT NAVBAR AKTIF
  =================================================== */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });


  /* ===================================================
     2. SIMULASI REALTIME IOT SENSOR (Khusus dashboard.html)
  =================================================== */
  const valTemp = document.getElementById('val-temp');
  const valPh = document.getElementById('val-ph');
  const valPpm = document.getElementById('val-ppm');
  const btnPump = document.getElementById('btn-toggle-pump');
  const pumpStatus = document.getElementById('pump-status');

  if (valTemp && valPh && valPpm) {
    // Simulasi perubahan angka acak secara berkala
    setInterval(() => {
      const randomTemp = (24 + Math.random() * 2).toFixed(1);
      const randomPh = (5.8 + Math.random() * 0.8).toFixed(1);
      const randomPpm = Math.floor(1000 + Math.random() * 120);

      valTemp.innerText = `${randomTemp} °C`;
      valPh.innerText = randomPh;
      valPpm.innerText = randomPpm;
    }, 2500);

    let isPumpOn = true;
    btnPump.addEventListener('click', () => {
      isPumpOn = !isPumpOn;
      if (isPumpOn) {
        pumpStatus.innerText = "Status Pompa: AKTIF (AUTO)";
        pumpStatus.style.color = "var(--text-main)";
        btnPump.innerText = "Matikan Pompa Nutrisi 💧";
      } else {
        pumpStatus.innerText = "Status Pompa: MATI (MANUAL)";
        pumpStatus.style.color = "red";
        btnPump.innerText = "Nyalakan Pompa Nutrisi 💧";
      }
    });
  }


  /* ===================================================
     3. FILTER KATALOG HARDWARE (Khusus products.html)
  =================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const prodCards = document.querySelectorAll('.prod-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-cat');

        prodCards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-cat') === cat) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }


  /* ===================================================
     4. KALKULATOR HASIL PANEN (Khusus calculator.html)
  =================================================== */
  const cropSelect = document.getElementById('crop-select');
  const holesInput = document.getElementById('holes-input');
  const resYield = document.getElementById('res-yield');
  const resRevenue = document.getElementById('res-revenue');

  function calculateCrop() {
    if (!cropSelect || !holesInput) return;

    const pricePerKg = parseInt(cropSelect.value) * 1000; // Harga asumsi perkiraan
    const holes = parseInt(holesInput.value) || 0;

    // Asumsi: 1 lubang tanam menghasilkan rata-rata 0.15 kg
    const totalKg = (holes * 0.15).toFixed(1);
    const totalRev = totalKg * pricePerKg;

    resYield.innerText = `${totalKg} Kg`;
    resRevenue.innerText = `Rp ${totalRev.toLocaleString('id-ID')}`;
  }

  if (cropSelect && holesInput) {
    cropSelect.addEventListener('change', calculateCrop);
    holesInput.addEventListener('input', calculateCrop);
    calculateCrop();
  }


  /* ===================================================
     5. VALIDASI FORM PENDAFTARAN (Khusus join.html)
  =================================================== */
  const joinForm = document.getElementById('join-form');
  const joinAlert = document.getElementById('join-alert');

  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();

      if (!name || !email) {
        alert('Lengkapi nama dan email Anda terlebih dahulu!');
        return;
      }

      joinAlert.innerText = `Selamat datang, ${name}! Node IoT Anda telah disiapkan. Instruksi verifikasi telah dikirim ke ${email}.`;
      joinAlert.style.display = 'block';

      joinForm.reset();
    });
  }

});