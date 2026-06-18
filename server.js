// هذا هو كود السيرفر الثاني (الحارس) كاملاً
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// نقطة فحص صحية
app.get('/', (req, res) => res.send('Guard is awake'));

app.listen(PORT, () => {
  console.log(`Guard server running on port ${PORT}`);
});

// إرسال ping للسيرفر الرئيسي كل 30 ثانية
const MAIN_URL = process.env.MAIN_URL; // رابط البوت الرئيسي
if (MAIN_URL) {
  const ping = () => {
    fetch(MAIN_URL)
      .then(res => console.log(`Pinged main bot: ${res.status}`))
      .catch(err => console.error('Ping failed:', err.message));
  };
  setInterval(ping, 30000);
  ping(); // أول ping فوري
}
