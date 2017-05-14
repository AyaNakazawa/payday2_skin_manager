
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
    buildInstanceEvent = 'buildInstancePD2SI'
  } = {})
  {
    super({
      appId: appId,
      steamId: steamId,
      downloadCompleteEvent: buildInstanceEvent
    });
    
    this.NAME = name;
    this.APPID = appId;
    this.STEAMID = steamId;
    this.JSON = json;
    this.LOAD_EVENT = loadEvent;
    this.BUILD_INSTANCE_EVENT = buildInstanceEvent;
    
    this.model = new PD2SteamInventoryModel({
      name: 'PAYDAY 2 Steam Inventory Model'
    });
    
    this.instanceJson = {};
    this.classJson = {};
    
    this.setOn();
  }
  
  setOn() {
    $(document).on(this.LOAD_EVENT, () => {
      this.getPD2SteamInventory()
    });
    $(document).on(this.BUILD_INSTANCE_EVENT, () => {
      this.buildInstanceJson();
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
  
  buildClassJson() {
    if (this.instanceJson == null) {
      Log.logCaution(this.NAME, 'buildClassJson', 'instanceJson is null');
      return;
    }
    Log.logObj(this.instanceJson);
  }
  
  buildInstanceJson() {
    if (this.JSON == null) {
      Log.logCaution(this.NAME, 'buildInstanceJson', 'JSON is null');
      return;
    }
    Log.logObj(this.JSON);
    
    this.instanceJson = {};
    
    $.each(this.JSON['rgInventory'], (_i, _val) => {
      const key = `${_val['classid']}_${_val['instanceid']}`;
      if (this.instanceJson[key] == null) {
        this.instanceJson[key] = {
          amount: 1
        }
      } else {
        this.instanceJson[key]['amount'] ++;
      }
    });
    $.each(this.JSON['rgDescriptions'], (_i, _val) => {
      const hashName = _val['market_hash_name'];
      // this.instanceJson[_i]['hashName'] = hashName;
      
      if (~hashName.indexOf('|')) {
        // Weapon
        this.instanceJson[_i]['type'] = this.model.TYPE_WEAPON;
        const weaponName = hashName.substring(0, hashName.indexOf('|') - 1);
        const skinName = hashName.substring(hashName.indexOf('|') + 2, hashName.indexOf(','));
        let condition = hashName.substr(hashName.indexOf(',') + 2);
        let statBoost = false;
        if (~condition.indexOf('Stat Boost')) {
          condition = condition.substring(0, condition.indexOf('Stat Boost') - 2);
          statBoost = true; 
        }
        
        this.instanceJson[_i]['weaponName'] = weaponName;
        this.instanceJson[_i]['skinName'] = skinName;
        this.instanceJson[_i]['condition'] = condition;
        if (statBoost) {
          const desc = _val['descriptions'][0]['value'];
          const boost = desc.substring(
            desc.indexOf('Stat Boost:') + 12,
            desc.indexOf(' ', desc.indexOf('Stat Boost:') + 12)
          );
          const stat = desc.substring(
            desc.indexOf(' ', desc.indexOf('Stat Boost:') + 12) + 1,
            desc.indexOf('<', desc.indexOf(' ', desc.indexOf('Stat Boost:') + 12))
          );
          this.instanceJson[_i]['boost'] = boost;
          this.instanceJson[_i]['stat'] = stat;
        }
        
      } else if (hashName.indexOf('Armor') == hashName.length - 5) {
        // Armor
        this.instanceJson[_i]['type'] = this.model.TYPE_ARMOR;
        this.instanceJson[_i]['skinName'] = hashName;
        
      } else if (hashName.indexOf('Safe') == hashName.length - 4) {
        // Safe
        this.instanceJson[_i]['type'] = this.model.TYPE_SAFE;
        this.instanceJson[_i]['safeName'] = hashName;
        
      } else {
        // Also Safe
        this.instanceJson[_i]['type'] = this.model.TYPE_SAFE;
        this.instanceJson[_i]['safeName'] = hashName;
        
      }
      Log.logObj(this.instanceJson[_i]);
    });
  }
}
