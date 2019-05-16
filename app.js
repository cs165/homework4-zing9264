// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.

class App {
    constructor() {
        // TODO(you): Implement the constructor and add fields as necessary.

        this._changeToBox=this._changeToBox.bind(this);
        this._finishSearch=this._finishSearch.bind(this);
        this._loadfinish=this._loadfinish.bind(this);

        const menuElement = document.querySelector('#menu');
        this.menuScreen = new MenuScreen(menuElement);

        const musicElement = document.querySelector('#musicbox');
        this.musicScreen = new MusicScreen(musicElement);

        addEventListener('changeToBox',this._changeToBox);
        addEventListener('finishSearch',this._finishSearch);
        addEventListener('imgLoad',this._loadfinish);
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
            document.querySelector('#loading').classList.remove('inactive');
        }
    }

    _loadfinish(){
        console.log('getload'+this.gifDisplay.loadcount);
        if( this.gifDisplay.loadcount==2){
        document.querySelector('#loading').classList.add('inactive');
        this.musicScreen.audioUrl=this.menuScreen.submitObj.songValue;
        this.gifDisplay.show();
        console.log('submit:'+this.musicScreen.audioUrl);
        this.musicScreen.show();
        }
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
