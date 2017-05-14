
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
    json = null,
    downloadCompleteEvent = null
  } = {})
  {
    super({
      name: name
    });
    
    this.NAME = name;
    this.APPID = appId;
    this.STEAMID = steamId;
    this.JSON = json;
    this.DOWNLOAD_COMPLETE_EVENT = downloadCompleteEvent;
    
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
  
  checkDownloadJsonFlag() {
    // Check Download JSON Flag
    if (this.downloadJsonFlag == this.model.DOWNLOAD_JSON_NOT_YET) {
      // Not download
      Log.logCaution('Not downloaded yet', 'App ID', this.APPID, 'Steam ID', this.STEAMID);
      return;
      
    } else if (this.downloadJsonFlag == this.model.DOWNLOAD_JSON_STEAMID_LENGTH_FAILED) {
      // Steam ID length failed
      Log.logCaution('Steam ID failed', _steamId, _steamId.length);
      return;
      
    } else if (this.downloadJsonFlag == this.model.DOWNLOAD_JSON_STEAMID_FAILED) {
      // Steam ID failed
      Log.logCaution('Steam ID failed', _steamId, _steamId.length);
      return;
      
    } else if (this.downloadJsonFlag == this.model.DOWNLOAD_JSON_APPID_FAILED) {
      // App ID failed
      Log.logCaution('App ID failed', _appId, _appId.length);
      return;
      
    } else if (this.downloadJsonFlag == this.model.DOWNLOAD_JSON_FAILED) {
      // Download failed
      Log.logCaution(this.NAME, 'downloadSteamInventoryFile', 'JSON download failed');
      
    } else if (this.downloadJsonFlag == this.model.DOWNLOAD_JSON_SUCCESS) {
      // Download success
      Log.logClass(this.NAME, 'Download Steam Inventory JSON file');
      
    } else {
      // downloadJsonFlag error
      Log.logError(this.NAME, 'downloadSteamInventoryFile', 'downloadJsonFlag Error', this.downloadJsonFlag);
      return;
      
    }
    const fileName = this.getSteamInventoryFileName();
    if (fileName == null) {
      // file name error
      Log.logCaution('file name is null', 'App ID', this.APPID, 'Steam ID', this.STEAMID);
      return;
    }
    
    this.downloadSteamInventoryFile(fileName);
  }
  
  downloadSteamInventoryFile(_fileName = this.getSteamInventoryFileName()) {
    Log.logClass(this.NAME, 'Download Steam Inventory File');
    $.ajax({
      url: _fileName,
      dataType: 'json',
      success: (_data, _datatype) => {
        Log.logClass(this.NAME, 'ajax download Steam Inventory File');
        Log.logClass(this.NAME, 'Download File success.');
        this.JSON = _data;
        if (this.DOWNLOAD_COMPLETE_EVENT != null) {
          $(document).trigger(this.DOWNLOAD_COMPLETE_EVENT);
        }
      },
      error: (_XMLHttpRequest, _textStatus, _errorThrown) => {
        Log.logClass(this.NAME, 'Download File failed.');
        Log.logCaution('SteamInventoryEvent', 'downloadSteamInventoryFile', 'ajax error', _XMLHttpRequest, _textStatus, _errorThrown);
      }
    });
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
        Log.logClass(this.NAME, 'ajax download Steam Inventory');
        
        if (~_data.indexOf('true')) {
          Log.logClass(this.NAME, 'Download success.');
          this.downloadJsonFlag = this.model.DOWNLOAD_JSON_SUCCESS;
          this.checkDownloadJsonFlag();
        } else {
          Log.logCaution('SteamInventoryEvent', 'downloadSteamInventory', 'ajax success', 'download failed');
          this.downloadJsonFlag = this.model.DOWNLOAD_JSON_FAILED;
          this.checkDownloadJsonFlag();
        }
      },
      error: (_XMLHttpRequest, _textStatus, _errorThrown) => {
        Log.logClass(this.NAME, 'Download failed.');
        Log.logCaution('SteamInventoryEvent', 'downloadSteamInventory', 'ajax error', _XMLHttpRequest, _textStatus, _errorThrown);
      }
    });
  }
}
