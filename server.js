const express = require('express');
const app = express();
app.use(express.json());

app.get('/incoming', (req, res) => {
  res.status(200).send('GET OK - Webhook endpoint live');
});

app.post('/incoming', (req, res) => {
  console.log('✅ Webhook received:', req.body);
  res.status(200).send('Webhook OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
