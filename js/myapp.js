
// ----------------------------------------------------------------
// ES6

'use strict';

// ----------------------------------------------------------------
// Static classes

class Project {
  static get NAME() {
    return 'PAYDAY 2 Skin Manager';
  }

  static get NAME_ABBREVIATION() {
    return 'PD2SM';
  }

  static get NAME_KEY() {
    return 'PD2SM';
  }
}

class Log {
  // Common line setting
  static get LOG_LENGTH() { return 96; }
  static get LOG_CHARACTER() { return '-'; }
  
  // View permission
  static get LOG_VIEW() { return true; }
  static get LOG_VIEW_OBJECT() { return true; }
  static get LOG_VIEW_CLASS() { return true; }
  static get LOG_VIEW_CLASS_KEY() { return true; }
  static get LOG_VIEW_ERROR() { return true; }
  static get LOG_VIEW_CAUTION() { return true; }
  
  // Align definition
  static get ALIGN_LEFT() { return 0; }
  static get ALIGN_CENTER() { return 1; }
  static get ALIGN_RIGHT() { return 2; }
  
  // Arrow definition
  static get ARROW_OUTPUT() { return ' ---> '; }
  static get ARROW_INPUT() { return ' <--- '; }
  
  // Length definition
  static get CLASS_LENGTH() { return 24; }
  static get KEY_LENGTH() { return 24; }
  
  // Style definition
  static get STYLE_COLOR_RED() { return 'color:#f00;'; }
  static get STYLE_COLOR_GREEN() { return 'color:#0f0;'; }
  static get STYLE_COLOR_BLUE() { return 'color:#00f;'; }
  static get STYLE_COLOR_YELLOW() { return 'color:#ff0;'; }
  static get STYLE_COLOR_MAGENTA() { return 'color:#f0f;'; }
  static get STYLE_COLOR_CYAN() { return 'color:#0ff;'; }
  
  static get STYLE_CLASS() { return 'color:#222;'; }
  static get STYLE_KEY() { return 'color:#828;'; }
  static get STYLE_VALUE() { return 'color:#228;'; }
  
  static get STYLE_ERROR_LINE() { return 'color:#f00;'; }
  static get STYLE_ERROR_HEADER() { return 'color:#a00;'; }
  static get STYLE_ERROR_CONTENT() { return 'color:#111;'; }
  
  static get STYLE_CAUTION_LINE() { return 'color:#aa0;'; }
  static get STYLE_CAUTION_HEADER() { return 'color:#440;'; }
  static get STYLE_CAUTION_CONTENT() { return 'color:#111;'; }
  
  static logError(...array) {
    // View permission
    if (this.LOG_VIEW_ERROR) {
      // Draw line
      this.log(null, null, this.STYLE_ERROR_LINE);
      // Write title
      this.log('ERROR', this.ALIGN_CENTER, this.STYLE_ERROR_HEADER);
      // Write array
      for (let i = 0; i < array.length; i++) {
        this.log(array[i], this.ALIGN_LEFT, this.STYLE_ERROR_CONTENT);
      }
      // Draw line
      this.log(null, null, this.STYLE_ERROR_LINE);
    }
  }
  
  static logCaution(...array) {
    // View permission
    if (this.LOG_VIEW_CAUTION) {
      // Draw line
      this.log(null, null, this.STYLE_CAUTION_LINE);
      // Write title
      this.log('CAUTION', this.ALIGN_CENTER, this.STYLE_CAUTION_HEADER);
      // Write array
      for (let i = 0; i < array.length; i++) {
        this.log(array[i], this.ALIGN_LEFT, this.STYLE_CAUTION_CONTENT);
      }
      // Draw line
      this.log(null, null, this.STYLE_CAUTION_LINE);
    }
  }
  
  static logObj(_obj) {
    // View permission
    if (this.LOG_VIEW_OBJECT) {
      // Write object
      console.log(_obj);
    }
  }
  
  static logClass(_class = 'Class', _value = 'value', _style1 = this.STYLE_CLASS, _style2 = this.STYLE_VALUE) {
    // View permission
    if (this.LOG_VIEW_CLASS) {
      // Set style
      let result = '%c';
      // Write class
      result += _class;
      // Set spacing
      const classLength = _class.length;
      for (let i = 0; i < this.CLASS_LENGTH - classLength; i++) {
        result += ' ';
      }
      // Set style
      result += ': %c';
      // Write value
      result += _value;
      
      // Write result
      console.log(result, _style1, _style2);
    }
  }
  
  static logClassKey(_class = 'Class', _key = 'key', _value = 'value', _arrow = Log.ARROW_OUTPUT, _style1 = this.STYLE_CLASS, _style2 = this.STYLE_KEY, _style3 = this.STYLE_VALUE) {
    // View permission
    if (this.LOG_VIEW_CLASS_KEY) {
      // Set style
      let result = '%c';
      // Write class
      result += _class;
      // Set spacing
      const classLength = _class.length;
      for (let i = 0; i < this.CLASS_LENGTH - classLength; i++) {
        result += ' ';
      }
      // Set style
      result += ': %c';
      // Write key
      result += _key;
      // Set spacing
      const keyLength = _key.length;
      for (let i = 0; i < this.KEY_LENGTH - keyLength; i++) {
        result += ' ';
      }
      // Set style
      result += '%c';
      // Write arrow
      result += _arrow;
      // Set style
      result += '%c';
      // Write value
      result += _value;
      
      // Write result
      console.log(result, _style1, _style2, this.STYLE_RESET, _style3);
    }
  }
  
