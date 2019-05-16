// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
    constructor(containerElement) {
        // TODO(you): Implement the constructor and add fields as necessary.
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this._onKick = this._onKick.bind(this);
        this._btnclicked = this._btnclicked.bind(this);
        this.firstClick= true;
        this.isplaying = false;
        this.audioUrl=null;
        this.audioPlayer=null;
        this.containerElement = containerElement;

        this.playbtn = this.containerElement.querySelector('.playbtn');
        this.playbtn.addEventListener('click', this._btnclicked);

    }

    show() {
        this.containerElement.classList.remove('inactive');
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }


    _btnclicked() {
        console.log(this.playbtn);
        if (this.isplaying) {
            this.playbtn.classList.add('pausing');
            this.playbtn.classList.remove('playing');
            this.audioPlayer.pause();
            this.isplaying = false;
        }
        else {
            if(this.firstClick){
                console.log(this.audioUrl);
                this.audioPlayer = new AudioPlayer();
                this.audioPlayer.setSong(this.audioUrl);
                this.audioPlayer.setKickCallback(this._onKick);
                this.firstClick=false;
            }
            this.audioPlayer.play();
            this.playbtn.classList.add('playing');
            this.playbtn.classList.remove('pausing');
            this.isplaying = true;
        }
    }

    _onKick() {
        console.log('kick!');
        let kick=new CustomEvent('kick!');
        dispatchEvent(kick);
    }

    // TODO(you): Add methods as necessary.
}
