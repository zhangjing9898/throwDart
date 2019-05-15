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
        return _super.call(this) || this;
    }
    startPanel.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    startPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initButtons();
    };
    startPanel.prototype.initButtons = function () {
        var _a = this, startBtn = _a.startBtn, startPK = _a.startPK;
        startBtn = new buttons();
        this.addChild(startBtn);
        startBtn.init(1, '单人闯关');
        startPK = new buttons();
        this.addChild(startPK);
        startPK.init(4, '疯狂模式');
    };
    return startPanel;
}(eui.Component));
__reflect(startPanel.prototype, "startPanel", ["eui.UIComponent", "egret.DisplayObject"]);
