var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', { root: 'public'});
});

router.get('/getTeam', (req, res) => {
    console.log('in getTeam');
    console.log(players);
    res.send(players);
});

router.get('/getImage', (req, res) => {
    console.log('in getImage');
    var access_token = 1007403959620690;
    var id = getRandNum(0, 731);
    console.log('id = ', id);
    const url = 'https://superheroapi.com/api/' + access_token + '/' + id + '/image';
    request(url).pipe(res);
});

router.get('/allstars', (req, res) => {
    console.log('in allstars');
    players = allstars;
    res.send(players);
});

router.get('/villians', (req, res) => {
    console.log('in villians');
    console.log(villianTeam);
    res.send(villianTeam);
    
});

router.post('/addPlayer', (req, res) => {
    console.log('in addPlayer');
    console.log(req.body);
    players.push(req.body);
    console.log(players);
    console.log("length: ", players.length);
    res.end('{"success": "Updated Successfully", "status": 200}');
});

router.put('/play', (req, res) => {
    console.log('in play');
    for (let i = 0; i < 5; i++) {
        players[i].points = getRandNum(1, 32);
        players[i].rebounds = getRandNum(1, 10);
        players[i].fouls = getRandNum(1, 5);
        players[i].gamesPlayed++;
        
        villianTeam[i].points = getRandNum(1, 32);
        villianTeam[i].rebounds = getRandNum(1, 10);
        villianTeam[i].fouls = getRandNum(1, 5);
        villianTeam[i].gamesPlayed++;
    }
    res.end('{"success": "Updated Successfully", "status": 200}');
});

router.delete('/clear', (req, res) => {
    console.log('in clear');
    players = [];
    res.end('{"success": "Updated Successfully", "status": 200}');
});

router.delete('/remove', (req, res) => {
    console.log('in remove');
    if (players.length > 0) { players.splice(players.length - 1); }
    res.end('{"success": "Updated Successfully", "status": 200}');
});

var players = [];
var allstars = [
    {
        name: 'Chuck Norris',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/954.jpg',
        position: 'point',
        points: '',
        rebounds: '',
        fouls: '',
        gamesPlayed: ''
    },
    {
        name: 'Batman',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/639.jpg',
        position: 'wing',
        points: '',
        rebounds: '',
        fouls: '',
        gamesPlayed: ''
    },
    {
        name: 'Luke Skywalker',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/10447.jpg',
        position: 'shooting guard',
        points: '',
        rebounds: '',
        fouls: '',
        gamesPlayed: ''
    },
    {
        name: 'Ben 10',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/1365.jpg',
        position: 'small forward',
        points: '',
        rebounds: '',
        fouls: '',
        gamesPlayed: ''
    },
    {
        name: 'Kool-Aid Man',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/1343.jpg',
        position: 'center',
        points: '',
        rebounds: '',
        fouls: '',
        gamesPlayed: ''
    },
];

var villianTeam = [
    {
        name: 'Chuck Norris',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/954.jpg',
        position: 'point',
        points: '',
        rebounds: '',
        fouls: '',
        gamesPlayed: ''
    },
    {
        name: 'Venom',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/22.jpg',
        position: 'wing',
        points: '',
        rebounds: '',
        fouls: '',
        gamesPlayed: ''
    },
    {
        name: 'Darth Vader',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/10444.jpg',
        position: 'shooting guard',
        points: '',
        rebounds: '',
        fouls: '',
        gamesPlayed: ''
    },
    {
        name: 'Deadpool',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/835.jpg',
        position: 'small forward',
        points: '',
        rebounds: '',
        fouls: '',
        gamesPlayed: ''
    },
    {
        name: 'King Kong',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/10591.jpg',
        position: 'center',
        points: '',
        rebounds: '',
        fouls: '',
        gamesPlayed: ''
    }
];
function getRandNum(min, max) { return Math.floor((Math.random() * max) + min); }

module.exports = router;
