
class PAYDAY2 extends CommonClass {
  constructor({
    name = 'PAYDAY2 Data'
  } = {}) {
    super();
    
    this.NAME = name;
    
    super.viewNameModel();
    
    this.loadDB();
    
    super.viewNameModel();
  }
  
  loadDB() {
    this.LOAD_SKIN = false;
    this.LOAD_SAFE = false;
    this.LOAD_QUALITY = false;
    this.LOAD_RARITY = false;
    this.LOAD_WEAPON = false;
    this.LOAD_BOOST_STAT_GROUP = false;
    
    this.LOAD_BOOST_VALUE_GROUP = false;
    this.LOAD_DLC = false;
    this.LOAD_DRILL = false;
    this.LOAD_SAFE_GROUP = false;
    this.LOAD_SKIN_TYPE = false;
    this.LOAD_SLOT = false;
    this.LOAD_WEAPON_MOD = false;
    this.LOAD_WEAPON_MOD_GROUP = false;
    this.LOAD_WEAPON_MOD_TYPE = false;
    this.LOAD_WEAPON_STAT = false;
    this.LOAD_WEAPON_TYPE = false;
    
    this.loadSkin();
    this.loadSafe();
    this.loadQuality();
    this.loadRarity();
    this.loadWeapon();
    this.loadBoostStatGroup();
    
    this.loadBoostValueGroup();
    this.loadDlc();
    this.loadDrill();
    this.loadSafeGroup();
    this.loadSkinType();
    this.loadSlot();
    this.loadWeaponMod();
    this.loadWeaponModGroup();
    this.loadWeaponModType();
    this.loadWeaponStat();
    this.loadWeaponType();
  }
  
