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
<<<<<<< HEAD
     this._btnclicked=this._btnclicked.bind(this);
     this.isplaying=false;

      this.containerElement=containerElement;

      this.playbtn=this.containerElement.querySelector('.playbtn');

      this.playbtn.addEventListener('click',this._btnclicked);

=======
      this.containerElement=containerElement;

>>>>>>> 820e75f5661118aebf8cca11cd8b749c7dec8b23
  }

  show(){
        this.containerElement.classList.remove('inactive');
    }

    hide(){
        this.containerElement.classList.add('inactive');
    }

<<<<<<< HEAD
    _btnclicked(){
      console.log(this.playbtn);
      if(this.isplaying){
          this.playbtn.classList.add('pausing');
          this.playbtn.classList.remove('playing');
          this.isplaying=false;
      }
      else {
          this.playbtn.classList.add('playing');
          this.playbtn.classList.remove('pausing');
          this.isplaying=true;
      }
    }
=======
>>>>>>> 820e75f5661118aebf8cca11cd8b749c7dec8b23
    // TODO(you): Add methods as necessary.
}
