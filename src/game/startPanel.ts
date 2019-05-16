class startPanel extends eui.Component implements eui.UIComponent {

	public static GAME_START_1: string = 'gamestart1'
  	public static GAME_START_2: string = 'gamestart2'
	private startBtn: buttons;
	private startPK: buttons;
	private bottomPart = new bottomPart();

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}

	private init() {
		let { stage, startBtn, startPK, bottomPart } = this;
		// 创建模式按钮
		startBtn = new buttons();
		this.addChild(startBtn);
		startBtn.init(1, '单人闯关');
		startBtn.x = -startBtn.width;
		startBtn.y = 400;
		egret.Tween.get(startBtn).to({
			x: stage.stageWidth / 2 - startBtn.width / 2
		}, 500, egret.Ease.bounceOut);
		startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.touchTap(1);
		}, this);

		startPK = new buttons();
		this.addChild(startPK);
		startPK.init(4, '疯狂模式');
		startPK.x = stage.stageWidth;
		startPK.y = 500;
		egret.Tween.get(startPK).to({
			x: stage.stageWidth / 2 - startPK.width / 2
		}, 500, egret.Ease.bounceOut);
		startPK.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
			this.touchTap(2);
		}, this);

		this.addChild(bottomPart);
		bottomPart.init();
		bottomPart.y = stage.stageHeight;
		egret.Tween.get(bottomPart).to({ y: stage.stageHeight - bottomPart.height }, 500, egret.Ease.bounceOut)
		// TODO: 监听事件
	}

	private touchTap(mode: number = 1) {
		// 1: easy mode; 2: crazy mode
		switch(mode) {
			case 1:
				this.dispatchEventWith(startPanel.GAME_START_1);
				break;
			case 2:
				this.dispatchEventWith(startPanel.GAME_START_2);
				break;
		}
	}
}