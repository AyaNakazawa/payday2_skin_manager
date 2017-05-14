
// ----------------------------------------------------------------
// Model

class SteamInventoryModel extends CommonModel {
  constructor(_obj) {
    super(_obj);
    
    this.DOWNLOAD_JSON_NOT_YET = -1;
    this.DOWNLOAD_JSON_STEAMID_LENGTH_FAILED = 1;
    this.DOWNLOAD_JSON_STEAMID_FAILED = 2;
    this.DOWNLOAD_JSON_APPID_FAILED = 3;
    this.DOWNLOAD_JSON_FAILED = 11;
    this.DOWNLOAD_JSON_SUCCESS = 21;
  }
}

// ----------------------------------------------------------------
// Event

class SteamInventoryEvent extends CommonEvent {
  constructor({
    name = 'Steam Inventory Event',
    appId = null,
    steamId = null,
    json = null
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.APPID = appId;
    this.STEAMID = steamId;
    this.JSON = json;
    
    this.model = new SteamInventoryModel({
      name: 'Steam Inventory Model'
    });
    
    this.downloadJsonFlag = this.model.DOWNLOAD_JSON_NOT_YET;
  }
  
  getSteamInventoryFileName() {
    let result = null;
    if (this.STEAMID != null && this.APPID != null) {
      result = `downloads/json/${this.STEAMID}_${this.APPID}.json`;
    }
    return result;
  }
  
  downloadSteamInventory(_appId = this.APPID, _steamId = this.STEAMID) {
    Log.logClass(this.NAME, 'Download Steam Inventory');
    Log.logClassKey(this.NAME, 'App ID', _appId);
    Log.logClassKey(this.NAME, 'Steam ID', _steamId);
    
    this.APPID = _appId;
    this.STEAMID = _steamId;
    
    if (_steamId.length != 17) {
      Log.logCaution('Steam ID', _steamId, _steamId.length, 'Not 17 digits.');
      this.downloadJsonFlag = this.model.DOWNLOAD_JSON_STEAMID_LENGTH_FAILED;
      return;
    } else if (_steamId == null) {
      Log.logCaution('Steam ID', _steamId);
      this.downloadJsonFlag = this.model.DOWNLOAD_JSON_STEAMID_FAILED;
      return;
    } else if (_appId == null) {
      Log.logCaution('App ID', _appId);
      this.downloadJsonFlag = this.model.DOWNLOAD_JSON_APPID_FAILED;
      return;
    }
    
    $.ajax({
      url: 'ruby/getSteamInventoryJson.rb',
      data: {
        steamId: _steamId,
        appId: _appId
      },
      success: (_data, _datatype) => {
        Log.logClass(this.NAME, 'ajax download Steam Inventory JSON');
        
        if (~_data.indexOf('true')) {
          Log.logClass(this.NAME, 'Download JSON success.');
          this.downloadJsonFlag = this.model.DOWNLOAD_JSON_SUCCESS;
        } else {
          Log.logCaution('SteamInventoryEvent', 'downloadSteamInventory', 'ajax success', 'download failed');
          this.downloadJsonFlag = this.model.DOWNLOAD_JSON_FAILED;
        }
      },
      error: (_XMLHttpRequest, _textStatus, _errorThrown) => {
        Log.logClass(this.NAME, 'Load Steam Inventory JSON');
        Log.logCaution('SteamInventoryEvent', 'downloadSteamInventory', 'ajax error', _XMLHttpRequest, _textStatus, _errorThrown);
      }
    });
  }
}
