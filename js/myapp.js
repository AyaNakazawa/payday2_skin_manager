
// ----------------------------------------------------------------
// Classes

class Log {
  constructor(_length = 64, _character = '-') {
    this.LOG_VIEW = true;
    this.LOG_VIEW_OBJECT = true;
    this.ALIGN_LEFT = 0;
    this.ALIGN_CENTER = 1;
    this.ALIGN_RIGHT = 2;
    
    this.logLength = _length;
    this.logCharacter = _character;
  }
  
  logobj(_obj) {
    if (this.LOG_VIEW_OBJECT) {
      console.log(_obj);
    }
  }
  
  log(_string, _align = this.ALIGN_LEFT) {
    if (this.LOG_VIEW) {
      let result = '';
      if (_string == null) {
        for (let i = 0; i < this.logLength; i++) {
          result += this.logCharacter;
          
        }
      } else {
        if (_align == this.ALIGN_LEFT) {
          result = _string;
          
        } else if (_align == this.ALIGN_CENTER) {
          const strLength = _string.length;
          
          for (let i = 0; i < (this.logLength / 2) - (strLength / 2); i++) {
            result += ' ';
          }
          
          result += _string;
          
        } else if (_align == this.ALIGN_RIGHT) {
          const strLength = _string.length;
          for (let i = 0; i < this.logLength - strLength; i++) {
            result += ' ';
          }
          result += _string;
        }
      }
      
      console.log(result);
    }
  }
}

class LocalStorage {
  constructor() {
    this.lsSupport = true;
    if (!localStorage) {
      this.lsSupport = false;
    }
    
    this.l = new Log();
  }
  
  clear() {
    if (this.lsSupport) {
      this.l.log(`LS: All clear.`);
      localStorage.clear();
    }
  }
  
  getItem(_key = 'key') {
    if (this.lsSupport) {
      this.l.log(`LS: ${_key} -> ${localStorage.getItem(_key)}`);
      return localStorage.getItem(_key);
    }
  }
  
  setItem(_key = 'key', _val = 'val') {
    if (this.lsSupport) {
      this.l.log(`LS: ${_key} <- ${_val}`);
      localStorage.setItem(_key, _val);
    }
  }
  
