/**
 * 首页底部
 */
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
var bottomPart = (function (_super) {
    __extends(bottomPart, _super);
    function bottomPart() {
        var _this = _super.call(this) || this;
        _this.height = 100;
        _this._width = 1000;
        return _this;
    }
    bottomPart.prototype.init = function () {
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x000000, .5);
        bg.graphics.drawRect(0, 0, this._width, this.height);
        bg.graphics.endFill();
        this.bg = bg;
        this.addChild(this.bg);
        this.imgPart('b1_png', 53, 52, 30, '好友排行', 20, bottomPart.FRIENDS_RANK);
        this.imgPart('b2_png', 47, 46, 130, '群内排行', 120, bottomPart.FRIENDS_RANK);
        this.imgPart('b4_png', 60, 48, 230, '皮肤', 235, bottomPart.SKIN);
        this.imgPart('like_png', 70, 65, 330, '点赞', 331, bottomPart.ZAN, true);
    };
    bottomPart.prototype.imgPart = function (imgRES, width, height, x, text, tX, eventName, isWX, tY, y, img, txt) {
        var _this = this;
        if (isWX === void 0) { isWX = false; }
        if (tY === void 0) { tY = 60; }
        if (y === void 0) { y = 20; }
        if (img === void 0) { img = new egret.Bitmap; }
        if (txt === void 0) { txt = new egret.TextField; }
        var miniObj = {
            appId: 'wx18a2ac992306a5a4',
            path: 'pages/apps/largess/detail?id=waQKNtmC5mk%3D'
        };
        img.texture = RES.getRes(imgRES);
        img.width = width * 0.5;
        img.height = height * 0.5;
        img.x = x;
        img.y = y;
        this.addChild(img);
        img.touchEnabled = true;
        img.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(eventName);
            //   TODO: 添加wx相关文件
            //   if (isWX) platform.openMini(miniObj);
        }, this);
        txt.text = text;
        txt.size = 12;
        txt.textColor = 0xffffff;
        txt.x = tX;
        txt.y = tY;
        this.addChild(txt);
        txt.touchEnabled = true;
        txt.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.dispatchEventWith(eventName);
            //   if (isWX) platform.openMini(miniObj);
        }, this);
    };
    bottomPart.FRIENDS_RANK = 'friendsrank';
    bottomPart.GROUP_RANK = 'grouprank';
    bottomPart.WORLD_RANK = 'worldrank';
    bottomPart.SKIN = 'skin';
    bottomPart.ZAN = 'ZAN';
    return bottomPart;
}(egret.Sprite));
__reflect(bottomPart.prototype, "bottomPart");
