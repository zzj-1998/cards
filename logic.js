var gGame = null;
var wrapper = document.getElementById('wrapper');
var music = document.getElementsByClassName('music');

function playMusic(a) {
    for(var i = 0; i < music.length; i++) {
        music[i].pause();
        music[i].currentTime = 0;
    }
    music[a].play();
}

function ready() {
    playMusic(0);
    wrapper.innerHTML = "";
    var div = document.createElement('div');
    div.id = "ready";
    wrapper.appendChild(div);
    var time = 2;
    wrapper.style.backgroundImage = 'url(1.jpg)';
    div.style.animation = "ready 2s both";
    var timer = setInterval(function () {
        if(time == 0) {
            clearInterval(timer);
            gameStart();
        }
        else {
            time--;
        }
    },1000);
}

function gameStart() {
    wrapper.innerHTML = "";
    wrapper.style.backgroundImage = 'url(110.jpg)';
    gGame = new Game();
    gGame.render();
    gGame.spread();
    gGame.change();
    gGame.judge();
}

function Game() {
    var _this = this;
    this.allTime = 60;
    this.group = [];
    this.score = 0;
    this.imgs = ['8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg'];
    this.position = [];
    this.timer = null;
    this.time = 0;
    this.choose = 0;
    this.first = [];
    this.temp = [];
    this.render = function () {
        var time = document.createElement('div');
        time.id = "time";
        time.innerHTML = _this.allTime;
        wrapper.appendChild(time);
        var inner = document.createElement('div');
        inner.id = "inner";
        inner.innerHTML = "score:" + _this.score;
        wrapper.appendChild(inner);
        var div = document.createElement('div');
        div.id = "install";
        var button = document.createElement('button');
        button.innerHTML = "洗牌";
        button.onclick = _this.change;
        div.appendChild(button);
        var btn = document.createElement('button');
        btn.onclick = _this.install;
        btn.style.animation = "btn 2s infinite both";
        div.appendChild(btn);
        wrapper.appendChild(div);
        for(var i = 0; i < 16; i++) {
            _this.group[i] = new Brand(_this.imgs[i]);
            _this.group[i].createDom();
        }
        _this.timer = setInterval(function () {
            if(_this.allTime == 0) {
                clearInterval(_this.timer);
                badEnd();
            }
            else {
                _this.allTime--;
                time.innerHTML = _this.allTime;
            }
        },1000);
    };
    this.spread = function () {
        var divs = document.getElementsByClassName('brand');
        for(var i = 0; i < divs.length; i++) {
            divs[i].style.top = parseInt(i / 4) * 180 + 30 + "px";
            divs[i].style.left = 180 * (i % 4) + 230 + "px";
            _this.position[i] = [divs[i].style.top,divs[i].style.left];
        }
    };
    this.change = function () {
        var divs = document.getElementsByClassName('brand');
        for(var i = _this.position.length - 1; i >= 0; i--) {
            var random = parseInt(Math.random() * i);
            var t = _this.position[random];
            _this.position[random] = _this.position[i];
            _this.position[i] = t;
        }
        for(var i = 0; i < divs.length; i++) {
            divs[i].style.top = _this.position[i][0];
            divs[i].style.left = _this.position[i][1];
            divs[i].style.transition = "all 1s";
        }
    };
    this.install = function () {
        clearInterval(_this.timer);
        var dialog = document.createElement('dialog');
        var div = document.createElement('div');
        var imgss = [['8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg'],['17.jpg','18.jpg','19.jpg','20.jpg','21.jpg','22.jpg','23.jpg','24.jpg','17.jpg','18.jpg','19.jpg','20.jpg','21.jpg','22.jpg','23.jpg','24.jpg']];
        var imgs = [];
        imgs[0] = document.createElement('img');
        imgs[0].src = '8.jpg';
        div.appendChild(imgs[0]);
        imgs[1] = document.createElement('img');
        imgs[1].src = '17.jpg';
        div.appendChild(imgs[1]);
        for(var i = 0; i < imgs.length; i++) {
            imgs[i].onclick = (function (a) {
                return function () {
                    var divs = document.getElementsByClassName('backbrand');
                    for(var k = 0; k < divs.length; k++) {
                        divs[k].style.backgroundImage = 'url(' + imgss[a][k] + ')';
                    }
                };
            })(i);
        }
        var button = document.createElement('button');
        button.innerHTML = '确定';
        button.onclick = function() {
            dialog.open = false;
            _this.timer = setInterval(function () {
                if(_this.allTime == 0) {
                    clearInterval(_this.timer);
                    badEnd();
                }
                else {
                    _this.allTime--;
                    time.innerHTML = _this.allTime;
                }
            },1000);
        };
        div.appendChild(button);
        dialog.appendChild(div);
        dialog.open = true;
        wrapper.appendChild(dialog);
    };
    this.judge = function () {
        var divs = document.getElementsByClassName('open');
        _this.time++;
        if(divs.length >= 2) {
            _this.temp[_this.choose] = _this.time;
            _this.first[_this.choose] = [divs[0],divs[1]];
            divs[0].className = 'backbrand';
            divs[0].className = 'backbrand';
            _this.first[_this.choose][0].parentNode.onclick = "";
            _this.first[_this.choose][1].parentNode.onclick = "";
            _this.choose++;
        }
        for(var i = 0; i < _this.temp.length; i++) {
            if(_this.time == _this.temp[i] + 60) {
                if(_this.first[i][0].style.backgroundImage == _this.first[i][1].style.backgroundImage) {
                    _this.first[i][0].parentNode.style.animation = "brand 1s forwards";
                    _this.first[i][1].parentNode.style.animation = "brand 1s forwards";
                    var inner = document.getElementById('inner');
                    _this.score++;
                    inner.innerHTML = "score:" + _this.score;
                }
                else {
                    var divss = _this.first[i][0].parentNode.getElementsByTagName('div');
                    var divsss = _this.first[i][1].parentNode.getElementsByTagName('div');
                    divss[0].style.animation = "reoutDiv 1s forwards";
                    divss[1].style.animation = "reinDiv 1s forwards";
                    divsss[0].style.animation = "reoutDiv 1s forwards";
                    divsss[1].style.animation = "reinDiv 1s forwards";
                    _this.first[i][0].parentNode.onclick = function () {
                        click(this);
                    };
                    _this.first[i][1].parentNode.onclick = function () {
                        click(this);
                    };
                }
            }
        }
        if(_this.score == 8) {
            clearInterval(_this.timer);
            goodEnd(_this.choose);
        }
        if(_this.score != 8 && _this.allTime != 0) {
            window.requestAnimationFrame(_this.judge);
        }
    };
}

