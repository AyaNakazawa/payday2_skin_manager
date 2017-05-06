
$(() => {
  
  let settingView = new SettingView(true);
  let itemView = new ItemView(true);
  let detailView = new DetailView(true);
  let itemGroupView = new ItemGroupView(true);
  let helpView = new HelpView();
  
});

// ----------------------------------------------------------------
// Classes

class LocalStorage {
  constructor() {
    this.LOCAL_STORAGE = true;
    if (!this.LOCAL_STORAGE) {
      this.LOCAL_STORAGE = false;
    }
  }
  
  LSClear() {
    if (this.LOCAL_STORAGE) {
      log(`LS: All clear.`);
      localStorage.clear();
    }
  }
  
  LSGetItem(_key = 'key') {
    if (this.LOCAL_STORAGE) {
      log(`LS: ${_key} -> ${localStorage.getItem(_key)}`);
      return localStorage.getItem(_key);
    }
  }
  
  LSSetItem(_key = 'key', _val = 'val') {
    if (this.LOCAL_STORAGE) {
      log(`LS: ${_key} <- ${_val}`);
      localStorage.setItem(_key, _val);
    }
  }
  
  LSRemoveItem(_key = 'key') {
    if (this.LOCAL_STORAGE) {
      log(`LS: ${_key} -> ${localStorage.getItem(_key)} is remove.`);
      localStorage.removeItem(_key);
    }
  }
}

class CommonView extends LocalStorage {
  constructor() {
    // super
    super();
    
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
    
    // setting
    this.$SETTING_STEAMID = $('#setting-steamid');
    this.$SETTING_SEARCH = $('#setting-search');
    this.$SETTING_FILTER = $('#setting-filter');
    this.$SETTING_GROUP = $('#setting-group');
    this.$SETTING_SORT = $('#setting-sort');
    this.$SETTING_QUALITY = $('#setting-quality');
    this.$SETTING_SIZE = $('#setting-size');
    this.$SETTING_STYLE = $('#setting-style');
    
    // setting help
    this.$SETTING_STEAMID_HELP = $('#setting-steamid-help');
    this.$SETTING_SEARCH_HELP = $('#setting-search-help');
    this.$SETTING_FILTER_HELP = $('#setting-filter-help');
    this.$SETTING_GROUP_HELP = $('#setting-group-help');
    this.$SETTING_SORT_HELP = $('#setting-sort-help');
    this.$SETTING_QUALITY_HELP = $('#setting-quality-help');
    this.$SETTING_SIZE_HELP = $('#setting-size-help');
    this.$SETTING_STYLE_HELP = $('#setting-style-help');
    
    // popover
    this.$POPOVER = $('[data-toggle="popover"]');
    
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
    
    this.initSetting();
  }
  
  initSetting() {
    this.lsKeySteamId = 'SteamId';
    this.lsKeySearch = 'Search';
    this.lsKeyFilter = 'Filter';
    this.lsKeyGroup = 'Group';
    this.lsKeySort = 'Sort';
    this.lsKeyQuality = 'Quality';
    this.lsKeySize = 'Size';
    this.lsKeyStyle = 'Style';
    
    this.lsValSteamId = super.LSGetItem(this.lsKeySteamId);
    this.lsValSearch = super.LSGetItem(this.lsKeySearch);
    this.lsValFilter = super.LSGetItem(this.lsKeyFilter);
    this.lsValGroup = super.LSGetItem(this.lsKeyGroup);
    this.lsValSort = super.LSGetItem(this.lsKeySort);
    this.lsValQuality = super.LSGetItem(this.lsKeyQuality);
    this.lsValSize = super.LSGetItem(this.lsKeySize);
    this.lsValStyle = super.LSGetItem(this.lsKeyStyle);
    
    // Style
    if (this.lsValStyle == null) {
      super.LSSetItem(this.lsKeyStyle, this.getStyle());
    }
    this.updateStyle(this.lsValStyle);
    
    // Size
    if (this.lsValSize == null) {
      super.LSSetItem(this.lsKeySize, this.getSize());
    }
    this.updateSize(this.lsValSize);
    
    // SteamId
    if (this.lsValSteamId == null) {
      super.LSSetItem(this.lsKeySteamId, this.getSteamId());
    }
    this.updateSteamId(this.lsValSteamId);
    
    // Quality
    if (this.lsValQuality == null) {
      super.LSSetItem(this.lsKeyQuality, this.getQuality());
    }
    this.updateQuality(this.lsValQuality);
    
    // Search
    if (this.lsValSearch == null) {
      super.LSSetItem(this.lsKeySearch, this.getSearch());
    }
    this.updateSearch(this.lsValSearch);
    
    // Filter
    if (this.lsValFilter == null) {
      super.LSSetItem(this.lsKeyFilter, this.getFilter());
    }
    this.updateFilter(this.lsValFilter);
    
    // Group
    if (this.lsValGroup == null) {
      super.LSSetItem(this.lsKeyGroup, this.getGroup());
    }
    this.updateGroup(this.lsValGroup);
    
    // Sort
    if (this.lsValSort == null) {
      super.LSSetItem(this.lsKeySort, this.getSort());
    }
    this.updateSort(this.lsValSort);
  }
  
  getStyle() {
    return 0;
  }
  
  getSize() {
    return 0;
  }
  
  getSteamId() {
    return 0;
  }
  
  getQuality() {
    return 0;
  }
  
  getSearch() {
    return 0;
  }
  
  getFilter() {
    return 0;
  }
  
  getGroup() {
    return 0;
  }
  
  getSort() {
    return 0;
  }
  
  updateStyle(_val = 'Normal') {
    
  }
  
  updateSize(_val = 'Normal') {
    
  }
  
  updateSteamId(_val = '') {
    
  }
  
  updateQuality(_val = false) {
    
  }
  
  updateSearch(_val = '') {
    
  }
  
  updateFilter(_val = 'all') {
    
  }
  
  updateGroup(_val = 'none') {
    
  }
  
  updateSort(_val = 'default') {
    
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
      this.$SETTING_STYLE_HELP.attr('data-content', 'PAYDAY 2 Skin Manager のスタイルを変更できます。');
      
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
