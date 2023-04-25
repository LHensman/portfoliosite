const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const privatekey = JSON.parse(fs.readFileSync('public/mail-384320-a17463cf4599.json'));

const jwtClient = new google.auth.JWT({
  email: privatekey.client_email,
  key: privatekey.private_key,
  scopes: ['https://www.googleapis.com/auth/gmail.send'],
});

app.post('/submit_form', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Set the credentials
    const authorized = await jwtClient.authorize();

    if (authorized.error) {
      throw new Error(authorized.error);
    }

    // Send the email
    const gmail = google.gmail({ version: 'v1', auth: jwtClient });
    const rawMessage = `From: ${name} <${email}>\nTo: lukehensman7@gmail.com\nSubject: Form Submission\n\n${message}`;
    const encodedMessage = Buffer.from(rawMessage).toString('base64');
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    });

    // Send a success response to the client
    res.status(200).send('Email sent successfully');
  } catch (err) {
    console.error(err);
    // Send an error response to the client
    res.status(500).send('Error sending email');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
