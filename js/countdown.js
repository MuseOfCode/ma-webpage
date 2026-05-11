// countdown.js
function startCountdown(ids) {
  function update() {
    const diff = new Date(CONFIG.fightDate) - new Date();
    if (diff <= 0) return;
    const pad = n => String(Math.floor(n)).padStart(2, '0');

    if (document.getElementById(ids.days))
      document.getElementById(ids.days).textContent  = pad(diff / 86400000);
    if (document.getElementById(ids.hours))
      document.getElementById(ids.hours).textContent = pad((diff % 86400000) / 3600000);
    if (document.getElementById(ids.mins))
      document.getElementById(ids.mins).textContent  = pad((diff % 3600000) / 60000);
    if (document.getElementById(ids.secs))
      document.getElementById(ids.secs).textContent  = pad((diff % 60000) / 1000);
  }
  update();
  setInterval(update, 1000);
}