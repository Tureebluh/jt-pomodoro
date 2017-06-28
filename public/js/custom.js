//Mixing jQuery and JavaScript purposely to demonstrate ability to use both.

$(document).ready(function(){
    //0 = STOP : 1 = START
    var startStop = 0;

    var startSessionSecs = 0;
    var startBreakSecs = 0;
    var totalBreakSecs = 300;
    var totalSessionSecs = 1500;
    var minutes = Math.floor(totalSessionSecs / 60);
    var seconds = Math.floor(totalSessionSecs % 60);

    var breakLengthLabel = document.getElementById('breakLength');
    var sessionLengthLabel = document.getElementById('sessionLength');
    var currentTimeLabel = document.getElementById('currentTime');
    var progressCircle = document.getElementById('progressCircle');
    var stop1 = document.getElementById('stop1');
    var stop2 = document.getElementById('stop2');

    var timer = setInterval(startTimer, 1000);

    $('#decremBreakInput').on('click', function(){
        if(startStop === 0){
            if(totalBreakSecs > 60) {
                totalBreakSecs -= 60;
                breakLengthLabel.innerText = Math.floor(totalBreakSecs / 60);
            }
        } 
    });
    $('#incremBreakInput').on('click', function(){
        if(startStop === 0){
            if(totalBreakSecs < 3600) {
                totalBreakSecs += 60;
                breakLengthLabel.innerText = Math.floor(totalBreakSecs / 60);
            }
        }
    });
    $('#decremSessionInput').on('click', function(){
        if(startStop === 0){   
            if(totalSessionSecs > 60){
                totalSessionSecs -= 60;
                sessionLengthLabel.innerText = Math.floor(totalSessionSecs / 60);
                currentTimeLabel.innerHTML = ("0" + Math.floor(totalSessionSecs / 60)).slice(-2) + ":00";
            }
        }
    });
    $('#incremSessionInput').on('click', function(){
        if(startStop === 0){
            if(totalSessionSecs < 3600){
                totalSessionSecs += 60;
                sessionLengthLabel.innerText = Math.floor(totalSessionSecs / 60);
                currentTimeLabel.innerHTML = ("0" + Math.floor(totalSessionSecs / 60)).slice(-2) + ":00";
            }
        }
    });
    $('#progressCircle, #currentTime').on('click', function(){
        if(startStop === 0){
            clearInterval(timer);
            startSessionSecs = totalSessionSecs;
            startBreakSecs = totalBreakSecs;
            timer = setInterval(startTimer, 1000);
            progressCircle.classList.add('start');
            startStop = 1;
        } else {
            resetTimer();
        }
    });

    function startTimer(){
        if(startStop === 1){
            //Run Session Timer
            if(totalSessionSecs > 0){
                totalSessionSecs--;
                var timeDifference = startSessionSecs - totalSessionSecs;
                var percentage = Math.round((timeDifference/startSessionSecs) * 100);
                if(percentage <= 100){
                    updateSessionProgress(percentage);
                }
                minutes = "0" + Math.floor(totalSessionSecs / 60);
                seconds = "0" + Math.floor(totalSessionSecs % 60);
                timestamp = minutes.slice(-2) + ":" + seconds.slice(-2);
                currentTimeLabel.innerHTML = timestamp;

                if(totalSessionSecs === 0){
                    progressCircle.classList.remove('start');
                    progressCircle.classList.add('break');
                }
            //Run Break Timer
            } else if (totalBreakSecs > 0){
                totalBreakSecs--;
                var timeDifference = startBreakSecs - totalBreakSecs;
                var percentage = Math.round((timeDifference/startBreakSecs) * 100);
                if(percentage <= 100){
                    updateBreakProgress(percentage);
                }
                minutes = "0" + Math.floor(totalBreakSecs / 60);
                seconds = "0" + Math.floor(totalBreakSecs % 60);
                timestamp = minutes.slice(-2) + ":" + seconds.slice(-2);
                currentTimeLabel.innerHTML = timestamp;
            //Reset Timer Completely
            } else {
                resetTimer();
                $('#progressCircle').trigger('click');
            }
        }
    }

    function updateSessionProgress(percentage){
        stop1.setAttribute('offset', percentage + '%');
        stop2.setAttribute('offset', percentage + '%');
    }
    function updateBreakProgress(percentage){
        stop3.setAttribute('offset', percentage + '%');
        stop4.setAttribute('offset', percentage + '%');
    }
    function resetTimer(){
        clearInterval(timer);
        progressCircle.classList.remove('start');
        progressCircle.classList.remove('break');
        totalSessionSecs = (sessionLengthLabel.innerHTML) * 60;
        totalBreakSecs = (breakLengthLabel.innerHTML) * 60;
        currentTimeLabel.innerHTML = Math.floor(totalSessionSecs / 60) + ":00";
        startStop = 0;
        updateSessionProgress(0);
        updateBreakProgress(0);
    }
});