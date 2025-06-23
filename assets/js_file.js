<!DOCTYPE html>
<html>
    <body>
        <h1></h1>
        <span id="clock">bloop.</span>

        <p id="txButton" onclick="reset();">Cut-rate button.</p>
        <button id="rlButton" onclick="reset();">butt???</button>



<script>

let i_time,clock;
d = new Date();
i_time = d.getTime();
clock = 0

setInterval(tickTock,10);

function tickTock(){
        d = new Date();
        clock = d.getTime()-i_time;
        document.getElementById('clock').innerHTML="Clocktime: "+(clock/1000.0)+"s";
}

function reset(){
    d = new Date();
    i_time = d.getTime();
}

</script>

    </body>
</html>
