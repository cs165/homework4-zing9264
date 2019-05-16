// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.

class App {
    constructor() {
        // TODO(you): Implement the constructor and add fields as necessary.

        this._changeToBox=this._changeToBox.bind(this);
        this._finishSearch=this._finishSearch.bind(this);

        const menuElement = document.querySelector('#menu');
        this.menuScreen = new MenuScreen(menuElement);

        const musicElement = document.querySelector('#musicbox');
        this.musicScreen = new MusicScreen(musicElement);

        addEventListener('changeToBox',this._changeToBox);
        addEventListener('finishSearch',this._finishSearch);

        this.gifDisplay= new GifDisplay();

    }

    // TODO(you): Add methods as necessary.

    _changeToBox(event) {
        event.preventDefault();
        this.gifDisplay.searchItem=this.menuScreen.submitObj.themeValue;
        this.gifDisplay._getGif();
    }

    _finishSearch(){
        if(this.gifDisplay.giflength<2){
            document.querySelector('#error').classList.remove('inactive');
        }
        else{
            this.menuScreen.hide();
            this.gifDisplay.show();
            this.musicScreen.audioUrl=this.menuScreen.submitObj.songValue;
            console.log('submit:'+this.musicScreen.audioUrl);
            this.musicScreen.show();
        }
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}