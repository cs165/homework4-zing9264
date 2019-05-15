// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
    constructor() {
        // TODO(you): Implement the constructor and add fields as necessary.

        this._onSubmit=this._onSubmit.bind(this);

        const menuElement = document.querySelector('#menu');
        this.menuScreen = new MenuScreen(menuElement);

        const form = document.querySelector('form');
        form.addEventListener('submit', this._onSubmit);

        const musicElement = document.querySelector('#musicbox');
        this.musicScreen = new MusicScreen(musicElement);

    }

    // TODO(you): Add methods as necessary.

    _onSubmit(event) {
        event.preventDefault();
        this.musicScreen.show();
    }
}
