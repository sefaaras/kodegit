
function setCanvas() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var canvasWidth = document.getElementById('canvas').offsetWidth;
    var canvasHeight = document.getElementById('canvas').offsetHeight;
    canvas.width  = canvasWidth;
    canvas.height = canvasHeight;

    return context;
}