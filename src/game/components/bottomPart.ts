/**
 * 首页底部
 */

class bottomPart extends egret.Sprite {
    
    constructor() {
        super();
    }

    public static FRIENDS_RANK = 'friendsrank'
    public static GROUP_RANK = 'grouprank'
    public static WORLD_RANK = 'worldrank'
    public static SKIN = 'skin'
    public static ZAN = 'ZAN'
    public height: number = 100
    private _width: number = 1000;
    private bg: egret.Shape;

    public init() {
        const bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x000000, .5);
        bg.graphics.drawRect(0, 0, this._width, this.height);
        bg.graphics.endFill();
        this.bg = bg;
        this.addChild(this.bg);

        this.imgPart('b1_png', 53, 52, 30, '好友排行', 20, bottomPart.FRIENDS_RANK);
        this.imgPart('b2_png', 47, 46, 130, '群内排行', 120, bottomPart.FRIENDS_RANK);
        this.imgPart('b4_png', 60, 48, 230, '皮肤', 235, bottomPart.SKIN);
        this.imgPart('like_png', 70, 65, 330, '点赞', 331, bottomPart.ZAN, true);
    }

    private imgPart(imgRES: string, width: number, height: number, x: number, text: string, tX: number, eventName: string, isWX: boolean = false, tY: number = 60, y: number = 20, img: egret.Bitmap = new egret.Bitmap, txt: egret.TextField = new egret.TextField) {
        const miniObj = {
            appId: 'wx18a2ac992306a5a4',
            path: 'pages/apps/largess/detail?id=waQKNtmC5mk%3D'
        }
        img.texture = RES.getRes(imgRES);
        img.width = width * 0.5;
        img.height = height * 0.5;
        img.x = x;
        img.y = y;
        this.addChild(img);
        img.touchEnabled = true;
        img.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.dispatchEventWith(eventName);
            if (isWX) platform.openMini(miniObj);
        }, this);

        txt.text = text;
        txt.size = 12;
        txt.textColor = 0xffffff;
        txt.x = tX;
        txt.y = tY;
        this.addChild(txt);
        txt.touchEnabled = true;
        txt.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.dispatchEventWith(eventName);
            if (isWX) platform.openMini(miniObj);
        }, this);
    }
}