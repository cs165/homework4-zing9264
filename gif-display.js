// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
    constructor() {
        // TODO(you): Implement the constructor and add fields as necessary.
        this.foregifnum = 0;
        this.backgifnum = 1;

        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this._getGif = this._getGif.bind(this);
        this._changeGif = this._changeGif.bind(this);
        this._getNONrepeatNum = this._getNONrepeatNum.bind(this);
        this.searchItem = null;
        this.foreground = document.querySelector('.gif_fore');
        this.background = document.querySelector('.gif_back');
        this.gifjson = null;
        this.giflength = -1;
        addEventListener('kick!', this._changeGif);
    }

    show() {
        this.foreground.classList.remove('inactive');
        this.background.classList.remove('inactive');
    }

    hide() {
        this.foreground.classList.add('inactive');
        this.background.classList.add('inactive');
    }

    _getGif() {

        let giphyAPI = `//api.giphy.com/v1/gifs/search?q=${this.searchItem}&api_key=yMFGbjeIYz5BSBq8Ccd5BHa5Dsnbofan&limit=25&rating=g`;
        fetch(giphyAPI)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json.data.length >= 2) {
                    this.gifjson = json;
                    this._getNONrepeatNum();
                    const gifUrl1 = json.data[this.foregifnum].images.downsized.url;
                    const gifUrl2 = json.data[this.backgifnum].images.downsized.url;
                    console.log(json.data.length);
                    console.log("NOWPICTURE"+this.foregifnum);
                    this.foreground.style.backgroundImage = "url('" + gifUrl1 + "')";
                    this.background.style.backgroundImage = "url('" + gifUrl2 + "')";
                }

                this.giflength = json.data.length;
                let finishSearch = new CustomEvent('finishSearch');
                dispatchEvent(finishSearch);

            })
            .catch(err => {
                console.log(err);
                let finishSearch = new CustomEvent('finishSearch');
                dispatchEvent(finishSearch);
            });

    }

    _changeGif() {
        console.log("NOWPICTURE"+this.backgifnum);
        this.foreground = document.querySelector('.gif_fore');
        this.background = document.querySelector('.gif_back');

        this.background.classList.remove('gif_back');
        this.background.classList.add('gif_fore');
        this.foreground.classList.remove('gif_fore');
        this.foreground.classList.add('gif_back');
        this._getNONrepeatNum();
        this.background.style.backgroundImage = "url('" + this.gifjson.data[this.backgifnum].images.downsized.url + "')";


    }

    _getNONrepeatNum() {

        var nownum1 = 0;
        var nownum2 = 0;
        while (true) {
            nownum1 = getRandomInt(this.gifjson.data.length - 1);
            nownum2 = getRandomInt(this.gifjson.data.length - 1);
            if (nownum1 != this.foregifnum && nownum1 != nownum2 && nownum2 != this.backgifnum) {
                this.foregifnum = nownum1;
                this.backgifnum = nownum2;
                break;
            }
        }
    }

    // TODO(you): Add methods as necessary.
}

