const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submissions
app.post('/submit_form', (req, res) => {
  // Get form data from request body
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Validate and sanitize form data

  // Read existing JSON file and parse it into a JavaScript object
  const formData = { name, email, message };
  fs.readFile('form_data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const existingData = JSON.parse(data);

    // Append form data to the JavaScript object
    existingData.push(formData);

    // Write updated data back to the JSON file
    fs.writeFile('messages.json', JSON.stringify(existingData), (err) => {
      if (err) throw err;
      console.log('Form data appended to JSON file successfully.');
      res.send('Form data submitted and appended to JSON file successfully.');
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
