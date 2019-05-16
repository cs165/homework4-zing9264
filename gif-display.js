// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.


const imgLoad = new CustomEvent('imgLoad');

class GifDisplay {
    constructor() {
        // TODO(you): Implement the constructor and add fields as necessary.
        this.foregifnum = 0;
        this.backgifnum = 1;
        this.loadcount=0;
        this.gifUrl1=null;
        this.gifUrl2=null;

        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this._getGif = this._getGif.bind(this);
        this._changeGif = this._changeGif.bind(this);
        this._getNONrepeatNum = this._getNONrepeatNum.bind(this);
        this._loadimage=this._loadimage.bind(this);
        this.searchItem = null;
        this.foreground = document.querySelector('.gif_fore');
        this.background = document.querySelector('.gif_back');
        this.gifjson = null;
        this.giflength = -1;
        addEventListener('kick!', this._changeGif);
        this.gifImage= new Array();
        addEventListener('finishSearch',this._loadimage);

        this.loadednum=new Array();
    }

    // TODO(you): Add methods as necessary.
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


        this.foreground = document.querySelector('.gif_fore');
        this.background = document.querySelector('.gif_back');


        this.background.classList.remove('gif_back');
        this.background.classList.add('gif_fore');
        this.foreground.classList.remove('gif_fore');
        this.foreground.classList.add('gif_back');

      /*  console.log("NOWPICTURE+"+this.foregifnum+' '+this.loadednum);
        console.log("fore showing:"+  this.background.style.backgroundImage);
        console.log("background showing:"+  this.foreground.style.backgroundImage);*/

        this._getNONrepeatNum();
        this.foreground.style.backgroundImage = "url('" + this.gifImage[this.loadednum[this.backgifnum]].src + "')";



    }

    _getNONrepeatNum() {

        var nownum1 = 0;
        var nownum2 = 0;
        if(this.loadednum.length-1<2){
            let tmp=this.foregifnum;
            this.foregifnum=this.backgifnum;
            this.backgifnum=tmp;
            return;
        }
        while (true) {
            nownum1 = getRandomInt(this.loadednum.length - 1);
            nownum2 = getRandomInt(this.loadednum.length - 1);
            if (nownum1 != this.foregifnum && nownum1 != nownum2 && nownum2 != this.backgifnum) {
                this.foregifnum = nownum1;
                this.backgifnum = nownum2;
                break;
            }
        }
    }

    _loadimage(){
        if(this.giflength>=2){
            for(var i=0;i<this.giflength;i++){
                this.gifImage[i] = new Image(0,0);
                this.gifImage[i].src = this.gifjson.data[i].images.downsized.url;
                var child=document.querySelector('#preload').appendChild(this.gifImage[i]);
                child.id=i+'_img';
                this.gifImage[i].onload= function(event) {
                    if(this.loadcount==0){
                        this.foreground.style.backgroundImage = "url('" + event.path[0].src+ "')";

                    }
                    if(this.loadcount==1){
                        this.background.style.backgroundImage = "url('" + event.path[0].src + "')";
                    }
                  /*  console.log(event);
                    console.log(parseInt(event.path[0].id));*/
                    this.loadednum.push(parseInt(event.path[0].id));
                    this.loadcount++;
                   dispatchEvent(imgLoad);

                }.bind(this)


            }

        }
    }

}

