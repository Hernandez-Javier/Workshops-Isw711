import { playerModel } from "../models/player.model.js";


export const getPlayers = async function(){
  //get all players
  try {
    const players = await playerModel.find();
    if (players) {
      return players;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const getPlayersAscDesc = async function(opc){
  //get all players ASC or DESC
  try {
    const players = await playerModel.find();
    if (players && opc == "DESC") {
      players.sort(function (a, b) {
        if (a.first_name < b.first_name) {
          return -1;
        }
        if (a.first_name > b.first_name) {
          return 1;
        }
        return 0;
      });
      return players;
    }
    if (players && opc == "ASC") {
      players.sort(function (a, b) {
        if (a.first_name < b.first_name) {
          return 1;
        }
        if (a.first_name > b.first_name) {
          return -1;
        }
        return 0;
      });
      return players;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const getPlayer = async function(id){
  //get one specific player
  try {
    const player = await playerModel.findById(id);
    if (player) {
      return player;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const filterPlayerByName = async function(name, limit = 5){
  //get players by name
  try {
    const player = await playerModel.find({first_name: { $regex: '.*' + name + '.*' }}).limit(limit)
    if (player) {
      return player;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}