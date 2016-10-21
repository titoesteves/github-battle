var axios = require('axios')

var id = 'client id'
var sec = 'secret'
var param = `?client_id=id&client_secret=sec`;

function getUserInfo(username){
  // fetch some data from github
  return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos(username){
  // fetch usernames repos
  return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars(repos){
  // calculate all the stars
  return repos.data.reduce(function(prev, curr){
    return prev + curr.stargazers_count;
  }, 0);
}

function getPlayersData(player){
  // get repos
  // getTotalStars
  // return object with that data
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function(totalStars){
      return {
        followers: player.followers,
        totalStars: totalStars
      };
    })
}

function calculateScores(players){
  // return an array, after doing some fancy algorithm to determine a winner
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ];
}

var helpers = {
  getPlayersInfo: function(players){
    return axios.all(players.map(function(player){
      return getUserInfo(player);
    })).then(function(info){
      return info.map(function(user){
        return user.data;
      })
    });
  },
  battle: function(players){
    var playerOneData = getPlayersData(players[0])
    var playerTwoData = getPlayersData(players[1])

    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function(err){
        console.error('error in getPlayersInfo', err);
      })
  }
};

module.exports = helpers;
