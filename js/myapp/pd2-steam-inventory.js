
// ----------------------------------------------------------------
// Model

class PD2SteamInventoryModel extends SteamInventoryModel {
  constructor(_obj) {
    super(_obj);
    
    this.TYPE_WEAPON = 1;
    this.TYPE_SAFE = 2;
    this.TYPE_ARMOR = 3;
  }
}

// ----------------------------------------------------------------
// Event

class PD2SteamInventoryEvent extends SteamInventoryEvent {
  constructor({
    name = 'PAYDAY 2 Steam Inventory Event',
    appId = '218620',
    steamId = null,
    json = null,
    loadEvent = 'loadPD2SI',
    downloadCompleteEvent = 'buildPD2SI'
  } = {})
  {
    super({
      appId: appId,
      steamId: steamId,
      downloadCompleteEvent: downloadCompleteEvent
    });
    
    this.NAME = name;
    this.APPID = appId;
    this.STEAMID = steamId;
    this.JSON = json;
    this.LOAD_EVENT = loadEvent;
    this.DOWNLOAD_COMPLETE_EVENT = downloadCompleteEvent;
    
    this.model = new PD2SteamInventoryModel({
      name: 'PAYDAY 2 Steam Inventory Model'
    });
    
    this.setOn();
  }
  
  setOn() {
    $(document).on(this.LOAD_EVENT, () => {
      this.getPD2SteamInventory()
    });
    $(document).on(this.DOWNLOAD_COMPLETE_EVENT, () => {
      this.buildPD2InstanceJson();
    });
  }
  
  setSteamId(_steamId = null) {
    this.STEAMID = _steamId;
  }
  
  generateItemGroup(_obj) {
    this.ITEMGROUP = new ItemGroupEvent(_obj);
  }
  
  getPD2SteamInventory() {
    super.downloadSteamInventory(this.APPID, this.STEAMID);
  }
  
  buildPD2InstanceJson() {
    Log.logObj(this.JSON);
  }
}