  removeItem(_key = 'key') {
    if (this.lsSupport) {
      this.l.log(`LS: ${_key} -> ${localStorage.getItem(_key)} is remove.`);
      localStorage.removeItem(_key);
    }
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

class CommonClass {
  constructor() {
    // Include Class
    this.ls = new LocalStorage();
    this.l = new Log();
    
  }
}

// ----------------------------------------------------------------
// Common Class

class CommonModel extends CommonClass {
  constructor(_obj) {
    super();
    this.obj = _obj;
    
    // Log Setting
    this.l.LOG_VIEW = true;
    this.l.LOG_VIEW_OBJECT = true;
    
    // Each Setting
    this.NAME = 'Common';
    
    // Common Setting
    this.TOGGLE_SPEED_MS = 300;
    
    // Class
    this.DISPLAY_NONE = 'display-none';
    this.CURRENT = 'current';
    this.ACTIVE = 'active';
  }
}

class CommonView extends CommonClass {
  constructor(_model = new CommonModel()) {
    super();
    this.model = _model;
    
    // Log Setting
    this.l.LOG_VIEW = true;
    this.l.LOG_VIEW_OBJECT = true;
    
    this.l.log();
    this.l.log(this.model.NAME, this.l.ALIGN_CENTER);
    this.l.logobj(this.model);
  }
}

// ----------------------------------------------------------------
// Confirm Class

class ConfirmModel extends CommonModel {
  constructor(_obj) {
    super(_obj);
    this.NAME = 'Confirm';
    this.confirmId = 'confirm-id';
    this.confirmTitle = 'title';
    this.confirmMessage = 'content';
  }
}

class ConfirmView extends CommonView {
  constructor(_model = new ConfirmModel()) {
    super(_model);
  }
  
  generateModal() {
    const template = $('#confirm-view-template').text();
    const compiled = _.template(template);
    const model = {
      'confirmId': this.model.confirmId,
      'confirmTitle': this.model.confirmTitle,
      'confirmMessage': this.model.confirmMessage
    };
    $('#confirm-view').html(compiled(model));
  }
  
  initConfirm(_event = 'click', _selector = '*', _function = 'this.confirm()') {
    this.model.argEvent = _event;
    this.model.argSelector = _selector;
    this.model.argFunction = _function;
    
    this.generateModal();
    this.setOn();
  }
  
  setOn() {
    $(document).on(this.model.argEvent, this.model.argSelector, () => {eval(this.model.argFunction)});
    $(document).on('click', `#${this.model.confirmId}-yes`, () => {this.yes()});
    $(document).on('click', `#${this.model.confirmId}-no`, () => {this.no()});
    $(document).on('click', `#${this.model.confirmId}-close`, () => {this.close()});
  }
  
  confirm() {
    $(`#${this.model.confirmId}`).modal();
  }
  
  yes() {
    this.l.log(`Confirm: ${this.model.confirmTitle} <- Yes`);
  }
  
  no() {
    this.l.log(`Confirm: ${this.model.confirmTitle} <- No`);
  }
  
  close() {
    this.l.log(`Confirm: ${this.model.confirmTitle} <- Close`);
  }
  
  destroy() {
    setTimeout(() => {this.remove()}, 1000);
  }
  
  remove() {
    this.l.log(`Confirm: ${this.model.confirmTitle} <- Destroy`);
    $(`#${this.model.confirmId}`).remove();
  }
}

// ----------------------------------------------------------------
// ResetStorage Class

class ResetStorageModel extends ConfirmModel {
  constructor(_obj) {
    super(_obj);
    this.NAME = 'ResetStorage';
    this.confirmId = 'reset-storage';
    this.confirmTitle = '設定の初期化';
    this.confirmMessage = '全ての設定を初期化し、再読込してもよろしいですか？';
  }
}

class ResetStorageView extends ConfirmView {
  constructor(_model = new ResetStorageModel()) {
    super(_model);
    
    // Init ConfirmView
    super.initConfirm('click', '#action-reset');
  }
  
  yes() {
    super.yes();
    this.model.ls.clear();
  }
}

// ----------------------------------------------------------------
// Switch Class

class SwitchModel extends CommonModel {
  constructor(_view = true, _obj) {
    super(_obj);
    this.view = _view;
    
    // each setting
    this.NAME = 'Switch';
    this.lsKeyView = 'PD2SM.View.Switch';
    this.VIEW_SWITCH_ID = '';
    this.$VIEW_SWITCH = $(this.VIEW_SWITCH_ID);
    this.$SWITCH_AREA = $(document);
  }
}

class SwitchView extends CommonView {
  constructor(_model = new SwitchModel()) {
    super(_model);
    
    // Init SwitchView
    this.initSwitchView();
  }
  
  initSwitchView() {
    this.model.$VIEW_SWITCH = $(this.model.VIEW_SWITCH_ID);
    
    if (this.model.view == null) {
      let lsValView = this.model.ls.getItem(this.model.lsKeyView);
      if (lsValView == null) {
        this.model.view = true;
      } else if (lsValView == 'true') {
        this.model.view = true;
      } else if (lsValView == 'false') {
        this.model.view = false;
      }
    }
    
    this.setView(this.model.view);
    this.setOn();
    
  }
  
  setOn() {
    $(document).on('click', this.model.VIEW_SWITCH_ID, () => {this.switchView()});
  }
  
  switchView() {
    this.l.log(`Switch ${this.model.NAME} view`);
    
    if (this.model.view == null) {
      let lsValView = this.model.ls.getItem(this.model.lsKeyView);
      if (lsValView == null) {
        this.model.view = true;
      } else if (lsValView == 'true') {
        this.model.view = true;
      } else if (lsValView == 'false') {
        this.model.view = false;
      }
    }
    
    this.setView(!this.model.view);
  }
  
  setView(_view = true, _speed = this.model.TOGGLE_SPEED_MS) {
    this.l.log(`View: ${this.model.NAME} <- ${_view}`);
    
    if (_view) {
      this.model.$VIEW_SWITCH.addClass(this.model.CURRENT);
      this.model.$SWITCH_AREA.show(_speed);
    } else {
      this.model.$VIEW_SWITCH.removeClass(this.model.CURRENT);
      this.model.$SWITCH_AREA.hide(_speed);
    }
    
    // save
    this.model.ls.setItem(this.model.lsKeyView, _view);
    this.model.view = _view;
  }
}

// ----------------------------------------------------------------
// Setting Class

class SettingModel extends SwitchModel {
  constructor(_view = true) {
    super(_view);
    
    this.NAME = 'Setting';
    this.lsKeyView = 'PD2SM.View.Setting';
    this.VIEW_SWITCH_ID = '#action-setting';
    this.$SWITCH_AREA = $('#setting-area');
    
    // Setting SettingModel
    this.setVar();
  }
  
  setVar() {
    // setting
    this.SETTING_STEAMID_ID = '#setting-steamid';
    this.$SETTING_STEAMID = $(this.SETTING_STEAMID_ID);
    this.SETTING_SEARCH_ID = '#setting-search';
    this.$SETTING_SEARCH = $(this.SETTING_SEARCH_ID);
    this.SETTING_FILTER_ID = '#setting-filter';
    this.$SETTING_FILTER = $(this.SETTING_FILTER_ID);
    this.SETTING_GROUP_ID = '#setting-group';
    this.$SETTING_GROUP = $(this.SETTING_GROUP_ID);
    this.SETTING_SORT_ID = '#setting-sort';
    this.$SETTING_SORT = $(this.SETTING_SORT_ID);
    this.SETTING_SORT_ASC_ID = '#setting-sort-asc';
    this.$SETTING_SORT_ASC = $(this.SETTING_SORT_ASC_ID);
    this.SETTING_SORT_DESC_ID = '#setting-sort-desc';
    this.$SETTING_SORT_DESC = $(this.SETTING_SORT_DESC_ID);
    this.SETTING_QUALITY_ID = '#setting-quality';
    this.$SETTING_QUALITY = $(this.SETTING_QUALITY_ID);
    this.SETTING_SIZE_ID = '#setting-size';
    this.$SETTING_SIZE = $(this.SETTING_SIZE_ID);
    this.SETTING_STYLE_ID = '#setting-style';
    this.$SETTING_STYLE = $(this.SETTING_STYLE_ID);
    
    this.lsKeySteamId = 'PD2SM.Setting.SteamId';
    this.lsKeySearch = 'PD2SM.Setting.Search';
    this.lsKeyFilter = 'PD2SM.Setting.Filter';
    this.lsKeyGroup = 'PD2SM.Setting.Group';
    this.lsKeySort = 'PD2SM.Setting.Sort';
    this.lsKeySortMode = 'PD2SM.Setting.SortMode';
    this.lsKeyQuality = 'PD2SM.Setting.Quality';
    this.lsKeySize = 'PD2SM.Setting.Size';
    this.lsKeyStyle = 'PD2SM.Setting.Style';
  }
}

class SettingView extends SwitchView {
  constructor(_model = new SettingModel()) {
    super(_model);
    
    // Init SettingView
    this.initSetting();
  }
  
  initSetting() {
    let lsValSteamId = this.model.ls.getItem(this.model.lsKeySteamId);
    if (lsValSteamId == null) {
      lsValSteamId = this.getSteamId();
    }
    let lsValSearch = this.model.ls.getItem(this.model.lsKeySearch);
    if (lsValSearch == null) {
      lsValSearch = this.getSearch();
    }
    let lsValFilter = this.model.ls.getItem(this.model.lsKeyFilter);
    if (lsValFilter == null) {
      lsValFilter = this.getFilter();
    }
    let lsValGroup = this.model.ls.getItem(this.model.lsKeyGroup);
    if (lsValGroup == null) {
      lsValGroup = this.getGroup();
    }
    let lsValSort = this.model.ls.getItem(this.model.lsKeySort);
    if (lsValSort == null) {
      lsValSort = this.getSort();
    }
    let lsValSortMode = this.model.ls.getItem(this.model.lsKeySortMode);
    if (lsValSortMode == null) {
      lsValSortMode = this.getSortMode();
    }
    let lsValQuality = this.model.ls.getItem(this.model.lsKeyQuality);
    if (lsValQuality == null) {
      lsValQuality = this.getQuality();
    }
    let lsValSize = this.model.ls.getItem(this.model.lsKeySize);
    if (lsValSize == null) {
      lsValSize = this.getSize();
    }
    let lsValStyle = this.model.ls.getItem(this.model.lsKeyStyle);
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
    
    $(document).on('change', this.model.SETTING_STYLE_ID, () => {this.updateStyle()});
    $(document).on('change', this.model.SETTING_SIZE_ID, () => {this.updateSize()});
    $(document).on('change', this.model.SETTING_STEAMID_ID, () => {this.updateSteamId()});
    $(document).on('change', this.model.SETTING_QUALITY_ID, () => {this.updateQuality()});
    $(document).on('change', this.model.SETTING_SEARCH_ID, () => {this.updateSearch()});
    $(document).on('change', this.model.SETTING_FILTER_ID, () => {this.updateFilter()});
    $(document).on('change', this.model.SETTING_GROUP_ID, () => {this.updateGroup()});
    $(document).on('change', this.model.SETTING_SORT_ID, () => {this.updateSort()});
    $(document).on('click', this.model.SETTING_SORT_ASC_ID, () => {this.updateSortMode('asc')});
    $(document).on('click', this.model.SETTING_SORT_DESC_ID, () => {this.updateSortMode('desc')});
  }
  
  getStyle() {
    const style = this.model.$SETTING_STYLE.val();
    return style;
  }
  
  getSize() {
    const size = this.model.$SETTING_SIZE.val();
    return size;
  }
  
  getSteamId() {
    const steamId = this.model.$SETTING_STEAMID.val();
    return steamId;
  }
  
  getQuality() {
    const quality = this.model.$SETTING_QUALITY.prop('checked');
    return quality;
  }
  
  getSearch() {
    const search = this.model.$SETTING_SEARCH.val();
    return search;
  }
  
  getFilter() {
    const filter = this.model.$SETTING_FILTER.val();
    return filter;
  }
  
  getGroup() {
    const group = this.model.$SETTING_GROUP.val();
    return group;
  }
  
  getSort() {
    const sort = this.model.$SETTING_SORT.val();
    return sort;
  }
  
  getSortMode() {
    const asc = this.model.$SETTING_SORT_ASC.hasClass(this.model.ACTIVE);
    if (asc) {
      return 'asc';
    }
    const desc = this.model.$SETTING_SORT_DESC.hasClass(this.model.ACTIVE);
    if (desc) {
      return 'desc';
    }
    return null;
  }
  
  setStyle(_style = null) {
    if (_style == null) {
      return;
    }
    this.l.log(`Setting: Style <- ${_style}`);
    this.model.$SETTING_STYLE.val(_style);
  }
  
  setSize(_size = null) {
    if (_size == null) {
      return;
    }
    this.l.log(`Setting: Size <- ${_size}`);
    this.model.$SETTING_SIZE.val(_size);
  }
  
  setSteamId(_steamId = null) {
    if (_steamId == null) {
      return;
    }
    this.l.log(`Setting: SteamId <- ${_steamId}`);
    this.model.$SETTING_STEAMID.val(_steamId);
  }
  
  setQuality(_quality = null) {
    if (_quality == null) {
      return;
    }
    this.l.log(`Setting: Quality <- ${_quality}`);
    if (_quality == 'true') {
      this.model.$SETTING_QUALITY.prop('checked', true);
    } else {
      this.model.$SETTING_QUALITY.prop('checked', false);
    }
  }
  
  setSearch(_search = null) {
    if (_search == null) {
      return;
    }
    this.l.log(`Setting: Search <- ${_search}`);
    this.model.$SETTING_SEARCH.val(_search);
  }
  
  setFilter(_filter = null) {
    if (_filter == null) {
      return;
    }
    this.l.log(`Setting: Filter <- ${_filter}`);
    this.model.$SETTING_FILTER.val(_filter);
  }
  
  setGroup(_group = null) {
    if (_group == null) {
      return;
    }
    this.l.log(`Setting: Group <- ${_group}`);
    this.model.$SETTING_GROUP.val(_group);
  }
  
  setSort(_sort = null) {
    if (_sort == null) {
      return;
    }
    this.l.log(`Setting: Sort <- ${_sort}`);
    this.model.$SETTING_SORT.val(_sort);
  }
  
  setSortMode(_sortMode = null) {
    if (_sortMode == null) {
      return;
    }
    this.l.log(`Setting: SortMode <- ${_sortMode}`);
    if (_sortMode == 'asc') {
      this.model.$SETTING_SORT_DESC.removeClass(this.model.ACTIVE);
      this.model.$SETTING_SORT_ASC.addClass(this.model.ACTIVE);
    } else if (_sortMode == 'desc')  {
      this.model.$SETTING_SORT_DESC.addClass(this.model.ACTIVE);
      this.model.$SETTING_SORT_ASC.removeClass(this.model.ACTIVE);
    } else {
      this.l.log(`error: setSortMode: _sortMode: ${_sortMode}`);
    }
  }
  
  updateStyle(_style = this.getStyle()) {
    this.model.ls.setItem(this.model.lsKeyStyle, _style);
  }
  
  updateSize(_size = this.getSize()) {
    this.model.ls.setItem(this.model.lsKeySize, _size);
  }
  
  updateSteamId(_steamId = this.getSteamId()) {
    this.model.ls.setItem(this.model.lsKeySteamId, _steamId);
  }
  
  updateQuality(_quality = this.getQuality()) {
    this.model.ls.setItem(this.model.lsKeyQuality, _quality);
  }
  
  updateSearch(_search = this.getSearch()) {
    this.model.ls.setItem(this.model.lsKeySearch, _search);
  }
  
  updateFilter(_filter = this.getFilter()) {
    this.model.ls.setItem(this.model.lsKeyFilter, _filter);
  }
  
  updateGroup(_group = this.getGroup()) {
    this.model.ls.setItem(this.model.lsKeyGroup, _group);
  }
  
  updateSort(_sortMode = this.getSortMode(), _sort = this.getSort()) {
    this.updateSortMode(_sortMode);
    this.model.ls.setItem(this.model.lsKeySort, _sort);
  }
  
  updateSortMode(_sortMode = this.getSortMode()) {
    let currentSortMode = this.model.ls.getItem(this.model.lsKeySortMode);
    if (currentSortMode == _sortMode) {
      return;
    }
    
    if (_sortMode == 'asc') {
      this.model.$SETTING_SORT_DESC.removeClass(this.model.ACTIVE);
      this.model.$SETTING_SORT_ASC.addClass(this.model.ACTIVE);
    } else if (_sortMode == 'desc') {
      this.model.$SETTING_SORT_DESC.addClass(this.model.ACTIVE);
      this.model.$SETTING_SORT_ASC.removeClass(this.model.ACTIVE);
    } else {
      this.l.log(`error: updateSortMode: _sortMode: ${_sortMode}`);
    }
    this.model.ls.setItem(this.model.lsKeySortMode, _sortMode);
  }
}

// ----------------------------------------------------------------
// Item Class

class ItemModel extends SwitchModel {
  constructor(_view = true) {
    super(_view);
    
    this.NAME = 'Item';
    this.lsKeyView = 'PD2SM.View.Item';
    this.VIEW_SWITCH_ID = '#action-item';
    this.$SWITCH_AREA = $('#pd2item-area');
  }
}

class ItemView extends SwitchView {
  constructor(_model = new ItemModel()) {
    super(_model);
  }
}

// ----------------------------------------------------------------
// Detail Class

class DetailModel extends SwitchModel {
  constructor(_view = true) {
    super(_view);
    
    this.NAME = 'Detail';
    this.lsKeyView = 'PD2SM.View.Detail';
    this.VIEW_SWITCH_ID = '#action-detail';
    this.$SWITCH_AREA = $('#detail-area');
  }
}

class DetailView extends SwitchView {
  constructor(_model = new DetailModel()) {
    super(_model);
  }
}

// ----------------------------------------------------------------
// ItemGroup Class

class ItemGroupModel extends SwitchModel {
  constructor(_view = true, _name = 'Group', _switchId = '#pd2item-group-test .pd2item-group-header', _areaId = '#pd2item-group-list-test', _lsKeyView = 'PD2SM.View.Group') {
    super(_view);
    
    this.NAME = _name;
    this.lsKeyView = _lsKeyView;
    this.VIEW_SWITCH_ID = _switchId;
    this.$VIEW_SWITCH = $(_switchId);
    this.$SWITCH_AREA = $(_areaId);
  }
}

class ItemGroupView extends SwitchView {
  constructor(_model = new ItemGroupModel()) {
    super(_model);
    
    this.l.LOG_VIEW_OBJECT = false;
  }
}

// ----------------------------------------------------------------
// Help Class

class HelpModel extends CommonModel {
  constructor() {
    super();
    
    this.NAME = 'Help';
    
    this.popoverObj = {
      'setting-steamid-help': '18桁の steamid か CustomURL を入力してください。',
      'setting-search-help': '表示するアイテムを制限することができます。空の場合は全て表示されます。',
      'setting-filter-help': '表示するアイテムを制限することができます。',
      'setting-group-help': 'グループ化して表示することができます。',
      'setting-sort-help': '指定した順序で並び替えることができます。',
      'setting-quality-help': 'チェックを入れると、全てのクオリティを表示します。',
      'setting-size-help': 'アイテムの表示サイズを変更できます。',
      'setting-style-help': 'PAYDAY 2 Skin Manager のスタイルを変更できます。'
    }
  }
}

class HelpView extends CommonView {
  constructor(_model = new HelpModel()) {
    super(_model);
    
    this.setPopover();
  }
  
  setPopover() {
    $.each(this.model.popoverObj, (_index, _obj) => {
      $(`#${_index}`).attr('data-content', `${_obj}`);
    });
    
    $('[data-toggle="popover"]').popover();
  }
}

// ----------------------------------------------------------------
// Controllers

class CommonController extends CommonClass {
  constructor(_obj) {
    super();
    // this.model = new CommonModel(_obj);
    // this.view = new CommonView(this.model);
  }
}

class ConfirmController extends CommonController {
  constructor(_obj) {
    super();
    this.model = new ConfirmModel(_obj);
    this.view = new ConfirmView(this.model);
  }
}

class ResetStorageController extends CommonController {
  constructor(_obj) {
    super();
    this.model = new ResetStorageModel(_obj);
    this.view = new ResetStorageView(this.model);
  }
}

class SwitchController extends CommonController {
  constructor(_obj) {
    super();
    this.model = new SwitchModel(_obj);
    this.view = new SwitchView(this.model);
  }
}

class SettingController extends CommonController {
  constructor(_obj) {
    super();
    this.model = new SettingModel(_obj);
    this.view = new SettingView(this.model);
  }
}

class ItemController extends CommonController {
  constructor(_obj) {
    super();
    this.model = new ItemModel(_obj);
    this.view = new ItemView(this.model);
  }
}

class DetailController extends CommonController {
  constructor(_obj) {
    super();
    this.model = new DetailModel(_obj);
    this.view = new DetailView(this.model);
  }
}

class ItemGroupController extends CommonController {
  constructor(_obj) {
    super();
    this.model = new ItemGroupModel(_obj);
    this.view = new ItemGroupView(this.model);
  }
}

class HelpController extends CommonController {
  constructor(_obj) {
    super();
    this.model = new HelpModel(_obj);
    this.view = new HelpView(this.model);
  }
}

// ----------------------------------------------------------------
// Process

$(() => {
  
  let help = new HelpController();
  let resetStorage = new ResetStorageController();
  
  let detail = new DetailController(true);
  let item = new ItemController(true);
  let itemGroup = new ItemGroupController(true);
  let setting = new SettingController(true);
  
});
