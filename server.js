const express = require('express');
const axios   = require('axios');
const path    = require('path');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ───────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // serve static files like index.html

// ── Root page ────────────────────────────────────────────
app.get('/', (_req, res) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);
app.get('/incoming', (req, res) => {
  res.send("This is a POST-only webhook endpoint. Please POST JSON data here.");
});

// ── Gupshup Webhook / Missed Call Simulation ─────────────
app.post('/incoming', async (req, res) => {
  // Allow either { phone: "+91..."} or Gupshup-style { sender: "91..." }
  const phone = (req.body.phone || req.body.sender || '').trim();

  if (!phone) return res.status(400).json({ error: 'Phone number is required' });

  console.log(`📞 Simulated missed call from ${phone}`);

  const payload = new URLSearchParams({
    channel     : 'whatsapp',
    source      : process.env.GUPSHUP_SOURCE,   // Your sandbox number (no +)
    destination : phone,
    message     : 'Hi! Thanks for giving us a missed call. How can we help you today?',
    'src.name'  : process.env.GUPSHUP_BOT_NAME
  });

  try {
    await axios.post(
      'https://api.gupshup.io/sm/api/v1/msg',
      payload,
      {
        headers: {
          'apikey'      : process.env.GUPSHUP_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log(`✅ WhatsApp message sent to ${phone}`);
    res.json({ success: true, message: 'WhatsApp message sent!' });

  } catch (err) {
    console.error('❌ Gupshup error:', (err.response && err.response.data) || err.message);
    res.status(500).json({ success: false, message: 'Failed to send WhatsApp message.' });
  }
});

// ── Start server ─────────────────────────────────────────
app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`));
