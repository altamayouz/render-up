const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// الرابطان المراد فحصهما
const URL_TELEBOT = 'https://telebot-0ubm.onrender.com';
const URL_GPSFIRST = 'https://gpsfirst.onrender.com/dashboard';

// نقطة فحص بسيطة للسيرفر نفسه
app.get('/', (req, res) => res.send('Guard is awake'));

app.listen(PORT, () => {
  console.log(`Guard server running on port ${PORT}`);
  console.log(`Pinging: ${URL_TELEBOT}`);
  console.log(`Pinging: ${URL_GPSFIRST}`);
});

// دالة ترسل طلباً واحداً إلى رابط معين وتسجل النتيجة
const pingUrl = (url, label) => {
  fetch(url)
    .then(res => console.log(`[${label}] ${res.status} - ${url}`))
    .catch(err => console.error(`[${label}] failed: ${err.message}`));
};

// دالة الـ ping للرابطين
const pingBoth = () => {
  pingUrl(URL_TELEBOT, 'TELEBOT');
  pingUrl(URL_GPSFIRST, 'GPSFIRST');
};

// أول تنفيذ فوري
pingBoth();

// ثم كل 30 ثانية
setInterval(pingBoth, 30000);
