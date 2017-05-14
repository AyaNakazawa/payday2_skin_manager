
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
  
  static getRarityId(_rarity = 'Common') {
    for(let i = 0; i <= PAYDAY2.RARITY.length; i++) {
      if (PAYDAY2.RARITY[i]['name'] == _rarity) {
        return i;
      }
    }
    return PAYDAY2.RARITY.length - 1;
  }
}
