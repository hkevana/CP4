/* global Vue */
/* global axios */
var app = new Vue({
    el: '#app',
    data: {
        error: false,
        errorMessage: '',
        displayResults: false,
        inName: '',
        inHeight: '',
        inWeight: '',
        players: [],
        villians: [],
    },
    methods: {
        async getTeam() {
            console.log("called getTeam()");
            const url = 'http://hkevana.com:4200/getTeam';
            try {
                const response = await axios.get(url);
                console.log(response.data);
                this.players = [];
                if ( response.data.length > 0) {
                    for(let i = 0; i < response.data.length; i++) {
                        this.players.push({
                            name: response.data[i].name,
                            height: response.data[i].height,
                            weight: response.data[i].weight,
                            image: response.data[i].image,
                        });
                    }
                    this.generateVillians();
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
            try {
                const response = await axios.get(imgURL);
                console.log(response.data);
                img = response.data.url;
            } catch(err) { console.log(err); }
            console.log("image = ", img);
            if (this.inName != '' && this.inHeight != '' && this.inWeight != '') {
                if (this.players.length >= 5) {
                    this.errorMessage = "roster can only contain 5 players";
                    this.error = true;
                    return;
                }
                axios.post(url, {
                    name: this.inName,
                    image: img,
                    height: this.inHeight,
                    weight: this.inWeight,
                }).then(respoonse => {})
                .catch(e => {
                    console.log(e);
                });
                this.inName = '';
                this.inHeight = '';
                this.inWeight = '';
                this.getTeam();
            } else {
                this.errorMessage = "Please provide input";
                this.error = true;
            }
        },
        clearAll() {
            this.players = [];
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
                        height: response.data[i].height,
                        weight: response.data[i].weight,
                        image: response.data[i].image,
                        position: response.data[i].position,
                    });
                }
                this.generateVillians();
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
                for(let i = 0; i < response.data.length; i++) {
                    this.villians.push({
                        vName: response.data[i].name,
                        vHeight: response.data[i].height,
                        vWeight: response.data[i].weight,
                        vImage: response.data[i].image,
                        vPosition: response.data[i].position,
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
            
        },
        getRandNum(min, max) { 
            return Math.floor((Math.random * max) + min); 
        }
    },
    created: function() {
        this.getTeam();
    }
});