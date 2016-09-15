/**
 * Created by aluno on 18/11/13.
 */
var MissileCommandGame = cc.Layer.extend({
    time: 61,
    HUDTempo: [],
    HUDScore: [],
    cidades: [],
    misseis: [],
    naves: [],
    bg: null,
    bgind: 4,
    vel: 2,
    msg: null,
    playing: true,
    verNaves: true,
    navesVivas: 0,
    loading: null,

    init: function() {
        this._super();

        this.msg = cc.LabelTTF.create("", "Arial", 30);

        this.setTouchEnabled(true);
        var bgtx = "assets/bg" + this.bgind + ".png";
        this.bg = cc.Sprite.create(bgtx);
        this.bg.setPosition(new cc.p(tela.width / 2, tela.height / 2));
        this.addChild(this.bg);

        this.HUDTempo = cc.LabelTTF.create("0:0" + this.time, "Arial", tela.width / 40);
        this.HUDTempo.setPosition(new cc.p(tela.width - tela.width / 20, tela.height - tela.height / 20));
        this.addChild(this.HUDTempo);

        score = 0;

        this.HUDscore = cc.LabelTTF.create("Score: " + score, "Arial", tela.width / 40);
        this.HUDscore.setPosition(new cc.p(tela.width / 15, tela.height - tela.height / 20));
        this.addChild(this.HUDscore);

        var btBack = cc.Sprite.create("assets/btPause.png");
        var back = cc.MenuItemSprite.create(btBack, null, null, 'Pause', this);

        var menu = cc.Menu.create(back);
        menu.setPosition(758, 12);
        this.addChild(menu);

        for (var i = 0; i < 6; i++) {
            this.cidades[i] = new Cidade(i);
            this.addChild(this.cidades[i]);
        }

        canhaopart2 = cc.Sprite.create("assets/canhaopart2.png");
        canhaopart2.setAnchorPoint(new cc.p(0.5, 0));
        canhaopart2.setPosition(new cc.p(tela.width / 2, tela.height / 10 - 5));
        this.addChild(canhaopart2);

        var canhaopart1 = cc.Sprite.create("assets/canhaopart1.png");
        canhaopart1.setPosition(new cc.p(tela.width / 2, tela.height / 10));
        this.addChild(canhaopart1);

        this.misseis = [];

        this.naves = [];
        numCidades = 6;
        verCanhao = true;
        verNaves = true;

        this.scheduleUpdate();

        return this;

    },
    Pause: function() {
        if (this.playing) {
            this.playing = false;
            var allChild = this.getChildren();
            for (var i = 0; i < allChild.length; i++) {
                allChild[i].pauseSchedulerAndActions();
            }
            this.pauseSchedulerAndActions();
        } else {
            this.playing = true;
            var allChild = this.getChildren();
            for (var i = 0; i < allChild.length; i++) {
                allChild[i].resumeSchedulerAndActions();
            }
            this.resumeSchedulerAndActions();
        }
    },
    verificarColisao: function() {
        for (var a = 0; a < this.naves.length; a++) {
            for (var b = 0; b < this.cidades.length; b++) {
                if (this.collide(this.naves[a], this.cidades[b])) {
                    this.naves[a].kill();
                    this.cidades[b].kill();
                    numCidades--;
                }
            }
            for (var c = 0; c < this.misseis.length; c++) {
                if (this.collide(this.naves[a], this.misseis[c])) {
                    this.naves[a].kill();
                    this.misseis[c].kill();
                    score++;
                    this.HUDscore.setString("Score: " + score);
                }
            }
        }
    },
    atualizarHud: function() {
        if (this.time < 10) {
            this.HUDTempo.setString("0:0" + parseInt(this.time))
        } else {
            this.HUDTempo.setString("0:" + parseInt(this.time))
        }
    },
    proximoNivel: function() {
        if (this.time <= 0) {
            this.time = 60;
            this.vel++;
            this.playing = true;
            this.msg.setPosition(1000, 1000);
            this.msg.removeFromParent(true);
            this.bg.setTexture(cc.TextureCache.getInstance().addImage("assets/bg" + this.bgind + ".png"));
        }
    },
    fimDoNivel: function() {
        this.playing = false;
        this.time = 6;
        this.bgind++;

        for (var i = this.naves.length - 1; i >= 0; i--) {
            this.naves[i].removeFromParent(true);
            this.naves[i].setPosition(1000, 1000);
            this.naves.pop();
        }
        for (i = this.misseis.length - 1; i >= 0; i--) {
            this.misseis[i].removeFromParent(true);
            this.misseis[i].setPosition(-1000, -1000);
            this.misseis.pop();
        }
        if (this.bgind > 3) {
            this.bgind = 1;
        }

        this.msg.setPosition(400, 300);
        this.addChild(this.msg);
    },
    update: function(dt) {
        this.time -= dt;
        if (this.playing) {

            if (this.time > 20 / this.vel && verNaves && numCidades > 0) {
                this.addNaves();
            }

            this.verificarColisao();
            this.atualizarHud();

            for (var i = 0; i < this.naves.length; i++) {
                if (this.naves[i].alive == true) {
                    this.navesVivas++;
                }
            }
            if (numCidades <= 0) {
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.6, new endscene()));
            }

            if (this.time <= 0) {
                this.time = 0;
                if (this.navesVivas <= 0) {
                    this.fimDoNivel();
                }
            }

            this.navesVivas = 0;
            cc.log(this.navesVivas);
        } else {
            this.msg.setString("Wave " + this.vel + " Starts in " + parseInt(this.time) + "s", "Arial", 30);
            this.proximoNivel();

        }
    },
    addNaves: function() {
        this.naves.push(new Nave(this.vel));
        this.addChild(this.naves[this.naves.length - 1]);
        this.naves.push(new Nave(this.vel));
        this.addChild(this.naves[this.naves.length - 1]);
        this.naves.push(new Nave(this.vel));
        this.addChild(this.naves[this.naves.length - 1]);
        verNaves = false;
        window.setTimeout(function() {
            verNaves = true;
        }, 5000);
    },
    onTouchesEnded: function(pTouch, pEvent) {
        if (pTouch[0].getLocation().y > tela.height / 10) {
            if (verCanhao) {
                if (this.playing) {
                    this.misseis.push(new Missil());
                    this.addChild(this.misseis[this.misseis.length - 1]);
                    this.misseis[this.misseis.length - 1].handleTouch(pTouch[0].getLocation());
                    canhaopart2.setRotation(this.misseis[this.misseis.length - 1].getRotation());
                    verCanhao = false;
                    window.setTimeout(function() {
                        verCanhao = true;
                    }, 450);
                }
            }
        }
    },
    collide: function(a, b) {
        var pos1 = a.getPosition();
        var pos2 = b.getPosition();

        var aRect = a.collideRect(pos1);
        var bRect = b.collideRect(pos2);
        return cc.rectIntersectsRect(aRect, bRect);
    }
});


MissileCommandGame.create = function() {
    var sg = new MissileCommandGame();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

MissileCommandGame.scene = function() {
    var scene = cc.Scene.create();
    var layer = MissileCommandGame.create();
    scene.addChild(layer, 1);
    return scene;
};