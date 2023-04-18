const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

function getFirstLineFromServer() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:9090/get_pass'); // Change the URL to match your Express server's URL
      if (!response.ok) {
        throw new Error('Failed to fetch first line');
      }
      const data = await response.text();
      const firstLine = data.trim(); // Trim any leading/trailing white spaces
      resolve(firstLine);
    } catch (err) {
      reject(err);
    }
  });
}

async function getPassword() {
  try {
    const result = await getFirstLineFromServer();
    console.log('Success:', result);
    return result;
  } catch (err) {
    console.error('Error:', err);
  }
};

(async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'mailbot7070@gmail.com',
      pass: await getPassword() // Use await to get the resolved value
    }
  });
})();

app.post('/submit_form', (req, res) => {
  console.log('Form submitted');
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Validate and sanitize form data

  // Compose email message
  const mailOptions = {
    from: 'mailbot7070@gmail.com', // replace with your email address
    to: 'lukehensman7@gmail.com', // replace with recipient's email address
    subject: 'Form Submission',
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
  };


  // Send email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.redirect('http://localhost:8080/index.html');
    }
  });
});


// Start the server
app.listen(8080, () => {
  console.log('Server started');
});