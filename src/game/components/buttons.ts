/**
 * 创建不同颜色的button
 */

class buttons extends egret.Sprite {

    constructor() {
        super();
    }

    private img: egret.Bitmap;
    private txt: egret.TextField;
    private width: number;
    private height: number;

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
    }
}