  static log(_string, _align = this.ALIGN_LEFT, _style = this.STYLE_RESET) {
    // View permission
    if (this.LOG_VIEW) {
      let result = '';
      
      // String is null
      if (_string == null) {
        // Draw line
        for (let i = 0; i < this.LOG_LENGTH; i++) {
          result += this.LOG_CHARACTER;
          
        }
        // String exists
      } else {
        // Align left
        if (_align == this.ALIGN_LEFT) {
          // Write string
          result = _string;
          
          // Align center
        } else if (_align == this.ALIGN_CENTER) {
          // Set spacing
          const strLength = _string.length;
          for (let i = 0; i < (this.LOG_LENGTH / 2) - (strLength / 2); i++) {
            result += ' ';
          }
          // Write string
          result += _string;
          
          // Align right
        } else if (_align == this.ALIGN_RIGHT) {
          // Set spacing
          const strLength = _string.length;
          for (let i = 0; i < this.LOG_LENGTH - strLength; i++) {
            result += ' ';
          }
          // Write string
          result += _string;
        }
      }
      
      // Set style
      // Write result
      console.log(`%c${result}`, _style);
    }
  }
}

class LocalStorage {
  // Check localStorage support
  static get SUPPORT() {
    let result = true;
    if (!localStorage) {
      result = false;
    }
    return result;
  }
  
  // Build key
  static buildKey(_key) {
      return `${Project.NAME_KEY}.${_key}`;
  }
  
  // All clear localStorage
  static clear() {
    // Check support
    if (this.SUPPORT) {
      Log.logClass('Local Storage', 'All Clear.');
      // Clear
      localStorage.clear();
    }
  }
  
  // getItem from localStorage
  static getItem(_key = 'key') {
    _key = this.buildKey(_key);
    // Check support
    if (this.SUPPORT) {
      const _val = localStorage.getItem(_key);
      Log.logClassKey('Local Storage', _key, _val, Log.ARROW_OUTPUT);
      // Get
      return _val;
    }
  }
  
  // setItem from localStorage
  static setItem(_key = 'key', _val = 'value') {
    _key = this.buildKey(_key);
    // Check support
    if (this.SUPPORT) {
      Log.logClassKey('Local Storage', _key, _val, Log.ARROW_INPUT);
      // Set
      localStorage.setItem(_key, _val);
    }
  }
  
  // removeItem from localStorage
  static removeItem(_key = 'key') {
    _key = this.buildKey(_key);
    // Check support
    if (this.SUPPORT) {
      Log.logClassKey('Local Storage', _key, 'null', Log.ARROW_INPUT);
      // Remove
      localStorage.removeItem(_key);
    }
  }
}

// ----------------------------------------------------------------
// Classes

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
    // Each Setting
    this.NAME = 'Common Class';
  }
  
  viewName(_name) {
    // Draw line
    Log.log();
    // Check name
    if (_name != null) {
      // Exists name
      // Write name
      Log.log(_name, Log.ALIGN_CENTER);
    } else {
      // Not exists name
      // Check this.model name
      if (this.model.NAME != null){
        // Exists this.model name
        // Write this.model name
        Log.log(this.model.NAME, Log.ALIGN_CENTER);
      } else {
        // Not exists this.model name
        // Write this name
        Log.log(this.NAME, Log.ALIGN_CENTER);
      }
    }
  }
  
  viewNameModel(_name, _model) {
    // Write name
    this.viewName(_name);
    
    // Check model
    if (_model != null) {
      // Exists model
      // Write model
      Log.logObj(_model);
    } else {
      // Not exists model
      // Check this.model
      if (this.model != null){
        // Exists this.model
        // Write this.model
        Log.logObj(this.model);
      } else {
        // Not exists this.model
        // Write this
        Log.logObj(this);
      }
    }
  }
}

// ----------------------------------------------------------------
// Common Class

class CommonModel extends CommonClass {
  constructor({
    name = null
  } = {})
  {
    super();
    
    this.NAME = name;
    
    this.DISPLAY_NONE = 'display-none';
    this.CURRENT = 'current';
    this.ACTIVE = 'active';
    this.BODY = 'body';
    this.$BODY = $(this.BODY);
    
    if (name != null) {
      super.viewNameModel(name);
    }
  }
  
  // Add var to Instance
  setKey(_var = 'var', _key = 'VALUE') {
    eval(`this.${_var} = ${_key}`);
  }
  
  // Get var from Instance
  getKey(_var = 'var') {
    return eval(`this.${_var}`);
  }
  
  // Remove var from Instance
  removeKey(_var = 'var') {
    eval(`this.${_var} = undefined`);
  }
}

class CommonView extends CommonClass {
  constructor(_model = new CommonModel()) {
    super();
    this.model = _model;
  }
}

// ----------------------------------------------------------------
// Popover Class

class PopoverModel extends CommonModel {
  constructor({
    name = 'Popover',
    selector = null,
    help = 'popover',
    trigger = 'hover'
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.SELECTOR = selector;
    this.HELP = help;
    this.TRIGGER = trigger;
  }
}

class PopoverView extends CommonView {
  constructor(_model = new PopoverModel()) {
    super(_model);
    
    this.setPopover();
  }
  
  setPopover() {
    if (this.model.SELECTOR != null) {
      $(this.model.SELECTOR).attr('data-toggle', 'popover');
      $(this.model.SELECTOR).attr('data-content', this.model.HELP);
      $(this.model.SELECTOR).attr('data-trigger', this.model.TRIGGER);
      $(this.model.SELECTOR).popover();
    }
  }
}

// ----------------------------------------------------------------
// Scroll Class

class ScrollModel extends CommonModel {
  constructor({
    name = 'Scroll',
    event = 'click',
    positionOffset = 0,
    triggerSelector = null,
    scrollDistSelector = null,
    scrollTimeMs = 500
  } = {})
  {
    super({
      name: name
    });
    
    // each setting
    this.NAME = name;
    this.EVENT = event;
    this.POSITION_OFFSET = positionOffset;
    this.TRIGGER_SELECTOR = triggerSelector;
    this.$TRIGGER_SELECTOR = $(this.TRIGGER_SELECTOR);
    this.SCROLL_SELECTOR = scrollDistSelector;
    this.$SCROLL_SELECTOR = $(this.SCROLL_SELECTOR);
    this.SCROLL_TIME_MS = scrollTimeMs;
  }
}

class ScrollView extends CommonView {
  constructor(_model = new ScrollModel()) {
    super(_model);
    
    // Init ScrollView
    this.setOn();
  }
  
