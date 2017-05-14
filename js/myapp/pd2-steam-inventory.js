
// ----------------------------------------------------------------
// PAYDAY2 SteamInventory

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
    
    this.setOn();
  }
  
  setOn() {
    $(document).on(this.LOAD_EVENT, () => {
      this.getPD2SteamInventory()
    });
    $(document).on(this.DOWNLOAD_COMPLETE_EVENT, () => {
      this.buildPD2Item();
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
  
  buildPD2Item() {
    Log.logClass(this.NAME, 'buildPD2Item');
    Log.logObj(this.JSON);
  }
}
