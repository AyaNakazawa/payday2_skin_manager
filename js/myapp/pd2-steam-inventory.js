
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
