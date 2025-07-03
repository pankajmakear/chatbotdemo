const express = require('express');
const axios   = require('axios');
const path    = require('path');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ───────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));          // serves public/index.html

// ── Root page ────────────────────────────────────────────
app.get('/', (_req, res) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

// ── “Missed‑call” endpoint ───────────────────────────────
app.post('/incoming', async (req, res) => {
  const phone = req.body.phone && req.body.phone.trim();

  if (!phone) return res.status(400).json({ error: 'phone required' });

  console.log(`📞  Simulated missed call from ${phone}`);

  const payload = new URLSearchParams({
    channel     : 'whatsapp',
    source      : process.env.GUPSHUP_SOURCE,   // e.g. 917834811114
    destination : phone,                        // must be in +<country><number> format
    message     : 'Hi! Thanks for giving us a missed call. How can we help you today?',
    'src.name'  : process.env.GUPSHUP_BOT_NAME  // your bot’s display name
  });

  try {
    await axios.post(
      'https://api.gupshup.io/sm/api/v1/msg',
      payload,
      { headers: {
          'apikey'      : process.env.GUPSHUP_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded'
        }}
    );
    console.log(`✅ WhatsApp message sent to ${phone}`);
    res.json({ success: true, message: 'WhatsApp message sent!' });
  } catch (err) {
   console.error('❌ Gupshup error:', (err.response && err.response.data) || err.message);

    res.status(500).json({ success: false, message: 'Failed to send WhatsApp' });
  }
});

// ── Start server ─────────────────────────────────────────
app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`));
