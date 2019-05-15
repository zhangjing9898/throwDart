class startPanel extends eui.Component implements eui.UIComponent {

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
		this.initButtons();
	}

	private initButtons() {
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

		startPK = new buttons();
		this.addChild(startPK);
		startPK.init(4, '疯狂模式');
		startPK.x = stage.stageWidth;
		startPK.y = 500;
		egret.Tween.get(startPK).to({
			x: stage.stageWidth / 2 - startPK.width / 2
		}, 500, egret.Ease.bounceOut);

		this.addChild(bottomPart);
		bottomPart.init();
		bottomPart.y = stage.stageHeight;
		egret.Tween.get(bottomPart).to({ y: stage.stageHeight - bottomPart.height }, 500, egret.Ease.bounceOut)
		// TODO: 监听事件
	}

}