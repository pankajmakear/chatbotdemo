const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Respond to incoming WhatsApp messages
app.post('/incoming', async (req, res) => {
  const data = req.body;

  console.log('📩 Webhook received:', data);

  // Check if it's a message from a user
  if (data.type === 'message') {
    const sender = data.payload.sender.phone;
    const userMessage = data.payload.payload.text;

    console.log(`👤 ${sender} sent: ${userMessage}`);

    // Auto-reply message
    const reply = `Hi! 👋 You said: "${userMessage}". How can I help you today?`;

    // Send reply via Gupshup API
    try {
      const payload = new URLSearchParams({
        channel: 'whatsapp',
        source: process.env.GUPSHUP_SOURCE,
        destination: sender,
        message: reply,
        'src.name': process.env.GUPSHUP_BOT_NAME
      });

      await axios.post('https://api.gupshup.io/wa/api/v1/msg', payload, {
        headers: {
          apikey: process.env.GUPSHUP_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log(`✅ Auto-replied to ${sender}`);
    } catch (err) {
      console.error('❌ Failed to send reply:', err.response?.data || err.message);
    }
  }

  res.status(200).send('OK');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
