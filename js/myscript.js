
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
    if (!localStorage) {
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
    this.SETTING_STEAMID_ID = '#setting-steamid';
    this.$SETTING_SEARCH = $('#setting-search');
    this.SETTING_SEARCH_ID = '#setting-search';
    this.$SETTING_FILTER = $('#setting-filter');
    this.SETTING_FILTER_ID = '#setting-filter';
    this.$SETTING_GROUP = $('#setting-group');
    this.SETTING_GROUP_ID = '#setting-group';
    this.$SETTING_SORT = $('#setting-sort');
    this.SETTING_SORT_ID = '#setting-sort';
    this.$SETTING_SORT_ASC = $('#setting-sort-asc');
    this.SETTING_SORT_ASC_ID = '#setting-sort-asc';
    this.$SETTING_SORT_DESC = $('#setting-sort-desc');
    this.SETTING_SORT_DESC_ID = '#setting-sort-desc';
    this.$SETTING_QUALITY = $('#setting-quality');
    this.SETTING_QUALITY_ID = '#setting-quality';
    this.$SETTING_SIZE = $('#setting-size');
    this.SETTING_SIZE_ID = '#setting-size';
    this.$SETTING_STYLE = $('#setting-style');
    this.SETTING_STYLE_ID = '#setting-style';
    
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

class ConfirmView extends CommonView {
    constructor() {
      super();
      this.confirmMessage = '確認';
    }
    confirm() {
      return true;
    }
}

class SwitchView extends CommonView {
  constructor(_viewFlg = true) {
    super();
    // each setting
    this.NAME = 'SwitchView';
    this.lsKeyView = 'PD2SM.View.Switch';
    this.VIEW_SWITCH_ID = '';
    this.$VIEW_SWITCH = $(document);
    this.$SWITCH_AREA = $(document);
  }
  
  initView() {
    let lsValView = super.LSGetItem(this.lsKeyView);
    if (lsValView == null) {
      lsValView = true;
    } else if (lsValView == 'true') {
      lsValView = true;
    } else if (lsValView == 'false') {
      lsValView = false;
    }
    
    this.setView(lsValView);
    this.setOn();
    
  }
  
  setOn() {
    $(document).on('click', this.VIEW_SWITCH_ID, () => {this.switchView()});
  }
  
  switchView() {
    log(`Switch ${this.NAME} view`);
    let viewFlg = super.LSGetItem(this.lsKeyView);
    if (viewFlg == 'true') {
      viewFlg = false;
    } else if (viewFlg == 'false') {
      viewFlg = true;
    }
    this.setView(viewFlg);
  }
  
  setView(_viewFlg = true, _speed = this.TOGGLE_SPEED_MS) {
    log(`View: ${this.NAME} <- ${_viewFlg}`);
    if (_viewFlg) {
      this.$VIEW_SWITCH.addClass(this.CURRENT);
      this.$SWITCH_AREA.show(_speed);
    } else {
      this.$VIEW_SWITCH.removeClass(this.CURRENT);
      this.$SWITCH_AREA.hide(_speed);
    }
    super.LSSetItem(this.lsKeyView, _viewFlg);
  }
}

class SettingView extends SwitchView {
  constructor(_viewFlg = true) {
    super(_viewFlg);
    
    this.NAME = 'Setting';
    this.lsKeyView = 'PD2SM.View.Setting';
    this.VIEW_SWITCH_ID = this.VIEW_SETTING_SWITCH_ID;
    this.$VIEW_SWITCH = this.$VIEW_SETTING_SWITCH;
    this.$SWITCH_AREA = this.$SETTING_AREA;
    
    super.initView();
    
    this.initSetting();
  }
  
  initSetting() {
    this.lsKeySteamId = 'PD2SM.Setting.SteamId';
    this.lsKeySearch = 'PD2SM.Setting.Search';
    this.lsKeyFilter = 'PD2SM.Setting.Filter';
    this.lsKeyGroup = 'PD2SM.Setting.Group';
    this.lsKeySort = 'PD2SM.Setting.Sort';
    this.lsKeySortMode = 'PD2SM.Setting.SortMode';
    this.lsKeyQuality = 'PD2SM.Setting.Quality';
    this.lsKeySize = 'PD2SM.Setting.Size';
    this.lsKeyStyle = 'PD2SM.Setting.Style';
    
    let lsValSteamId = super.LSGetItem(this.lsKeySteamId);
    if (lsValSteamId == null) {
      lsValSteamId = this.getSteamId();
    }
    let lsValSearch = super.LSGetItem(this.lsKeySearch);
    if (lsValSearch == null) {
      lsValSearch = this.getSearch();
    }
    let lsValFilter = super.LSGetItem(this.lsKeyFilter);
    if (lsValFilter == null) {
      lsValFilter = this.getFilter();
    }
    let lsValGroup = super.LSGetItem(this.lsKeyGroup);
    if (lsValGroup == null) {
      lsValGroup = this.getGroup();
    }
    let lsValSort = super.LSGetItem(this.lsKeySort);
    if (lsValSort == null) {
      lsValSort = this.getSort();
    }
    let lsValSortMode = super.LSGetItem(this.lsKeySortMode);
    if (lsValSortMode == null) {
      lsValSortMode = this.getSortMode();
    }
    let lsValQuality = super.LSGetItem(this.lsKeyQuality);
    if (lsValQuality == null) {
      lsValQuality = this.getQuality();
    }
    let lsValSize = super.LSGetItem(this.lsKeySize);
    if (lsValSize == null) {
      lsValSize = this.getSize();
    }
    let lsValStyle = super.LSGetItem(this.lsKeyStyle);
    if (lsValStyle == null) {
      lsValStyle = this.getStyle();
    }
    
    this.setStyle(lsValStyle);
    this.setSize(lsValSize);
    this.setSteamId(lsValSteamId);
    this.setQuality(lsValQuality);
    this.setSearch(lsValSearch);
    this.setFilter(lsValFilter);
    this.setGroup(lsValGroup);
    this.setSort(lsValSort);
    this.setSortMode(lsValSortMode);
    
    this.updateStyle(lsValStyle);
    this.updateSize(lsValSize);
    this.updateSteamId(lsValSteamId);
    this.updateQuality(lsValQuality);
    this.updateSearch(lsValSearch);
    this.updateFilter(lsValFilter);
    this.updateGroup(lsValGroup);
    this.updateSort(lsValSortMode, lsValSort);
    
    $(document).on('change', this.SETTING_STYLE_ID, () => {this.updateStyle()});
    $(document).on('change', this.SETTING_SIZE_ID, () => {this.updateSize()});
    $(document).on('change', this.SETTING_STEAMID_ID, () => {this.updateSteamId()});
    $(document).on('change', this.SETTING_QUALITY_ID, () => {this.updateQuality()});
    $(document).on('change', this.SETTING_SEARCH_ID, () => {this.updateSearch()});
    $(document).on('change', this.SETTING_FILTER_ID, () => {this.updateFilter()});
    $(document).on('change', this.SETTING_GROUP_ID, () => {this.updateGroup()});
    $(document).on('change', this.SETTING_SORT_ID, () => {this.updateSort()});
    $(document).on('click', this.SETTING_SORT_ASC_ID, () => {this.updateSortMode('asc')});
    $(document).on('click', this.SETTING_SORT_DESC_ID, () => {this.updateSortMode('desc')});
  }
  
  getStyle() {
    let style = this.$SETTING_STYLE.val();
    return style;
  }
  
  getSize() {
    let size = this.$SETTING_SIZE.val();
    return size;
  }
  
  getSteamId() {
    let steamId = this.$SETTING_STEAMID.val();
    return steamId;
  }
  
  getQuality() {
    let quality = this.$SETTING_QUALITY.prop('checked');
    return quality;
  }
  
  getSearch() {
    let search = this.$SETTING_SEARCH.val();
    return search;
  }
  
  getFilter() {
    let filter = this.$SETTING_FILTER.val();
    return filter;
  }
  
  getGroup() {
    let group = this.$SETTING_GROUP.val();
    return group;
  }
  
  getSort() {
    let sort = this.$SETTING_SORT.val();
    return sort;
  }
  
  getSortMode() {
    let sortAsc = this.$SETTING_SORT_ASC.hasClass('active');
    let result = '';
    if (sortAsc) {
      result = 'asc'
    } else {
      result = 'desc'
    }
    return result;
  }
  
  setStyle(_style = null) {
    if (_style == null) {
      return;
    }
    log(`View: Style <- ${_style}`);
    this.$SETTING_STYLE.val(_style);
  }
  
  setSize(_size = null) {
    if (_size == null) {
      return;
    }
    log(`View: Size <- ${_size}`);
    this.$SETTING_SIZE.val(_size);
  }
  
  setSteamId(_steamId = null) {
    if (_steamId == null) {
      return;
    }
    log(`View: SteamId <- ${_steamId}`);
    this.$SETTING_STEAMID.val(_steamId);
  }
  
  setQuality(_quality = null) {
    if (_quality == null) {
      return;
    }
    log(`View: Quality <- ${_quality}`);
    if (_quality == 'true') {
      this.$SETTING_QUALITY.prop('checked', true);
    } else {
      this.$SETTING_QUALITY.prop('checked', false);
    }
  }
  
  setSearch(_search = null) {
    if (_search == null) {
      return;
    }
    log(`View: Search <- ${_search}`);
    this.$SETTING_SEARCH.val(_search);
  }
  
  setFilter(_filter = null) {
    if (_filter == null) {
      return;
    }
    log(`View: Filter <- ${_filter}`);
    this.$SETTING_FILTER.val(_filter);
  }
  
  setGroup(_group = null) {
    if (_group == null) {
      return;
    }
    log(`View: Group <- ${_group}`);
    this.$SETTING_GROUP.val(_group);
  }
  
  setSort(_sort = null) {
    if (_sort == null) {
      return;
    }
    log(`View: Sort <- ${_sort}`);
    this.$SETTING_SORT.val(_sort);
  }
  
  setSortMode(_sortMode = null) {
    if (_sortMode == null) {
      return;
    }
    log(`View: SortMode <- ${_sortMode}`);
    if (_sortMode == 'asc') {
      this.$SETTING_SORT_DESC.removeClass('active');
      this.$SETTING_SORT_ASC.addClass('active');
    } else if (_sortMode == 'desc')  {
      this.$SETTING_SORT_DESC.addClass('active');
      this.$SETTING_SORT_ASC.removeClass('active');
    } else {
      log(`error: setSortMode: _sortMode: ${_sortMode}`);
    }
  }
  
  updateStyle(_style = this.getStyle()) {
    super.LSSetItem(this.lsKeyStyle, _style);
  }
  
  updateSize(_size = this.getSize()) {
    super.LSSetItem(this.lsKeySize, _size);
  }
  
  updateSteamId(_steamId = this.getSteamId()) {
    super.LSSetItem(this.lsKeySteamId, _steamId);
  }
  
  updateQuality(_quality = this.getQuality()) {
    super.LSSetItem(this.lsKeyQuality, _quality);
  }
  
  updateSearch(_search = this.getSearch()) {
    super.LSSetItem(this.lsKeySearch, _search);
  }
  
  updateFilter(_filter = this.getFilter()) {
    super.LSSetItem(this.lsKeyFilter, _filter);
  }
  
  updateGroup(_group = this.getGroup()) {
    super.LSSetItem(this.lsKeyGroup, _group);
  }
  
  updateSort(_sortMode = this.getSortMode(), _sort = this.getSort()) {
    this.updateSortMode(_sortMode);
    super.LSSetItem(this.lsKeySort, _sort);
  }
  
  updateSortMode(_sortMode = this.getSortMode()) {
    let currentSortMode = super.LSGetItem(this.lsKeySortMode);
    if (currentSortMode == _sortMode) {
      return;
    }
    
    if (_sortMode == 'asc') {
      this.$SETTING_SORT_DESC.removeClass('active');
      this.$SETTING_SORT_ASC.addClass('active');
    } else if (_sortMode == 'desc') {
      this.$SETTING_SORT_DESC.addClass('active');
      this.$SETTING_SORT_ASC.removeClass('active');
    } else {
      log(`error: updateSortMode: _sortMode: ${_sortMode}`);
    }
    super.LSSetItem(this.lsKeySortMode, _sortMode);
  }
}

class ItemView extends SwitchView {
  constructor(_viewFlg = true) {
    super(_viewFlg);
    
    this.NAME = 'Item';
    this.lsKeyView = 'PD2SM.View.Item';
    this.VIEW_SWITCH_ID = this.VIEW_ITEM_SWITCH_ID;
    this.$VIEW_SWITCH = this.$VIEW_ITEM_SWITCH;
    this.$SWITCH_AREA = this.$ITEM_AREA;
    
    super.initView();
  }
}

class DetailView extends SwitchView {
  constructor(_viewFlg = true) {
    super(_viewFlg);
    
    this.NAME = 'Detail';
    this.lsKeyView = 'PD2SM.View.Detail';
    this.VIEW_SWITCH_ID = this.VIEW_DETAIL_SWITCH_ID;
    this.$VIEW_SWITCH = this.$VIEW_DETAIL_SWITCH;
    this.$SWITCH_AREA = this.$DETAIL_AREA;
    
    super.initView();
  }
}

class ItemGroupView extends SwitchView {
  constructor(_viewFlg = true, _name = 'Group', _switchId = '#pd2item-group-test .pd2item-group-header', _areaId = '#pd2item-group-list-test', _lsKeyView = 'PD2SM.View.Group') {
    super(_viewFlg);
    
    this.NAME = _name;
    this.lsKeyView = _lsKeyView;
    this.VIEW_SWITCH_ID = _switchId;
    this.$VIEW_SWITCH = $(_switchId);
    this.$SWITCH_AREA = $(_areaId);
    
    super.initView();
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
