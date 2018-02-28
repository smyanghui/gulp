const MOBILE_REG = /^1[3|4|5|8|7|9][0-9]\d{8}$/,
	EMAIL_REG = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,
	CHINESE_REG = /^[\u4e00-\u9fa5]+$/,
	CHIENG_REG = /^[\u4e00-\u9fa5a-zA-Z]+$/,
	IDCARD_REG = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
	MONEY_REG = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;

class Validata {

	// 是否数值
	static isNumber(val) {
		return !isNaN(val);
	}

	// 是否为手机号码
	static isMobile(val) {
		return MOBILE_REG.test(val);
	}

	// 是否为邮箱
	static isEmail(val) {
		return EMAIL_REG.test(val);
	}

	// 是否为身份证
	static isIdCard(val) {
		return IDCARD_REG.test(val);
	}

	// 是否为金额
	static isMoney(val) {
		return MONEY_REG.test(val);
	}

	// 中英文字符
	static isChiEng(val) {
		return CHIENG_REG.test(val);
	}

	// 是否为中文
	static isChinese(val) {
		return CHINESE_REG.test(val);
	}

}

export default Validata;