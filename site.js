const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submissions
app.post('/submit_form', (req, res) => {
  // Get form data from request body
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Validate and sanitize form data

  // Read existing JSON file and parse it into a JavaScript object
  fs.readFile('messages.json', 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') throw err; // Handle file not found error
    let existingData = [];

    if (data) {
      try {
        existingData = JSON.parse(data);
      } catch (err) {
        console.error('Error parsing JSON:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
    }

    // Append form data to the JavaScript object
    const formData = { name, email, message };
    existingData.push(formData);

    // Write updated data back to the JSON file
    fs.writeFile('messages.json', JSON.stringify(existingData), (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log('Form data appended to JSON file successfully.');
      res.redirect('http://portfolioapp-env.eba-mrcvtfmi.eu-west-2.elasticbeanstalk.com/index.html');
    });
  });
});

// Start the server
app.listen(8080, () => {
  console.log('Server started');
});