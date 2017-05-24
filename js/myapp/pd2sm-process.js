
// ----------------------------------------------------------------
// Process

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
  
  updatePS() {
    PS = this;
    // Log.logClass(this.NAME, 'updatePS');
    // Log.logObj(PS);
  }
  
  initPD2SM() {
    this.initStartUp();
    this.updatePS();
    
    this.initEvent();
    this.updatePS();
    
    this.initController();
    this.updatePS();
    
    this.initPopover();
    this.updatePS();
    
    this.initConfirm();
    this.updatePS();
    
    this.initView();
    this.updatePS();
    
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
    // Detail
    this.DETAIL = new DetailEvent();
    this.updatePS();
    
    // PD2SteamInventory
    this.PD2SI = new PD2SteamInventoryEvent();
    this.updatePS();
    
    // Item
    this.ITEM = new ItemEvent();
    this.updatePS();
    
    // Setting
    this.SET = new SettingEvent();
    this.updatePS();
  }
  
  initController() {
    Log.log();
    Log.log('Start up Controllers', Log.ALIGN_LEFT, Log.STYLE_COLOR_MAGENTA);
  }
  
  initPopover() {
    Log.log();
    Log.log('Start up Popovers', Log.ALIGN_LEFT, Log.STYLE_COLOR_MAGENTA);
    {
      new PopoverController({
        name: 'Steamid Popover',
        selector: '#setting-steamid-help',
        help: '18桁の steamid か CustomURL を入力してください。'
      }),
      new PopoverController({
        name: 'Search Popover',
        selector: '#setting-search-help',
        help: '表示するアイテムを制限することができます。空の場合は全て表示されます。'
      }),
      new PopoverController({
        name: 'Filter Popover',
        selector: '#setting-filter-help',
        help: '表示するアイテムを制限することができます。'
      }),
      new PopoverController({
        name: 'Group Popover',
        selector: '#setting-group-help',
        help: 'グループ化して表示することができます。'
      }),
      new PopoverController({
        name: 'Sort Popover',
        selector: '#setting-sort-help',
        help: '指定した順序で並び替えることができます。'
      }),
      new PopoverController({
        name: 'Unique Popover',
        selector: '#setting-unique-help',
        help: 'チェックを入れると、クオリティやステータスが違う全てのスキンを表示します。'
      }),
      new PopoverController({
        name: 'Size Popover',
        selector: '#setting-size-help',
        help: 'アイテムの表示サイズを変更できます。'
      }),
      new PopoverController({
        name: 'Style Popover',
        selector: '#setting-style-help',
        help: 'PAYDAY 2 Skin Manager のスタイルを変更できます。'
      })
    }
  }
  
  initConfirm() {
    // ----------------------------------------------------------------
    // Reset Storage
    Log.log();
    Log.log('Start up Confirms', Log.ALIGN_LEFT, Log.STYLE_COLOR_MAGENTA);
    new ConfirmController({
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