  setOn() {
    if (this.model.SCROLL_SELECTOR != null) {
      if (this.model.TRIGGER_SELECTOR != null) {
        $(document).on(this.model.EVENT, this.model.TRIGGER_SELECTOR, () => {this.scroll()});
      } else {
        $(document).on(this.model.EVENT, () => {this.scroll()});
      }
    }
  }
  
  scroll() {
    Log.logClass('Scroll', this.model.NAME);
    this.model.$BODY.animate(
      {
        scrollTop: this.model.$SCROLL_SELECTOR.offset().top + this.model.POSITION_OFFSET
      },
      this.model.SCROLL_TIME_MS
    );
  }
}

// ----------------------------------------------------------------
// Confirm Class

class ConfirmModel extends CommonModel {
  constructor({
    name = 'Confirm',
    destroy = true,
    confirmId = 'confirm-id',
    confirmTitle = 'title',
    confirmMessage = 'content',
    event = 'click',
    eventSelector = null,
    eventFunction = 'this.openConfirm()',
    destroyTimeMs = 250,
    templateSelector = '#confirm-view-template',
    generateSelector = '#confirm-view',
    yes = 'Yes',
    no = 'No',
    functionYes = () => {},
    functionNo = () => {},
    functionClose = () => {},
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.DESTROY = destroy;
    
    this.CONFIRM_ID = confirmId;
    this.CONFIRM_SELECTOR = `#${this.CONFIRM_ID}`;
    this.CONFIRM_SELECTOR_YES = `#${this.CONFIRM_ID}-yes`;
    this.CONFIRM_SELECTOR_NO = `#${this.CONFIRM_ID}-no`;
    this.CONFIRM_SELECTOR_CLOSE = `#${this.CONFIRM_ID}-close`;
    
    this.CONFIRM_TITLE = confirmTitle;
    this.CONFIRM_MESSAGE = confirmMessage;
    
    this.EVENT = event;
    this.EVENT_SELECTOR = eventSelector;
    this.EVENT_FUNCTION = eventFunction;
    
    this.DESTROY_TIME_MS = destroyTimeMs;
    
    this.TEMPLATE_SELECTOR = templateSelector;
    this.$TEMPLATE_SELECTOR = $(this.TEMPLATE_SELECTOR);
    this.GENERATE_SELECTOR = generateSelector;
    this.$GENERATE_SELECTOR = $(this.GENERATE_SELECTOR);
    
    this.YES = yes;
    this.NO = no;
    
    this.FUNCTION_YES = functionYes;
    this.FUNCTION_NO = functionNo;
    this.FUNCTION_CLOSE = functionClose;
  }
}

class ConfirmView extends CommonView {
  constructor(_model = new ConfirmModel()) {
    super(_model);
    
    this.initConfirm();
  }
  
  initConfirm() {
    this.generateModal();
    this.setOn();
  }
  
  generateModal() {
    const template = this.model.$TEMPLATE_SELECTOR.text();
    const compiled = _.template(template);
    const model = {
      confirmId: this.model.CONFIRM_ID,
      confirmTitle: this.model.CONFIRM_TITLE,
      confirmMessage: this.model.CONFIRM_MESSAGE,
      yes: this.model.YES,
      no: this.model.NO
    };
    this.model.$GENERATE_SELECTOR.html(compiled(model));
  }
  
  setOn() {
    if (this.model.EVENT_SELECTOR != null) {
      $(document).on(
        this.model.EVENT,
        this.model.EVENT_SELECTOR,
        () => {
          eval(this.model.EVENT_FUNCTION)
        }
      );
    } else {
      $(document).on(
        this.model.EVENT,
        () => {
          eval(this.model.EVENT_FUNCTION)
        }
      );
    }
    $(document).on('click', this.model.CONFIRM_SELECTOR_YES, () => {this.selectYes()});
    $(document).on('click', this.model.CONFIRM_SELECTOR_NO, () => {this.selectNo()});
    $(document).on('click', this.model.CONFIRM_SELECTOR_CLOSE, () => {this.selectClose()});
  }
  
  setOff() {
    if (this.model.EVENT_SELECTOR != null) {
      $(document).off(this.model.EVENT, this.model.EVENT_SELECTOR);
    } else {
      $(document).off(this.model.EVENT);
    }
    $(document).off('click', this.model.CONFIRM_SELECTOR_YES);
    $(document).off('click', this.model.CONFIRM_SELECTOR_NO);
    $(document).off('click', this.model.CONFIRM_SELECTOR_CLOSE);
  }
  
  openConfirm() {
    Log.logClass(this.model.NAME, 'Open confirm');
    $(this.model.CONFIRM_SELECTOR).modal();
  }
  
  selectYes() {
    Log.logClassKey(this.model.NAME, this.model.CONFIRM_TITLE, 'Yes', Log.ARROW_INPUT);
    this.model.FUNCTION_YES();
    this.destroy();
  }
  
  selectNo() {
    Log.logClassKey(this.model.NAME, this.model.CONFIRM_TITLE, 'No', Log.ARROW_INPUT);
    this.model.FUNCTION_NO();
    this.destroy();
  }
  
  selectClose() {
    Log.logClassKey(this.model.NAME, this.model.CONFIRM_TITLE, 'Close', Log.ARROW_INPUT);
    this.model.FUNCTION_CLOSE();
    this.destroy();
  }
  
  destroy() {
    if (this.model.DESTROY) {
      Log.logClassKey(this.model.NAME, this.model.CONFIRM_TITLE, 'Destroy', Log.ARROW_INPUT);
      this.setOff();
      setTimeout(() => {this.remove()}, this.model.DESTROY_TIME_MS);
    }
  }
  
