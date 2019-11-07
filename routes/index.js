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
    res.send(allstars);
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

router.delete('/clear', (req, res) => {
    console.log('in clear');
    players = [];
    res.end('{"success": "Updated Successfully", "status": 200}');
});

var players = [];
var allstars = [
    {
        name: 'Chuck Norris',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/954.jpg',
        height: '178',
        weight: '170',
        position: 'point'
    },
    {
        name: 'Batman',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/639.jpg',
        height: '188',
        weight: '210',
        position: 'wing'
    },
    {
        name: 'Kool-Aid Man',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/1343.jpg',
        height: '183',
        weight: '11000',
        position: 'center'
    },
    {
        name: 'Luke Skywalker',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/10447.jpg',
        height: '170',
        weight: '150',
        position: 'shooting guard'
    },
    {
        name: 'Ben 10',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/1365.jpg',
        height: '165',
        weight: '125',
        position: 'small forward'
    }
];

var villianTeam = [
    {
        name: 'Darth Vader',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/10444.jpg',
        height: '190',
        weight: '196',
        position: 'shooting guard'
    },
    {
        name: 'Chuck Norris',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/954.jpg',
        height: '178',
        weight: '170',
        position: 'point'
    },
    {
        name: 'Deadpool',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/835.jpg',
        height: '188',
        weight: '210',
        position: 'small forward'
    },
    {
        name: 'Venom',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/22.jpg',
        height: '193',
        weight: '260',
        position: 'wing'
    },
    {
        name: 'King Kong',
        image: 'https://www.superherodb.com/pictures2/portraits/10/100/10591.jpg',
        height: '762',
        weight: '800',
        position: 'center'
    }
];
function getRandNum(min, max) { return Math.floor((Math.random() * max) + min); }

module.exports = router;
