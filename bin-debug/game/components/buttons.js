/**
 * 创建不同颜色的button
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
var buttons = (function (_super) {
    __extends(buttons, _super);
    function buttons() {
        return _super.call(this) || this;
    }
    buttons.prototype.setImg = function (img, color) {
        this.img.texture = RES.getRes(img);
        this.txt.strokeColor = color;
    };
    buttons.prototype.init = function (type, text, size, width, height) {
        if (type === void 0) { type = 1; }
        if (size === void 0) { size = 24; }
        if (width === void 0) { width = 180; }
        if (height === void 0) { height = 64; }
        this.img = new egret.Bitmap();
        this.txt = new egret.TextField();
        this.width = width;
        this.height = height;
        switch (type) {
            case 1:
                this.setImg('btn_bg_green_png', 0x42a605);
                break;
            case 2:
                this.setImg('btn_bg_blue_png', 0x2582c3);
                break;
            case 3:
                this.setImg('btn_bg_purple_png', 0x810fb5);
                break;
            case 4:
                this.setImg('btn_bg_pink_png', 0xc30835);
                break;
            case 5:
                this.setImg('btn_bg_brown_png', 0x8e4926);
                break;
            default:
                this.setImg('btn_bg_grey_png', 0x656565);
        }
        //九宫格位图,改变长宽而不改变圆角处
        this.img.scale9Grid = new egret.Rectangle(10, 10, 14, 103);
        this.img.width = width;
        this.img.height = height;
        this.addChild(this.img);
        // 按钮中文字set
        this.txt.size = size;
        this.txt.textColor = 0xffffff;
        this.txt.text = text;
        this.txt.stroke = 1;
        this.txt.x = this.img.width / 2 - this.txt.width / 2;
        this.txt.y = this.img.height / 2 - this.txt.height / 2;
        this.addChild(this.txt);
        // 按钮点击效果
        this.img.touchEnabled = true;
        this.txt.touchEnabled = true;
        this.addListener(egret.TouchEvent.TOUCH_BEGIN, 2);
        this.addListener(egret.TouchEvent.TOUCH_END || egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, -2);
    };
    buttons.prototype.addListener = function (name, num) {
        var _this = this;
        this.img.addEventListener(name, function () {
            _this.img.x += num;
            _this.img.y += num;
            _this.txt.x += num;
            _this.txt.y += num;
        }, this);
    };
    return buttons;
}(egret.Sprite));
__reflect(buttons.prototype, "buttons");