  remove() {
    Log.logClassKey(this.model.NAME, this.model.CONFIRM_TITLE, 'Remove', Log.ARROW_INPUT);
    $(this.model.CONFIRM_SELECTOR).remove();
  }
}

// ----------------------------------------------------------------
// Switch Class

class SwitchModel extends CommonModel {
  constructor({
    name = 'Switch',
    view = null,
    lsKeyView = null,
    triggerSelector = 'none',
    switchSelector = 'none',
    toggleTimeMs = 500
  } = {})
  {
    super({
      name: name
    });
    
    this.initView = true;
    
    if (lsKeyView != null) {
      lsKeyView = `View.${lsKeyView}`;
    }
    
    this.NAME = name;
    this.view = view;
    this.LS_KEY_VIEW = lsKeyView;
    this.TRIGGER_SELECTOR = triggerSelector;
    this.$TRIGGER_SELECTOR = $(this.TRIGGER_SELECTOR);
    this.SWITCH_SELECTOR = switchSelector;
    this.$SWITCH_SELECTOR = $(this.SWITCH_SELECTOR);
    this.TOGGLE_TIME_MS = toggleTimeMs;
  }
}

class SwitchView extends CommonView {
  constructor(_model = new SwitchModel()) {
    super(_model);
    
    // Init SwitchView
    this.initSwitchView();
  }
  
  initSwitchView() {
    this.setCurrentView();
    this.setView(this.model.view, 0);
    this.setOn();
  }
  
  setOn() {
    $(document).on('click', this.model.TRIGGER_SELECTOR, () => {this.switchView()});
  }
  
  setCurrentView() {
    if (this.model.view == null) {
      if (this.model.LS_KEY_VIEW == null) {
        this.model.view = this.model.initView;
      } else {
        const lsValView = LocalStorage.getItem(this.model.LS_KEY_VIEW);
        if (lsValView == null) {
          this.model.view = true;
        } else if (lsValView == 'true') {
          this.model.view = true;
        } else if (lsValView == 'false') {
          this.model.view = false;
        }
      }
    }
  }
  
  switchView() {
    Log.logClass('Switch', `${this.model.NAME} View`);
    
    this.setCurrentView();
    this.setView(!this.model.view);
  }
  
  setView(_view, _speed = this.model.TOGGLE_TIME_MS) {
    Log.logClassKey('View', this.model.NAME, _view, Log.ARROW_INPUT);
    
    if (_view) {
      this.model.$TRIGGER_SELECTOR.addClass(this.model.CURRENT);
      this.model.$SWITCH_SELECTOR.show(_speed);
    } else {
      this.model.$TRIGGER_SELECTOR.removeClass(this.model.CURRENT);
      this.model.$SWITCH_SELECTOR.hide(_speed);
    }
    
    // save
    LocalStorage.setItem(this.model.LS_KEY_VIEW, _view);
    this.model.view = _view;
  }
}

// ----------------------------------------------------------------
// Setting Class

class SettingModel extends SwitchModel {
  constructor(_obj) {
    super(_obj);
    
    // Setting SettingModel
    this.setModel();
  }
  
  setModel() {
    // Setting id
    this.SETTING_STEAMID_SELECTOR = '#setting-steamid';
    this.$SETTING_STEAMID_SELECTOR = $(this.SETTING_STEAMID_SELECTOR);
    this.SETTING_SEARCH_SELECTOR = '#setting-search';
    this.$SETTING_SEARCH_SELECTOR = $(this.SETTING_SEARCH_SELECTOR);
    this.SETTING_FILTER_SELECTOR = '#setting-filter';
    this.$SETTING_FILTER_SELECTOR = $(this.SETTING_FILTER_SELECTOR);
    this.SETTING_GROUP_SELECTOR = '#setting-group';
    this.$SETTING_GROUP_SELECTOR = $(this.SETTING_GROUP_SELECTOR);
    this.SETTING_SORT_SELECTOR = '#setting-sort';
    this.$SETTING_SORT_SELECTOR = $(this.SETTING_SORT_SELECTOR);
    this.SETTING_SORT_ASC_SELECTOR = '#setting-sort-asc';
    this.$SETTING_SORT_ASC_SELECTOR = $(this.SETTING_SORT_ASC_SELECTOR);
    this.SETTING_SORT_DESC_SELECTOR = '#setting-sort-desc';
    this.$SETTING_SORT_DESC_SELECTOR = $(this.SETTING_SORT_DESC_SELECTOR);
    this.SETTING_QUALITY_SELECTOR = '#setting-quality';
    this.$SETTING_QUALITY_SELECTOR = $(this.SETTING_QUALITY_SELECTOR);
    this.SETTING_SIZE_SELECTOR = '#setting-size';
    this.$SETTING_SIZE_SELECTOR = $(this.SETTING_SIZE_SELECTOR);
    this.SETTING_STYLE_SELECTOR = '#setting-style';
    this.$SETTING_STYLE_SELECTOR = $(this.SETTING_STYLE_SELECTOR);
  }
}

class SettingView extends SwitchView {
  constructor(_model = new SettingModel()) {
    super(_model);
  }
  
  getStyle() {
    const style = this.model.$SETTING_STYLE_SELECTOR.val();
    return style;
  }
  
  getSize() {
    const size = this.model.$SETTING_SIZE_SELECTOR.val();
    return size;
  }
  
  getSteamId() {
    const steamId = this.model.$SETTING_STEAMID_SELECTOR.val();
    return steamId;
  }
  
  getQuality() {
    const quality = this.model.$SETTING_QUALITY_SELECTOR.prop('checked');
    return quality;
  }
  
  getSearch() {
    const search = this.model.$SETTING_SEARCH_SELECTOR.val();
    return search;
  }
  
  getFilter() {
    const filter = this.model.$SETTING_FILTER_SELECTOR.val();
    return filter;
  }
  
  getGroup() {
    const group = this.model.$SETTING_GROUP_SELECTOR.val();
    return group;
  }
  
  getSort() {
    const sort = this.model.$SETTING_SORT_SELECTOR.val();
    return sort;
  }
  
  getSortMode() {
    const asc = this.model.$SETTING_SORT_ASC_SELECTOR.hasClass(this.model.ACTIVE);
    if (asc) {
      return 'asc';
    }
    const desc = this.model.$SETTING_SORT_DESC_SELECTOR.hasClass(this.model.ACTIVE);
    if (desc) {
      return 'desc';
    }
    Log.logError('getSortMode', 'Non active asc & desc', `asc ${asc}`, `desc ${desc}`);
    return null;
  }
  
