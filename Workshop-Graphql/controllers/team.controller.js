import { teamModel } from "../models/team.model.js";


export const getTeams = async function(){
  //get all teams
  try {
    const teams = await teamModel.find();
    if (teams) {
      return teams;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const filterTeamByName = async function(name, limit = 5){
  //get team by name
  try {
    const team = await teamModel.find({name: { $regex: '.*' + name + '.*' }}).limit(limit)
    if (team) {
      return team;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const teamsByAlpha = async function(){
  //teams sorted alphabetically
  try {
    const teams = await teamModel.find();
    if (teams) {
      teams.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      return teams;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}