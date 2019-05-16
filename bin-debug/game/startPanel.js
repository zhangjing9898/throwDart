var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var startPanel = (function (_super) {
    __extends(startPanel, _super);
    function startPanel() {
        var _this = _super.call(this) || this;
        _this.bottomPart = new bottomPart();
        return _this;
    }
    startPanel.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    startPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    startPanel.prototype.init = function () {
        var _this = this;
        var _a = this, stage = _a.stage, startBtn = _a.startBtn, startPK = _a.startPK, bottomPart = _a.bottomPart;
        // 创建模式按钮
        startBtn = new buttons();
        this.addChild(startBtn);
        startBtn.init(1, '单人闯关');
        startBtn.x = -startBtn.width;
        startBtn.y = 400;
        egret.Tween.get(startBtn).to({
            x: stage.stageWidth / 2 - startBtn.width / 2
        }, 500, egret.Ease.bounceOut);
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.touchTap(1);
        }, this);
        startPK = new buttons();
        this.addChild(startPK);
        startPK.init(4, '疯狂模式');
        startPK.x = stage.stageWidth;
        startPK.y = 500;
        egret.Tween.get(startPK).to({
            x: stage.stageWidth / 2 - startPK.width / 2
        }, 500, egret.Ease.bounceOut);
        startPK.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.touchTap(2);
        }, this);
        this.addChild(bottomPart);
        bottomPart.init();
        bottomPart.y = stage.stageHeight;
        egret.Tween.get(bottomPart).to({ y: stage.stageHeight - bottomPart.height }, 500, egret.Ease.bounceOut);
        // TODO: 监听事件
    };
    startPanel.prototype.touchTap = function (mode) {
        if (mode === void 0) { mode = 1; }
        // 1: easy mode; 2: crazy mode
        switch (mode) {
            case 1:
                this.dispatchEventWith(startPanel.GAME_START_1);
                break;
            case 2:
                this.dispatchEventWith(startPanel.GAME_START_2);
                break;
        }
    };
    startPanel.GAME_START_1 = 'gamestart1';
    startPanel.GAME_START_2 = 'gamestart2';
    return startPanel;
}(eui.Component));
__reflect(startPanel.prototype, "startPanel", ["eui.UIComponent", "egret.DisplayObject"]);
