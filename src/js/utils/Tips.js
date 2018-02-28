// Alert
class Alert {

	constructor(message, callBack) {
		this.message = message || '';
		this.callBack = callBack;
		this.createHtml();
	}

	createHtml(){
		this.curTips = $('<div class="ui_mask">');
		this.curTips.appendTo('body');
		this.createContent();
	}

	createContent(){

		let contentBox = $('<div class="ui_layer">');

		let contentHtml = `<div class="layer_content">${this.message}</div>`;

		// alert按钮
		let buttonBox = $('<div class="layer_button">');
		let sureButton = $('<button class="sure_button">');
		sureButton.text('确定').appendTo(buttonBox);
		sureButton.on('click', () => this.onClose() );

		// 显示输出
		contentBox.append(contentHtml).append(buttonBox);
		this.curTips.html(contentBox);

	}

	onClose(){
		this.curTips.remove();
		if (this.callBack) this.callBack();
	}

}


// Confirm
class Confirm {

	constructor(message, sureBack, cancelBack) {
		this.message = message || '是否确定？';
		this.sureBack = sureBack;
		this.cancelBack = cancelBack;
		this.createHtml();
	}

	createHtml(){
		this.curTips = $('<div class="ui_mask">');
		this.curTips.appendTo('body');
		this.createContent();
	}

	createContent(){

		let contentBox = $('<div class="ui_layer">');

		let contentHtml = `<div class="layer_content">${this.message}</div>`;

		// confirm按钮
		let buttonBox = $('<div class="layer_button">');
		let sureButton = $('<button class="sure_button">');
		sureButton.text('确定').appendTo(buttonBox);
		sureButton.on('click', () => {
			if (this.sureBack) this.sureBack();
			this.onClose();
		});

		let cancelButton = $('<button class="cancel_button">');
		cancelButton.text('取消').appendTo(buttonBox);
		cancelButton.on('click', () => {
			if (this.cancelBack) this.cancelBack();
			this.onClose();
		});

		// 显示输出
		contentBox.append(contentHtml).append(buttonBox);
		this.curTips.html(contentBox);

	}

	onClose(){
		this.curTips.remove();
	}

}


// 正在加载
class Loading {

	constructor() {
		this.createHtml();
	}

	createHtml(){
		this.curTips = $('<div class="ui_mask">');
		this.curTips.appendTo('body');
		this.createContent();
	}

	createContent(){
		let contentHtml = `<p class="ui_loading">正在加载...</p>`;
		this.curTips.html(contentHtml);
	}

	onOpen(){
		this.curTips.show();
	}

	onClose(){
		this.curTips.hide();
	}

}


export {Alert, Confirm, Loading};