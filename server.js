const express = require('express');
const axios = require('axios');
const path = require('path');


const app = express();
const PORT =  3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Root page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Simulated missed call endpoint
app.post('/incoming', async (req, res) => {
  const phone = req.body.phone;
  console.log(`📞 Simulated missed call from: ${phone}`);

  const message = `Hi! Thanks for giving us a missed call. How can we help you today?`;

  try {
    const payload = new URLSearchParams({
      channel: 'whatsapp',
      source: '917834811114',
      destination: phone,
      message,
      'src.name': 'pankajchatbot'
    });

    const response = await axios.post('https://api.gupshup.io/sm/api/v1/msg', payload, {
      headers: {
        'apikey': 'kju3oytrfb5ltzanztowhkjblashrhcb',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log(`✅ WhatsApp message sent to ${phone}`);
    console.log('🔁 Gupshup response:', response.data);
    res.json({ success: true, message: 'WhatsApp message sent!' });
  } catch (error) {
    console.error('❌ Failed to send message:', error.message);
    res.status(500).json({ success: false, error: 'Failed to send WhatsApp message.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
