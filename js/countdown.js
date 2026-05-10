// countdown.js
function startCountdown(ids) {
  function update() {
    const diff = new Date(CONFIG.fightDate) - new Date();
    if (diff <= 0) return;
    const pad = n => String(Math.floor(n)).padStart(2, '0');
    document.getElementById(ids.days).textContent  = pad(diff / 86400000);
    document.getElementById(ids.hours).textContent = pad((diff % 86400000) / 3600000);
    document.getElementById(ids.mins).textContent  = pad((diff % 3600000) / 60000);
    document.getElementById(ids.secs).textContent  = pad((diff % 60000) / 1000);
  }
  update();
  setInterval(update, 1000);
}