  setStyle(_style = null) {
    if (_style == null) {
      return;
    }
    Log.logClassKey('Setting', 'Style', _style, Log.ARROW_INPUT);
    this.model.$SETTING_STYLE_SELECTOR.val(_style);
  }
  
  setSize(_size = null) {
    if (_size == null) {
      return;
    }
    Log.logClassKey('Setting', 'Size', _size, Log.ARROW_INPUT);
    this.model.$SETTING_SIZE_SELECTOR.val(_size);
  }
  
  setSteamId(_steamId = null) {
    if (_steamId == null) {
      return;
    }
    Log.logClassKey('Setting', 'SteamId', _steamId, Log.ARROW_INPUT);
    this.model.$SETTING_STEAMID_SELECTOR.val(_steamId);
  }
  
  setQuality(_quality = null) {
    if (_quality == null) {
      return;
    }
    Log.logClassKey('Setting', 'Quality', _quality, Log.ARROW_INPUT);
    if (_quality == 'true') {
      this.model.$SETTING_QUALITY_SELECTOR.prop('checked', true);
    } else {
      this.model.$SETTING_QUALITY_SELECTOR.prop('checked', false);
    }
  }
  
  setSearch(_search = null) {
    if (_search == null) {
      return;
    }
    Log.logClassKey('Setting', 'Search', _search, Log.ARROW_INPUT);
    this.model.$SETTING_SEARCH_SELECTOR.val(_search);
  }
  
  setFilter(_filter = null) {
    if (_filter == null) {
      return;
    }
    Log.logClassKey('Setting', 'Filter', _filter, Log.ARROW_INPUT);
    this.model.$SETTING_FILTER_SELECTOR.val(_filter);
  }
  
  setGroup(_group = null) {
    if (_group == null) {
      return;
    }
    Log.logClassKey('Setting', 'Group', _group, Log.ARROW_INPUT);
    this.model.$SETTING_GROUP_SELECTOR.val(_group);
  }
  
  setSort(_sort = null) {
    if (_sort == null) {
      return;
    }
    Log.logClassKey('Setting', 'Sort', _sort, Log.ARROW_INPUT);
    this.model.$SETTING_SORT_SELECTOR.val(_sort);
  }
  
  setSortMode(_sortMode = null) {
    if (_sortMode == null) {
      return;
    }
    Log.logClassKey('Setting', 'SortMode', _sortMode, Log.ARROW_INPUT);
    if (_sortMode == 'asc') {
      this.model.$SETTING_SORT_DESC_SELECTOR.removeClass(this.model.ACTIVE);
      this.model.$SETTING_SORT_ASC_SELECTOR.addClass(this.model.ACTIVE);
    } else if (_sortMode == 'desc')  {
      this.model.$SETTING_SORT_DESC_SELECTOR.addClass(this.model.ACTIVE);
      this.model.$SETTING_SORT_ASC_SELECTOR.removeClass(this.model.ACTIVE);
    } else {
      Log.logError('setSortMode', '_sortMode', _sortMode);
    }
  }
  
  updateStyle(_style = this.getStyle(), _overwrite = false) {
    const beforeStyle = LocalStorage.getItem(this.model.lsKeyStyle);
    Log.logClassKey(this.model.NAME, 'View.Setting', _style);
    if (beforeStyle == _style && !_overwrite) {
      return;
    }
    LocalStorage.setItem(this.model.lsKeyStyle, _style);
    if (beforeStyle == null) {
      // No remove
    } else if (beforeStyle == 'Normal') {
      // No remove
    } else if (beforeStyle.length > 0) {
      this.model.$BODY.removeClass(beforeStyle.toLowerCase());
    }
    if (_style == 'Normal') {
      // No add
    } else if (_style.length > 0) {
      this.model.$BODY.addClass(_style.toLowerCase());
    }
  }
  
  updateSize(_size = this.getSize(), _overwrite = false) {
    const beforeSize = LocalStorage.getItem(this.model.lsKeySize);
    Log.logClassKey(this.model.NAME, 'View.Setting', _size);
    if (beforeSize == _size && !_overwrite) {
      return;
    }
    LocalStorage.setItem(this.model.lsKeySize, _size);
  }
  
  updateSteamId(_steamId = this.getSteamId(), _overwrite = false) {
    const beforeSteamId = LocalStorage.getItem(this.model.lsKeySteamId);
    Log.logClassKey(this.model.NAME, 'View.Setting', _steamId);
    if (beforeSteamId == _steamId && !_overwrite) {
      return;
    }
    LocalStorage.setItem(this.model.lsKeySteamId, _steamId);
  }
  
  updateQuality(_quality = this.getQuality(), _overwrite = false) {
    const beforeQuality = LocalStorage.getItem(this.model.lsKeyQuality);
    Log.logClassKey(this.model.NAME, 'View.Setting', _quality);
    if (beforeQuality == _quality && !_overwrite) {
      return;
    }
    LocalStorage.setItem(this.model.lsKeyQuality, _quality);
  }
  
  updateSearch(_search = this.getSearch(), _overwrite = false) {
    const beforeSearch = LocalStorage.getItem(this.model.lsKeySearch);
    Log.logClassKey(this.model.NAME, 'View.Setting', _search);
    if (beforeSearch == _search && !_overwrite) {
      return;
    }
    LocalStorage.setItem(this.model.lsKeySearch, _search);
  }
  
  updateFilter(_filter = this.getFilter(), _overwrite = false) {
    const beforeFilter = LocalStorage.getItem(this.model.lsKeyFilter);
    Log.logClassKey(this.model.NAME, 'View.Setting', _filter);
    if (beforeFilter == _filter && !_overwrite) {
      return;
    }
    LocalStorage.setItem(this.model.lsKeyFilter, _filter);
  }
  
  updateGroup(_group = this.getGroup(), _overwrite = false) {
    const beforeGroup = LocalStorage.getItem(this.model.lsKeyGroup);
    Log.logClassKey(this.model.NAME, 'View.Setting', _group);
    if (beforeGroup == _group && !_overwrite) {
      return;
    }
    LocalStorage.setItem(this.model.lsKeyGroup, _group);
  }
  
