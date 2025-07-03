<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Missed Call → WhatsApp Demo</title>
</head>
<body>
  <h2>Simulate Missed Call</h2>
  <form id="missedCallForm">
    <input type="tel" id="phone" placeholder="Enter phone number (with country code)" required />
    <button type="submit">Give Missed Call</button>
  </form>
  <p id="status"></p>

  <script>
    const form = document.getElementById('missedCallForm');
    const status = document.getElementById('status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const phone = document.getElementById('phone').value;

      const res = await fetch('/incoming', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });

      const result = await res.json();
      status.textContent = result.message || 'Error sending message';
    });
  </script>
</body>
</html>
