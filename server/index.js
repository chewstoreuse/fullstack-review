const express = require('express');
const bodyParser = require('body-parser');
let { getReposByUsername } = require('../helpers/github');
let { save, retrieve } = require('../database');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getReposByUsername(req.body.username, (data) => {
    // console.log(data);
    save(data);
    res.sendStatus(201);
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  retrieve((repos) => {
    res.status(200).send(repos);
  });
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

