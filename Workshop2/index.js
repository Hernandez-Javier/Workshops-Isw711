const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp");
const TeamModel = require("./models/team");
const PlayerModel = require("./models/player");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//get teams
app.get('/teams', (req, res) => {
  TeamModel.model()
    .find()
    .then ((data) => res.json(data))
    .catch ((error) => res.json({ message: error}));
});

app.post('/team', function (req, res) {

  const team = new TeamModel.model();


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

//update team with put
app.put('/edit/:id', (req, res) => {
  const {id} = req.params;
  const {name, description} = req.body;
  TeamModel.model()
    .updateOne ({_id: id}, { $set: {name, description} })
    .then ((data) => res.json(data))
    .catch ((error) => res.json({ message: error}));
});

//delete team
app.delete('/delete/:id', (req, res) => {
  const {id} = req.params;
  TeamModel.model()
    .remove ({_id: id})
    .then ((data) => res.json(data))
    .catch ((error) => res.json({ message: error}));
});

//get players
app.get('/players', (req, res) => {

  PlayerModel
    .find()
    .then ((data) => res.json(data))
    .catch ((error) => res.json({ message: error}));
});

//post new player
app.post('/player', function (req, res) {

  const player = new PlayerModel();


  player.first_name = req.body.first_name;
  player.last_name = req.body.last_name;
  player.age = req.body.age;
  player.team = req.body.team;
  if (player.first_name) {
    player.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the team', err);
        res.json({
          error: 'There was an error saving the team'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/player/?id=${player.id}`
      });
      res.json(player);
    });
  } else {
    res.status(422);
    console.log('error while saving the team')
    res.json({
      error: 'No valid data provided for team'
    });
  }
});

//update player with put
app.put('/editpl/:id', (req, res) => {
  const {id} = req.params;
  const {first_name,last_name,age,team} = req.body;
  PlayerModel
    .updateOne ({_id: id}, { $set: {first_name,last_name,age,team} })
    .then ((data) => res.json(data))
    .catch ((error) => res.json({ message: error}));
});

//delete player
app.delete('/deletepl/:id', (req, res) => {
  const {id} = req.params;
  PlayerModel
    .remove ({_id: id})
    .then ((data) => res.json(data))
    .catch ((error) => res.json({ message: error}));
});

app.listen(3000, () => console.log(`Fifa app listening on port 3000!`))