function Brand(src) {
    var _this = this;
    this.src = src;
    this.createDom = function () {
        var outDiv = document.createElement('div');
        outDiv.style.backgroundImage = 'url(1.png)';
        outDiv.className = "frontbrand";
        var inDiv = document.createElement('div');
        inDiv.style.backgroundImage = 'url('+ _this.src + ')';
        inDiv.className = "backbrand";
        var div = document.createElement('div');
        div.className = 'brand';
        div.appendChild(outDiv);
        div.appendChild(inDiv);
        div.onclick = function () {
            click(this);
        };
        wrapper.appendChild(div);
    };
}

function click(_this) {
    var divs = _this.getElementsByTagName('div');
    divs[0].style.animation = "outDiv 1s forwards";
    divs[1].style.animation = "inDiv 1s forwards";
    divs[1].className += ' open';
}

function goodEnd(time) {
    wrapper.innerHTML = "";
    playMusic(2);
    var div = document.createElement('div');
    div.id = "start";
    div.innerHTML = "成功！一共选择了" + time + "次 还想再试一次";
    div.onclick = function () {
        ready();
    };
    wrapper.appendChild(div);
    wrapper.style.backgroundImage = 'url(27.jpg)';
}

function badEnd() {
    wrapper.innerHTML = "";
    playMusic(1);
    var div = document.createElement('div');
    div.id = "start";
    div.innerHTML = "失败了 还想来挑战吗";
    div.onclick = function () {
        ready();
    };
    wrapper.appendChild(div);
    wrapper.style.backgroundImage = 'url(100.jpg)';
}