  updateSort(_sortMode = this.getSortMode(), _sort = this.getSort(), _overwrite = false) {
    const beforeSort = LocalStorage.getItem(this.model.lsKeySort);
    Log.logClassKey(this.model.NAME, 'View.Setting', _sort);
    const beforeSortMode = LocalStorage.getItem(this.model.lsKeySortMode);
    Log.logClassKey(this.model.NAME, 'View.Setting', _sortMode);
    if (beforeSort == _sort && beforeSortMode == _sortMode && !_overwrite) {
      return;
    }
    LocalStorage.setItem(this.model.lsKeySort, _sort);
  }
  
  updateSortMode(_sortMode = this.getSortMode(), _overwrite = false) {
    const beforeSortMode = LocalStorage.getItem(this.model.lsKeySortMode);
    Log.logClassKey(this.model.NAME, 'View.Setting', _sortMode);
    if (beforeSortMode == _sortMode && !_overwrite) {
      return;
    }
    if (_sortMode == 'asc') {
      this.model.$SETTING_SORT_DESC_SELECTOR.removeClass(this.model.ACTIVE);
      this.model.$SETTING_SORT_ASC_SELECTOR.addClass(this.model.ACTIVE);
    } else if (_sortMode == 'desc') {
      this.model.$SETTING_SORT_DESC_SELECTOR.addClass(this.model.ACTIVE);
      this.model.$SETTING_SORT_ASC_SELECTOR.removeClass(this.model.ACTIVE);
    } else {
      Log.logError('updateSortMode', '_sortMode', _sortMode);
    }
    LocalStorage.setItem(this.model.lsKeySortMode, _sortMode);
    this.updateSort(_sortMode);
  }
}

// ----------------------------------------------------------------
// Item Class

class ItemModel extends SwitchModel {
  constructor(_obj) {
    super(_obj);
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
  constructor(_obj) {
    super(_obj);
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
  constructor(_obj) {
    super(_obj);
  }
}

class ItemGroupView extends SwitchView {
  constructor(_model = new ItemGroupModel()) {
    super(_model);
  }
}

// ----------------------------------------------------------------
// SteamInventory Class

class SteamInventoryModel extends CommonModel {
  constructor(_obj) {
    super(_obj);
  }
}

class SteamInventoryView extends CommonView {
  constructor(_model = new SteamInventoryModel()) {
    super(_model);
  }
}

// ----------------------------------------------------------------
// Controllers

class CommonController extends CommonClass {
  constructor({
    name = null,
    viewName = false
  } = {})
  {
    super();
    
    this.NAME = name;
    if (name != null && viewName) {
      super.viewNameModel(name);
    }
  }
}

class PopoverController extends CommonController {
  constructor(_obj) {
    super({
      name: 'Popover Controller'
    });
    
    this.model = new PopoverModel(_obj);
    this.view = new PopoverView(this.model);
  }
}

class ScrollController extends CommonController {
  constructor(_obj) {
    super({
      name: 'Scroll Controller'
    });
    
    this.model = new ScrollModel(_obj);
    this.view = new ScrollView(this.model);
  }
}

class ConfirmController extends CommonController {
  constructor(_obj) {
    super({
      name: 'Confirm Controller'
    });
    
    this.model = new ConfirmModel(_obj);
    this.view = new ConfirmView(this.model);
  }
}

class SwitchController extends CommonController {
  constructor(_obj) {
    super({
      name: 'Switch Controller'
    });
    
    this.model = new SwitchModel(_obj);
    this.view = new SwitchView(this.model);
  }
}

// ----------------------------------------------------------------
// Execute Controllers

class SettingController extends CommonController {
  constructor(_obj) {
    super({
      name: 'Setting Controller'
    });
    
    this.model = new SettingModel(_obj);
    this.setKeys();
    this.view = new SettingView(this.model);
    this.initSetting();
  }
  
  setKeys() {
    // Key
    this.model.lsKeySteamId = 'Setting.SteamId';
    this.model.lsKeySearch = 'Setting.Search';
    this.model.lsKeyFilter = 'Setting.Filter';
    this.model.lsKeyGroup = 'Setting.Group';
    this.model.lsKeySort = 'Setting.Sort';
    this.model.lsKeySortMode = 'Setting.SortMode';
    this.model.lsKeyQuality = 'Setting.Quality';
    this.model.lsKeySize = 'Setting.Size';
    this.model.lsKeyStyle = 'Setting.Style';
  }
  
  initSetting() {
    this.initLS();
    this.initViewSet();
    this.initViewUpdate();
  }
  
  initLS() {
    this.initLsValSteamId = LocalStorage.getItem(this.model.lsKeySteamId);
    if (this.initLsValSteamId == null) {
      this.initLsValSteamId = this.view.getSteamId();
    }
    this.initLsValSearch = LocalStorage.getItem(this.model.lsKeySearch);
    if (this.initLsValSearch == null) {
      this.initLsValSearch = this.view.getSearch();
    }
    this.initLsValFilter = LocalStorage.getItem(this.model.lsKeyFilter);
    if (this.initLsValFilter == null) {
      this.initLsValFilter = this.view.getFilter();
    }
    this.initLsValGroup = LocalStorage.getItem(this.model.lsKeyGroup);
    if (this.initLsValGroup == null) {
      this.initLsValGroup = this.view.getGroup();
    }
    this.initLsValSort = LocalStorage.getItem(this.model.lsKeySort);
    if (this.initLsValSort == null) {
      this.initLsValSort = this.view.getSort();
    }
    this.initLsValSortMode = LocalStorage.getItem(this.model.lsKeySortMode);
    if (this.initLsValSortMode == null) {
      this.initLsValSortMode = this.view.getSortMode();
    }
    this.initLsValQuality = LocalStorage.getItem(this.model.lsKeyQuality);
    if (this.initLsValQuality == null) {
      this.initLsValQuality = this.view.getQuality();
    }
    this.initLsValSize = LocalStorage.getItem(this.model.lsKeySize);
    if (this.initLsValSize == null) {
      this.initLsValSize = this.view.getSize();
    }
    this.initLsValStyle = LocalStorage.getItem(this.model.lsKeyStyle);
    if (this.initLsValStyle == null) {
      this.initLsValStyle = this.view.getStyle();
    }
  }
  
  initViewSet(){
    this.view.setStyle(this.initLsValStyle);
    this.view.setSize(this.initLsValSize);
    this.view.setSteamId(this.initLsValSteamId);
    this.view.setQuality(this.initLsValQuality);
    this.view.setSearch(this.initLsValSearch);
    this.view.setFilter(this.initLsValFilter);
    this.view.setGroup(this.initLsValGroup);
    this.view.setSort(this.initLsValSort);
    this.view.setSortMode(this.initLsValSortMode);
  }
  
  initViewUpdate(){
    this.view.updateStyle(this.initLsValStyle, true);
    this.view.updateSize(this.initLsValSize, true);
    this.view.updateSteamId(this.initLsValSteamId, true);
    this.view.updateQuality(this.initLsValQuality, true);
    this.view.updateSearch(this.initLsValSearch, true);
    this.view.updateFilter(this.initLsValFilter, true);
    this.view.updateGroup(this.initLsValGroup, true);
    this.view.updateSort(this.initLsValSortMode, this.initLsValSort, true);
  }
}

class ItemController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new ItemModel(_obj);
    this.view = new ItemView(this.model);
  }
}

class DetailController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new DetailModel(_obj);
    this.view = new DetailView(this.model);
  }
}