  loadSkin() {
    PST.push({
      name: 'loadSkin',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM Skin'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_SKIN = true;
            this.SKIN = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadSafe() {
    PST.push({
      name: 'loadSafe',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM Safe'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_SAFE = true;
            this.SAFE = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadQuality() {
    PST.push({
      name: 'loadQuality',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM Quality'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_QUALITY = true;
            this.QUALITY = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadRarity() {
    PST.push({
      name: 'loadRarity',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM Rarity'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_RARITY = true;
            this.RARITY = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadWeapon() {
    PST.push({
      name: 'loadWeapon',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM Weapon'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_WEAPON = true;
            this.WEAPON = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadBoostStatGroup() {
    PST.push({
      name: 'loadBoostStatGroup',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM BoostStatGroup'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_BOOST_STAT_GROUP = true;
            this.BOOST_STAT_GROUP = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadBoostValueGroup() {
    PST.push({
      name: 'loadBoostValueGroup',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM BoostValueGroup'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_BOOST_VALUE_GROUP = true;
            this.BOOST_VALUE_GROUP = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadDlc() {
    PST.push({
      name: 'loadDlc',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM Dlc'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_DLC = true;
            this.DLC = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadDrill() {
    PST.push({
      name: 'loadDrill',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM Drill'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_DRILL = true;
            this.DRILL = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadSafeGroup() {
    PST.push({
      name: 'loadSafeGroup',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM SafeGroup'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_SAFE_GROUP = true;
            this.SAFE_GROUP = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadSkinType() {
    PST.push({
      name: 'loadSkinType',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM SkinType'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_SKIN_TYPE = true;
            this.SKIN_TYPE = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadSlot() {
    PST.push({
      name: 'loadSlot',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM Slot'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_SLOT = true;
            this.SLOT = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadWeaponMod() {
    PST.push({
      name: 'loadWeaponMod',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM WeaponMod'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_WEAPON_MOD = true;
            this.WEAPON_MOD = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadWeaponModGroup() {
    PST.push({
      name: 'loadWeaponModGroup',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM WeaponModGroup'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_WEAPON_MOD_GROUP = true;
            this.WEAPON_MOD_GROUP = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadWeaponModType() {
    PST.push({
      name: 'loadWeaponModType',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM WeaponModType'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_WEAPON_MOD_TYPE = true;
            this.WEAPON_MOD_TYPE = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadWeaponStat() {
    PST.push({
      name: 'loadWeaponStat',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM WeaponStat'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_WEAPON_STAT = true;
            this.WEAPON_STAT = _data;
            callback();
          }
        });
      }
    });
  }
  
  loadWeaponType() {
    PST.push({
      name: 'loadWeaponType',
      func: (callback) => {
        $.ajax({
          url: 'ruby/getSQLiteResult.rb',
          data: {query: 'SELECT * FROM WeaponType'},
          dataType: 'json',
          success: (_data) => {
            this.LOAD_WEAPON_TYPE = true;
            this.WEAPON_TYPE = _data;
            callback();
          }
        });
      }
    });
  }
  
  getRarityId(_rarityName = 'Undefined') {
    _rarityName = _rarityName.toLowerCase().trim();
    for(let i = 1; i < this.rarity.length; i++) {
      if (this.rarity[i]['name'].toLowerCase().trim() == _rarityName) {
        return i;
      }
    }
    return 0;
  }
  
  getQualityId(_qualityName = 'Undefined') {
    _qualityName = _qualityName.toLowerCase().trim();
    for(let i = 1; i < this.quality.length; i++) {
      if (this.quality[i]['name'].toLowerCase().trim() == _qualityName) {
        return i;
      }
    }
    return 0;
  }
  
  getWeaponStatId(_weaponStatName = 'Undefined') {
    _weaponStatName = _weaponStatName.toLowerCase().trim();
    for(let i = 1; i < this.weaponStat.length; i++) {
      if (this.weaponStat[i]['name'].toLowerCase().trim() == _weaponStatName) {
        return i;
      }
    }
    return 0;
  }
  
  getWeaponId(_weaponName = 'Undefined') {
    _weaponName = _weaponName.toLowerCase();
    _weaponName = _weaponName.replace(' sniper rifle', '');
    _weaponName = _weaponName.replace(' assault rifle', '');
    _weaponName = _weaponName.replace(' rifle', '');
    _weaponName = _weaponName.replace(' shotgun', '');
    _weaponName = _weaponName.replace(' light machine gun', '');
    _weaponName = _weaponName.replace(' pistols', '');
    _weaponName = _weaponName.replace(' pistol', '');
    _weaponName = _weaponName.replace(' submachine guns', '');
    _weaponName = _weaponName.replace(' submachine gun', '');
    _weaponName = _weaponName.replace(' grenade launcher', '');
    _weaponName = _weaponName.replace(' rocket launcher', '');
    _weaponName = _weaponName.replace(' minigun', '');
    _weaponName = _weaponName.replace(' saw', '');
    _weaponName = _weaponName.replace(' revolver', '');
    _weaponName = _weaponName.replace('-', '');
    _weaponName = _weaponName.replace('&', '');
    _weaponName = _weaponName.replace('.', '');
    _weaponName = _weaponName.replace('/', '');
    _weaponName = _weaponName.replace('’', '');
    _weaponName = _weaponName.replace('\'', '');
    _weaponName = _weaponName.trim();
    
    for(let i = 1; i < this.weapon.length; i++) {
      let weaponName = this.weapon[i][0].toLowerCase();
      weaponName = weaponName.replace(' sniper rifle', '');
      weaponName = weaponName.replace(' assault rifle', '');
      weaponName = weaponName.replace(' rifle', '');
      weaponName = weaponName.replace(' shotgun', '');
      weaponName = weaponName.replace(' submachine guns', '');
      weaponName = weaponName.replace(' submachine gun', '');
      weaponName = weaponName.replace(' grenade launcher', '');
      weaponName = weaponName.replace(' light machine gun', '');
      weaponName = weaponName.replace(' pistols', '');
      weaponName = weaponName.replace(' pistol', '');
      weaponName = weaponName.replace(' rocket launcher', '');
      weaponName = weaponName.replace(' minigun', '');
      weaponName = weaponName.replace(' saw', '');
      weaponName = weaponName.replace(' revolver', '');
      weaponName = weaponName.replace('-', '');
      weaponName = weaponName.replace('&', '');
      weaponName = weaponName.replace('.', '');
      weaponName = weaponName.replace('/', '');
      weaponName = weaponName.replace('’', '');
      weaponName = weaponName.replace('\'', '');
      weaponName = weaponName.trim();
      if (weaponName == _weaponName) {
        return i;
      }
    }
    Log.logCaution('Weapon Name miss match', _weaponName, _weaponName.length);
    return 0;
  }
  
  getSkinId(_skinName = 'Undefined') {
    _skinName = _skinName.toLowerCase().trim();
    _skinName = _skinName.replace('-', '');
    _skinName = _skinName.replace('&', '');
    _skinName = _skinName.replace('.', '');
    _skinName = _skinName.replace('/', '');
    _skinName = _skinName.replace('’', '');
    _skinName = _skinName.replace('\'', '');
    for(let i = 1; i < this.skin.length; i++) {
      let skinName = this.skin[i][0].toLowerCase();
      skinName = skinName.replace('-', '');
      skinName = skinName.replace('&', '');
      skinName = skinName.replace('.', '');
      skinName = skinName.replace('/', '');
      skinName = skinName.replace('’', '');
      skinName = skinName.replace('\'', '');
      skinName = skinName.trim();
      if (skinName == _skinName) {
        return i;
      }
    }
    Log.logCaution('Skin Name miss match', _skinName, _skinName.length);
    return 0;
  }
  
  getSafeId(_safeName = 'Undefined') {
    _safeName = _safeName.toLowerCase().trim();
    for(let i = 1; i < this.safe.length; i++) {
      if (this.safe[i][0].toLowerCase().trim() == _safeName) {
        return i;
      }
    }
    return 0;
  }
}
