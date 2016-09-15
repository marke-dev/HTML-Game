/**
 * Created by aluno on 14/11/13.
 */
(function() {
    var d = document;
    var c = {
        menuType: "canvas",
        COCOS2D_DEBUG: 2,
        box2d: false,
        chipmunk: false,
        showFPS: false,
        frameRate: 60,
        tag: "GC",
        engineDir: "lib/cocos2d/",
        appFiles: ["MissileCommand.js", "Splash.js", "Cidade.js",
            "Missil.js", "Naves.js", "FimdeJogo.js", "Aviso.js", "credits.js"
        ]
    };
    window.addEventListener('DOMContentLoaded', function() {
        var s = d.createElement("script");
        s.src = c.engineDir + "jsloader.js";
        d.body.appendChild(s);
        s.c = c;
        s.id = "cocos2d-html5";
        document.ccConfig = c;
    });
})();