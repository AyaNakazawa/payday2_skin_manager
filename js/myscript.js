
$(() => {
  
  let settingView = new SettingView(true);
  let itemView = new ItemView(true);
  let detailView = new DetailView(true);
  let itemGroupView = new ItemGroupView(true);
  let helpView = new HelpView();
  
});

// ----------------------------------------------------------------
// Classes

class CommonView {
  constructor() {
    // common setting
    this.TOGGLE_SPEED_MS = 300;
    
    //class
    this.DISPLAY_NONE = 'display-none';
    this.CURRENT = 'current';
    
    // navbar
    this.VIEW_SETTING_SWITCH_ID = '#action-setting';
    this.$VIEW_SETTING_SWITCH = $(this.VIEW_SETTING_SWITCH_ID);
    this.VIEW_ITEM_SWITCH_ID = '#action-item';
    this.$VIEW_ITEM_SWITCH = $(this.VIEW_ITEM_SWITCH_ID);
    this.VIEW_DETAIL_SWITCH_ID = '#action-detail';
    this.$VIEW_DETAIL_SWITCH = $(this.VIEW_DETAIL_SWITCH_ID);
    
    // content
    this.$SETTING_AREA = $('#setting-area');
    this.$ITEM_AREA = $('#pd2item-area');
    this.$DETAIL_AREA = $('#detail-area');
    
    // setting help
    this.$SETTING_STEAMID_HELP = $('#setting-steamid-help');
    this.$SETTING_SEARCH_HELP = $('#setting-search-help');
    this.$SETTING_FILTER_HELP = $('#setting-filter-help');
    this.$SETTING_GROUP_HELP = $('#setting-group-help');
    this.$SETTING_SORT_HELP = $('#setting-sort-help');
    this.$SETTING_QUALITY_HELP = $('#setting-quality-help');
    this.$SETTING_SIZE_HELP = $('#setting-size-help');
    
    // popover
    this.$POPOVER = $('[data-toggle="popover"]');
    
    // localStorage
    this.LOCAL_STORAGE = true;
    if(!localStorage) {
      this.LOCAL_STORAGE = false;
    }
  }
}

class SwitchView extends CommonView {
  constructor(_viewFlg = true) {
    super();
    // each setting
    this.NAME = 'SwitchView';
    this.VIEW_SWITCH_ID = '';
    this.$VIEW_SWITCH = $(document);
    this.$SWITCH_AREA = $(document);
    
    this.viewFlg = _viewFlg;
  }
  
  setOn() {
    $(document).on('click', this.VIEW_SWITCH_ID, () => {this.switchView()});
  }
  
  switchView() {
    log(`Switch ${this.NAME} view`);
    this.setView(!this.viewFlg);
  }
  
  setView(_viewFlg = true) {
    log(`Set ${this.NAME} view: ${_viewFlg}`);
    if (_viewFlg) {
      this.$VIEW_SWITCH.addClass(this.CURRENT);
      this.$SWITCH_AREA.show(this.TOGGLE_SPEED_MS);
    } else {
      this.$VIEW_SWITCH.removeClass(this.CURRENT);
      this.$SWITCH_AREA.hide(this.TOGGLE_SPEED_MS);
    }
    this.viewFlg = _viewFlg;
  }
}

class SettingView extends SwitchView {
  constructor(_viewFlg = true) {
    super(_viewFlg);
    
    this.NAME = 'Setting';
    this.VIEW_SWITCH_ID = this.VIEW_SETTING_SWITCH_ID;
    this.$VIEW_SWITCH = this.$VIEW_SETTING_SWITCH;
    this.$SWITCH_AREA = this.$SETTING_AREA;
    
    super.setOn();
  }
}

class ItemView extends SwitchView {
  constructor(_viewFlg = true) {
    super(_viewFlg);
    
    this.NAME = 'Item';
    this.VIEW_SWITCH_ID = this.VIEW_ITEM_SWITCH_ID;
    this.$VIEW_SWITCH = this.$VIEW_ITEM_SWITCH;
    this.$SWITCH_AREA = this.$ITEM_AREA;
    
    super.setOn();
  }
}

class DetailView extends SwitchView {
  constructor(_viewFlg = true) {
    super(_viewFlg);
    
    this.NAME = 'Detail';
    this.VIEW_SWITCH_ID = this.VIEW_DETAIL_SWITCH_ID;
    this.$VIEW_SWITCH = this.$VIEW_DETAIL_SWITCH;
    this.$SWITCH_AREA = this.$DETAIL_AREA;
    
    super.setOn();
  }
}

class ItemGroupView extends SwitchView {
  constructor(_viewFlg = true, _name = 'Group', _switchId = '#pd2item-group-test .pd2item-group-header', _areaId = '#pd2item-group-list-test') {
    super(_viewFlg);
    
    this.NAME = _name;
    this.VIEW_SWITCH_ID = _switchId;
    this.$VIEW_SWITCH = $(_switchId);
    this.$SWITCH_AREA = $(_areaId);
    
    super.setOn();
  }
}

class HelpView extends CommonView {
    constructor() {
      super();
      
      this.$SETTING_STEAMID_HELP.attr('data-content', '18桁の steamid か CustomURL を入力してください。');
      this.$SETTING_SEARCH_HELP.attr('data-content', '表示するアイテムを制限することができます。空の場合は全て表示されます。');
      this.$SETTING_FILTER_HELP.attr('data-content', '表示するアイテムを制限することができます。');
      this.$SETTING_GROUP_HELP.attr('data-content', 'グループ化して表示することができます。');
      this.$SETTING_SORT_HELP.attr('data-content', '指定した順序で並び替えることができます。');
      this.$SETTING_QUALITY_HELP.attr('data-content', 'チェックを入れると、全てのクオリティを表示します。');
      this.$SETTING_SIZE_HELP.attr('data-content', 'アイテムの表示サイズを変更できます。');
      
      this.$POPOVER.popover();
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
