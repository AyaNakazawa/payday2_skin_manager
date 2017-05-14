
class PAYDAY2 {
  static get RARITY() {
    return [
      {
        name: 'Common',
        color: '2360D8'
      },
      {
        name: 'Uncommon',
        color: '9900FF'
      },
      {
        name: 'Rare',
        color: 'FF00FF'
      },
      {
        name: 'Epic',
        color: 'FF0000'
      },
      {
        name: 'Legendary',
        color: 'ffff00'
      },
      {
        name: 'Undefined',
        color: '000000'
      },
    ]
  }
  
  static get QUALITY() {
    return [
      {
        name: 'Battle-Worn'
      },
      {
        name: 'Well-Used'
      },
      {
        name: 'Broken-In'
      },
      {
        name: 'Lightly-Marked'
      },
      {
        name: 'Mint-Condition'
      },
      {
        name: 'Undefined'
      },
    ]
  }
  
  static getRarityId(_rarity = 'Common') {
    for(let i = 0; i <= PAYDAY2.RARITY.length; i++) {
      if (PAYDAY2.RARITY[i]['name'] == _rarity) {
        return i;
      }
    }
    return PAYDAY2.RARITY.length - 1;
  }
  
  static getQualityId(_quality = 'Battle-Worn') {
    for(let i = 0; i <= PAYDAY2.QUALITY.length; i++) {
      if (PAYDAY2.QUALITY[i]['name'] == _quality) {
        return i;
      }
    }
    return PAYDAY2.QUALITY.length - 1;
  }
}
