class Ipage {

	constructor(dom, callBack) {
        this.container = $('<ul class="ui_ipage">');
        if (dom) $(dom).append(this.container);
        this.pageSize = 10;
        this.callBack = callBack || null;
		this.create(0, 0);
        this.bindEvent();
	}

    create(total, curPage) {
        // total 总条数 curPage 当前页码
        this.total = Math.ceil(parseInt(total) / this.pageSize) || 0;
        if(this.total < 1) return;
        this.curPage = parseInt(curPage) || 1;
        this.createPage();
    }

	createPage() {
		const arr = this.pageResult();
        let htmlPage = '';
		for (let i in arr){
            let [_0, _1] = [arr[i][0], arr[i][1]];
			if(!_1){
				htmlPage += '<li class="pointpage">'+ _0 +'</li>';
			} else if(_1 == this.curPage){
				htmlPage += '<li class="curpage">'+ _1 +'</li>';
			} else {
				htmlPage += '<li data-ipage="'+ _1 +'">'+ _0 +'</li>';
			}
		}
		this.container.html(htmlPage);
    }

    pageResult() {
        let [total, pageSize, middle, curPage, start, end] = [this.total, this.pageSize, Math.ceil(this.pageSize / 2), this.curPage, 0, 0];
        if(total <= pageSize){
            start = 1;
            end = total;
        } else {
            if(curPage <= middle){
                start = 1;
                end = pageSize;
            } else {
                if(curPage + middle <= total){
                    start = curPage - middle + 1;
                    end = curPage + parseInt(pageSize / 2);
                }else{
                    start = total - pageSize + 1;
                    end = total;
                }
            }
        }

        let arr = [];
        if(curPage > 1) arr.push(['&lt;', curPage - 1]);
        if(start == 2) arr.push(['1', 1]);
        if(start > 2){
            arr.push(['1', 1]);
            arr.push(['&middot;&middot;&middot;']);
        }

        let i = start;
        while(i <= end) arr.push([i, i++]);
        if(end == total - 1) arr.push([total, total]);
        if(end < total - 1){
            arr.push(['&middot;&middot;&middot;']);
            arr.push([total, total]);
        }
        if(curPage < total) arr.push(['&gt;', curPage + 1]);
        return arr;
    }

    pageTo(i) {
        this.curPage = i ? parseInt(i < 1 ? 1 : i > this.total ? this.total : i) : this.curPage;
        this.callBack && this.callBack.call(this, this.curPage);
        this.createPage();
    }

    bindEvent() {
        var _this = this;
        this.container.delegate('li', 'click', function(){
            let ipage = $(this).data('ipage');
            if (!ipage) return;
            _this.pageTo(ipage);
        });
    }

}

export default Ipage;