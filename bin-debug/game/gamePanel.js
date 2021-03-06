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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var gamePanel = (function (_super) {
    __extends(gamePanel, _super);
    function gamePanel() {
        var _this = _super.call(this) || this;
        _this.skin = 1;
        _this.dartW = 21;
        _this.dartH = 100;
        /**
         * 通过一关，重新random木桩上的飞镖
         */
        _this.level = 1;
        _this.mode = 1;
        _this.dartNum = 9;
        /**
         * 木桩旋转
         */
        // time interval的间隔，数值越小转的越快
        _this.rate = 35;
        // 改变现有旋转速度
        _this.rateOffset = 0;
        _this.rotations = 3;
        _this.insertRotare = [];
        _this.initGame();
        return _this;
    }
    gamePanel.prototype.start = function (mode) {
        if (mode === void 0) { mode = 1; }
        // 1: easy 2:crazy
        var mat = [];
        mode === 1 ? mat = [1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0,]
            :
                mat = [
                    -1, 0, 0, 0, 255,
                    0, -1, 0, 0, 255,
                    0, 0, -1, 0, 255,
                    0, 0, 0, 1, 0,
                ];
        this.bgimg.filters = [new egret.ColorMatrixFilter(mat)];
    };
    // protected和private类似，但是，protected成员在派生类中可以访问
    // async: 代码上的顺序执行，行为上的异步执行
    gamePanel.prototype.initGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stage, stageW, stageH, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        stage = egret.MainContext.instance.stage;
                        stageW = stage.stageWidth;
                        stageH = stage.stageHeight;
                        // 绘制背景
                        this.bgimg = new egret.Bitmap();
                        this.bgimg.x = 0;
                        this.bgimg.y = 0;
                        this.bgimg.width = stageW;
                        this.bgimg.height = stageH;
                        this.addChild(this.bgimg);
                        // 读取skin
                        _a = this;
                        _b = parseInt;
                        return [4 /*yield*/, platform.getData('skin')];
                    case 1:
                        // 读取skin
                        _a.skin = _b.apply(void 0, [(_c.sent()) || 1]);
                        // 生成对应bg
                        switch (this.skin) {
                            case 1:
                                this.skinConf('4_jpg', 0.4, 'timber_png', 200);
                                break;
                            case 2:
                                this.skinConf('2_jpg', 0.7, 'eye_png', 280);
                                break;
                        }
                        this.timber.x = stageW / 2;
                        this.timber.y = 230;
                        this.createText();
                        this.createDart();
                        this.startAnimation();
                        this.dartNumArea();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 绘制飞镖
     * @param dart
     * @param width
     * @param height
     * @param x
     * @param y
     */
    gamePanel.prototype.drawDart = function (dart, width, height, x, y) {
        dart.width = width;
        dart.height = height;
        dart.x = x;
        dart.y = y;
    };
    gamePanel.prototype.drawText = function (x, y, color, size, align, update) {
        if (update === void 0) { update = false; }
        var txt = new egret.TextField();
        this.addChild(txt);
        txt.x = x;
        txt.y = y;
        txt.textColor = color;
        txt.textAlign = align;
        txt.size = size;
        if (update)
            txt.text = "x " + this.dartNum;
    };
    /**
     * 绘制剩余飞镖数 框
     */
    gamePanel.prototype.dartNumArea = function () {
        var dart = this.createBitmapByName('kunai_png');
        this.drawDart(dart, 10, 50, 30, GameUtil.getStageHeight() - 100);
        this.addChild(dart);
        this.drawText(50, GameUtil.getStageHeight() - 80, 0xffffff, 14, egret.HorizontalAlign.LEFT, true);
    };
    gamePanel.prototype.skinConf = function (res, alpha, timberRes, timberW) {
        var bgimg = this.bgimg;
        bgimg.texture = RES.getRes(res);
        bgimg.alpha = alpha;
        this.timber = this.createBitmapByName(timberRes);
        this.addChild(this.timber);
        this.timber.width = timberW;
        this.timber.height = timberW;
        this.timber.anchorOffsetX = timberW / 2;
        this.timber.anchorOffsetY = timberW / 2;
    };
    gamePanel.prototype.createText = function () {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x2f1810, .8);
        shape.graphics.drawRoundRect(-10, 10, 80, 30, 10);
        shape.graphics.endFill();
        this.addChild(shape);
        var txt = new egret.TextField();
        this.addChild(txt);
        txt.x = 12;
        txt.y = 17;
        txt.textColor = 0xffffff;
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.size = 14;
        this.txt = txt;
        this.updateLevel();
    };
    // 关卡更新
    gamePanel.prototype.updateLevel = function () {
        this.txt.text = "\u7B2C " + this.level + " \u5173";
    };
    // 生成飞镖
    gamePanel.prototype.createDart = function () {
        var stage = egret.MainContext.instance.stage;
        var dart = this.createBitmapByName('kunai_png');
        this.addChild(dart);
        dart.width = this.dartW;
        dart.height = this.dartH;
        dart.x = stage.width / 2 - 10;
        dart.y = stage.height - 170;
        this.randomDart();
        // TODO: 点击
    };
    gamePanel.prototype.randomDart = function () {
        if (this.level === 1)
            return;
        switch (this.mode) {
            case 1:
                // 简单模式，每关随机增加
                var random = Math.round(Math.random() * this.level);
                if (random >= this.level / 2)
                    this.dartNum -= Math.floor(Math.random() * this.level / 2 + 1);
                this.dartInThumb(random);
                break;
            case 2:
                // 疯狂模式，每过一关，木桩上的飞镖多一把
                this.dartInThumb(this.level);
                break;
        }
    };
    /**
     * 随机性 生成飞镖位置
     */
    gamePanel.prototype.dartInThumb = function (length) {
        for (var i = 1; i < length; i++) {
            // 更加随机性 生成飞镖位置
            var random = Math.floor(Math.random() * 180);
            random = Math.random() < 0.5 ? random * -1 : random;
            this.rotateThumb(random);
        }
    };
    gamePanel.prototype.rotateThumb = function (random) {
        var _this = this;
        var stage = egret.MainContext.instance.stage;
        var rotate = typeof random === 'number' ? random : this.timber.rotation;
        // 存储木桩上 飞镖坐标
        var range = [];
        // 生成基础版 飞镖
        var dart = this.createBitmapByName('kunai_png');
        dart.anchorOffsetX = 5;
        dart.anchorOffsetY = -52;
        dart.x = stage.stageWidth / 2;
        dart.y = 230;
        dart.width = this.dartW;
        dart.height = this.dartH;
        // this.addChildAt: 某一个显示对象添加到一个指定深度;深度值为0，为了让飞镖图案低于木桩图
        this.addChildAt(dart, 0);
        // 让飞镖旋转
        var time = setInterval(function () {
            dart.rotation += _this.rotations;
        }, this.rate - this.rateOffset);
        var obj = {
            id: this.timber.rotation,
            range: range,
            dart: dart,
            time: time
        };
        this.insertRotare.push(obj);
    };
    /**
     * 木桩初始动画
     */
    gamePanel.prototype.startAnimation = function () {
        var _this = this;
        console.log('1');
        if (this.timberInterval)
            clearInterval(this.timberInterval);
        this.timber.rotation = 0;
        this.timberInterval = setInterval(function () {
            _this.timber.rotation += _this.rotations;
        }, this.rate - this.rateOffset);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    gamePanel.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return gamePanel;
}(egret.Sprite));
__reflect(gamePanel.prototype, "gamePanel");
