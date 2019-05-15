/**
 * 创建不同颜色的button
 */

class buttons extends egret.Sprite {

    constructor() {
        super();
    }

    private img: egret.Bitmap;
    private txt: egret.TextField;
    public width: number;
    public height: number;

    private setImg(img: string, color: number) {
        this.img.texture = RES.getRes(img);
        this.txt.strokeColor = color;
    }

    public init(type: number = 1, text: string, size: number = 24, width: number = 180, height: number = 64) {
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
        this.addListener(egret.TouchEvent.TOUCH_BEGIN, 2);
        this.addListener(egret.TouchEvent.TOUCH_END || egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, -2);
    }

    private addListener(name: string, num: number) {
        this.img.addEventListener(name, () => {
            this.img.x += num;
            this.img.y += num;
            this.txt.x += num;
            this.txt.y += num;
        }, this);
    }
}