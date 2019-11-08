/* global Vue */
/* global axios */
var app = new Vue({
    el: '#app',
    data: {
        created: 0,
        error: false,
        errorMessage: '',
        displayResults: false,
        inName: '',
        numPlayers: 0,
        players: [],
        villians: [],
        winner: '',
        playerScore: '',
        villianScore: '',
        playerWins: 0,
        villianWins: 0,
        villianName: 'The Fantabulous Five',
        playerName: 'The Web Programmers'
    },
    methods: {
        async getTeam() {
            this.created++;
            console.log("called getTeam()");
            const url = 'http://hkevana.com:4200/getTeam';
            try {
                const response = await axios.get(url);
                console.log(response.data);
                this.players = [];
                this.numPlayers = 0;
                if ( response.data.length > 0) {
                    for(let i = 0; i < response.data.length; i++) {
                        this.players.push({
                            name: response.data[i].name,
                            image: response.data[i].image,
                            position:  response.data[i].position,
                            points: response.data[i].points,
                            rebounds: response.data[i].rebounds,
                            fouls: response.data[i].fouls,
                            gamesPlayed: response.data[i].gamesPlayed
                        });
                        this.numPlayers++;
                    }
                    this.displayResults = true;
                }
            } catch(err) {
                console.log(err);
                this.displayResults = false;
            }
        },
        async addPlayer() {
            console.log("called addPlayer()");
            const url = 'http://hkevana.com:4200/addPlayer';
            const imgURL = 'http://hkevana.com:4200/getImage';
            var img = '';
            if (this.inName != '' && this.inHeight != '' && this.inWeight != '') {
                if (this.numPlayers >= 5) {
                    this.errorMessage = "roster can only contain 5 players";
                    this.error = true;
                    return;
                }
                try {
                    const response = await axios.get(imgURL);
                    console.log(response.data);
                    img = response.data.url;
                } catch(err) { console.log(err); }
                this.numPlayers++;
                var pos = ['point', 'wing', 'shooting guard', 'small forward', 'center'];
                var playerPos = pos[this.numPlayers - 1];
                axios.post(url, {
                    name: this.inName,
                    image: img,
                    position: playerPos,
                    points: '',
                    rebounds: '',
                    fouls: '',
                    gamesPlayed: ''
                }).then(respoonse => {})
                .catch(e => {
                    console.log(e);
                });
                this.inName = '';
                this.getTeam();
            } else {
                this.errorMessage = "Please provide input";
                this.error = true;
            }
        },
        removePlayer() {
            const url = "http://hkevana.com:4200/remove";
            axios.delete(url);
            this.getTeam();
            this.displayResults = false;
            
        },
        clearAll() {
            this.players = [];
            this.numPlayers = 0;
            const url = 'http://hkevana.com:4200/clear';
            axios.delete(url);
            this.displayResults = false;
        },
        async generateAllStars() {
            console.log("called generateAllStars()");
            const url = 'http://hkevana.com:4200/allstars';
            try {
                const response = await axios.get(url);
                this.players = [];
                for (let i = 0; i < response.data.length; i++) {
                    this.players.push({
                        name: response.data[i].name,
                        image: response.data[i].image,
                        position: response.data[i].position,
                        points: response.data[i].points,
                        rebounds: response.data[i].rebounds,
                        fouls: response.data[i].fouls,
                        gamesPlayed: response.data[i].gamesPlayed
                    });
                }
                this.displayResults = true;
                console.log(this.players);
            } catch(err) { console.log(err) }
        },
        async generateVillians() {
            console.log('called generateVillians()');
            const url = "http://hkevana.com:4200/villians";
            try {
                const response = await axios.get(url);
                this.villians = [];
                for(let i = 0; i < this.numPlayers; i++) {
                    this.villians.push({
                        vName: response.data[i].name,
                        vImage: response.data[i].image,
                        vPosition: response.data[i].position,
                        vPoints: response.data[i].points,
                        vRebounds: response.data[i].rebounds,
                        vFouls: response.data[i].fouls,
                        vGamesPlayed: response.data[i].gamesPlayed
                    });
                }
                console.log(this.villians);
            } catch(err) { console.log(err) }
            
        },
        clearError() {
            this.error = false;
            this.errorMessage = '';
        },
        playGame() {
            this.playerScore = getRandNum(64, 54);
            this.villianScore = getRandNum(56, 56);
            if (this.playerScore < this.villianScore) {
                this.winner = this.villianName + ' Won :(';
                this.villianWins++;
                document.getElementById("winnerBox").style.color = "orange";
            }
            else if (this.playerScore > this.villianScore) {
                this.winner = this.playerName + ' Won!! :D';
                this.playerWins++;
                document.getElementById("winnerBox").style.color = "aqua";
            }
            else {
                this.winner = "AMAZING!!! It's a tie! :O";
                document.getElementById("winnerBox").style.color = "purple";
            }
            var url = 'http://hkevana.com:4200/play';
            axios.put(url);
            this.generateVillians();
            this.getTeam();
        },
    },
    created: function() {
        this.getTeam();
        if (this.created > 0) { 
            this.playGame(); 
        }
        if (this.created == 0) {
            this.clear();
        }
    }
});

function getRandNum(min, range) { 
    return Math.floor((Math.random() * range) + min); 
}