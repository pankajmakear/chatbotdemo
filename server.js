const express = require('express');
const app = express();
app.use(express.json());

// Gupshup may test with a GET request to check if the URL is live
app.get('/incoming', (req, res) => {
  res.status(200).send('GET OK - Webhook endpoint is live');
});

// This is the actual webhook that Gupshup will call on missed calls or message events
app.post('/incoming', (req, res) => {
  console.log('✅ Webhook received:', req.body);
  res.status(200).send('Webhook OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
