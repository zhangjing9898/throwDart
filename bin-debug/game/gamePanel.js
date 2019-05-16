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
// 游戏界面
var gamePanel = (function (_super) {
    __extends(gamePanel, _super);
    function gamePanel() {
        var _this = _super.call(this) || this;
        _this.skin = 1;
        _this.initGame();
        return _this;
    }
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
                                this.skinConf('4.jpg', 0.4, 'timber_png', 200);
                                break;
                            case 2:
                                this.skinConf('2_jpg', 0.7, 'eye_png', 280);
                                break;
                        }
                        this.timber.x = stageW / 2;
                        this.timber.y = 230;
                        return [2 /*return*/];
                }
            });
        });
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
