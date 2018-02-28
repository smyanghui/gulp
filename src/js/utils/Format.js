class Format {

  // 格式化日期
  static dateFormat(val){
    if (!val) return;

    let curDate = new Date(val.toString().replace(/-/g, "/"));
    return curDate;
  }


  // 格式化人民币


}

export default Format;