// 游戏界面
class gamePanel extends egret.Sprite {

    private bgimg: egret.Bitmap;
    private timber: egret.Bitmap;
    private skin: number = 1;

    constructor() {
        super();
        this.initGame();
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
        switch(this.skin) {
            case 1:
                this.skinConf('4.jpg', 0.4, 'timber_png', 200);
                break;
            case 2:
                this.skinConf('2_jpg', 0.7, 'eye_png', 280);
                break;
        }
        this.timber.x = stageW / 2;
        this.timber.y = 230;

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