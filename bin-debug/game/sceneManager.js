var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var sceneManager = (function () {
    function sceneManager() {
        this.startPanel = new startPanel();
    }
    Object.defineProperty(sceneManager, "instance", {
        get: function () {
            if (!this.sceneManager) {
                this.sceneManager = new sceneManager();
            }
            return this.sceneManager;
        },
        enumerable: true,
        configurable: true
    });
    // 删除场景
    sceneManager.prototype.removeOtherScene = function (scene) {
        var _this = this;
        //TODO:
        var arr = [this.startPanel];
        arr.forEach(function (item) {
            if (scene === item) {
                return;
            }
            if (item.parent) {
                _this._stage.removeChild(item);
            }
        });
    };
    // 设置根场景
    sceneManager.prototype.setScene = function (s) {
        this._stage = s;
    };
    // 开始场景
    sceneManager.toStartPanel = function () {
        this.instance.removeOtherScene(this.instance.startPanel);
        this.instance._stage.addChild(this.instance.startPanel);
    };
    return sceneManager;
}());
__reflect(sceneManager.prototype, "sceneManager");
