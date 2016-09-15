/**
 * Created by aluno on 14/11/13.
 */

var cocos2dApp = cc.Application.extend({
    config: document.ccConfig,
    ctor: function(scene) {
        this._super();
        this.startScene = scene;

        cc.setup(this.config.tag);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        cc.AudioEngine.getInstance().init();

    },
    applicationDidFinishLaunching: function() {
        var director = cc.Director.getInstance();
        // Sets the resolution policy with designed view size in points.
        cc.EGLView.getInstance().setDesignResolutionSize(800, 480, cc.RESOLUTION_POLICY.SHOW_ALL);
        // Sets whether resize canvas automatically when browser's size changed.
        cc.EGLView.getInstance().resizeWithBrowserSize(true);
        director.setAnimationInterval(1.0 / this.config["frameRate"]);
        director.runWithScene(new this.startScene());
        return true;
    }
});
var myApp = new cocos2dApp(Splash);