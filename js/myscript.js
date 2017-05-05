
const logView = true;

$(() => {
  
  let settingView = new SettingView();
  
  initPopover();
  
});

// ----------------------------------------------------------------
// Functions

function initPopover() {
  $('[data-toggle="popover"]').popover();
}

function log(_obj = '') {
  if (logView) {
    console.log(_obj);
  }
}

// ----------------------------------------------------------------
// Classes

class CommonView {
  constructor() {
    this.DISPLAY_NONE = 'display-none';
    this.CURRENT = 'current';
    
    this.VIEW_SWITCH_ID = '#action-setting';
    this.$VIEW_SWITCH = $(this.VIEW_SWITCH_ID);
    
    this.SETTING_AREA_ID = '#setting-area';
    this.$SETTING_AREA = $(this.SETTING_AREA_ID);
  }
}

class SettingView extends CommonView {
  constructor() {
    super();
    this.viewFlg = true;
    $(document).on('click', this.VIEW_SWITCH_ID, () => {this.switchView()});
  }
  
  switchView() {
    // console.log(`Switch Setting-content view`);
    this.setView(!this.viewFlg);
  }
  
  setView(_viewFlg = true) {
    // console.log(`Set Setting-content view: ${_viewFlg}`);
    if (_viewFlg) {
      this.$VIEW_SWITCH.addClass(this.CURRENT);
    } else {
      this.$VIEW_SWITCH.removeClass(this.CURRENT);
    }
    this.$SETTING_AREA.toggle(300);
    this.viewFlg = _viewFlg;
  }
}

class DatePlus {
  constructor(_date = new Date()) {
    this.date = new Date(_date);
  }
  
  getString(format = '%Y/%m/%d %H:%M:%S') {
    return DatePlus.getDateString(this.date, format);
  }
  
  static getDateString(date = new Date(), format = '%Y/%m/%d %H:%M:%S') {
    // Dateオブジェクトからゼロ埋めした日付文字列を生成
    // format: '%Y/%m/%d %H:%M:%S'
    //  %Y: 年4桁
    //  %y: 年2桁
    //  %m: 月
    //  %d: 日
    //  %H: 時
    //  %M: 分
    //  %S: 秒
    format = format.replace('%Y', ("000" + date.getFullYear()).slice(-4));
    format = format.replace('%y', ("0" + date.getFullYear()).slice(-2));
    format = format.replace('%m', ("0" + (date.getMonth() + 1)).slice(-2));
    format = format.replace('%d', ("0" + date.getDate()).slice(-2));
    format = format.replace('%H', ("0" + date.getHours()).slice(-2));
    format = format.replace('%M', ("0" + date.getMinutes()).slice(-2));
    format = format.replace('%S', ("0" + date.getSeconds()).slice(-2));
    return format;
  }
}
