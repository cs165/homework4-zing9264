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
      this.containerElement=containerElement;

  }

  show(){
        this.containerElement.classList.remove('inactive');
    }

    hide(){
        this.containerElement.classList.add('inactive');
    }

    // TODO(you): Add methods as necessary.
}
