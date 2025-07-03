const axios = require('axios');
const phone = '+919998888952';

const payload = new URLSearchParams({
  channel: 'whatsapp',
  source: '917834811114',               // your WhatsApp bot number (without +)
  destination: phone,
  message: 'Hello from Gupshup bot 👋',
  'src.name': 'pankajchatbot'             // your Gupshup bot name
});

axios.post('https://api.gupshup.io/sm/api/v1/msg', payload, {
  headers: {
    apikey: 'kju3oytrfb5ltzanztowhkjblashrhcb',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
.then(res => {
  console.log('✅ WhatsApp message sent', res.data);
})
.catch(err => {
  console.error('❌ Error sending message', err.response?.data || err.message);
});
