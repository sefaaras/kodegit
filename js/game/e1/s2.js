
    document.getElementById('codeArea').value = 'hayvanSayisi=';

    var context = setCanvas();
    var hoca = new Hoca();
    var keloglan = new Keloglan();

    var cloudImage = new Image();
    cloudImage.src = ('image/cloud.png');
    cloudImage.onload = () => {
        setTimeout(drawCloud, 6000);
    }

    var chickenImage = new Image();
    chickenImage.src = ('image/chicken.png');
    chickenImage.onload = () => {
        setTimeout(drawChicken, 1000);
    }

    setTimeout(hocaWalk, 0);
    setTimeout(keloglanWalk, 0);

    setTimeout(animateHoca, 1000);
    setTimeout(animateKeloglan, 1000);

    setTimeout(hocaWait, 5000);

    setTimeout(keloglanWait, 6000);
    setTimeout(hocaTalk, 6000);

    setTimeout(hocaWait, 10000);

    function drawCloud() {
        context.drawImage(cloudImage, 0, 10, 1028, 128);
        context.font = "24px Arial";
        context.fillText("Hey ! Keloğlan bahçede kaç tane tavuk görüyorsun ?", 64, 80);
    }

    function drawChicken() {
        context.drawImage(chickenImage, 50, 400, 80, 80);
        context.drawImage(chickenImage, 120, 360, 80, 80);
        context.drawImage(chickenImage, 190, 400, 80, 80);
        context.drawImage(chickenImage, 260, 360, 80, 80);
    }

    function debug() {
        var compileResult = compile(document.getElementById('codeArea').value);
        if(compileResult == "correct") {
            var questResult = e1s2(document.getElementById('codeArea').value);
            if(questResult == "correct") {
                alert("Başarılı !");
                window.location = "index.php?game=3";
            } else {
                context.drawImage(cloudImage, 0, 10, 1028, 128);
                context.fillText(questResult, 64, 80);
                hocaTalk();
                setTimeout(hocaWait, 3000);
            }
        } else {
            context.drawImage(cloudImage, 0, 10, 1028, 128);
            context.fillText(compileResult, 64, 80);
            hocaTalk();
            setTimeout(hocaWait, 3000);
        }
    }

    function reset() {
        document.getElementById('codeArea').value = 'hayvanSayisi=';
    }

    function clearText() {
        document.getElementById('codeArea').value = '';
    }

    function settings() {
        document.getElementById('codeArea').value = 'Settings';
    }