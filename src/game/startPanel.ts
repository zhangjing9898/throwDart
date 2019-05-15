class startPanel extends eui.Component implements  eui.UIComponent {
	
	private startBtn: buttons;
	private startPK: buttons;
	
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.initButtons();
	}

	private initButtons() {
		let { startBtn, startPK } = this;

		startBtn = new buttons();
		this.addChild(startBtn);
		startBtn.init(1, '单人闯关');
		
		startPK = new buttons();
		this.addChild(startPK);
		startPK.init(4, '疯狂模式');
	}
	
}