class Hero {

    constructor() {
        this.image = new Image();
        this.newImage = new Image();
        this.newImage.onload = () => {
            switch(this.type) {
                case 0:
                    this.setForWait();
                    break;
                case 1:
                    this.setForWalk();
                    break;
                case 2:
                    this.setForTalk();
                    break;
                case 3:
                    this.setForToss();
                    break;
                case 4:
                    this.setForRun();
                    break;
            }
            this.shiftY = 0;
            this.currentFrame = 0;
            this.image = this.newImage;
        }
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

}

class Hoca extends Hero {

    constructor() {
        super();
        this.x = 200;
        this.y = 500;
        this.width = 150;
        this.height = 159;
        this.frameWidth = 500;
        this.frameHeight = 530;
        this.shiftX = 0;
    }

    wait() {
        this.type = 0;
        this.newImage.src = ('image/hocaWait.png');
    }

    walk() {
        this.type = 1;
        this.newImage.src = ('image/hocaWalk.png');
    }

    talk() {
        this.type = 2;
        this.newImage.src = ('image/hocaTalk.png');
    }

    toss() {
        this.type = 3;
        this.newImage.src = ('image/hocaToss.png');
    }

    run() {
        this.type = 4;
        this.newImage.src = ('image/hocaRun.png');
    }

    setForWait() {
        this.totalFrame = 65;
        this.sleepTime = 50;
        this.length = 0;
    }

    setForWalk() {
        this.totalFrame = 33;
        this.sleepTime = 50;
        this.length = 2;
    }

    setForTalk() {
        this.totalFrame = 59;
        this.sleepTime = 50;
        this.length = 0;
    }

    setForToss() {
        this.totalFrame = 40;
        this.sleepTime = 50;
        this.length = 0;
    }

    setForRun() {
        this.totalFrame = 41;
        this.sleepTime = 50;
        this.length = 4;
    }

}

class Keloglan extends Hero {

    constructor() {
        super();
        this.x = 700;
        this.y = 500;
        this.width = 78;
        this.height = 159;
        this.frameWidth = 259;
        this.frameHeight = 530;
        this.shiftX = 0;
    }

    wait() {
        this.type = 0;
        this.newImage.src = ('image/keloglanWait.png');
    }

    walk() {
        this.type = 1;
        this.newImage.src = ('image/keloglanWalk.png');
    }

    talk() {
        this.type = 2;
        this.newImage.src = ('image/keloglanTalk.png');
    }

    toss() {
        this.type = 3;
        this.newImage.src = ('image/keloglanToss.png');
    }

    run() {
        this.type = 4;
        this.newImage.src = ('image/keloglanRun.png');
    }

    setForWait() {
        this.totalFrame = 3;
        this.sleepTime = 200;
        this.length = 0;
    }

    setForWalk() {
        this.totalFrame = 28;
        this.sleepTime = 50;
        this.length = -2;
    }

    setForTalk() {
        this.totalFrame = 59;
        this.sleepTime = 50;
        this.length = 0;
    }

    setForToss() {
        this.totalFrame = 40;
        this.sleepTime = 50;
        this.length = 0;
    }

    setForRun() {
        this.totalFrame = 41;
        this.sleepTime = 50;
        this.length = -4;
    }

}