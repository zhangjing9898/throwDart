// 游戏界面
class gamePanel extends egret.Sprite {

    private bgimg: egret.Bitmap;

    constructor() {
        super();
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
    }
}