class ItemGroupController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new ItemGroupModel(_obj);
    this.view = new ItemGroupView(this.model);
  }
}

class SteamInventoryController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new SteamInventoryModel(_obj);
    this.view = new SteamInventoryView(this.model);
  }
}

// ----------------------------------------------------------------
// Events

class CommonEvent extends CommonClass {
  constructor({
    name = null,
    viewName = true
  } = {})
  {
    super();
    
    if (name != null && viewName) {
      this.NAME = name;
      super.viewNameModel(name);
    }
  }
}

// ----------------------------------------------------------------
// Execute Events

class SettingEvent extends CommonEvent {
  constructor({
    name = 'Setting Event'
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.CONTROLLER = new SettingController({
      name: 'Setting Switch',
      lsKeyView: 'setting',
      triggerSelector: '#action-setting',
      switchSelector: '#setting-area'
    });
    
    // Item
    this.ITEM = new ItemEvent();
    
    this.setOn();
    this.updateInit();
  }
  
  updateInit() {
    this.ITEM.PD2SI.setSteamId(this.CONTROLLER.view.getSteamId());
    $(document).trigger(this.ITEM.PD2SI.LOAD_EVENT);
  }
  
  setOn() {
    Log.logClass(this.NAME, 'setOn');
    $(document).on('change', this.CONTROLLER.model.SETTING_STYLE_SELECTOR, () => {
      this.CONTROLLER.view.updateStyle();
    });
    $(document).on('change', this.CONTROLLER.model.SETTING_SIZE_SELECTOR, () => {
      this.CONTROLLER.view.updateSize();
    });
    $(document).on('change', this.CONTROLLER.model.SETTING_STEAMID_SELECTOR, () => {
      this.CONTROLLER.view.updateSteamId();
      this.ITEM.PD2SI.setSteamId(this.CONTROLLER.view.getSteamId());
      $(document).trigger(this.ITEM.PD2SI.LOAD_EVENT);
    });
    $(document).on('change', this.CONTROLLER.model.SETTING_QUALITY_SELECTOR, () => {
      this.CONTROLLER.view.updateQuality();
    });
    $(document).on('change', this.CONTROLLER.model.SETTING_SEARCH_SELECTOR, () => {
      this.CONTROLLER.view.updateSearch();
    });
    $(document).on('change', this.CONTROLLER.model.SETTING_FILTER_SELECTOR, () => {
      this.CONTROLLER.view.updateFilter();
    });
    $(document).on('change', this.CONTROLLER.model.SETTING_GROUP_SELECTOR, () => {
      this.CONTROLLER.view.updateGroup();
    });
    $(document).on('change', this.CONTROLLER.model.SETTING_SORT_SELECTOR, () => {
      this.CONTROLLER.view.updateSort();
    });
    $(document).on('click', this.CONTROLLER.model.SETTING_SORT_ASC_SELECTOR, () => {
      this.CONTROLLER.view.updateSortMode('asc');
    });
    $(document).on('click', this.CONTROLLER.model.SETTING_SORT_DESC_SELECTOR, () => {
      this.CONTROLLER.view.updateSortMode('desc');
    });
  }
}

class ItemEvent extends CommonEvent {
  constructor({
    name = 'Item Event'
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.CONTROLLER = new ItemController({
      name: 'Item Switch',
      lsKeyView: 'item',
      triggerSelector: '#action-item',
      switchSelector: '#pd2item-area'
    });
    
    // PD2SteamInventory
    this.PD2SI = new PD2SteamInventoryEvent();
    // Detail
    this.DETAIL = new DetailEvent();
  }
}

class DetailEvent extends CommonEvent {
  constructor({
    name = 'Detail Event'
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.CONTROLLER = new DetailController({
      name: 'Detail Switch',
      lsKeyView: 'detail',
      triggerSelector: '#action-detail',
      switchSelector: '#detail-area'
    });
  }
}

class ItemGroupEvent extends CommonEvent {
  constructor({
    name = 'Item Group Event'
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.CONTROLLER = new ItemGroupController({
      name: 'Item Group Switch',
      lsKeyView: 'group.test',
      triggerSelector: '#pd2item-group-test',
      switchSelector: '#pd2item-group-list-test'
    });
  }
}

class SteamInventoryEvent extends CommonEvent {
  constructor({
    name = 'Steam Inventory Event',
    appId = null,
    steamId = null
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.APPID = appId;
    this.STEAMID = steamId;
    
    this.CONTROLLER = new SteamInventoryController();
  }
  
  getSteamInventory(_appId = this.APPID, _steamId = this.STEAMID) {
    Log.logClass(this.NAME, 'Get Steam Inventory');
    Log.logClassKey(this.NAME, 'App ID', _appId);
    Log.logClassKey(this.NAME, 'Steam ID', _steamId);
    
    if (_steamId.length != 17) {
      Log.logCaution('Steam ID', _steamId, _steamId.length, 'Not 17 digits.');
      return;
    }
    
    Log.logClass(this.NAME, 'Load Steam Inventory');
    
    $.ajax({
      url: 'ruby/getSteamInventoryJson.rb',
      data: {
        steamId: _steamId,
        appId: _appId
      },
      success: (_data, _datatype) => {
        Log.logClass(this.NAME, 'ajax load Steam Inventory JSON');
        
        if (~_data.indexOf('true')) {
          Log.logClass(this.NAME, 'Download JSON success.');
        } else {
          Log.logCaution('SteamInventoryEvent', 'getSteamInventory', 'ajax success', 'download failed');
        }
      },
      error: (_XMLHttpRequest, _textStatus, _errorThrown) => {
        Log.logClass(this.NAME, 'Load Steam Inventory JSON');
        Log.logCaution('SteamInventoryEvent', 'getSteamInventory', 'ajax error', _XMLHttpRequest, _textStatus, _errorThrown);
      }
    });
  }
}

class PD2SteamInventoryEvent extends SteamInventoryEvent {
  constructor({
    name = 'PAYDAY2 Steam Inventory Event',
    appId = '218620',
    steamId = null,
    loadEvent = 'loadPD2SI'
  } = {})
  {
    super({
      appId: appId,
      steamId: steamId
    });
    
    this.NAME = name;
    this.APPID = appId;
    this.STEAMID = steamId;
    this.LOAD_EVENT = loadEvent;
    
    this.setOn();
  }
  
