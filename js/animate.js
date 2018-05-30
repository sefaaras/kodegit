
    function startAnimation() {
        var context = setCanvas();
    }

    function hocaWait() {
        hoca.wait();
    }

    function hocaWalk() {
        hoca.walk();
    }

    function hocaTalk() {
        hoca.talk();
    }

    function hocaToss() {
        hoca.toss();
    }

    function hocaRun() {
        hoca.run();
    }

    function keloglanWait() {
        keloglan.wait();
    }

    function keloglanWalk() {
        keloglan.walk();
    }

    function keloglanTalk() {
        keloglan.talk();
    }

    function keloglanToss() {
        keloglan.toss();
    }

    function keloglanRun() {
        keloglan.run();
    }


    async function animateHoca() {
        await sleep(hoca.sleepTime);
        context.clearRect(hoca.x, hoca.y, hoca.width, hoca.height);
        context.drawImage(hoca.image, hoca.shiftX, hoca.shiftY, hoca.frameWidth, hoca.frameHeight,
            hoca.x, hoca.y, hoca.width, hoca.height);
        hoca.shiftY += hoca.frameHeight;
        hoca.x += hoca.length;
        hoca.currentFrame++;
        if (hoca.currentFrame == hoca.totalFrame) {
            hoca.currentFrame = 0;
            hoca.shiftY = 0;
        }
        animateId = requestAnimationFrame(animateHoca);
    }

    async function animateKeloglan() {
        await sleep(keloglan.sleepTime);
        context.clearRect(keloglan.x, keloglan.y, keloglan.width, keloglan.height);
        context.drawImage(keloglan.image, keloglan.shiftX, keloglan.shiftY, keloglan.frameWidth, keloglan.frameHeight,
            keloglan.x, keloglan.y, keloglan.width, keloglan.height);
        keloglan.shiftY += keloglan.frameHeight;
        keloglan.x += keloglan.length;
        keloglan.currentFrame++;
        if (keloglan.currentFrame == keloglan.totalFrame) {
            keloglan.currentFrame = 0;
            keloglan.shiftY = 0;
        }
        animateId = requestAnimationFrame(animateKeloglan);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }