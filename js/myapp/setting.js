
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
    this.SETTING_UNIQUE_SELECTOR = '#setting-unique';
    this.$SETTING_UNIQUE_SELECTOR = $(this.SETTING_UNIQUE_SELECTOR);
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
  
  getUnique() {
    const unique = this.model.$SETTING_UNIQUE_SELECTOR.prop('checked');
    return unique;
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
  
  setUnique(_unique = null) {
    if (_unique == null) {
      return;
    }
    Log.logClassKey('Setting', 'Unique', _unique, Log.ARROW_INPUT);
    if (_unique == 'true') {
      this.model.$SETTING_UNIQUE_SELECTOR.prop('checked', true);
    } else {
      this.model.$SETTING_UNIQUE_SELECTOR.prop('checked', false);
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
  
  updateUnique(_unique = this.getUnique(), _overwrite = false) {
    const beforeUnique = LocalStorage.getItem(this.model.lsKeyUnique);
    Log.logClassKey(this.model.NAME, 'View.Setting', _unique);
    if (beforeUnique == _unique && !_overwrite) {
      return;
    }
    LocalStorage.setItem(this.model.lsKeyUnique, _unique);
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
// Controllers

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
    this.model.lsKeyUnique = 'Setting.Unique';
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
    this.initLsValUnique = LocalStorage.getItem(this.model.lsKeyUnique);
    if (this.initLsValUnique == null) {
      this.initLsValUnique = this.view.getUnique();
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
    this.view.setUnique(this.initLsValUnique);
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
    this.view.updateUnique(this.initLsValUnique, true);
    this.view.updateSearch(this.initLsValSearch, true);
    this.view.updateFilter(this.initLsValFilter, true);
    this.view.updateGroup(this.initLsValGroup, true);
    this.view.updateSort(this.initLsValSortMode, this.initLsValSort, true);
  }
}

// ----------------------------------------------------------------
// Events

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
    
    this.setOn();
    this.updateInit();
  }
  
  updateInit() {
    Log.logObj(PS);
    PS.PD2SI.getPD2SteamInventory(undefined, this.CONTROLLER.view.getSteamId());
  }
  
  setOn() {
    Log.logClass(this.NAME, 'setOn');
    
    // Style
    $(document).on('change', this.CONTROLLER.model.SETTING_STYLE_SELECTOR, () => {
      this.CONTROLLER.view.updateStyle();
      $(document).trigger(PS.PD2SI.SET_STYLE);
    });
    
    // Size
    $(document).on('change', this.CONTROLLER.model.SETTING_SIZE_SELECTOR, () => {
      this.CONTROLLER.view.updateSize();
    });
    
    // SteamId
    $(document).on('change', this.CONTROLLER.model.SETTING_STEAMID_SELECTOR, () => {
      this.CONTROLLER.view.updateSteamId();
      PS.PD2SI.setSteamId(this.CONTROLLER.view.getSteamId());
      $(document).trigger(PS.PD2SI.SET_STEAMID);
    });
    
    // Unique
    $(document).on('change', this.CONTROLLER.model.SETTING_UNIQUE_SELECTOR, () => {
      this.CONTROLLER.view.updateUnique();
    });
    
    // Search
    $(document).on('change', this.CONTROLLER.model.SETTING_SEARCH_SELECTOR, () => {
      this.CONTROLLER.view.updateSearch();
    });
    
    // Filter
    $(document).on('change', this.CONTROLLER.model.SETTING_FILTER_SELECTOR, () => {
      this.CONTROLLER.view.updateFilter();
    });
    
    // Group
    $(document).on('change', this.CONTROLLER.model.SETTING_GROUP_SELECTOR, () => {
      this.CONTROLLER.view.updateGroup();
    });
    
    // Sort
    $(document).on('change', this.CONTROLLER.model.SETTING_SORT_SELECTOR, () => {
      this.CONTROLLER.view.updateSort();
    });
    
    // SortMode
    $(document).on('click', this.CONTROLLER.model.SETTING_SORT_ASC_SELECTOR, () => {
      this.CONTROLLER.view.updateSortMode('asc');
    });
    
    // SortMode
    $(document).on('click', this.CONTROLLER.model.SETTING_SORT_DESC_SELECTOR, () => {
      this.CONTROLLER.view.updateSortMode('desc');
    });
  }
}
