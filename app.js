const express = require('express');
const Instagram = require('node-instagram').default;

// Create a new instance.
const instagram = new Instagram({
  clientId: '451070232247135',
  clientSecret: '0dfb9c64c86b20f62b77f7c47b3b9805',
});

const redirectUri = 'https://son-ig-bukucu.herokuapp.com/auth/instagram/callback';

// create express server
const app = express();

// Redirect user to instagram oauth
app.get('/auth/instagram', (req, res) => {
  res.redirect(instagram.getAuthorizationUrl(redirectUri, { scope: ['basic'] }));
});

// Handle auth code and get access_token for user
app.get('/auth/instagram/callback', async (req, res) => {
  try {
    const data = await instagram.authorizeUser(req.query.code, redirectUri);
    // access_token in data.access_token
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

// listen to port 3000
app.listen(3000, () => {
  console.log('app listening on http://localhost:3000');
});
