//Create an index.js file for your Express server.js
// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Route to execute code
app.post('/execute', (req, res) => {
  const { code, language } = req.body;

  let command;
  if (language === 'javascript') {
    command = node -e "${code.replace(/"/g, '\\"')}";
  } else if (language === 'python') {
    command = python -c "${code.replace(/"/g, '\\"')}";
  } else {
    return res.status(400).send('Language not supported');
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(400).send(stderr);
    }
    res.send(stdout);
  });
});

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});

