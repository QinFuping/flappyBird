window.onload=function(){
    var head=document.getElementById('head');
    var gt=document.getElementById('gt');
    var gs=document.getElementById('gs');
    var _gameIn=document.getElementById('game-in');
    var _gameStart=document.getElementById('game-start');
    var _game=document.getElementById('game');
    var _score=document.getElementById('score');
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
        // flyUp();
        move();
    }
    //game running
    var bird=document.getElementById('bird');
    function run(){
        _gameIn.style.display='none';
        _game.style.display='block';
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
            var h=bird.offsetTop;
            bird.style.top=h-0.1*g*t*t+'px';
            t--;
            if(t<0){
                clearInterval(timer_u);
                bird.style.transform='rotateZ(0deg)';
                flyDown();
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
            var h=bird.offsetTop;
            bird.style.top=h+0.1*g*t*t+'px';
            t++;
        },50);
    }
    //pipes producing
    var timer_m;
    function move(){
        var i=0;
        pipes();
        timer_m=setInterval(function(){
            i++;
            pipes();
            // var pp1=document.getElementsByClassName('pipe1');
            // var pp2=document.getElementsByClassName('pipe2');
        }, 2000);
        pp1[i].className='pipe pipe1 pipeMove';
        pp2[i].className='pipe pipe2 pipeMove';
    }
    function pipes(){
        var hs=parseInt(_game.offsetHeight*0.88);
        var dh=160;//两根水管的距离
        var h_max=hs-dh-60;
        var h1=random(60,h_max);
        var h2=hs-h1-dh;
        var ps='<div class="pipe pipe1" style="height:'+h1+'px"><div></div></div><div class="pipe pipe2" style="height:'+h2+'px"><div></div></div>';
        _game.innerHTML+=ps;
        var pp1=document.getElementsByClassName('pipe1');
        var pp2=document.getElementsByClassName('pipe2');
    }
    function random(min, max) {
        var r=parseInt(Math.random()*(max-min+1)+min);
        return r;
    }
    //impact checking

    //game over
    //score
    //restart
}
