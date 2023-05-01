const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.error('No SendGrid API key found in environment variables');
  process.exit(1);
}
sgMail.setApiKey(apiKey);

app.post('/submit_form', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const msg = {
      to: 'lukehensman7@gmail.com',
      from: 'mailbot7070@gmail.com',
      subject: 'Form Submission',
      text: message,
      html: `<p>${message}</p>`,
    };
    
    await sgMail.send(msg);

    res.status(200).send('Email sent successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending email');
  }
});

app.listen(process.env.PORT || 8080, '0.0.0.0', function() {
  console.log('Server started at port' + (process.env.PORT || 8080));
});

