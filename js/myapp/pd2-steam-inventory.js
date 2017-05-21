
// ----------------------------------------------------------------
// Model

class PD2SteamInventoryModel extends SteamInventoryModel {
  constructor(_obj) {
    super(_obj);
    
    this.TYPE_WEAPON = 1;
    this.TYPE_SAFE = 2;
    this.TYPE_DRILL = 3;
    this.TYPE_ARMOR = 4;
  }
}

// ----------------------------------------------------------------
// Event

class PD2SteamInventoryEvent extends SteamInventoryEvent {
  constructor({
    name = 'PAYDAY 2 Steam Inventory Event',
    appId = '218620',
    steamId = null,
    json = null
  } = {})
  {
    super({
      appId: appId,
      steamId: steamId
    });
    
    this.NAME = name;
    this.APPID = appId;
    this.STEAMID = steamId;
    this.JSON = json;
    
    this.model = new PD2SteamInventoryModel({
      name: 'PAYDAY 2 Steam Inventory Model'
    });
  }
  
  setSteamId(_steamId = null) {
    this.STEAMID = _steamId;
  }
  
  generateItemGroup(_obj) {
    this.ITEMGROUP = new ItemGroupEvent(_obj);
  }
  
  getPD2SteamInventory(_appId = this.APPID, _steamId = this.STEAMID) {
    super.downloadSteamInventory(_appId, _steamId);
  }
  
  buildInstanceJson() {
    if (this.JSON == null) {
      Log.logCaution(this.NAME, 'buildInstanceJson', 'JSON is null');
      return;
    }
    Log.logObj(this.JSON);
    
    let tempInstanceJson = {};
    
    $.each(this.JSON['rgInventory'], (_i, _val) => {
      const key = `${_val['classid']}_${_val['instanceid']}`;
      if (tempInstanceJson[key] == null) {
        tempInstanceJson[key] = {
          amount: 1
        }
      } else {
        tempInstanceJson[key]['amount'] ++;
      }
    });
    
    this.instanceJson = {};
    
    $.each(this.JSON['rgDescriptions'], (_i, _val) => {
      const hashName = _val['market_hash_name'];
      if (this.instanceJson[hashName] == null) {
        this.instanceJson[hashName] = {};
      }
      
      this.instanceJson[hashName]['amount'] = tempInstanceJson[_i]['amount'];
      
      if (~hashName.indexOf('|')) {
        // Weapon
        this.instanceJson[hashName]['type'] = this.model.TYPE_WEAPON;
        const weaponName = hashName.substring(0, hashName.indexOf('|') - 1);
        const skinName = hashName.substring(hashName.indexOf('|') + 2, hashName.indexOf(','));
        let quality = hashName.substr(hashName.indexOf(',') + 2);
        let statBoost = false;
        if (~quality.indexOf('Stat Boost')) {
          quality = quality.substring(0, quality.indexOf('Stat Boost') - 2);
          statBoost = true; 
        }
        
        this.instanceJson[hashName]['skin'] = PAYDAY2.getSkinId(skinName);
        this.instanceJson[hashName]['quality'] = PAYDAY2.getQualityId(quality);
        this.instanceJson[hashName]['statBoost'] = statBoost;
        
      } else if (hashName.indexOf('Armor') == hashName.length - 5) {
        // Armor
        this.instanceJson[hashName]['type'] = this.model.TYPE_ARMOR;
        this.instanceJson[hashName]['skin'] = PAYDAY2.getSkinId(hashName);
        
      } else if (hashName.indexOf('Safe') == hashName.length - 4) {
        // Safe
        this.instanceJson[hashName]['type'] = this.model.TYPE_SAFE;
        this.instanceJson[hashName]['safe'] = PAYDAY2.getSafeId(hashName);
        
      } else if (hashName.indexOf('Drill') == hashName.length - 5) {
        // Drill
        this.instanceJson[hashName]['type'] = this.model.TYPE_DRILL;
        this.instanceJson[hashName]['drillName'] = hashName;
        
      } else {
        // Also Safe
        this.instanceJson[hashName]['type'] = this.model.TYPE_SAFE;
        this.instanceJson[hashName]['safe'] = PAYDAY2.getSafeId(hashName);
        
      }
      // Log.logObj(this.instanceJson[hashName]);
    });
    
    this.buildClassJson();
  }
  
  buildClassJson() {
    if (this.instanceJson == null) {
      Log.logCaution(this.NAME, 'buildClassJson', 'instanceJson is null');
      return;
    }
    Log.logObj(this.instanceJson);
    
    this.classJson = {};
    
  }
}
