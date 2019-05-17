// 游戏界面
class gamePanel extends egret.Sprite {

    private bgimg: egret.Bitmap;
    private timber: egret.Bitmap;
    private skin: number = 1;

    constructor() {
        super();
        this.initGame();
    }

    public start(mode: number = 1) {
        // 1: easy 2:crazy
        let mat: Array<any> = [];
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
    }

    // protected和private类似，但是，protected成员在派生类中可以访问
    // async: 代码上的顺序执行，行为上的异步执行
    protected async initGame() {
        const { stage } = egret.MainContext.instance;
        const stageW = stage.stageWidth;
        const stageH = stage.stageHeight;
        // 绘制背景
        this.bgimg = new egret.Bitmap();
        this.bgimg.x = 0;
        this.bgimg.y = 0;
        this.bgimg.width = stageW;
        this.bgimg.height = stageH;
        this.addChild(this.bgimg);
        // 读取skin
        this.skin = parseInt(await platform.getData('skin') || 1);
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

    }
    private skinConf(res: string, alpha: number, timberRes: string, timberW: number) {
        let { bgimg } = this;
        bgimg.texture = RES.getRes(res);
        bgimg.alpha = alpha;
        this.timber = this.createBitmapByName(timberRes);
        this.addChild(this.timber);
        this.timber.width = timberW;
        this.timber.height = timberW;
        this.timber.anchorOffsetX = timberW / 2;
        this.timber.anchorOffsetY = timberW / 2;
    }
    private txt : egret.TextField;
    private createText() {
        const shape = new egret.Shape();
        shape.graphics.beginFill(0x2f1810, .8);
        shape.graphics.drawRoundRect(-10, 10, 80, 30, 10);
        shape.graphics.endFill();
        this.addChild(shape);

        const txt = new egret.TextField();
        this.addChild(txt);
        txt.x = 12;
        txt.y = 17;
        txt.textColor = 0xffffff;
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.size = 14;
        this.txt = txt;
        this.updateLevel();
    }
    // 关卡更新
    private updateLevel() {
        this.txt.text = `第 1 关`;
    }
    private dart: egret.Bitmap;
    protected dartW: number = 21;
    protected dartH: number = 100;
    // 生成飞镖
    private createDart() {
        const { stage } = egret.MainContext.instance;
        let dart = this.createBitmapByName('kunai_png');
        this.addChild(dart);
        dart.width = this.dartW;
        dart.height = this.dartH;
        dart.x = stage.width / 2 -10;
        dart.y = stage.height - 170;
        this.randomDart();
    }
    /**
     * 通过一关，重新random木桩上的飞镖
     */
    private level: number = 1;
    private mode: number = 1;
    private dartNum: number = 9;
    private randomDart() {
        if (this.level === 1) return;
        switch(this.mode) {
            case 1:
                // 简单模式，每关随机增加
                const random = Math.round(Math.random() * this.level);
                if (random >= this.level / 2) this.dartNum -= Math.floor(Math.random()* this.level / 2 + 1);
                // TODO: rotate
                break;
            case 2:
                // 疯狂模式，每过一关，木桩上的飞镖多一把
                for (let i = 1; i < this.level; i++) {
                    
                }
                break;
        }
    }

    /**
	 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
	 * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
	 */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}