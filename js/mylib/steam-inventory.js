
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

class SteamInventoryController extends CommonController {
  constructor(_obj) {
    super(_obj);
    
    this.model = new SteamInventoryModel(_obj);
    this.view = new SteamInventoryView(this.model);
  }
}

// ----------------------------------------------------------------
// Events

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
