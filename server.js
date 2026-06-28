const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// الرابط الأصلي من متغير البيئة (إن وُجد)
const MAIN_URL = process.env.MAIN_URL;
// الرابط الجديد الذي تريد إضافته
const HEALTH_URL = 'https://gemini-bot-xnf2.onrender.com/health';

// نقطة فحص بسيطة
app.get('/', (req, res) => res.send('Guard is awake'));

app.listen(PORT, () => {
  console.log(`Guard server running on port ${PORT}`);
  if (MAIN_URL) console.log(`Pinging MAIN_URL: ${MAIN_URL}`);
  console.log(`Pinging HEALTH_URL: ${HEALTH_URL}`);
});

// دالة ترسل طلباً واحداً إلى رابط معين وتسجل النتيجة
const pingUrl = (url, label) => {
  fetch(url)
    .then(res => console.log(`[${label}] ${res.status} - ${url}`))
    .catch(err => console.error(`[${label}] failed: ${err.message}`));
};

// دالة الـ ping لكلا الرابطين
const pingBoth = () => {
  if (MAIN_URL) pingUrl(MAIN_URL, 'MAIN');
  pingUrl(HEALTH_URL, 'HEALTH');
};

// أول تنفيذ فوري
pingBoth();

// ثم كل 30 ثانية
setInterval(pingBoth, 30000);
