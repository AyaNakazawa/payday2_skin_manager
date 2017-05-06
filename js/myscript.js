
$(() => {
  
  let settingView = new SettingView();
  let helpView = new HelpView();
  
});

// ----------------------------------------------------------------
// Classes

class CommonView {
  constructor() {
    this.DISPLAY_NONE = 'display-none';
    this.CURRENT = 'current';
    
    // navbar
    this.VIEW_SWITCH_ID = '#action-setting';
    this.$VIEW_SWITCH = $(this.VIEW_SWITCH_ID);
    
    // content
    this.$SETTING_AREA = $('#setting-area');
    
    // setting help
    this.$SETTING_STEAMID_HELP = $('#setting-steamid-help');
    this.$SETTING_FILTER_HELP = $('#setting-filter-help');
    this.$SETTING_GROUP_HELP = $('#setting-group-help');
    this.$SETTING_SORT_HELP = $('#setting-sort-help');
    this.$SETTING_QUALITY_HELP = $('#setting-quality-help');
    
    // popover
    this.$POPOVER = $('[data-toggle="popover"]');
  }
}

class SettingView extends CommonView {
  constructor() {
    super();
    this.viewFlg = true;
    $(document).on('click', this.VIEW_SWITCH_ID, () => {this.switchView()});
  }
  
  switchView() {
    log(`Switch Setting view`);
    this.setView(!this.viewFlg);
  }
  
  setView(_viewFlg = true) {
    log(`Set Setting view: ${_viewFlg}`);
    if (_viewFlg) {
      this.$VIEW_SWITCH.addClass(this.CURRENT);
    } else {
      this.$VIEW_SWITCH.removeClass(this.CURRENT);
    }
    this.$SETTING_AREA.toggle(300);
    this.viewFlg = _viewFlg;
  }
}

class HelpView extends CommonView {
    constructor() {
      super();
      
      this.$SETTING_STEAMID_HELP.attr('data-content', '18桁の steamid か CustomURL を入力してください。');
      this.$SETTING_FILTER_HELP.attr('data-content', '表示するスキンを制限することができます。');
      this.$SETTING_GROUP_HELP.attr('data-content', 'グループ化して表示することができます。');
      this.$SETTING_SORT_HELP.attr('data-content', '指定した順序で並び替えることができます。');
      this.$SETTING_QUALITY_HELP.attr('data-content', 'チェックを入れると、全てのクオリティを表示します。');
      
      $('[data-toggle="popover"]').popover();
    }
}

class DatePlus {
  constructor(_date = new Date()) {
    this.date = new Date(_date);
  }
  
  getString(_format = '%Y/%m/%d %H:%M:%S') {
    return DatePlus.getDateString(this.date, _format);
  }
  
  static getDateString(_date = new Date(), _format = '%Y/%m/%d %H:%M:%S') {
    // $1 _date: Dateオブジェクトからゼロ埋めした日付文字列を生成
    // $2 _format: '%Y/%m/%d %H:%M:%S'
    //  %Y: 年4桁
    //  %y: 年2桁
    //  %m: 月
    //  %d: 日
    //  %H: 時
    //  %M: 分
    //  %S: 秒
    _format = _format.replace('%Y', ("000" + _date.getFullYear()).slice(-4));
    _format = _format.replace('%y', ("0" + _date.getFullYear()).slice(-2));
    _format = _format.replace('%m', ("0" + (_date.getMonth() + 1)).slice(-2));
    _format = _format.replace('%d', ("0" + _date.getDate()).slice(-2));
    _format = _format.replace('%H', ("0" + _date.getHours()).slice(-2));
    _format = _format.replace('%M', ("0" + _date.getMinutes()).slice(-2));
    _format = _format.replace('%S', ("0" + _date.getSeconds()).slice(-2));
    return _format;
  }
}

// ----------------------------------------------------------------
// Debug

const logView = true;

function log(_obj = '') {
  if (logView) {
    console.log(_obj);
  }
}
