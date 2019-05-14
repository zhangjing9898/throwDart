class sceneManager {
    public _stage: egret.DisplayObjectContainer;
    public startPanel: startPanel;

    constructor() {
        this.startPanel = new startPanel();
    }

    // 获取单例
    static sceneManager: sceneManager;
    static get instance() {
        if(!this.sceneManager) {
            this.sceneManager = new sceneManager();
        }
        return this.sceneManager;
    }

    // 删除场景
    private removeOtherScene(scene) {
        //TODO:
        let arr = [this.startPanel];
        arr.forEach(item => {
            if (scene === item) {
                return;
            }
            if (item.parent) {
                this._stage.removeChild(item);
            }
        })
    }

    // 设置根场景
    public setScene(s: egret.DisplayObjectContainer) {
        this._stage = s;
    }

    // 开始场景
    static toStartPanel() {
        this.instance.removeOtherScene(this.instance.startPanel);
        this.instance._stage.addChild(this.instance.startPanel);
    }
}