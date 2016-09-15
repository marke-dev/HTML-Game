/**
 * Created by aluno on 18/11/13.
 */
var Cidade = cc.Sprite.extend({
    sprites: [],
    ctor: function(i) {
        this._super();
        // handles the loading of the sprite frames
        this.sprites = cc.SpriteFrameCache.getInstance();
        // Adds multiple Sprite Frames from plist file.
        this.sprites.addSpriteFrames("assets/cidade.plist", "assets/cidade.png");
        // Get Sprite Frame that was previously added.
        var frame1 = this.sprites.getSpriteFrame("cidade1.png");
        //this.initWithSpriteFrame(frame1);
        var r = Math.floor(Math.random() * 6);
        switch (r) {
            case 0:
                this.initWithFile('assets/a.png');
                break;
            case 1:
                this.initWithFile('assets/b.png');
                break;
            case 2:
                this.initWithFile('assets/c.png');
                break;
            case 3:
                this.initWithFile('assets/d.png');
                break;
            case 4:
                this.initWithFile('assets/e.png');
                break;
            case 5:
                this.initWithFile('assets/g.png');
                break;
        }
        //this.setScale(1.5);

        if (i < 3)
            this.setPosition(tela.width / 40 + tela.width / 20 + 120 * i, tela.height / 16);
        else
            this.setPosition(tela.width / 2 + tela.width / 15 + tela.width / 20 + 120 * (i - 3), tela.height / 16);
        this.setAnchorPoint(new cc.p(0.5, 0));
    },
    alive: true,
    explosao: null,
    kill: function() {
        var frame = []
        // Cache Sprite Frames of explode.
        frame.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("cidade3.png"));
        frame.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("cidade2.png"));
        // Create animation object of explode.
        var explode = cc.Animation.create(frame, 0.7);
        // Create explode animate.
        var action = cc.Animate.create(explode);
        // run animate
        this.runAction(action);
        //cc.AudioEngine.getInstance().setEffectsVolume(0.1);
        //cc.AudioEngine.getInstance().playEffect("bomb",false);
        if (this.displayFrame() == cc.SpriteFrameCache.getInstance().getSpriteFrame("cidade2.png")); {
            this.alive = false;
            //this.explosao = cc.ParticleSmoke.create();
            //this.explosao.setPosition(20,20);
            //this.explosao.setDuration(4);
            //this.explosao.setLife(5);
            //this.explosao.setTotalParticles(15);
            //this.explosao.setEmissionRate(4);
            //this.addChild(this.explosao);
        }
    },
    collideRect: function(p) {
        if (this.alive == false)
            return cc.rect(1000000, 100000, 1, 1)
        var a = this.getContentSize();
        return cc.rect(p.x - a.width / 2, p.y - a.height / 2, a.width, a.height * 2);
    }
});