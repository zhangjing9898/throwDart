// 游戏界面
interface itemObj {
    id: number,
    range: number[],
    dart: egret.Bitmap,
    time: number
}
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
        this.startAnimation();
        this.dartNumArea();

    }
    /**
     * 绘制飞镖
     * @param dart 
     * @param width 
     * @param height 
     * @param x 
     * @param y 
     */
    private drawDart(dart: egret.Bitmap, width: number, height: number, x: number, y: number) {
        dart.width = width;
        dart.height = height;
        dart.x = x;
        dart.y = y;
    }
    /**
     * 绘制txt文本
     * @param txt 
     * @param x 
     * @param y 
     * @param color 
     * @param size 
     * @param align 
     * @param callback 
     */
    private dartNumTip: egret.TextField;
    private drawText(x:number, y:number, color: number, size: number, align: string, update: Boolean = false) {
        const txt = new egret.TextField();
        this.addChild(txt);
        txt.x = x;
        txt.y = y;
        txt.textColor = color;
        txt.textAlign = align;
        txt.size = size;
        if(update) txt.text = `x ${this.dartNum}`;
    }
    /**
     * 绘制剩余飞镖数 框
     */
    private dartNumArea() {
       const dart = this.createBitmapByName('kunai_png');
       this.drawDart(dart, 10, 50, 30, GameUtil.getStageHeight()-100);
       this.addChild(dart);
       this.drawText(50, GameUtil.getStageHeight()-80, 0xffffff, 14, egret.HorizontalAlign.LEFT, true);   
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
        this.txt.text = `第 ${this.level} 关`;
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
        // TODO: 点击
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
                this.dartInThumb(random);
                break;
            case 2:
                // 疯狂模式，每过一关，木桩上的飞镖多一把
                this.dartInThumb(this.level);
                break;
        }
    }
    /**
     * 随机性 生成飞镖位置
     */
    private dartInThumb(length: number) {
        for(let i = 1; i < length; i++) {
            // 更加随机性 生成飞镖位置
            let random = Math.floor(Math.random() * 180);
            random = Math.random() < 0.5 ? random * -1 : random;
            this.rotateThumb(random);
        }
    }

    /**
     * 木桩旋转
     */
    // time interval的间隔，数值越小转的越快
    private rate: number = 35;
    // 改变现有旋转速度
    private rateOffset: number = 0;
    private rotations: number = 3;
    private insertRotare: itemObj[] = [];
    private rotateThumb(random?: number) {
        const { stage }  = egret.MainContext.instance;
        const rotate = typeof random === 'number' ? random : this.timber.rotation;
        // 存储木桩上 飞镖坐标
        const range = [];

        // 生成基础版 飞镖
        const dart: egret.Bitmap = this.createBitmapByName('kunai_png');
        dart.anchorOffsetX = 5;
        dart.anchorOffsetY = -52;
        dart.x = stage.stageWidth / 2;
        dart.y = 230;
        dart.width = this.dartW;
        dart.height = this.dartH;
        // this.addChildAt: 某一个显示对象添加到一个指定深度;深度值为0，为了让飞镖图案低于木桩图
        this.addChildAt(dart, 0);
        // 让飞镖旋转
        const time: number = setInterval(() => {
            dart.rotation += this.rotations;
        }, this.rate - this.rateOffset);

        const obj = {
            id: this.timber.rotation,
            range,
            dart,
            time
        }
        this.insertRotare.push(obj);
    }
    private timberInterval: number;
    /**
     * 木桩初始动画
     */
    private startAnimation(): void {
        console.log('1');
        if (this.timberInterval) clearInterval(this.timberInterval);
        this.timber.rotation = 0;
        this.timberInterval = setInterval(() => {
            this.timber.rotation += this.rotations;
        }, this.rate - this.rateOffset);
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