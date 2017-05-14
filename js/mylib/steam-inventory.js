
// ----------------------------------------------------------------
// SteamInventory

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
    
    this.downloadJsonFlag = -1;
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
      this.downloadJsonFlag = 0;
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
          this.downloadJsonFlag = 2;
        } else {
          Log.logCaution('SteamInventoryEvent', 'downloadSteamInventory', 'ajax success', 'download failed');
          this.downloadJsonFlag = 1;
        }
      },
      error: (_XMLHttpRequest, _textStatus, _errorThrown) => {
        Log.logClass(this.NAME, 'Load Steam Inventory JSON');
        Log.logCaution('SteamInventoryEvent', 'downloadSteamInventory', 'ajax error', _XMLHttpRequest, _textStatus, _errorThrown);
      }
    });
  }
}
