window.onload=function(){
    var head=document.getElementById('head');
    var gt=document.getElementById('gt');
    var gs=document.getElementById('gs');
    var _main=document.getElementById('main');
    var _gameIn=document.getElementById('game-in');
    var _gameStart=document.getElementById('game-start');
    var _game=document.getElementById('game');
    var _score=document.getElementById('score');
    var _pipeWrap=document.getElementById('pipe-wrap');
    var _pipes=document.getElementById('pipes');
    var _gameOver=document.getElementById('game-over');
    var _best=document.getElementById('best');
    function headPlay(){
        head.style.animationPlayState='running';
    }
    function headStop(){
        head.style.animationPlayState='paused';
    }
    headPlay();
    //start
    gt.onclick=function(){
        headStop();
        _gameStart.style.display='none';
        _gameIn.style.display='block';
    }
    _gameIn.onclick=function(){
        run();
        flyUp();
        move();
    }
    //game running
    var bird=document.getElementById('bird');
    var t_max=0;//飞翔最大高度
    var b_max=parseInt(_main.offsetHeight*0.88)-34;//飞翔最低高度
    var score1=document.getElementById('score1');
    var score2=document.getElementById('score2');
    var score=0;//当前分数
    function run(){
        _gameIn.style.display='none';
        _pipeWrap.style.display='block';
        _game.style.display='block';
        _score.style.display='block';
        score2.style.display='inline-block';
        _game.onclick=flyUp;
    }
    var timer_u;
    var timer_d;
    function flyUp(){
        if(timer_d){
            clearInterval(timer_d);
        }
        bird.style.transform='rotateZ(-25deg)';
        var g=3.8;
        var t=7;
        if(timer_u){
            clearInterval(timer_u);
        }
        timer_u=setInterval(function(){
            var h=bird.offsetTop-0.1*g*t*t;
            bird.style.top=h+'px';
            t--;
            if(t<0){
                clearInterval(timer_u);
                bird.style.transform='rotateZ(0deg)';
                flyDown();
            }
            if(h<t_max){
                gameOver();
            }
        },50);
    }
    function flyDown(){
        bird.style.transform='rotateZ(45deg)';
        var g=3.8;
        var t=2;
        if(timer_d){
            clearInterval(timer_d);
        }
        timer_d=setInterval(function(){
            var h=bird.offsetTop+0.1*g*t*t;
            if(h>b_max){
                clearInterval(timer_d);
                gameOver();
                h=b_max;
            }
            bird.style.top=h+'px';
            t++;
        },50);
    }
    //pipes producing
    var timer_m;
    var sw=_main.offsetWidth;
    var dh=160;//两根水管的距离
    var pw=62;//水管宽度
    var sss=200;//水管间距
    var t_bird=bird.offsetTop;//小鸟与顶部间的距离
    function move(){
        var i=2;
        pipes(0);
        pipes(1);
        pipes(2);
        timer_m=setInterval(function(){
            _pipeWrap.scrollLeft++;
            if(_pipeWrap.scrollLeft % sss == 0){
                i++;
                pipes(i);
            }
            if(_pipeWrap.scrollLeft % sss == 0 && _pipeWrap.scrollLeft / sss>2){
                var fc1=_pipes.getElementsByClassName('pipe1')[0];
                var fc2=_pipes.getElementsByClassName('pipe2')[0];
                _pipes.removeChild(fc1);
                _pipes.removeChild(fc2);
            }
            //record
            if(parseInt(_pipeWrap.scrollLeft-0.8*sw-pw+sss) % sss == 0 && _pipeWrap.scrollLeft / sss>1){
                score++;
                if(score<10){
                    score2.src='image/'+score+'.jpg';
                }else{
                    score1.style.display='inline-block';
                    score1.src='image/'+Math.floor(score/10)+'.jpg';
                    score2.src='image/'+parseInt(score%10)+'.jpg';
                }
                console.log(document.getElementsByClassName('pipe1')[1]);
            }
            //impact checking
            if(_pipeWrap.scrollLeft>(0.8*sw+sss*score+67) && _pipeWrap.scrollLeft<(0.8*sw+sss*score+pw+67)){
                if(t_bird<document.getElementsByClassName('pipe1')[2].offsetHeight||t_bird>(document.getElementsByClassName('pipe1')[2].offsetHeight+dh)){
                    // gameOver();
                    console.log('game over');
                }
            }
            // console.log('score='+score);
            // console.log('bird.top='+bird.offsetTop);
        },10);
    }
    function pipes(i){
        var hs=parseInt(_game.offsetHeight*0.88);
        var h_max=hs-dh-60;
        var h1=random(60,h_max);
        var h2=hs-h1-dh;
        var ps='<div class="pipe pipe1" style="height:'+h1+'px;left:'+(sw+parseInt(i*sss))+'px"><div></div></div><div class="pipe pipe2" style="height:'+h2+'px;left:'+(sw+parseInt(i*sss))+'px"><div></div></div>';
        _pipes.innerHTML+=ps;
    }
    function random(min, max) {
        var r=parseInt(Math.random()*(max-min+1)+min);
        return r;
    }
    //game over
    var storage=window.localStorage;
    function gameOver(){
        clearInterval(timer_m);
        _game.onclick=null;
        _gameOver.style.display='block';
        document.getElementById('s-cur').innerText=score;
        record();
    }
    //record
    function record(){
        if(!storage.score){
            storage.score=0;
        }
        storage.score=score>storage.score?score:storage.score;
        document.getElementById('s-best').innerText=storage.score;
        console.log(storage.score);
    }
    //restart
    document.getElementById('game-over-btn').onclick=function(){
        window.location.reload();
    }
    //best score
    gs.onclick=function(){
        _best.style.display='block';
        _gameStart.style.display='none';
        if(!storage.score){
            document.getElementById('best-score').innerText=score;
        }else {
            document.getElementById('best-score').innerText = storage.score;
        }
    }
    document.getElementById('best-btn').onclick=function(){
        _best.style.display='none';
        _gameStart.style.display='block';
    }
}