  setOn() {
    $(document).on(this.LOAD_EVENT, () => {this.getPD2SteamInventory()});
  }
  
  setSteamId(_steamId = null) {
    this.STEAMID = _steamId;
  }
  
  generateItemGroup(_obj) {
    this.ITEMGROUP = new ItemGroupEvent(_obj);
  }
  
  getPD2SteamInventory() {
    super.getSteamInventory(this.APPID, this.STEAMID);
  }
}

// ----------------------------------------------------------------
// Process

class CommonProcess extends CommonClass {
  constructor({
    name = null,
    viewName = true
  } = {})
  {
    super();
    
    if (name != null && viewName) {
      this.NAME = name;
      super.viewNameModel(name);
    }
  }
}

class PD2SMProcess extends CommonProcess {
  constructor({
    name = `${Project.NAME} Process`
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    
    this.model = new CommonModel({
      name: `${Project.NAME} Model`
    });
    this.view = new CommonView(this.model);
    
    // Init SettingView
    this.initPD2SM();
  }
  
  initPD2SM() {
    this.initStartUp();
    this.initEvent();
    this.initController();
    this.initPopover();
    this.initConfirm();
    this.initView();
  }
  
  initStartUp() {
    // ----------------------------------------------------------------
    // Start up
    Log.log();
    Log.log(`Start up ${Project.NAME} (${Project.NAME_ABBREVIATION})`, Log.ALIGN_LEFT, Log.STYLE_COLOR_MAGENTA);
  }
  
  initEvent() {
    Log.log();
    Log.log('Start up Events', Log.ALIGN_LEFT, Log.STYLE_COLOR_MAGENTA);
    // Setting
    const evSetting = new SettingEvent();
  }
  
  initController() {
    Log.log();
    Log.log('Start up Controllers', Log.ALIGN_LEFT, Log.STYLE_COLOR_MAGENTA);
  }
  
  initPopover() {
    Log.log();
    Log.log('Start up popover', Log.ALIGN_LEFT, Log.STYLE_COLOR_MAGENTA);
    const conPopover = {
      conSteamidPopover: new PopoverController({
        name: 'Steamid PO',
        selector: '#setting-steamid-help',
        help: '18桁の steamid か CustomURL を入力してください。'
      }),
      conSearchPopover: new PopoverController({
        name: 'Search PO',
        selector: '#setting-search-help',
        help: '表示するアイテムを制限することができます。空の場合は全て表示されます。'
      }),
      conFilterPopover: new PopoverController({
        name: 'Filter PO',
        selector: '#setting-filter-help',
        help: '表示するアイテムを制限することができます。'
      }),
      conGroupPopover: new PopoverController({
        name: 'Group PO',
        selector: '#setting-group-help',
        help: 'グループ化して表示することができます。'
      }),
      conSortPopover: new PopoverController({
        name: 'Sort PO',
        selector: '#setting-sort-help',
        help: '指定した順序で並び替えることができます。'
      }),
      conQualityPopover: new PopoverController({
        name: 'Quality PO',
        selector: '#setting-quality-help',
        help: 'チェックを入れると、全てのクオリティを表示します。'
      }),
      conSizePopover: new PopoverController({
        name: 'Size PO',
        selector: '#setting-size-help',
        help: 'アイテムの表示サイズを変更できます。'
      }),
      conStylePopover: new PopoverController({
        name: 'Style PO',
        selector: '#setting-style-help',
        help: 'PAYDAY 2 Skin Manager のスタイルを変更できます。'
      })
    }
  }
  
  initConfirm() {
    // ----------------------------------------------------------------
    // Reset Storage
    Log.log();
    Log.log('Start up confirm', Log.ALIGN_LEFT, Log.STYLE_COLOR_MAGENTA);
    const conResetStorage = new ConfirmController({
      name: 'Reset Storage Confirm',
      destroy: false,
      confirmId: 'confirm-reset-storage',
      confirmTitle: '設定の初期化',
      confirmMessage: '設定を初期化して再読込します。よろしいですか？',
      eventSelector: '#action-reset',
      yes: 'はい',
      no: 'いいえ',
      functionYes: () => {
        LocalStorage.clear();
      }
    });
  }
  
  initView() {
    this.model.$BODY.show();
    this.viewNameModel(this.NAME, this);
    Log.logClassKey(Project.NAME, this.NAME, 'Start up');
  }
}

$(() => {
  // ----------------------------------------------------------------
  // Start up
  const pd2sm = new PD2SMProcess();
});
