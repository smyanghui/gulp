import {Alert, Confirm, Loading} from './Tips';

class Tools {

	static onAlert(message, callBack){
		if (this.newAlert) {
			this.newAlert.onClose();
			this.newAlert = null;
		}
        let relMessage = typeof message == 'string' ? message : '';
        let relCallBack = typeof callBack == 'function' ? callBack : null;
		this.newAlert = new Alert(relMessage, relCallBack);
	}

    static onConfirm(message, sureBack, cancelBack){
        if (this.newConfirm) {
            this.newConfirm.onClose();
            this.newConfirm = null;
        }
        let relMessage = typeof message == 'string' ? message : '';
        let relSureBack = typeof sureBack == 'function' ? sureBack : null;
        let relCancelBack = typeof cancelBack == 'function' ? cancelBack : null;
        this.newConfirm = new Confirm(relMessage, relSureBack, relCancelBack);
    }

    // 开启关闭加载层num=0/1
    static loading(num){
        if (!this.newLoading) this.newLoading = new Loading();
        num ? this.newLoading.onOpen() : this.newLoading.onClose();
    }

    // 异步封装
    static ajax(options, success, error){
        Tools.loading(1);
        options.success = function(data){
            Tools.loading(0);
            typeof success == 'function' ? success(data) : null;
        }
        options.error = function(data){
            Tools.loading(0);
            Tools.onAlert('服务器异常，请稍后重试！');
            typeof error == 'function' ? error(data) : null;
        }
        $.ajax(options);
    }


    // 获取url指定参数的值
    static getQuery(key) {
        return this.getQueryParams()[key];
    };

    // 获取url参数对象
    static getQueryParams() {
        let params = {};
        if(location.search.length == 0 ) return params;
        let keyValPairs = location.search.substr(1).split('&'),
            tempArr;
        for (let i = 0; i < keyValPairs.length; i++) {
            tempArr = keyValPairs[i].split('=');
            params[tempArr[0]] = decodeURIComponent(tempArr[1] || '' );
        }
        return params;
    }

}

export default Tools;