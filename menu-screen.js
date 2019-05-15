// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.

const _default_theme=['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class MenuScreen {

  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
      this.containerElement=containerElement;

      this.selectElem = document.getElementById('song-selector');
      this.urlvalue= null;


      this.submitObj={songValue : null,
          themeValue: null
      };
      this.hide = this.hide.bind(this);
      this.show = this.show.bind(this);

      this._onSubmit = this._onSubmit.bind(this);
      this._generateTheme=this._generateTheme.bind(this);
      this._onStreamProcessed=this._onStreamProcessed.bind(this);
      this._showSelected=this._showSelected.bind(this);
      this._geturl=this._geturl.bind(this);
      // 拿json歌單
      fetch('songs.json').then(this._onResponse,this._onError).then(this._onStreamProcessed);
      //加入選取


      //隨機主題
      this._generateTheme();

      //表單提交
      const form = document.querySelector('form');
      form.addEventListener('submit', this._onSubmit);

  }

  // TODO(you): Add methods as necessary.
  show(){
      this.containerElement.classList.remove('inactive');
  }

  hide(){
      this.containerElement.classList.add('inactive');
  }


  _generateTheme(){
      this.theme = document.getElementById('query-input');
      console.log(this.selectElem);
      console.log(this.selectElem.options.selectedIndex);
      this.theme.value = _default_theme[getRandomInt(_default_theme.length)]
  }


  _onStreamProcessed(json) {
        for (var i=0 ;i<Object.values(json).length;i++) {
            var selectElem = document.querySelector('#song-selector');
            console.log(Object.values(json)[i].title);
            let menutitle=Object.values(json)[i].artist+':'+Object.values(json)[i].title;
            var opt= new Option(menutitle,i);
            selectElem.add( opt);
        }
        this.selectElem.addEventListener('change', this._showSelected);
        console.log('選項創建完成');
    }

   _onResponse(response) {
        return response.json();
    }
   _onError(error) {
        console.log('Error: ' + error);
    }

    _showSelected(){
            const index =  this.selectElem.selectedIndex;
            console.log('index selected: ' + index);
            console.log('option selected: ' +   this.selectElem.options[index].value);
            console.log('max opt ' +   this.selectElem.options.length);
    }

    _geturl(json){

        this.submitObj.songValue=Object.values(json)[this.urlvalue].songUrl;
        console.log(this.submitObj);
        this.hide();

    }

    _onSubmit(event) {
        event.preventDefault();
        const songValueinput = document.querySelector("#song-selector").value;
        const themeValueinput = document.querySelector("#query-input").value;
        this.urlvalue=songValueinput

        this.submitObj.themeValue=themeValueinput;

        fetch('songs.json').then(this._onResponse,this._onError).then(this._geturl);

    }

}
