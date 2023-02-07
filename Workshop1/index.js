const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp");
const TeamModel = require("./models/team");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/team', function (req, res) {

  const team = new TeamModel();


  team.name = req.body.name;
  team.description = req.body.description;;
  if (team.name && team.description) {
    team.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the team', err);
        res.json({
          error: 'There was an error saving the team'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/team/?id=${team.id}`
      });
      res.json(team);
    });
  } else {
    res.status(422);
    console.log('error while saving the team')
    res.json({
      error: 'No valid data provided for team'
    });
  }
});

//update with put
app.put('/edit/:id', (req, res) => {
  const {id} = req.params;
  const {name, description} = req.body;
  TeamModel
    .updateOne ({_id: id}, { $set: {name, description} })
    .then ((data) => res.json(data))
    .catch ((error) => res.json({ message: error}));
});

//delete
app.delete('/delete/:id', (req, res) => {
  const {id} = req.params;
  TeamModel
    .remove ({_id: id})
    .then ((data) => res.json(data))
    .catch ((error) => res.json({ message: error}));
});

//update with patch
app.patch('/update/:id', (req, res) => {
  const {id} = req.params;
  const {name, description} = req.body;
  TeamModel
    .updateOne ({_id: id}, { $set: {name, description} })
    .then ((data) => res.json(data))
    .catch ((error) => res.json({ message: error}));
});

app.listen(3000, () => console.log(`Fifa app listening on port 3000!`))

